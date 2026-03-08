import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma as db } from "@/lib/db";
import { computeCompletion } from "@/lib/completion";
import { BRANDS_QUESTIONNAIRE_MAP, TALENTS_QUESTIONNAIRE_MAP } from "@/lib/questionnaireMap";
import { QuestionnaireSubmitSchema } from "@/lib/validations";
import { validateBody, apiError } from "@/lib/api-response";

export async function POST(request: Request) {
    try {
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

        // Find a default Tenant or create one
        let tenant = await db.tenant.findFirst();
        if (!tenant) {
            tenant = await db.tenant.create({
                data: {
                    name: "Wafia",
                    slug: "wafia"
                }
            });
        }

        // We use "Talent" for both because in this schema everything is a "Talent" 
        // regardless if it's a Brand or an actual Talent (hence QuestionnaireType is used to differentiate).
        const finalName = name || `Inconnu (${email})`;
        const timestamp = Date.now().toString();
        const slug = `${finalName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${timestamp}`;

        const talentRecord = await db.talent.create({
            data: {
                name: finalName,
                slug: slug,
                tenantId: tenant.id,
            }
        });

        // Ensure a Questionnaire template exists for this type
        let questionnaire = await db.questionnaire.findFirst({
            where: { type: type === "BRANDS" ? "BRANDS" : "TALENTS" }
        });

        if (!questionnaire) {
            questionnaire = await db.questionnaire.create({
                data: {
                    type: type === "BRANDS" ? "BRANDS" : "TALENTS",
                    version: "1.0.0",
                    sectionsJson: {}
                }
            });
        }

        // Calculate completion
        const map = type === "BRANDS" ? BRANDS_QUESTIONNAIRE_MAP : TALENTS_QUESTIONNAIRE_MAP;
        const completionData = computeCompletion(responses as Record<string, string>, map);

        // Store the questionnaire response
        const newResponse = await db.questionnaireResponse.create({
            data: {
                talentId: talentRecord.id,
                questionnaireId: questionnaire.id,
                type: type === "BRANDS" ? "BRANDS" : "TALENTS",
                answersJson: responses as Prisma.InputJsonValue,
                completionRate: completionData.percent,
            }
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
