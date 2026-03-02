import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { isSafeRecordId, sanitizeQuestionUpdates } from "@/lib/questionnaireValidation";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function getCurrentQuestionnaire() {
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

  const current = await getCurrentQuestionnaire();
  const questions = Array.isArray(current.sectionsJson) ? [...current.sectionsJson] : [];
  const index = questions.findIndex((entry) => (entry as { id?: string })?.id === id);
  if (index < 0) {
    return Response.json({ error: "Question not found." }, { status: 404 });
  }

  questions[index] = {
    ...(questions[index] as Prisma.JsonObject),
    ...(updates as Prisma.JsonObject)
  } as Prisma.JsonValue;

  const updated = await prisma.questionnaire.update({
    where: { id: current.id },
    data: {
      sectionsJson: questions as Prisma.InputJsonValue
    }
  });

  const tenantId = await ensureTenantId();
  if (tenantId) {
    await prisma.auditLog.create({
      data: {
        tenantId,
        actorId: auth.session.id,
        action: "QUESTION_UPDATED",
        entity: "Questionnaire",
        entityId: updated.id,
        diffJson: { questionId: id, updates } as Prisma.InputJsonValue
      }
    }).catch(() => null);
  }

  return Response.json({
    questionnaireId: updated.id,
    questions
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

  const current = await getCurrentQuestionnaire();
  const questions = Array.isArray(current.sectionsJson) ? [...current.sectionsJson] : [];
  const filtered = questions.filter((entry) => (entry as { id?: string })?.id !== id);

  if (filtered.length === questions.length) {
    return Response.json({ error: "Question not found." }, { status: 404 });
  }

  const updated = await prisma.questionnaire.update({
    where: { id: current.id },
    data: {
      sectionsJson: filtered as Prisma.InputJsonValue
    }
  });

  const tenantId = await ensureTenantId();
  if (tenantId) {
    await prisma.auditLog.create({
      data: {
        tenantId,
        actorId: auth.session.id,
        action: "QUESTION_DELETED",
        entity: "Questionnaire",
        entityId: updated.id,
        diffJson: { questionId: id } as Prisma.InputJsonValue
      }
    }).catch(() => null);
  }

  return Response.json({
    questionnaireId: updated.id,
    questions: filtered
  });
}
