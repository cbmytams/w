import type { NextRequest } from "next/server";
import { requireDashboardRole } from "@/lib/apiAuth";
import { apiError } from "@/lib/api-response";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { QuestionnaireType, type QuestionnaireResponse } from "@prisma/client";
import { getQuestionnaireVersionForTenant } from "@/lib/questionnaireTenant";
import { logWarn } from "@/lib/logger";

const BATCH_SIZE = 500;

type QuestionnaireForExport = {
  id: string;
  version: string;
  type: QuestionnaireType;
  sectionsJson: unknown;
};

type QuestionnaireSection = {
  id: string;
  title: string;
  questions: Array<{ id: string; title?: string }>;
};

type QuestionnaireQuestion = {
  id: string;
  label: string;
};

function serializeCsvCell(value: unknown) {
  const raw = value == null ? "" : String(value);
  const neutralized = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${neutralized.replace(/"/g, '""')}"`;
}

function serializeCsvRow(values: unknown[]) {
  return `${values.map((value) => serializeCsvCell(value)).join(",")}\n`;
}

function toQuestionDefinition(value: unknown): QuestionnaireQuestion | null {
  if (!value || typeof value !== "object") return null;

  const entry = value as { id?: unknown; title?: unknown; question?: unknown };
  if (typeof entry.id !== "string" || !entry.id.trim()) return null;

  if (typeof entry.title === "string" && entry.title.trim()) {
    return { id: entry.id, label: entry.title };
  }

  if (typeof entry.question === "string" && entry.question.trim()) {
    return { id: entry.id, label: entry.question };
  }

  return { id: entry.id, label: entry.id };
}

function getQuestionHeaders(sectionsJson: unknown) {
  const orderedQuestions: QuestionnaireQuestion[] = [];
  if (!Array.isArray(sectionsJson)) {
    return { orderedQuestions, questionHeaders: [] as string[] };
  }

  const hasSectionShape = sectionsJson.some(
    (entry) =>
      entry &&
      typeof entry === "object" &&
      Array.isArray((entry as { questions?: unknown }).questions)
  );

  if (hasSectionShape) {
    for (const section of sectionsJson as QuestionnaireSection[]) {
      for (const question of section.questions || []) {
        const normalized = toQuestionDefinition(question);
        if (normalized) orderedQuestions.push(normalized);
      }
    }
  } else {
    for (const question of sectionsJson) {
      const normalized = toQuestionDefinition(question);
      if (normalized) orderedQuestions.push(normalized);
    }
  }

  return {
    orderedQuestions,
    questionHeaders: orderedQuestions.map((question) => question.label),
  };
}

function createCSVStream(
  questionnaire: QuestionnaireForExport,
  tenantId: string
) {
  const encoder = new TextEncoder();
  const { orderedQuestions, questionHeaders } = getQuestionHeaders(
    questionnaire.sectionsJson
  );

  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(
          encoder.encode(
            serializeCsvRow([
              "ID",
              "Talent ID",
              "Score",
              "Completion Rate",
              "Submitted At",
              ...questionHeaders,
            ])
          )
        );

        let cursor: string | undefined = undefined;
        let hasMore = true;

        while (hasMore) {
          const chunkResponses: Array<
            Record<string, unknown> & {
              id: string;
              talentId: string;
              type: string;
              score: number | null;
              completionRate: number;
              submittedAt: Date;
              answersJson: unknown;
            }
          > = await prisma.questionnaireResponse.findMany({
            where: {
              questionnaireId: questionnaire.id,
              type: questionnaire.type,
              talent: { tenantId },
            },
            take: BATCH_SIZE,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: { id: "asc" },
          });

          if (chunkResponses.length === 0) {
            hasMore = false;
            break;
          }

          let chunk = "";
          for (const response of chunkResponses) {
            const answers = response.answersJson as Record<string, unknown>;

            const row: unknown[] = [
              response.id,
              response.talentId,
              response.score ?? "",
              response.completionRate,
              response.submittedAt.toISOString(),
            ];

            // Map answers to the exact order of questions
            for (const question of orderedQuestions) {
              const answer = answers[question.id];
              row.push(answer);
            }

            chunk += serializeCsvRow(row);
          }

          controller.enqueue(encoder.encode(chunk));
          cursor = chunkResponses[chunkResponses.length - 1].id;
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="export-${questionnaire.type.toLowerCase()}-${questionnaire.version}-${new Date().toISOString().split("T")[0]}.csv"`,
      "Cache-Control": "no-cache",
      "Transfer-Encoding": "chunked",
    },
  });
}

function createJSONStream(
  questionnaire: QuestionnaireForExport,
  tenantId: string
) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(encoder.encode("[\n"));

        let cursor: string | undefined = undefined;
        let hasMore = true;
        let isFirst = true;

        while (hasMore) {
          const chunkResponses: QuestionnaireResponse[] =
            await prisma.questionnaireResponse.findMany({
              where: {
                questionnaireId: questionnaire.id,
                type: questionnaire.type,
                talent: { tenantId },
              },
              take: BATCH_SIZE,
              skip: cursor ? 1 : 0,
              cursor: cursor ? { id: cursor } : undefined,
              orderBy: { id: "asc" },
            });

          if (chunkResponses.length === 0) {
            hasMore = false;
            break;
          }

          for (const response of chunkResponses) {
            const row = {
              id: response.id,
              talentId: response.talentId,
              type: response.type,
              score: response.score,
              completionRate: response.completionRate,
              submittedAt: response.submittedAt,
              answers: response.answersJson,
            };

            const prefix = isFirst ? "  " : ",\n  ";
            controller.enqueue(encoder.encode(prefix + JSON.stringify(row)));
            isFirst = false;
          }

          cursor = chunkResponses[chunkResponses.length - 1].id;
        }

        controller.enqueue(encoder.encode("\n]"));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="export-${questionnaire.type.toLowerCase()}-${questionnaire.version}-${new Date().toISOString().split("T")[0]}.json"`,
      "Cache-Control": "no-cache",
      "Transfer-Encoding": "chunked",
    },
  });
}

export async function GET(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.MANAGER);
  if (auth.response) return auth.response;

  const rateLimitError = await enforceRateLimit(request, {
    scope: "dashboard-export",
    limit: 10,
    windowMs: 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  const format = request.nextUrl.searchParams.get("format") || "csv";
  const typeParam = request.nextUrl.searchParams.get("type");
  const version = request.nextUrl.searchParams.get("version") || "v1";

  if (!typeParam || (typeParam !== "TALENTS" && typeParam !== "BRANDS")) {
    return apiError("Invalid or missing QuestionnaireType parameter.", 400);
  }

  const type = typeParam as QuestionnaireType;
  const questionnaire = await getQuestionnaireVersionForTenant(
    auth.session.tenantId,
    type,
    version
  );

  if (!questionnaire) {
    return apiError("Questionnaire version not found", 404);
  }

  await prisma.auditLog
    .create({
      data: {
        tenantId: auth.session.tenantId,
        actorId: auth.session.id,
        action: "EXPORT_DATA",
        entity: "QuestionnaireResponse",
        entityId: `${type}-${version}-${format}`,
        diffJson: {
          format,
          type,
          version,
          ip: request.headers.get("x-forwarded-for") || "unknown",
        },
      },
    })
    .catch((error) => {
      logWarn("questionnaires.exports.auditlog_failed", {
        route: "/api/v1/questionnaires/exports",
        tenantId: auth.session.tenantId,
        type,
        version,
        format,
        error: error instanceof Error ? error.message : String(error),
      });
    });

  if (format === "json") {
    return createJSONStream(questionnaire, auth.session.tenantId);
  }

  return createCSVStream(questionnaire, auth.session.tenantId);
}
