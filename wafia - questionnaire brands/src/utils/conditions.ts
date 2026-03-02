/**
 * WAFIA DIAGNOSTIC TOOL - CONDITION EVALUATOR
 * Évaluation de la logique conditionnelle pour l'affichage des questions
 */

import type { Condition, Question, Answers } from '../types';

/**
 * Évalue si une condition est remplie
 */
export function evaluateCondition(
    condition: Condition,
    answers: Answers
): boolean {
    const answer = answers[condition.questionId];

    // Si la question n'a pas encore été répondue, la condition n'est pas remplie
    if (answer === undefined || answer === null) {
        return false;
    }

    switch (condition.operator) {
        case 'equals':
            return answer === condition.value;

        case 'not_equals':
            return answer !== condition.value;

        case 'one_of':
            // Vérifie si la réponse fait partie de la liste de valeurs
            if (Array.isArray(condition.value)) {
                return condition.value.includes(answer as string);
            }
            return false;

        case 'contains':
            // Vérifie si une réponse multiple contient une valeur
            if (Array.isArray(answer)) {
                if (Array.isArray(condition.value)) {
                    return condition.value.some(v => answer.includes(v));
                }
                return answer.includes(condition.value as string);
            }
            return false;

        case 'greater_than':
            return typeof answer === 'number' && answer > (condition.value as number);

        case 'less_than':
            return typeof answer === 'number' && answer < (condition.value as number);

        default:
            return false;
    }
}

/**
 * Évalue si toutes les conditions d'une question sont remplies
 * (conditions combinées avec AND)
 */
export function evaluateConditions(
    conditions: Condition[] | undefined,
    answers: Answers
): boolean {
    // Pas de conditions = toujours visible
    if (!conditions || conditions.length === 0) {
        return true;
    }

    // Toutes les conditions doivent être vraies (AND)
    return conditions.every(condition => evaluateCondition(condition, answers));
}

/**
 * Filtre les questions visibles selon les réponses actuelles
 */
export function filterVisibleQuestions(
    questions: Question[],
    answers: Answers
): Question[] {
    return questions.filter(question =>
        evaluateConditions(question.conditions, answers)
    );
}

/**
 * Obtient la prochaine question visible à partir de l'index actuel
 */
export function getNextVisibleQuestionIndex(
    questions: Question[],
    answers: Answers,
    currentIndex: number
): number {
    for (let i = currentIndex + 1; i < questions.length; i++) {
        if (evaluateConditions(questions[i].conditions, answers)) {
            return i;
        }
    }
    return -1; // Plus de questions
}

/**
 * Obtient la question précédente visible à partir de l'index actuel
 */
export function getPreviousVisibleQuestionIndex(
    questions: Question[],
    answers: Answers,
    currentIndex: number
): number {
    for (let i = currentIndex - 1; i >= 0; i--) {
        if (evaluateConditions(questions[i].conditions, answers)) {
            return i;
        }
    }
    return -1; // Pas de question précédente
}

/**
 * Compte le nombre total de questions visibles
 */
export function countVisibleQuestions(
    questions: Question[],
    answers: Answers
): number {
    return filterVisibleQuestions(questions, answers).length;
}

/**
 * Obtient l'index de progression actuel parmi les questions visibles
 */
export function getProgressIndex(
    questions: Question[],
    answers: Answers,
    currentQuestionId: string
): { current: number; total: number } {
    const visibleQuestions = filterVisibleQuestions(questions, answers);
    const currentIndex = visibleQuestions.findIndex(q => q.id === currentQuestionId);

    return {
        current: currentIndex + 1,
        total: visibleQuestions.length
    };
}
