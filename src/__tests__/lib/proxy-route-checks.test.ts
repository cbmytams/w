import { getRouteChecks } from "@/proxy";

describe("proxy route checks", () => {
  it("keeps the public questionnaire current endpoint outside admin protection", () => {
    expect(getRouteChecks("/api/v1/questionnaires/current")).toEqual({
      isApiAdmin: false,
      isAdminRoute: false,
    });
  });

  it("still protects questionnaire admin mutation endpoints", () => {
    expect(getRouteChecks("/api/v1/questionnaires/reorder")).toEqual({
      isApiAdmin: true,
      isAdminRoute: false,
    });
    expect(getRouteChecks("/api/v1/questionnaires/questions")).toEqual({
      isApiAdmin: true,
      isAdminRoute: false,
    });
  });
});
