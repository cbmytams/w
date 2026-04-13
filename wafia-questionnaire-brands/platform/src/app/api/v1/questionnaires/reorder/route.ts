import type { NextRequest } from "next/server";
import { Prisma, QuestionnaireType } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { getOrCreateCurrentQuestionnaireForTenant } from "@/lib/questionnaireTenant";
import { requireTenantContext } from "@/lib/tenantContext";

export async function POST(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = enforceRateLimit(request, {
    scope: "questionnaire-reorder",
    limit: 30,
    windowMs: 60 * 1000
  });
  if (rateLimitError) return rateLimitError;

  const auth = requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const tenant = await requireTenantContext(auth.session);
  if (tenant.response) return tenant.response;

  const body = await request.json().catch(() => null) as
    | { startIndex?: number; endIndex?: number }
    | null;
  const startIndex = body?.startIndex;
  const endIndex = body?.endIndex;

  if (
    typeof startIndex !== "number" ||
    typeof endIndex !== "number" ||
    !Number.isInteger(startIndex) ||
    !Number.isInteger(endIndex)
  ) {
    return Response.json({ error: "Invalid payload: startIndex/endIndex required." }, { status: 400 });
  }

  const current = await getOrCreateCurrentQuestionnaireForTenant(
    tenant.tenantId,
    QuestionnaireType.BRANDS
  );
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

  await prisma.auditLog.create({
    data: {
      tenantId: tenant.tenantId,
      actorId: auth.session.sub,
      action: "QUESTION_REORDERED",
      entity: "Questionnaire",
      entityId: updated.id,
      diffJson: { startIndex, endIndex } as Prisma.InputJsonValue
    }
  }).catch(() => null);

  return Response.json({
    questionnaireId: updated.id,
    questions: withOrderIndex
  });
}
