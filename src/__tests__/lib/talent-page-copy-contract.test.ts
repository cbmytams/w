import {
  TALENT_CTA,
  TALENT_HERO,
  TALENT_PROOF_POINTS,
} from "@/constants/talent-blocks/core";

describe("talent page copy contract", () => {
  it("uses a contact CTA instead of a diagnostic-specific CTA", () => {
    expect(TALENT_HERO.ctaPrimary).toBe("Nous contacter");
    expect(TALENT_CTA.ctaText).toBe("Nous contacter");
  });

  it("keeps the core Wafia talent promise centered on structure", () => {
    expect(TALENT_HERO.title).toBe("Votre talent.");
    expect(TALENT_HERO.titleHighlight).toBe("Une structure autour.");
    expect(TALENT_HERO.subtitle).toContain("Image, projets, revenus, droits");
  });

  it("surfaces senior proof points for credibility", () => {
    expect(TALENT_PROOF_POINTS.map((item) => item.value)).toEqual([
      "~400",
      "8 ans",
      "2 pôles",
    ]);
  });
});
