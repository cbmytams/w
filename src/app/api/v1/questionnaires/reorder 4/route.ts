import type { NextRequest } from "next/server";
import { QuestionnaireType } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { ReorderSchema } from "@/lib/validations";
import { validateBody, apiError } from "@/lib/api-response";

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
    scope: "questionnaire-reorder",
    limit: 30,
    windowMs: 60 * 1000
  });
  if (rateLimitError) return rateLimitError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const typeResolution = resolveQuestionnaireType(request.nextUrl.searchParams.get("type"));
  if (typeResolution.error) return typeResolution.error;

  const body = await request.json().catch(() => null);
  if (!body) return apiError("Invalid JSON body");

  const validation = validateBody(ReorderSchema, body);
  if (!validation.success) return validation.response;

  const { startIndex, endIndex } = validation.data;

  const current = await getCurrentQuestionnaire(typeResolution.type);
  if (!current) {
    return Response.json(
      { error: `No active questionnaire found for ${typeResolution.type}.` },
      { status: 404 }
    );
  }

  const questions = Array.isArray(current.sectionsJson) ? [...current.sectionsJson] : [];

  if (
    startIndex < 0 ||
    endIndex < 0 ||
    startIndex >= questions.length ||
    endIndex >= questions.length
  ) {
    return Response.json({ error: "Index out of range." }, { status: 400 });
  }

  const [removed] = questions.splice(startIndex, 1);
  questions.splice(endIndex, 0, removed);

  const withOrderIndex = questions.map((entry, index) => ({
    ...(entry as Record<string, unknown>),
    order_index: index
  }));

  const updated = await prisma.questionnaire.update({
    where: { id: current.id },
    data: {
      sectionsJson: withOrderIndex as Prisma.InputJsonValue
    }
  });

  const tenantId = await ensureTenantId();
  if (tenantId) {
    await prisma.auditLog.create({
      data: {
        tenantId,
        actorId: auth.session.id,
        action: "QUESTION_REORDERED",
        entity: "Questionnaire",
        entityId: updated.id,
        diffJson: {
          startIndex,
          endIndex,
          type: updated.type,
        } as Prisma.InputJsonValue
      }
    }).catch(() => null);
  }

  return Response.json({
    questionnaireId: updated.id,
    type: updated.type,
    questions: withOrderIndex
  });
}
