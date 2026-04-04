import type { Condition } from "./questionnaireData";

export type ConditionAnswers = Record<string, unknown>;

export function evaluateCondition(condition: Condition, answers: ConditionAnswers): boolean {
    const answer = answers[condition.questionId];

    if (answer === undefined || answer === null) {
        return false;
    }

    switch (condition.operator) {
        case "equals":
            return answer === condition.value;
        case "not_equals":
            return answer !== condition.value;
        case "one_of":
            return Array.isArray(condition.value) ? condition.value.includes(answer as string) : false;
        case "contains":
            if (Array.isArray(answer)) {
                if (Array.isArray(condition.value)) {
                    return condition.value.some((value) => answer.includes(value));
                }
                return answer.includes(condition.value as string);
            }
            return false;
        case "greater_than":
            return typeof answer === "number" && answer > (condition.value as number);
        case "less_than":
            return typeof answer === "number" && answer < (condition.value as number);
        default:
            return false;
    }
}

export function evaluateConditions(conditions: Condition[] | undefined, answers: ConditionAnswers): boolean {
    if (!conditions || conditions.length === 0) return true;
    return conditions.every((condition) => evaluateCondition(condition, answers));
}
