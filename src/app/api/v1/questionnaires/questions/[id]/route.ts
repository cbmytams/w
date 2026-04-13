import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { isSafeRecordId, sanitizeQuestionUpdates } from "@/lib/questionnaireValidation";
import { resolveType } from "@/lib/questionnaireType";
import { deleteQuestionForTenant, updateQuestionForTenant } from "@/lib/questionnaireTenant";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = enforceRateLimit(request, {
    scope: "questionnaire-question-update",
    limit: 30,
    windowMs: 60 * 1000
  });
  if (rateLimitError) return rateLimitError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const { id } = await context.params;
  if (!isSafeRecordId(id)) {
    return Response.json({ error: "Invalid question id." }, { status: 400 });
  }

  const body = await request.json().catch(() => null) as
    | { updates?: unknown }
    | null;
  const updates = sanitizeQuestionUpdates(body?.updates);

  if (!updates) {
    return Response.json({ error: "Invalid payload: updates is required." }, { status: 400 });
  }

  const type = resolveType(request.nextUrl.searchParams);
  const result = await updateQuestionForTenant(auth.session.tenantId, type, id, updates as Prisma.JsonObject);
  if (!result) {
    return Response.json({ error: "Question not found." }, { status: 404 });
  }

  await prisma.auditLog.create({ data: { tenantId: auth.session.tenantId,
    actorId: auth.session.id,
    action: "QUESTION_UPDATED",
    entity: "Questionnaire",
    entityId: result.updated.id,
    diffJson: { questionId: id, updates } as Prisma.InputJsonValue
  } }).catch(() => null);

  return Response.json({
    questionnaireId: result.updated.id,
    questions: result.questions
  });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = enforceRateLimit(request, {
    scope: "questionnaire-question-delete",
    limit: 30,
    windowMs: 60 * 1000
  });
  if (rateLimitError) return rateLimitError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const { id } = await context.params;
  if (!isSafeRecordId(id)) {
    return Response.json({ error: "Invalid question id." }, { status: 400 });
  }

  const type = resolveType(request.nextUrl.searchParams);
  const result = await deleteQuestionForTenant(auth.session.tenantId, type, id);
  if (!result) {
    return Response.json({ error: "Question not found." }, { status: 404 });
  }

  await prisma.auditLog.create({ data: { tenantId: auth.session.tenantId,
    actorId: auth.session.id,
    action: "QUESTION_DELETED",
    entity: "Questionnaire",
    entityId: result.updated.id,
    diffJson: { questionId: id } as Prisma.InputJsonValue
  } }).catch(() => null);

  return Response.json({
    questionnaireId: result.updated.id,
    questions: result.questions
  });
}
