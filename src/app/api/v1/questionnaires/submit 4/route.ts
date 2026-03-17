import { NextResponse, type NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma as db } from "@/lib/db";
import { computeCompletion } from "@/lib/completion";
import { BRANDS_QUESTIONNAIRE_MAP, TALENTS_QUESTIONNAIRE_MAP } from "@/lib/questionnaireMap";
import { buildLeadSlug } from "@/lib/questionnaireSlug";
import { QuestionnaireSubmitSchema } from "@/lib/validations";
import { validateBody, apiError } from "@/lib/api-response";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";

export async function POST(request: NextRequest) {
    try {
        const originError = enforceSameOrigin(request);
        if (originError) return originError;

        const rateLimitError = enforceRateLimit(request, {
            scope: "questionnaire-submit",
            limit: 20,
            windowMs: 60 * 1000
        });
        if (rateLimitError) return rateLimitError;

        const rawBody = await request.json().catch(() => null);
        if (!rawBody) return apiError("Invalid JSON body");

        const validation = validateBody(QuestionnaireSubmitSchema, rawBody);
        if (!validation.success) return validation.response;

        const { type, responses } = validation.data;

        const name = (responses.ql_name || responses.ql_company) as string | undefined;
        const email = responses.ql_email as string | undefined;

        // We require at least a name or an email to consider this a valid lead.
        // Otherwise, it's a ghost/bot submission that pollutes the database.
        if (!name && !email) {
            return NextResponse.json(
                { error: "Payload rejected: Missing basic identification (name or email)." },
                { status: 400 }
            );
        }

        // Resolve tenant from config or fallback to oldest tenant.
        const defaultTenantSlug = process.env.DEFAULT_TENANT_SLUG?.trim() || null;
        const tenant = defaultTenantSlug
            ? await db.tenant.findUnique({ where: { slug: defaultTenantSlug } })
            : await db.tenant.findFirst({ orderBy: { createdAt: "asc" } });

        if (!tenant) {
            return NextResponse.json(
                { error: "No tenant configured for questionnaire submissions." },
                { status: 503 }
            );
        }

        // Ensure an active questionnaire exists for this type.
        const questionnaire = await db.questionnaire.findFirst({
            where: {
                type: type === "BRANDS" ? "BRANDS" : "TALENTS",
                isActive: true
            },
            orderBy: { createdAt: "desc" }
        });

        if (!questionnaire) {
            return NextResponse.json(
                { error: "No active questionnaire configured for this submission type." },
                { status: 503 }
            );
        }

        // Calculate completion
        const map = type === "BRANDS" ? BRANDS_QUESTIONNAIRE_MAP : TALENTS_QUESTIONNAIRE_MAP;
        const completionData = computeCompletion(responses as Record<string, string>, map);

        // Keep lead creation and questionnaire response atomic to avoid orphan talents.
        const finalName = [name, email]
            .find((value): value is string => typeof value === "string" && value.trim().length > 0)
            ?.trim() || "Inconnu";
        const slug = buildLeadSlug(finalName, email);

        const newResponse = await db.$transaction(async (tx) => {
            const talentRecord = await tx.talent.create({
                data: {
                    name: finalName,
                    slug,
                    tenantId: tenant.id,
                }
            });

            return tx.questionnaireResponse.create({
                data: {
                    talentId: talentRecord.id,
                    questionnaireId: questionnaire.id,
                    type: type === "BRANDS" ? "BRANDS" : "TALENTS",
                    answersJson: responses as Prisma.InputJsonValue,
                    completionRate: completionData.percent,
                }
            });
        });

        return NextResponse.json({ success: true, data: newResponse }, { status: 201 });

    } catch (error) {
        console.error("Error submitting questionnaire:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
