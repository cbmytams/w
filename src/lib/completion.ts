import { QuestionnaireMap } from './questionnaireMap';
import { Prisma } from '@prisma/client';

export type CompletionData = {
    total: number;
    answered: number;
    percent: number;
    missingFields: string[];
};

export function computeCompletion(responses: Prisma.JsonValue, map: QuestionnaireMap | null): CompletionData {
    if (!map || !responses || typeof responses !== 'object' || Array.isArray(responses)) {
        return { total: 0, answered: 0, percent: 0, missingFields: [] };
    }

    const responseMap = responses as Record<string, unknown>;

    const requiredFields = map.sections.flatMap(s => s.fields.filter(f => f.required));

    if (requiredFields.length === 0) return { total: 0, answered: 0, percent: 100, missingFields: [] };

    const missingFields: string[] = [];

    const answered = requiredFields.filter(f => {
        const val = responseMap[f.key];
        const isAnswered = val !== undefined && val !== null && val !== "";
        if (!isAnswered) {
            missingFields.push(f.label);
        }
        return isAnswered;
    });

    return {
        total: requiredFields.length,
        answered: answered.length,
        percent: Math.round((answered.length / requiredFields.length) * 100),
        missingFields
    };
}
