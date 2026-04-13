import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireDashboardRole } from "@/lib/apiAuth";
import { apiError, apiSuccess, validateBody } from "@/lib/api-response";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { ReorderSchema } from "@/lib/validations";
import { resolveType } from "@/lib/questionnaireType";
import { reorderQuestionsForTenant } from "@/lib/questionnaireTenant";

export async function POST(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = enforceRateLimit(request, {
    scope: "questionnaire-reorder",
    limit: 30,
    windowMs: 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const body = await request.json().catch(() => null);
  if (!body) return apiError("Invalid JSON body");

  const validation = validateBody(ReorderSchema, body);
  if (!validation.success) return validation.response;

  const { startIndex, endIndex } = validation.data;

  const type = resolveType(request.nextUrl.searchParams);
  const result = await reorderQuestionsForTenant(
    auth.session.tenantId,
    type,
    startIndex,
    endIndex
  );
  if ("error" in result) {
    return apiError(result.error || "Invalid reorder request", 400);
  }

  await prisma.auditLog
    .create({
      data: {
        tenantId: auth.session.tenantId,
        actorId: auth.session.id,
        action: "QUESTION_REORDERED",
        entity: "Questionnaire",
        entityId: result.updated.id,
        diffJson: { startIndex, endIndex } as Prisma.InputJsonValue,
      },
    })
    .catch(() => null);

  return apiSuccess({
    questionnaireId: result.updated.id,
    questions: result.questions,
  });
}
