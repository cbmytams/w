import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { sanitizeQuestionList } from "@/lib/questionnaireValidation";
import { requireDashboardRole } from "@/lib/apiAuth";
import { TALENTS_QUESTIONS } from "@/lib/questionnaireData";

async function getOrCreateCurrentQuestionnaire() {
  const current = await prisma.questionnaire.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "desc" }
  });

  if (current) return current;

  return prisma.questionnaire.create({
    data: {
      version: "v1",
      type: "TALENTS",
      sectionsJson: [],
      isActive: true
    }
  });
}

async function ensureTenantId() {
  const tenant = await prisma.tenant.findFirst({
    orderBy: { createdAt: "asc" },
    select: { id: true }
  });
  return tenant?.id || null;
}

export async function GET(_request: NextRequest) {
  try {
    const questionnaire = await getOrCreateCurrentQuestionnaire();
    const questions = Array.isArray(questionnaire.sectionsJson) ? questionnaire.sectionsJson : [];

    return Response.json({
      questionnaireId: questionnaire.id,
      version: questionnaire.version,
      questions
    });
  } catch (error) {
    console.warn("Questionnaire current API fallback enabled.", error);

    return Response.json({
      questionnaireId: "local-fallback",
      version: "v1",
      questions: TALENTS_QUESTIONS
    });
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

  const current = await getOrCreateCurrentQuestionnaire();
  const version = body?.version || current.version;
  const updated = await prisma.questionnaire.update({
    where: { id: current.id },
    data: {
      sectionsJson: questions as Prisma.InputJsonValue,
      version
    }
  });

  const tenantId = await ensureTenantId();
  if (tenantId) {
    await prisma.auditLog.create({
      data: {
        tenantId,
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
