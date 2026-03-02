import { describe, it, expect } from 'vitest';
import {
    evaluateCondition,
    filterVisibleQuestions,
    getNextVisibleQuestionIndex,
    getPreviousVisibleQuestionIndex
} from './conditions';
import type { Condition, Question } from '../types';

describe('conditions utilities', () => {
    it('evaluates basic operators correctly', () => {
        const answers = {
            q1: 'yes',
            q2: ['a', 'b'],
            q3: 7
        };

        const equals: Condition = { questionId: 'q1', operator: 'equals', value: 'yes' };
        const notEquals: Condition = { questionId: 'q1', operator: 'not_equals', value: 'no' };
        const oneOf: Condition = { questionId: 'q1', operator: 'one_of', value: ['no', 'yes'] };
        const contains: Condition = { questionId: 'q2', operator: 'contains', value: 'b' };
        const greaterThan: Condition = { questionId: 'q3', operator: 'greater_than', value: 5 };
        const lessThan: Condition = { questionId: 'q3', operator: 'less_than', value: 10 };

        expect(evaluateCondition(equals, answers)).toBe(true);
        expect(evaluateCondition(notEquals, answers)).toBe(true);
        expect(evaluateCondition(oneOf, answers)).toBe(true);
        expect(evaluateCondition(contains, answers)).toBe(true);
        expect(evaluateCondition(greaterThan, answers)).toBe(true);
        expect(evaluateCondition(lessThan, answers)).toBe(true);
    });

    it('filters visible questions based on conditions', () => {
        const questions: Question[] = [
            { id: 'q1', category: 'MATURITY', type: 'single', question: 'Q1' },
            {
                id: 'q2',
                category: 'MATURITY',
                type: 'single',
                question: 'Q2',
                conditions: [{ questionId: 'q1', operator: 'equals', value: 'ok' }]
            },
            {
                id: 'q3',
                category: 'MATURITY',
                type: 'single',
                question: 'Q3',
                conditions: [{ questionId: 'q1', operator: 'equals', value: 'nope' }]
            }
        ];

        const visible = filterVisibleQuestions(questions, { q1: 'ok' });
        expect(visible.map(q => q.id)).toEqual(['q1', 'q2']);
    });

    it('finds next and previous visible indices', () => {
        const questions: Question[] = [
            { id: 'q1', category: 'MATURITY', type: 'single', question: 'Q1' },
            {
                id: 'q2',
                category: 'MATURITY',
                type: 'single',
                question: 'Q2',
                conditions: [{ questionId: 'q1', operator: 'equals', value: 'show' }]
            },
            { id: 'q3', category: 'MATURITY', type: 'single', question: 'Q3' }
        ];

        const answers = { q1: 'show' };
        expect(getNextVisibleQuestionIndex(questions, answers, 0)).toBe(1);
        expect(getPreviousVisibleQuestionIndex(questions, answers, 2)).toBe(1);
    });
});
