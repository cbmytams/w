import type { NextRequest } from "next/server";
import { Prisma, QuestionnaireType } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { sanitizeQuestion } from "@/lib/questionnaireValidation";
import { getOrCreateCurrentQuestionnaireForTenant } from "@/lib/questionnaireTenant";
import { requireTenantContext } from "@/lib/tenantContext";

export async function POST(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = enforceRateLimit(request, {
    scope: "questionnaire-question-create",
    limit: 30,
    windowMs: 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  const auth = requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const tenant = await requireTenantContext(auth.session);
  if (tenant.response) return tenant.response;

  const body = (await request.json().catch(() => null)) as {
    question?: unknown;
  } | null;
  const question = sanitizeQuestion(body?.question);

  if (!question) {
    return Response.json(
      { error: "Invalid payload: question is required." },
      { status: 400 }
    );
  }

  const current = await getOrCreateCurrentQuestionnaireForTenant(
    tenant.tenantId,
    QuestionnaireType.BRANDS
  );
  const existing: Prisma.JsonValue[] = Array.isArray(current.sectionsJson)
    ? [...current.sectionsJson]
    : [];
  existing.push(question as Prisma.JsonValue);

  const updated = await prisma.questionnaire.update({
    where: { id: current.id },
    data: {
      sectionsJson: existing as Prisma.InputJsonValue,
    },
  });

  await prisma.auditLog
    .create({
      data: {
        tenantId: tenant.tenantId,
        actorId: auth.session.sub,
        action: "QUESTION_ADDED",
        entity: "Questionnaire",
        entityId: updated.id,
        diffJson: {
          questionId: question.id,
        } as Prisma.InputJsonValue,
      },
    })
    .catch(() => null);

  return Response.json({
    questionnaireId: updated.id,
    questions: existing,
  });
}
