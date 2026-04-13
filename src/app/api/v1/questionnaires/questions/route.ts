import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { apiError, apiSuccess, validateBody } from "@/lib/api-response";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { sanitizeQuestion } from "@/lib/questionnaireValidation";
import { resolveType } from "@/lib/questionnaireType";
import { appendQuestionForTenant } from "@/lib/questionnaireTenant";

const QuestionCreateSchema = z.object({
  question: z.unknown(),
});

export async function POST(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = await enforceRateLimit(request, {
    scope: "questionnaire-question-create",
    limit: 30,
    windowMs: 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const body = await request.json().catch(() => null);
  if (!body) return apiError("Invalid JSON body");

  const validation = validateBody(QuestionCreateSchema, body);
  if (!validation.success) return validation.response;

  const question = sanitizeQuestion(validation.data.question);

  if (!question) {
    return apiError("Invalid payload: question is required.", 400);
  }

  const type = resolveType(request.nextUrl.searchParams);
  const { updated, questions } = await appendQuestionForTenant(
    auth.session.tenantId,
    type,
    question as Prisma.JsonValue
  );

  await prisma.auditLog
    .create({
      data: {
        tenantId: auth.session.tenantId,
        actorId: auth.session.id,
        action: "QUESTION_ADDED",
        entity: "Questionnaire",
        entityId: updated.id,
        diffJson: {
          questionId: question.id,
        } as Prisma.InputJsonValue,
      },
    })
    .catch(() => null);

  return apiSuccess({
    questionnaireId: updated.id,
    questions,
  });
}
