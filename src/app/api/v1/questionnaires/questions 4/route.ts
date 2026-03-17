import type { NextRequest } from "next/server";
import { QuestionnaireType } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { sanitizeQuestion } from "@/lib/questionnaireValidation";

type QuestionnaireTypeResolution =
  | { type: QuestionnaireType; error: null }
  | { type: null; error: Response };

function resolveQuestionnaireType(rawType: string | null): QuestionnaireTypeResolution {
  if (!rawType || rawType === QuestionnaireType.TALENTS) {
    return { type: QuestionnaireType.TALENTS, error: null };
  }

  if (rawType === QuestionnaireType.BRANDS) {
    return { type: QuestionnaireType.BRANDS, error: null };
  }

  return {
    type: null,
    error: Response.json(
      { error: "Invalid questionnaire type. Expected TALENTS or BRANDS." },
      { status: 400 }
    ),
  };
}

async function getCurrentQuestionnaire(type: QuestionnaireType) {
  return prisma.questionnaire.findFirst({
    where: { isActive: true, type },
    orderBy: { createdAt: "desc" }
  });
}

async function ensureTenantId() {
  const tenant = await prisma.tenant.findFirst({
    orderBy: { createdAt: "asc" },
    select: { id: true }
  });
  return tenant?.id || null;
}

export async function POST(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = enforceRateLimit(request, {
    scope: "questionnaire-question-create",
    limit: 30,
    windowMs: 60 * 1000
  });
  if (rateLimitError) return rateLimitError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const typeResolution = resolveQuestionnaireType(request.nextUrl.searchParams.get("type"));
  if (typeResolution.error) return typeResolution.error;

  const body = await request.json().catch(() => null) as
    | { question?: unknown }
    | null;
  const question = sanitizeQuestion(body?.question);

  if (!question) {
    return Response.json({ error: "Invalid payload: question is required." }, { status: 400 });
  }

  const current = await getCurrentQuestionnaire(typeResolution.type);
  if (!current) {
    return Response.json(
      { error: `No active questionnaire found for ${typeResolution.type}.` },
      { status: 404 }
    );
  }

  const existing: Prisma.JsonValue[] = Array.isArray(current.sectionsJson) ? [...current.sectionsJson] : [];
  existing.push(question as Prisma.JsonValue);

  const updated = await prisma.questionnaire.update({
    where: { id: current.id },
    data: {
      sectionsJson: existing as Prisma.InputJsonValue
    }
  });

  const tenantId = await ensureTenantId();
  if (tenantId) {
    await prisma.auditLog.create({
      data: {
        tenantId,
        actorId: auth.session.id,
        action: "QUESTION_ADDED",
        entity: "Questionnaire",
        entityId: updated.id,
        diffJson: {
          questionId: question.id,
          type: updated.type,
        } as Prisma.InputJsonValue
      }
    }).catch(() => null);
  }

  return Response.json({
    questionnaireId: updated.id,
    type: updated.type,
    questions: existing
  });
}
