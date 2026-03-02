import { NextResponse } from "next/server";
import { prisma as db } from "@/lib/db";
import { computeCompletion } from "@/lib/completion";
import { BRANDS_QUESTIONNAIRE_MAP, TALENTS_QUESTIONNAIRE_MAP } from "@/lib/questionnaireMap";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.type || !body.responses) {
            return NextResponse.json(
                { error: "Invalid payload: type and responses are required." },
                { status: 400 }
            );
        }

        const type = body.type; // "TALENTS" or "BRANDS"
        const responses = body.responses;

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
        const name = responses.ql_name || responses.ql_company || `Anonyme ${type}`;
        const timestamp = Date.now().toString();
        const slug = `${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${timestamp}`;

        const talentRecord = await db.talent.create({
            data: {
                name: name,
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
        const completionData = computeCompletion(responses, map);

        // Store the questionnaire response
        const newResponse = await db.questionnaireResponse.create({
            data: {
                talentId: talentRecord.id,
                questionnaireId: questionnaire.id,
                type: type === "BRANDS" ? "BRANDS" : "TALENTS",
                answersJson: responses,
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
