export const QUESTION_TYPES = {
    TEXT: "text",
    EMAIL: "email",
    TEL: "tel",
    URL: "url",
    SINGLE_CHOICE: "single",
    MULTIPLE_CHOICE: "multiple",
    SCALE: "scale",
} as const;

export type QuestionValue = string | string[] | number | null | undefined;

export interface IntegrityQuestion {
    id: string;
    logic?: Array<{ jumpTo?: string }>;
}

export interface IntegritySection {
    id: string;
    title: string;
    questions?: IntegrityQuestion[];
}

function normalizeIntegritySections(raw: unknown): IntegritySection[] {
    if (!Array.isArray(raw)) return [];

    const normalizedSections: IntegritySection[] = [];
    const legacyFlatQuestions: IntegrityQuestion[] = [];

    for (const entry of raw) {
        if (!entry || typeof entry !== "object") continue;

        const candidate = entry as {
            id?: unknown;
            title?: unknown;
            questions?: unknown;
        };

        if (Array.isArray(candidate.questions)) {
            normalizedSections.push({
                id: typeof candidate.id === "string" ? candidate.id : "",
                title: typeof candidate.title === "string" ? candidate.title : "",
                questions: candidate.questions as IntegrityQuestion[],
            });
            continue;
        }

        legacyFlatQuestions.push(entry as IntegrityQuestion);
    }

    if (legacyFlatQuestions.length > 0) {
        normalizedSections.push({
            id: "legacy_flat",
            title: "Legacy Flat",
            questions: legacyFlatQuestions,
        });
    }

    return normalizedSections;
}

export function validateQuestionnaireIntegrity(sectionsJson: unknown) {
    const normalizedSections = normalizeIntegritySections(sectionsJson);
    const issues: { type: string; message: string }[] = [];
    const questionIds = new Set<string>();

    // 1. Check for duplicate IDs and missing fields
    for (const section of normalizedSections || []) {
        if (!section.id || !section.title) {
            issues.push({ type: "invalid_section", message: `Section missing ID or title: ${JSON.stringify(section)}` });
        }
        for (const q of section.questions || []) {
            if (!q.id) {
                issues.push({ type: "invalid_question", message: `Question without ID in section ${section.id}` });
                continue;
            }
            if (questionIds.has(q.id)) {
                issues.push({ type: "duplicate_id", message: `Duplicate question ID detected: ${q.id}` });
            }
            questionIds.add(q.id);
        }
    }

    // 2. Logic & Jump conditions checks
    const adj = new Map<string, string[]>();
    const allQuestions = (normalizedSections || []).flatMap(s => s.questions || []);

    for (let i = 0; i < allQuestions.length; i++) {
        const q = allQuestions[i];
        if (!q.id) continue;

        const neighbors: string[] = [];
        if (q.logic && Array.isArray(q.logic)) {
            for (const condition of q.logic) {
                if (condition.jumpTo && condition.jumpTo !== "END") {
                    if (!questionIds.has(condition.jumpTo)) {
                        issues.push({ type: "broken_jump", message: `Question ${q.id} jumps to non-existent ID: ${condition.jumpTo}` });
                    } else {
                        neighbors.push(condition.jumpTo);
                    }
                }
                // Determine if this is an unconditional jump to stop flowing to the next element
                // Usually an unconditional jump has no specific 'condition' or matches everything.
                // Assuming simplistic evaluation: if logic exists, it might potentially catch all.
                // To be safe, we always consider the sequential flow unless explicitly blocked.
            }
        }

        // Add sequential flow unless it's the last question
        if (i < allQuestions.length - 1) {
            neighbors.push(allQuestions[i + 1].id);
        }

        adj.set(q.id, neighbors);
    }

    // 3. Cycle Detection (DFS)
    const visited = new Set<string>();
    const recStack = new Set<string>();

    const detectCycle = (node: string): boolean => {
        if (recStack.has(node)) return true;
        if (visited.has(node)) return false;

        visited.add(node);
        recStack.add(node);

        for (const neighbor of adj.get(node) || []) {
            if (detectCycle(neighbor)) {
                issues.push({ type: "infinite_loop", message: `Infinite loop detected involving question ID: ${neighbor}` });
                return true;
            }
        }

        recStack.delete(node);
        return false;
    };

    if (allQuestions.length > 0 && allQuestions[0].id) {
        detectCycle(allQuestions[0].id);
    }

    return { issues, questionIds };
}
