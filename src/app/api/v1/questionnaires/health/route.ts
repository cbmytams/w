import type { NextRequest } from "next/server";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import { enforceSameOrigin } from "@/lib/requestSecurity";
import { validateQuestionnaireIntegrity, type IntegritySection } from "@/lib/questionnaireIntegrity";
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

    const { issues, questionIds } = validateQuestionnaireIntegrity(current.sectionsJson as unknown as IntegritySection[]);

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

export async function DELETE(request: NextRequest) {
    const originError = enforceSameOrigin(request);
    if (originError) return originError;

    const auth = await requireDashboardRole(request, DASHBOARD_ROLES.ADMIN);
    if (auth.response) return auth.response;

    const typeParam = request.nextUrl.searchParams.get("type");
    const type = typeParam === "BRANDS" ? QuestionnaireType.BRANDS : QuestionnaireType.TALENTS;

    try {
        // Find ghost responses
        const ghostResponses = await prisma.questionnaireResponse.findMany({
            where: {
                type,
                talent: { status: "ARCHIVED" }
            },
            select: { id: true, talentId: true }
        });

        if (ghostResponses.length > 0) {
            const responseIds = ghostResponses.map(r => r.id);
            const talentIds = ghostResponses.map(r => r.talentId);

            // Delete responses
            await prisma.questionnaireResponse.deleteMany({
                where: { id: { in: responseIds } }
            });

            // Delete associated archived talents if they have no other valid responses (simplified: just delete them)
            await prisma.talent.deleteMany({
                where: { id: { in: talentIds }, status: "ARCHIVED" }
            });

            return Response.json({ success: true, purgedCount: ghostResponses.length });
        }

        return Response.json({ success: true, purgedCount: 0 });
    } catch (error) {
        void error;
        // TODO(logging): replace with structured logger
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
