import type { NextRequest } from "next/server";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { QuestionnaireType } from "@prisma/client";

const BATCH_SIZE = 500;

function createCSVStream(version: string, type: QuestionnaireType) {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            try {
                const questionnaire = await prisma.questionnaire.findFirst({
                    where: { version, type },
                });

                if (!questionnaire) {
                    controller.enqueue(encoder.encode("Error: Questionnaire version not found"));
                    controller.close();
                    return;
                }

                // Generate CSV Header dynamically based on sectionsJson
                const sectionsJson = questionnaire.sectionsJson as any[];
                const questionHeaders = [];
                for (const section of sectionsJson || []) {
                    for (const q of section.questions || []) {
                        questionHeaders.push(q.title || q.id);
                    }
                }

                const headers = ["ID", "Talent ID", "Score", "Completion Rate", "Submitted At", ...questionHeaders].join(",") + "\n";
                controller.enqueue(encoder.encode(headers));

                let cursor: string | undefined = undefined;
                let hasMore = true;

                while (hasMore) {
                    const chunkResponses: any[] = await prisma.questionnaireResponse.findMany({
                        where: { questionnaireId: questionnaire.id, type },
                        take: BATCH_SIZE,
                        skip: cursor ? 1 : 0,
                        cursor: cursor ? { id: cursor } : undefined,
                        orderBy: { id: "asc" }
                    });

                    if (chunkResponses.length === 0) {
                        hasMore = false;
                        break;
                    }

                    let chunk = "";
                    for (const response of chunkResponses) {
                        const answers = response.answersJson as Record<string, any>;

                        const row = [
                            response.id,
                            response.talentId,
                            response.score ?? "",
                            response.completionRate,
                            response.submittedAt.toISOString()
                        ];

                        // Map answers to the exact order of questions
                        for (const section of sectionsJson || []) {
                            for (const q of section.questions || []) {
                                const answer = answers[q.id];
                                // Escape quotes and wrap in quotes to prevent CSV injection / breaking format
                                const formattedAnswer = answer ? `"${String(answer).replace(/"/g, '""')}"` : '""';
                                row.push(formattedAnswer);
                            }
                        }

                        chunk += row.join(",") + "\n";
                    }

                    controller.enqueue(encoder.encode(chunk));
                    cursor = chunkResponses[chunkResponses.length - 1].id;
                }

                controller.close();
            } catch (error) {
                controller.error(error);
            }
        }
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="export-${type.toLowerCase()}-${version}-${new Date().toISOString().split('T')[0]}.csv"`,
            "Cache-Control": "no-cache",
            "Transfer-Encoding": "chunked"
        }
    });
}

function createJSONStream(version: string, type: QuestionnaireType) {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            try {
                const questionnaire = await prisma.questionnaire.findFirst({
                    where: { version, type },
                });

                if (!questionnaire) {
                    controller.enqueue(encoder.encode(JSON.stringify({ error: "Version not found" })));
                    controller.close();
                    return;
                }

                controller.enqueue(encoder.encode("[\n"));

                let cursor: string | undefined = undefined;
                let hasMore = true;
                let isFirst = true;

                while (hasMore) {
                    const chunkResponses: any[] = await prisma.questionnaireResponse.findMany({
                        where: { questionnaireId: questionnaire.id, type },
                        take: BATCH_SIZE,
                        skip: cursor ? 1 : 0,
                        cursor: cursor ? { id: cursor } : undefined,
                        orderBy: { id: "asc" }
                    });

                    if (chunkResponses.length === 0) {
                        hasMore = false;
                        break;
                    }

                    for (const response of chunkResponses) {
                        const row = {
                            id: response.id,
                            talentId: response.talentId,
                            type: response.type,
                            score: response.score,
                            completionRate: response.completionRate,
                            submittedAt: response.submittedAt,
                            answers: response.answersJson
                        };

                        const prefix = isFirst ? "  " : ",\n  ";
                        controller.enqueue(encoder.encode(prefix + JSON.stringify(row)));
                        isFirst = false;
                    }

                    cursor = chunkResponses[chunkResponses.length - 1].id;
                }

                controller.enqueue(encoder.encode("\n]"));
                controller.close();
            } catch (error) {
                controller.error(error);
            }
        }
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Content-Disposition": `attachment; filename="export-${type.toLowerCase()}-${version}-${new Date().toISOString().split('T')[0]}.json"`,
            "Cache-Control": "no-cache",
            "Transfer-Encoding": "chunked"
        }
    });
}

export async function GET(request: NextRequest) {
    const originError = enforceSameOrigin(request);
    if (originError) return originError;

    const auth = await requireDashboardRole(request, DASHBOARD_ROLES.MANAGER);
    if (auth.response) return auth.response;

    const rateLimitError = enforceRateLimit(request, {
        scope: "dashboard-export",
        limit: 10,
        windowMs: 60 * 1000
    });
    if (rateLimitError) return rateLimitError;

    const format = request.nextUrl.searchParams.get("format") || "csv";
    const typeParam = request.nextUrl.searchParams.get("type");
    const version = request.nextUrl.searchParams.get("version") || "v1";

    if (!typeParam || (typeParam !== "TALENTS" && typeParam !== "BRANDS")) {
        return Response.json({ error: "Invalid or missing QuestionnaireType parameter." }, { status: 400 });
    }

    const type = typeParam as QuestionnaireType;

    // Audit logging the export event
    await prisma.auditLog.create({
        data: {
            tenantId: "system",
            actorId: auth.session.id,
            action: "EXPORT_DATA",
            entity: "QuestionnaireResponse",
            entityId: `${type}-${version}-${format}`,
            diffJson: { format, type, version, ip: request.headers.get("x-forwarded-for") || "unknown" }
        }
    });

    if (format === "json") {
        return createJSONStream(version, type);
    }

    return createCSVStream(version, type);
}
