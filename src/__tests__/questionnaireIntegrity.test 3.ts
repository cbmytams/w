import { validateQuestionnaireIntegrity } from "../lib/questionnaireIntegrity";

describe("Questionnaire Integrity Monitor", () => {
    it("should detect duplicate question IDs in a questionnaire", () => {
        const sections = [
            {
                id: "s1", title: "Section 1", questions: [
                    { id: "q1", title: "Question 1" },
                    { id: "q2", title: "Question 2" }
                ]
            },
            {
                id: "s2", title: "Section 2", questions: [
                    { id: "q1", title: "Duplicate Question" }
                ]
            }
        ];

        const { issues, questionIds } = validateQuestionnaireIntegrity(sections);

        expect(issues.length).toBe(1);
        expect(issues[0].type).toBe("duplicate_id");
        expect(issues[0].message).toContain("q1");
        expect(questionIds.size).toBe(2);
    });

    it("should detect broken jump logic", () => {
        const sections = [
            {
                id: "s1", title: "Section 1", questions: [
                    { id: "q1", title: "Q1", logic: [{ jumpTo: "q3" }] },
                    { id: "q2", title: "Q2", logic: [{ jumpTo: "END" }] }
                ]
            }
        ];

        const { issues } = validateQuestionnaireIntegrity(sections);

        expect(issues.length).toBe(1);
        expect(issues[0].type).toBe("broken_jump");
        expect(issues[0].message).toContain("jumps to non-existent ID: q3");
    });

    it("should pass a valid questionnaire", () => {
        const sections = [
            {
                id: "s1", title: "Section 1", questions: [
                    { id: "q1", title: "Q1", logic: [{ jumpTo: "q2" }] },
                    { id: "q2", title: "Q2", logic: [{ jumpTo: "END" }] }
                ]
            }
        ];

        const { issues } = validateQuestionnaireIntegrity(sections);
        expect(issues.length).toBe(0);
    });

    it("should detect an infinite loop (cycle)", () => {
        const sections = [
            {
                id: "s1", title: "Section 1", questions: [
                    { id: "q1", title: "Q1", logic: [{ jumpTo: "q2" }] },
                    { id: "q2", title: "Q2", logic: [{ jumpTo: "q3" }] },
                    { id: "q3", title: "Q3", logic: [{ jumpTo: "q1" }] } // Cycle back to q1
                ]
            }
        ];

        const { issues } = validateQuestionnaireIntegrity(sections);
        expect(issues.some(i => i.type === "infinite_loop")).toBe(true);
    });

    it("should detect a self-referential infinite loop", () => {
        const sections = [
            {
                id: "s1", title: "Section 1", questions: [
                    { id: "q1", title: "Q1", logic: [{ jumpTo: "q1" }] }
                ]
            }
        ];

        const { issues } = validateQuestionnaireIntegrity(sections);
        expect(issues.some(i => i.type === "infinite_loop")).toBe(true);
    });

    it("should not add undefined neighbors when intermediate question IDs are missing", () => {
        const sections = [
            {
                id: "s1", title: "Section 1", questions: [
                    { id: "q1", title: "Q1", logic: [{ jumpTo: "q3" }] },
                    { id: "", title: "No id question" },
                    { id: "q3", title: "Q3", logic: [{ jumpTo: "END" }] }
                ]
            }
        ];

        const { issues } = validateQuestionnaireIntegrity(sections);
        expect(issues.some((issue) => issue.message.includes("undefined"))).toBe(false);
    });

    it("should detect cycles in disconnected subgraphs", () => {
        const sections = [
            {
                id: "s1", title: "Section 1", questions: [
                    { id: "q1", title: "Q1", logic: [{ jumpTo: "END" }] },
                    { id: "q2", title: "Q2", logic: [{ jumpTo: "q3" }] },
                    { id: "q3", title: "Q3", logic: [{ jumpTo: "q2" }] }
                ]
            }
        ];

        const { issues } = validateQuestionnaireIntegrity(sections);
        const cycleIssues = issues.filter((issue) => issue.type === "infinite_loop");
        expect(cycleIssues.length).toBeGreaterThanOrEqual(1);
    });

    it("should avoid duplicate infinite loop reports for the same cycle node", () => {
        const sections = [
            {
                id: "s1", title: "Section 1", questions: [
                    { id: "q1", title: "Q1", logic: [{ jumpTo: "q2" }, { jumpTo: "q2" }] },
                    { id: "q2", title: "Q2", logic: [{ jumpTo: "q1" }] }
                ]
            }
        ];

        const { issues } = validateQuestionnaireIntegrity(sections);
        const cycleIssues = issues.filter((issue) => issue.type === "infinite_loop");
        const uniqueMessages = new Set(cycleIssues.map((issue) => issue.message));

        expect(cycleIssues.length).toBe(uniqueMessages.size);
    });
});
