import type { NextRequest } from "next/server";
import { Prisma, QuestionnaireType } from "@prisma/client";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { sanitizeQuestionList } from "@/lib/questionnaireValidation";
import { prisma } from "@/lib/db";
import { getOrCreateCurrentQuestionnaireForTenant } from "@/lib/questionnaireTenant";
import { requireTenantContext } from "@/lib/tenantContext";

export async function GET(request: NextRequest) {
  const auth = requireDashboardRole(request);
  if (auth.response) return auth.response;

  const tenant = await requireTenantContext(auth.session);
  if (tenant.response) return tenant.response;

  const questionnaire = await getOrCreateCurrentQuestionnaireForTenant(
    tenant.tenantId,
    QuestionnaireType.BRANDS
  );
  const questions = Array.isArray(questionnaire.sectionsJson) ? questionnaire.sectionsJson : [];

  return Response.json({
    questionnaireId: questionnaire.id,
    version: questionnaire.version,
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

  const auth = requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const tenant = await requireTenantContext(auth.session);
  if (tenant.response) return tenant.response;

  const body = await request.json().catch(() => null) as
    | { questions?: unknown; version?: string }
    | null;
  const questions = sanitizeQuestionList(body?.questions);

  if (!questions) {
    return Response.json({ error: "Invalid payload: questions[] is required." }, { status: 400 });
  }

  const current = await getOrCreateCurrentQuestionnaireForTenant(
    tenant.tenantId,
    QuestionnaireType.BRANDS
  );
  const version = body?.version || current.version;
  const updated = await prisma.questionnaire.update({
    where: { id: current.id },
    data: {
      sectionsJson: questions as Prisma.InputJsonValue,
      version
    }
  });

  await prisma.auditLog.create({
    data: {
      tenantId: tenant.tenantId,
      actorId: auth.session.sub,
      action: "QUESTIONNAIRE_REPLACED",
      entity: "Questionnaire",
      entityId: updated.id,
      diffJson: {
        count: questions.length,
        version
      } as Prisma.InputJsonValue
    }
  }).catch(() => null);

  return Response.json({
    questionnaireId: updated.id,
    version: updated.version,
    questions
  });
}
