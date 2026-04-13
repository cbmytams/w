import { describe, it, expect } from "vitest";
import { calculateScores } from "./scoring";
import type { Question } from "../types";
import { INITIAL_SCORES } from "../constants";

describe("scoring utilities", () => {
  it("applies impacts for single and multiple choice", () => {
    const questions: Question[] = [
      {
        id: "q1",
        category: "MATURITY",
        type: "single",
        question: "Q1",
        options: [
          {
            id: "a",
            label: "A",
            impacts: [{ pillar: "STRATEGY", weight: 10 }],
          },
          {
            id: "b",
            label: "B",
            impacts: [{ pillar: "STRATEGY", weight: -5 }],
          },
        ],
      },
      {
        id: "q2",
        category: "SERVICES",
        type: "multiple",
        question: "Q2",
        options: [
          { id: "x", label: "X", impacts: [{ pillar: "CONTENT", weight: 5 }] },
          { id: "y", label: "Y", impacts: [{ pillar: "CONTENT", weight: 7 }] },
        ],
      },
    ];

    const scores = calculateScores({ q1: "a", q2: ["x", "y"] }, questions);
    expect(scores.STRATEGY).toBe(INITIAL_SCORES.STRATEGY + 10);
    expect(scores.CONTENT).toBe(INITIAL_SCORES.CONTENT + 12);
  });

  it("applies scale impacts", () => {
    const questions: Question[] = [
      {
        id: "q3",
        category: "BUDGET",
        type: "scale",
        question: "Q3",
        min: 1,
        max: 10,
      },
    ];

    const scores = calculateScores({ q3: 10 }, questions);

    // For q3: mid = 5.5, impact = Math.round((10 - 5.5) * 2) = 9
    expect(scores.ACTIVATION).toBe(INITIAL_SCORES.ACTIVATION + 9);
  });

  it("clamps scores between 0 and 100", () => {
    const questions: Question[] = [
      {
        id: "q4",
        category: "COMPETITIVE",
        type: "single",
        question: "Q4",
        options: [
          {
            id: "hi",
            label: "High",
            impacts: [{ pillar: "STRATEGY", weight: 999 }],
          },
          {
            id: "lo",
            label: "Low",
            impacts: [{ pillar: "STRATEGY", weight: -999 }],
          },
        ],
      },
    ];

    const high = calculateScores({ q4: "hi" }, questions);
    const low = calculateScores({ q4: "lo" }, questions);

    expect(high.STRATEGY).toBe(100);
    expect(low.STRATEGY).toBe(0);
  });
});
