import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { apiError, apiSuccess, validateBody } from "@/lib/api-response";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { sanitizeQuestionList } from "@/lib/questionnaireValidation";
import { requireDashboardRole } from "@/lib/apiAuth";
import { resolveType } from "@/lib/questionnaireType";
import {
  getOrCreateCurrentQuestionnaireForTenant,
  replaceQuestionnaireSectionsForTenant,
  resolveConfiguredTenantId,
} from "@/lib/questionnaireTenant";

const QuestionnaireCurrentSchema = z.object({
  questions: z.unknown(),
  version: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const type = resolveType(request.nextUrl.searchParams);
    const tenantId = await resolveConfiguredTenantId();
    if (!tenantId) {
      return apiError("questionnaire_unavailable", 503);
    }

    const questionnaire = await getOrCreateCurrentQuestionnaireForTenant(
      tenantId,
      type
    );
    const questions = Array.isArray(questionnaire.sectionsJson)
      ? questionnaire.sectionsJson
      : [];

    return apiSuccess({
      questionnaireId: questionnaire.id,
      version: questionnaire.version,
      questions,
    });
  } catch {
    return apiError("database_unavailable", 500);
  }
}

export async function PUT(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = enforceRateLimit(request, {
    scope: "questionnaire-current-put",
    limit: 30,
    windowMs: 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const body = await request.json().catch(() => null);
  if (!body) return apiError("Invalid JSON body");

  const validation = validateBody(QuestionnaireCurrentSchema, body);
  if (!validation.success) return validation.response;

  const questions = sanitizeQuestionList(validation.data.questions);

  if (!questions) {
    return apiError("Invalid payload: questions[] is required.", 400);
  }

  const type = resolveType(request.nextUrl.searchParams);
  const current = await getOrCreateCurrentQuestionnaireForTenant(
    auth.session.tenantId,
    type
  );
  const version = validation.data.version || current.version;
  const updated = await replaceQuestionnaireSectionsForTenant(
    auth.session.tenantId,
    type,
    questions as Prisma.InputJsonValue,
    version
  );

  await prisma.auditLog
    .create({
      data: {
        tenantId: auth.session.tenantId,
        actorId: auth.session.id,
        action: "QUESTIONNAIRE_REPLACED",
        entity: "Questionnaire",
        entityId: updated.id,
        diffJson: {
          count: questions.length,
          version,
        } as Prisma.InputJsonValue,
      },
    })
    .catch(() => null);

  return apiSuccess({
    questionnaireId: updated.id,
    version: updated.version,
    questions,
  });
}
