import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS, CALIBRATION_QUESTIONS, MAIN_QUESTIONS } from "./questions";

describe("questionnaire integrity", () => {
  it("has no duplicate question ids", () => {
    const ids = ALL_QUESTIONS.map((question) => question.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    expect(duplicates).toEqual([]);
  });

  it("has valid condition targets", () => {
    const idSet = new Set(ALL_QUESTIONS.map((question) => question.id));
    const broken = ALL_QUESTIONS.flatMap((question) =>
      (question.conditions || [])
        .filter((condition) => !idSet.has(condition.questionId))
        .map((condition) => `${question.id} -> ${condition.questionId}`)
    );
    expect(broken).toEqual([]);
  });

  it("contains complete sections for calibration and deep qualification", () => {
    expect(CALIBRATION_QUESTIONS.length).toBeGreaterThan(0);
    expect(MAIN_QUESTIONS.length).toBeGreaterThan(0);
  });

  it("ensures option and scale metadata are present when required", () => {
    const invalidOptionQuestions = ALL_QUESTIONS
      .filter((question) => question.type === "single" || question.type === "multiple")
      .filter((question) => !question.options || question.options.length === 0)
      .map((question) => question.id);

    const invalidScaleQuestions = ALL_QUESTIONS
      .filter((question) => question.type === "scale")
      .filter((question) => {
        const hasMinMax = typeof question.min === "number" && typeof question.max === "number";
        const hasLabels = Boolean(question.labels?.min) && Boolean(question.labels?.max);
        return !hasMinMax || !hasLabels;
      })
      .map((question) => question.id);

    expect(invalidOptionQuestions).toEqual([]);
    expect(invalidScaleQuestions).toEqual([]);
  });
});

