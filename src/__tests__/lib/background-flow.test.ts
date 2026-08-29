import {
  getBackgroundRuntimeProfile,
  getGlobalBackgroundConfig,
  shouldAnimateAmbientPhase,
  shouldAnimateShowcaseAccent,
} from "@/lib/background-flow";

describe("background flow", () => {
  describe("getGlobalBackgroundConfig", () => {
    it("returns showcase settings for the orb home", () => {
      expect(getGlobalBackgroundConfig("/", null)).toEqual({
        variant: "home",
        intensity: "showcase",
      });
    });

    it("returns showcase settings for for-brands", () => {
      expect(getGlobalBackgroundConfig("/for-brands", null)).toEqual({
        variant: "brands",
        intensity: "showcase",
      });
    });

    it("returns showcase settings for for-talents", () => {
      expect(getGlobalBackgroundConfig("/for-talents", null)).toEqual({
        variant: "talents",
        intensity: "showcase",
      });
    });

    it("maps legal context brands", () => {
      expect(getGlobalBackgroundConfig("/legal/privacy", "brands")).toEqual({
        variant: "brands",
        intensity: "base",
      });
    });

    it("defaults to talents for legal pages without brands context", () => {
      expect(getGlobalBackgroundConfig("/legal/privacy", null)).toEqual({
        variant: "talents",
        intensity: "base",
      });
    });

    it("defaults to brands for all other pages", () => {
      expect(getGlobalBackgroundConfig("/services", null)).toEqual({
        variant: "brands",
        intensity: "base",
      });
    });
  });

  describe("shouldAnimateAmbientPhase", () => {
    it("keeps default behavior for brands base variant", () => {
      expect(
        shouldAnimateAmbientPhase({
          variant: "brands",
          intensity: "base",
          prefersReducedMotion: false,
          isConstrainedRuntime: false,
        })
      ).toBe(false);
    });

    it("allows subtle ambient animation for talents base variant", () => {
      expect(
        shouldAnimateAmbientPhase({
          variant: "talents",
          intensity: "base",
          prefersReducedMotion: false,
          isConstrainedRuntime: false,
        })
      ).toBe(true);
    });

    it("enables ambient animation for brands showcase variant", () => {
      expect(
        shouldAnimateAmbientPhase({
          variant: "brands",
          intensity: "showcase",
          prefersReducedMotion: false,
          isConstrainedRuntime: false,
        })
      ).toBe(true);
    });

    it("disables ambient animation when reduced motion is enabled", () => {
      expect(
        shouldAnimateAmbientPhase({
          variant: "talents",
          intensity: "showcase",
          prefersReducedMotion: true,
          isConstrainedRuntime: false,
        })
      ).toBe(false);
    });

    it("disables ambient animation on constrained runtimes", () => {
      expect(
        shouldAnimateAmbientPhase({
          variant: "talents",
          intensity: "showcase",
          prefersReducedMotion: false,
          isConstrainedRuntime: true,
        })
      ).toBe(false);
    });
  });

  describe("getBackgroundRuntimeProfile", () => {
    it("keeps mobile in light mode by default", () => {
      expect(
        getBackgroundRuntimeProfile({
          isMobile: true,
          saveData: false,
          lowMemory: false,
          prefersReducedMotion: false,
        })
      ).toEqual({
        isConstrainedRuntime: false,
        mobileLite: true,
        allowBubbleMotion: true,
        bubbleCount: 6,
      });
    });

    it("marks save-data devices as constrained", () => {
      expect(
        getBackgroundRuntimeProfile({
          isMobile: false,
          saveData: true,
          lowMemory: false,
          prefersReducedMotion: false,
        })
      ).toEqual({
        isConstrainedRuntime: true,
        mobileLite: true,
        allowBubbleMotion: false,
        bubbleCount: 3,
      });
    });

    it("disables bubble motion when reduced motion is requested", () => {
      expect(
        getBackgroundRuntimeProfile({
          isMobile: false,
          saveData: false,
          lowMemory: false,
          prefersReducedMotion: true,
        })
      ).toEqual({
        isConstrainedRuntime: false,
        mobileLite: false,
        allowBubbleMotion: false,
        bubbleCount: 6,
      });
    });
  });

  describe("shouldAnimateShowcaseAccent", () => {
    it("stays enabled in non-constrained showcase mode", () => {
      expect(
        shouldAnimateShowcaseAccent({
          intensity: "showcase",
          prefersReducedMotion: false,
          isConstrainedRuntime: false,
        })
      ).toBe(true);
    });

    it("stays disabled for constrained runtimes", () => {
      expect(
        shouldAnimateShowcaseAccent({
          intensity: "showcase",
          prefersReducedMotion: false,
          isConstrainedRuntime: true,
        })
      ).toBe(false);
    });
  });
});
