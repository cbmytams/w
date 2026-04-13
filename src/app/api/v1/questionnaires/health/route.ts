import type { NextRequest } from "next/server";
import { requireDashboardRole } from "@/lib/apiAuth";
import { apiError, apiSuccess } from "@/lib/api-response";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import { enforceSameOrigin } from "@/lib/requestSecurity";
import {
  validateQuestionnaireIntegrity,
  type IntegritySection,
} from "@/lib/questionnaireIntegrity";
import { QuestionnaireType } from "@prisma/client";

export async function GET(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const typeParam = request.nextUrl.searchParams.get("type");
  const type =
    typeParam === "BRANDS"
      ? QuestionnaireType.BRANDS
      : QuestionnaireType.TALENTS;

  const current = await prisma.questionnaire.findFirst({
    where: { tenantId: auth.session.tenantId, isActive: true, type },
    orderBy: { createdAt: "desc" },
  });

  if (!current) {
    return apiSuccess({
      status: "critical",
      issues: [
        {
          type: "missing_questionnaire",
          message: `No active version for ${type}`,
        },
      ],
    });
  }

  const { issues, questionIds } = validateQuestionnaireIntegrity(
    current.sectionsJson as unknown as IntegritySection[]
  );

  const ghostResponses = await prisma.questionnaireResponse.count({
    where: {
      type,
      questionnaireId: current.id,
      talent: { tenantId: auth.session.tenantId, status: "ARCHIVED" },
    },
  });

  if (ghostResponses > 0) {
    issues.push({
      type: "ghost_respondent",
      message: `Found ${ghostResponses} responses without valid relation to Talent/Lead`,
    });
  }

  return apiSuccess({
    status: issues.length > 0 ? "warning" : "ok",
    version: current.version,
    totalQuestions: questionIds.size,
    issues,
  });
}

export async function DELETE(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
  if (auth.response) return auth.response;

  const typeParam = request.nextUrl.searchParams.get("type");
  const type =
    typeParam === "BRANDS"
      ? QuestionnaireType.BRANDS
      : QuestionnaireType.TALENTS;

  try {
    const current = await prisma.questionnaire.findFirst({
      where: { tenantId: auth.session.tenantId, isActive: true, type },
      orderBy: { createdAt: "desc" },
    });
    if (!current) {
      return apiSuccess({ purgedCount: 0 });
    }

    const ghostResponses = await prisma.questionnaireResponse.findMany({
      where: {
        type,
        questionnaireId: current.id,
        talent: { tenantId: auth.session.tenantId, status: "ARCHIVED" },
      },
      select: { id: true, talentId: true },
    });

    if (ghostResponses.length > 0) {
      const responseIds = ghostResponses.map((response) => response.id);
      const talentIds = ghostResponses.map((response) => response.talentId);

      await prisma.questionnaireResponse.deleteMany({
        where: { questionnaireId: current.id, id: { in: responseIds } },
      }); // tenantId scoped by current questionnaire lookup
      await prisma.talent.deleteMany({
        where: {
          tenantId: auth.session.tenantId,
          id: { in: talentIds },
          status: "ARCHIVED",
        },
      });

      return apiSuccess({
        purgedCount: ghostResponses.length,
      });
    }

    return apiSuccess({ purgedCount: 0 });
  } catch (error) {
    void error;
    // TODO(logging): replace with structured logger
    return apiError("Internal Server Error", 500);
  }
}
