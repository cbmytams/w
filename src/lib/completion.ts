import { QuestionnaireMap } from './questionnaireMap';
import { Prisma } from '@prisma/client';
import { BRANDS_QUESTIONS, TALENTS_QUESTIONS } from './questionnaireData';
import { evaluateConditions } from './questionnaireConditions';

export type CompletionData = {
    total: number;
    answered: number;
    percent: number;
    missingFields: string[];
};

const TALENTS_QUESTIONS_BY_ID = new Map(TALENTS_QUESTIONS.map((question) => [question.id, question]));
const BRANDS_QUESTIONS_BY_ID = new Map(BRANDS_QUESTIONS.map((question) => [question.id, question]));

function isAnsweredValue(value: unknown) {
    if (value === undefined || value === null) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
}

export function computeCompletion(responses: Prisma.JsonValue, map: QuestionnaireMap | null): CompletionData {
    if (!map || !responses || typeof responses !== 'object' || Array.isArray(responses)) {
        return { total: 0, answered: 0, percent: 0, missingFields: [] };
    }

    const responseMap = responses as Record<string, unknown>;
    const questionsById = map.type === "BRANDS" ? BRANDS_QUESTIONS_BY_ID : TALENTS_QUESTIONS_BY_ID;

    const requiredFields = map.sections
        .flatMap((section) => section.fields.filter((field) => field.required))
        .filter((field) => {
            const question = questionsById.get(field.key);
            return evaluateConditions(question?.conditions, responseMap);
        });

    if (requiredFields.length === 0) return { total: 0, answered: 0, percent: 100, missingFields: [] };

    const missingFields: string[] = [];

    const answered = requiredFields.filter(f => {
        const val = responseMap[f.key];
        const isAnswered = isAnsweredValue(val);
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
