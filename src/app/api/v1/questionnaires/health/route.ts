import type { NextRequest } from "next/server";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import { enforceSameOrigin } from "@/lib/requestSecurity";
import { validateQuestionnaireIntegrity } from "@/lib/questionnaireIntegrity";
import { QuestionnaireType } from "@prisma/client";

export async function GET(request: NextRequest) {
    const originError = enforceSameOrigin(request);
    if (originError) return originError;

    const auth = await requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
    if (auth.response) return auth.response;

    const typeParam = request.nextUrl.searchParams.get("type");
    const type = typeParam === "BRANDS" ? QuestionnaireType.BRANDS : QuestionnaireType.TALENTS;

    const current = await prisma.questionnaire.findFirst({
        where: { isActive: true, type },
        orderBy: { createdAt: "desc" }
    });

    if (!current) {
        return Response.json({
            status: "critical",
            issues: [{ type: "missing_questionnaire", message: `No active version for ${type}` }]
        });
    }

    const { issues, questionIds } = validateQuestionnaireIntegrity(current.sectionsJson as any[]);

    // 3. Database consistency - Ghost respondents check
    const ghostResponses = await prisma.questionnaireResponse.count({
        where: {
            type,
            talent: { status: "ARCHIVED" } // Find responses belonging to archived talents
        }
    });

    if (ghostResponses > 0) {
        issues.push({ type: "ghost_respondent", message: `Found ${ghostResponses} responses without valid relation to Talent/Lead` });
    }

    return Response.json({
        status: issues.length > 0 ? "warning" : "ok",
        version: current.version,
        totalQuestions: questionIds.size,
        issues
    });
}
