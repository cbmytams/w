import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { sanitizeQuestionList } from "@/lib/questionnaireValidation";
import { requireDashboardRole } from "@/lib/apiAuth";
import { resolveType } from "@/lib/questionnaireType";

async function getOrCreateCurrentQuestionnaire(type: "TALENTS" | "BRANDS") {
  const current = await prisma.questionnaire.findFirst({
    where: { isActive: true, type },
    orderBy: { createdAt: "desc" }
  });

  if (current) return current;

  return prisma.questionnaire.create({
    data: {
      version: "v1",
      type,
      sectionsJson: [],
      isActive: true
    }
  });
}

export async function GET(request: NextRequest) {
  try {
    const type = resolveType(request.nextUrl.searchParams);
    const questionnaire = await getOrCreateCurrentQuestionnaire(type);
    const questions = Array.isArray(questionnaire.sectionsJson) ? questionnaire.sectionsJson : [];

    return Response.json({
      questionnaireId: questionnaire.id,
      version: questionnaire.version,
      questions
    });
  } catch {
    return Response.json({ success: false, error: "database_unavailable" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = enforceRateLimit(request, {
    scope: "questionnaire-current-put",
    limit: 30,
    windowMs: 60 * 1000
  });
  if (rateLimitError) return rateLimitError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const body = await request.json().catch(() => null) as
    | { questions?: unknown; version?: string }
    | null;
  const questions = sanitizeQuestionList(body?.questions);

  if (!questions) {
    return Response.json({ error: "Invalid payload: questions[] is required." }, { status: 400 });
  }

  const type = resolveType(request.nextUrl.searchParams);
  const current = await getOrCreateCurrentQuestionnaire(type);
  const version = body?.version || current.version;
  const updated = await prisma.questionnaire.update({
    where: { id: current.id },
    data: {
      sectionsJson: questions as Prisma.InputJsonValue,
      version
    }
  });

  if (auth.session.tenantId) {
    await prisma.auditLog.create({
      data: {
        tenantId: auth.session.tenantId,
        actorId: auth.session.id,
        action: "QUESTIONNAIRE_REPLACED",
        entity: "Questionnaire",
        entityId: updated.id,
        diffJson: {
          count: questions.length,
          version
        } as Prisma.InputJsonValue
      }
    }).catch(() => null);
  }

  return Response.json({
    questionnaireId: updated.id,
    version: updated.version,
    questions
  });
}
