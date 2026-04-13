import { computeCompletion } from "../../lib/completion";
import {
  TALENTS_QUESTIONNAIRE_MAP,
  type QuestionnaireMap,
} from "../../lib/questionnaireMap";

describe("completion", () => {
  describe("computeCompletion", () => {
    it("should return 0 when responses or map is invalid", () => {
      expect(computeCompletion(null, null)).toEqual({
        total: 0,
        answered: 0,
        percent: 0,
        missingFields: [],
      });

      expect(computeCompletion([], { type: "TALENTS", sections: [] })).toEqual({
        total: 0,
        answered: 0,
        percent: 0,
        missingFields: [],
      });
    });

    it("should return 100% when there are no required fields", () => {
      const map: QuestionnaireMap = {
        type: "TALENTS",
        sections: [
          {
            id: "s1",
            label: "s1",
            fields: [
              { key: "f1", label: "Field 1", required: false, type: "text" },
            ],
          },
        ],
      };

      const responses = { f1: "hello" };
      expect(computeCompletion(responses, map)).toEqual({
        total: 0,
        answered: 0,
        percent: 100,
        missingFields: [],
      });
    });

    it("should correctly compute partial completion", () => {
      const map: QuestionnaireMap = {
        type: "TALENTS",
        sections: [
          {
            id: "s1",
            label: "s1",
            fields: [
              { key: "f1", label: "Field 1", required: true, type: "text" },
              { key: "f2", label: "Field 2", required: true, type: "text" },
              { key: "f3", label: "Field 3", required: true, type: "text" },
            ],
          },
        ],
      };

      const responses = {
        f1: "hello",
        f2: "world",
      };

      expect(computeCompletion(responses, map)).toEqual({
        total: 3,
        answered: 2,
        percent: 67,
        missingFields: ["Field 3"],
      });
    });

    it("should treat empty strings as unanswered", () => {
      const map: QuestionnaireMap = {
        type: "TALENTS",
        sections: [
          {
            id: "s1",
            label: "s1",
            fields: [
              { key: "f1", label: "Field 1", required: true, type: "text" },
            ],
          },
        ],
      };

      const responses = { f1: "" };
      expect(computeCompletion(responses, map)).toEqual({
        total: 1,
        answered: 0,
        percent: 0,
        missingFields: ["Field 1"],
      });
    });

    it("should treat null or undefined as unanswered", () => {
      const map: QuestionnaireMap = {
        type: "TALENTS",
        sections: [
          {
            id: "s1",
            label: "s1",
            fields: [
              { key: "f1", label: "Field 1", required: true, type: "text" },
              { key: "f2", label: "Field 2", required: true, type: "text" },
            ],
          },
        ],
      };

      const responses = { f1: null as never, f2: undefined as never };
      expect(computeCompletion(responses, map)).toEqual({
        total: 2,
        answered: 0,
        percent: 0,
        missingFields: ["Field 1", "Field 2"],
      });
    });

    it("should exclude hidden conditional required fields from denominator", () => {
      const map: QuestionnaireMap = {
        type: "TALENTS",
        sections: [
          {
            id: "CALIBRATION",
            label: "Calibration",
            fields: TALENTS_QUESTIONNAIRE_MAP.sections
              .find((section) => section.id === "CALIBRATION")!
              .fields.filter((field) => field.key === "q0_level"),
          },
          {
            id: "BUSINESS",
            label: "Business",
            fields: TALENTS_QUESTIONNAIRE_MAP.sections
              .find((section) => section.id === "BUSINESS")!
              .fields.filter(
                (field) => field.key === "biz_01" || field.key === "biz_03"
              ),
          },
        ],
      };

      const responses = {
        q0_level: "beginner",
        biz_01: "no",
      };

      expect(computeCompletion(responses, map)).toEqual({
        total: 2,
        answered: 2,
        percent: 100,
        missingFields: [],
      });
    });

    it("should keep conditional required fields when visibility conditions are satisfied", () => {
      const map: QuestionnaireMap = {
        type: "TALENTS",
        sections: [
          {
            id: "CALIBRATION",
            label: "Calibration",
            fields: TALENTS_QUESTIONNAIRE_MAP.sections
              .find((section) => section.id === "CALIBRATION")!
              .fields.filter((field) => field.key === "q0_level"),
          },
          {
            id: "BUSINESS",
            label: "Business",
            fields: TALENTS_QUESTIONNAIRE_MAP.sections
              .find((section) => section.id === "BUSINESS")!
              .fields.filter(
                (field) => field.key === "biz_01" || field.key === "biz_03"
              ),
          },
        ],
      };

      const responses = {
        q0_level: "intermediaire",
        biz_01: "yes_living",
      };

      expect(computeCompletion(responses, map)).toEqual({
        total: 3,
        answered: 2,
        percent: 67,
        missingFields: ["As-tu une rate card (grille tarifaire) ?"],
      });
    });
  });
});
