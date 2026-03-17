import { sanitizeQuestion, sanitizeQuestionUpdates } from "../../lib/questionnaireValidation";
import { QUESTION_TYPES } from "../../lib/questionnaireIntegrity";

describe("questionnaireValidation", () => {
    describe("sanitizeQuestion", () => {
        it("should accept a valid question definition", () => {
            const q = {
                id: "test",
                category: "IDENTIFICATION",
                type: QUESTION_TYPES.TEXT,
                question: "What is your name?",
                order_index: 0
            };
            const result = sanitizeQuestion(q);
            expect(result).toMatchObject(q);
        });

        it("should return null for missing required fields", () => {
            const q = {
                id: "test",
                category: "IDENTIFICATION"
            };
            expect(sanitizeQuestion(q)).toBeNull();
        });
    });

    describe("sanitizeQuestionUpdates", () => {
        it("should sanitize valid updates", () => {
            const updates = {
                question: "Updated question text",
                min: 5
            };
            const result = sanitizeQuestionUpdates(updates);
            expect(result).toEqual({ question: "Updated question text", min: 5 });
        });

        it("should reject updates with invalid keys", () => {
            const updates = {
                question: "Valid",
                invalidKey: "Reject me"
            };
            const result = sanitizeQuestionUpdates(updates);
            expect(result).toBeNull();
        });
    });
});

