export function validateQuestionnaireIntegrity(sectionsJson: any[]) {
    const issues: { type: string; message: string }[] = [];
    const questionIds = new Set<string>();

    // 1. Check for duplicate IDs and missing fields
    for (const section of sectionsJson || []) {
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
    for (const section of sectionsJson || []) {
        for (const q of section.questions || []) {
            if (q.logic && Array.isArray(q.logic)) {
                for (const condition of q.logic) {
                    if (condition.jumpTo && !questionIds.has(condition.jumpTo) && condition.jumpTo !== "END") {
                        issues.push({ type: "broken_jump", message: `Question ${q.id} jumps to non-existent ID: ${condition.jumpTo}` });
                    }
                }
            }
        }
    }

    return { issues, questionIds };
}
