import {
  parseDate,
  asIsoDate,
  normalizeRange,
  previousRange,
  percentDelta,
  ratioPercent,
  average,
  maskEmail,
  maskPhone,
} from "../../lib/dashboard/queries/utils";

describe("dashboard queries utils", () => {
  describe("parseDate", () => {
    it("should parse a valid date string", () => {
      const fallback = new Date("2024-01-01T00:00:00.000Z");
      expect(parseDate("2024-05-15T00:00:00.000Z", fallback).getTime()).toBe(
        new Date("2024-05-15T00:00:00.000Z").getTime()
      );
    });

    it("should use fallback for invalid date string", () => {
      const fallback = new Date("2024-01-01T00:00:00.000Z");
      expect(parseDate("not a date", fallback)).toBe(fallback);
    });

    it("should use fallback for null", () => {
      const fallback = new Date("2024-01-01T00:00:00.000Z");
      expect(parseDate(null, fallback)).toBe(fallback);
    });
  });

  describe("asIsoDate", () => {
    it("should return YYYY-MM-DD", () => {
      const d = new Date("2024-05-15T12:30:45.000Z");
      expect(asIsoDate(d)).toBe("2024-05-15");
    });
  });

  describe("normalizeRange", () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2024-01-31T00:00:00.000Z"));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("should fallback to 30 days if no dates provided", () => {
      const range = normalizeRange(null, null);
      expect(range.from).toBe("2024-01-01");
      expect(range.to).toBe("2024-01-31");
    });

    it("should swap dates if start is after end", () => {
      const range = normalizeRange("2024-02-15", "2024-02-01");
      expect(range.from).toBe("2024-02-01");
      expect(range.to).toBe("2024-02-15");
    });
  });

  describe("previousRange", () => {
    it("should calculate correct previous window for a 10-day range", () => {
      const start = new Date("2024-01-11T00:00:00.000Z");
      const end = new Date("2024-01-20T00:00:00.000Z");

      const prev = previousRange(start, end);

      // duration is exactly 9 days (diff between ms). Previous end should be 1ms before start.
      expect(prev.previousEnd.getTime()).toBe(start.getTime() - 1);
      expect(prev.previousStart.getTime()).toBe(
        prev.previousEnd.getTime() - (end.getTime() - start.getTime())
      );
    });
  });

  describe("percentDelta", () => {
    it("should calculate correct positive delta", () => {
      expect(percentDelta(120, 100)).toBe(20);
    });

    it("should calculate correct negative delta", () => {
      expect(percentDelta(80, 100)).toBe(-20);
    });

    it("should handle previous = 0", () => {
      expect(percentDelta(50, 0)).toBe(100);
      expect(percentDelta(0, 0)).toBe(0);
    });
  });

  describe("ratioPercent", () => {
    it("should handle division by zero", () => {
      expect(ratioPercent(5, 0)).toBe(0);
    });

    it("should calculate ratio correctly", () => {
      expect(ratioPercent(1, 3)).toBe(33.33);
      expect(ratioPercent(1, 4)).toBe(25);
    });
  });

  describe("average", () => {
    it("should handle empty array", () => {
      expect(average([])).toBe(0);
    });

    it("should calculate average", () => {
      expect(average([10, 20, 30])).toBe(20);
      expect(average([1, 2])).toBe(1.5);
    });
  });

  describe("maskEmail", () => {
    it("should mask a normal email", () => {
      expect(maskEmail("sasha@example.com")).toBe("s***a@example.com");
    });

    it("should handle short emails", () => {
      expect(maskEmail("me@example.com")).toBe("m***@example.com");
      expect(maskEmail("a@example.com")).toBe("a***@example.com");
    });

    it("should handle empty or null", () => {
      expect(maskEmail(null)).toBe("");
      expect(maskEmail("")).toBe("");
      expect(maskEmail("invalid")).toBe("***");
    });
  });

  describe("maskPhone", () => {
    it("should mask a standard phone", () => {
      expect(maskPhone("+33 6 12 34 56 78")).toBe("********5678");
    });

    it("should mask short phone less than 4 digits", () => {
      expect(maskPhone("123")).toBe("****");
    });

    it("should handle empty or null", () => {
      expect(maskPhone(null)).toBe("");
      expect(maskPhone("")).toBe("");
    });
  });
});
