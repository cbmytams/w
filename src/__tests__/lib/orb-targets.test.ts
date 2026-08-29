import { resolveOrbTarget, isModifiedClick } from "@/lib/orb-targets";

describe("orb-targets", () => {
  describe("resolveOrbTarget", () => {
    it("maps orb cluster destinations to their variant", () => {
      expect(resolveOrbTarget("/")).toBe("home");
      expect(resolveOrbTarget("/for-brands")).toBe("brands");
      expect(resolveOrbTarget("/for-talents")).toBe("talents");
      expect(resolveOrbTarget("/contact/brands")).toBe("brands");
      expect(resolveOrbTarget("/contact/talents")).toBe("talents");
    });

    it("strips query and hash before matching", () => {
      expect(resolveOrbTarget("/for-brands?utm=home")).toBe("brands");
      expect(resolveOrbTarget("/for-talents#contact")).toBe("talents");
      expect(resolveOrbTarget("/contact/brands?x=1")).toBe("brands");
    });

    it("returns null for non-orb destinations", () => {
      expect(resolveOrbTarget("/wiki")).toBeNull();
      expect(resolveOrbTarget("/wiki/guide")).toBeNull();
      expect(resolveOrbTarget("/studio")).toBeNull();
      expect(resolveOrbTarget("/services")).toBeNull();
      expect(resolveOrbTarget("/legal/privacy")).toBeNull();
      expect(resolveOrbTarget("/equipe/sasha")).toBeNull();
      expect(resolveOrbTarget("/contact")).toBeNull();
    });

    it("never intercepts external or non-page links", () => {
      expect(resolveOrbTarget("https://wafia.fr")).toBeNull();
      expect(resolveOrbTarget("mailto:contact@wafia.fr")).toBeNull();
      expect(resolveOrbTarget("#case-studies")).toBeNull();
    });
  });

  describe("isModifiedClick", () => {
    it("detects modifier keys and non-primary buttons", () => {
      expect(isModifiedClick({ metaKey: true })).toBe(true);
      expect(isModifiedClick({ ctrlKey: true })).toBe(true);
      expect(isModifiedClick({ shiftKey: true })).toBe(true);
      expect(isModifiedClick({ altKey: true })).toBe(true);
      expect(isModifiedClick({ button: 1 })).toBe(true);
      expect(isModifiedClick({ button: 2 })).toBe(true);
    });

    it("lets plain primary clicks through", () => {
      expect(isModifiedClick({})).toBe(false);
      expect(isModifiedClick({ button: 0 })).toBe(false);
    });
  });
});
