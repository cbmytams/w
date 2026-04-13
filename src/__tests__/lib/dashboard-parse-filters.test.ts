import { parseDashboardFilters } from "../../lib/dashboard/queries/parse-filters";

describe("parseDashboardFilters", () => {
  it("keeps a valid source value", () => {
    const params = new URLSearchParams({ source: "manual", type: "TALENTS" });
    const filters = parseDashboardFilters(params);

    expect(filters.source).toBe("manual");
    expect(filters.type).toBe("TALENTS");
  });

  it("drops an invalid source value", () => {
    const params = new URLSearchParams({ source: "evil", type: "TALENTS" });
    const filters = parseDashboardFilters(params);

    expect(filters.source).toBeUndefined();
    expect(filters.type).toBe("TALENTS");
  });

  it("drops an invalid type value", () => {
    const params = new URLSearchParams({
      source: "questionnaire",
      type: "OTHER",
    });
    const filters = parseDashboardFilters(params);

    expect(filters.source).toBe("questionnaire");
    expect(filters.type).toBeUndefined();
  });
});
