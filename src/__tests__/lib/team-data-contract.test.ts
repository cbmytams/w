import { TEAM as routeTeam } from "@/data/team";
import { TEAM as canonicalTeam } from "@/constants/team";

describe("team route data contract", () => {
  it("keeps the dynamic team route dataset aligned with canonical team content", () => {
    expect(routeTeam.length).toBeGreaterThan(0);
    expect(routeTeam.map((member) => member.slug).sort()).toEqual(
      canonicalTeam.map((member) => member.slug).sort()
    );
  });
});
