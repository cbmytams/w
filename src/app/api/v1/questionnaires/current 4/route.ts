import type { NextRequest } from "next/server";
import { Prisma, QuestionnaireType } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { sanitizeQuestionList } from "@/lib/questionnaireValidation";

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

async function getOrCreateCurrentQuestionnaire(type: QuestionnaireType) {
  const current = await prisma.questionnaire.findFirst({
    where: { isActive: true, type },
    orderBy: { createdAt: "desc" }
  });

  if (current) return current;

  try {
    return await prisma.questionnaire.create({
      data: {
        version: "v1",
        type,
        sectionsJson: [],
        isActive: true
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      const refetched = await prisma.questionnaire.findFirst({
        where: { isActive: true, type },
        orderBy: { createdAt: "desc" }
      });

      if (refetched) return refetched;
    }

    throw error;
  }
}

async function ensureTenantId() {
  const tenant = await prisma.tenant.findFirst({
    orderBy: { createdAt: "asc" },
    select: { id: true }
  });
  return tenant?.id || null;
}

export async function GET(request: NextRequest) {
  const auth = await requireDashboardRole(request);
  if (auth.response) return auth.response;

  const typeResolution = resolveQuestionnaireType(request.nextUrl.searchParams.get("type"));
  if (typeResolution.error) return typeResolution.error;

  const questionnaire = await getOrCreateCurrentQuestionnaire(typeResolution.type);
  const questions = Array.isArray(questionnaire.sectionsJson) ? questionnaire.sectionsJson : [];

  return Response.json({
    questionnaireId: questionnaire.id,
    version: questionnaire.version,
    type: questionnaire.type,
    questions
  });
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

  const typeResolution = resolveQuestionnaireType(request.nextUrl.searchParams.get("type"));
  if (typeResolution.error) return typeResolution.error;

  const body = await request.json().catch(() => null) as
    | { questions?: unknown; version?: string }
    | null;
  const questions = sanitizeQuestionList(body?.questions);

  if (!questions) {
    return Response.json({ error: "Invalid payload: questions[] is required." }, { status: 400 });
  }

  const current = await getOrCreateCurrentQuestionnaire(typeResolution.type);
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
          version,
          type: updated.type,
        } as Prisma.InputJsonValue
      }
    }).catch(() => null);
  }

  return Response.json({
    questionnaireId: updated.id,
    version: updated.version,
    type: updated.type,
    questions
  });
}
