import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { TALENTS_QUESTIONNAIRE_MAP, BRANDS_QUESTIONNAIRE_MAP } from "@/lib/questionnaireMap";
import { BRANDS_QUESTIONS, TALENTS_QUESTIONS } from "@/lib/questionnaireData";

/**
 * Simple CSV export that uses the QuestionnaireMap as the source of truth
 * for column headers, instead of requiring a Questionnaire.sectionsJson version.
 * This is called from the admin Exports pages.
 */
export async function GET(request: NextRequest) {
    const typeParam = request.nextUrl.searchParams.get("type");

    if (!typeParam || (typeParam !== "TALENTS" && typeParam !== "BRANDS")) {
        return NextResponse.json({ error: "Missing or invalid 'type' parameter. Use TALENTS or BRANDS." }, { status: 400 });
    }

    const map = typeParam === "BRANDS" ? BRANDS_QUESTIONNAIRE_MAP : TALENTS_QUESTIONNAIRE_MAP;
    const questionsList = typeParam === "BRANDS" ? BRANDS_QUESTIONS : TALENTS_QUESTIONS;

    // Build all field keys + labels from the map
    const allFields = map.sections.flatMap(s => s.fields.map(f => ({ key: f.key, label: f.label, section: s.label })));

    // CSV Header
    const headers = ["ID", "Nom", "Date de soumission", "Complétion (%)", ...allFields.map(f => f.label)];

    // Fetch all responses
    const responses = await prisma.questionnaireResponse.findMany({
        where: { type: typeParam },
        include: { talent: { select: { name: true } } },
        orderBy: { submittedAt: "desc" }
    });

    // Helper: resolve option labels from question data
    const getOptionLabel = (fieldKey: string, rawValue: unknown): string => {
        if (rawValue === null || rawValue === undefined || rawValue === "") return "";
        const q = questionsList.find(q => q.id === fieldKey);
        if (!q || !q.options) return String(rawValue);

        if (Array.isArray(rawValue)) {
            return rawValue.map(v => {
                const opt = q.options?.find(o => o.id === v);
                return opt ? opt.label : String(v);
            }).join("; ");
        }

        const opt = q.options.find(o => o.id === rawValue);
        return opt ? opt.label : String(rawValue);
    };

    // Escape CSV value
    const escapeCSV = (val: string): string => {
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
            return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
    };

    // Build CSV rows
    const rows = responses.map(response => {
        const answers = (response.answersJson as Record<string, unknown>) || {};
        const row = [
            response.id,
            response.talent?.name || "Anonyme",
            response.submittedAt.toISOString().split("T")[0],
            String(Math.round(response.completionRate))
        ];

        for (const field of allFields) {
            const raw = answers[field.key];
            const resolved = getOptionLabel(field.key, raw);
            row.push(escapeCSV(resolved));
        }

        return row.join(",");
    });

    const csv = [headers.map(h => escapeCSV(h)).join(","), ...rows].join("\n");
    const filename = `wafia-${typeParam.toLowerCase()}-export-${new Date().toISOString().split("T")[0]}.csv`;

    return new Response(csv, {
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Cache-Control": "no-cache"
        }
    });
}
