import {
  TRACKING_FEATURES,
  MOCK_CREATORS,
  MOCK_CAMPAIGN_HISTORY,
} from "@/constants/features";
import { TALENT_PROOF_STRIP, TALENT_OS_SYSTEM } from "@/constants";

describe("final site build contracts", () => {
  it("exposes the brand dashboard mock data required by optional sections", () => {
    expect(Array.isArray(TRACKING_FEATURES)).toBe(true);
    expect(TRACKING_FEATURES.length).toBeGreaterThan(0);

    expect(Array.isArray(MOCK_CREATORS)).toBe(true);
    expect(MOCK_CREATORS.length).toBeGreaterThan(0);
    expect(MOCK_CREATORS[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        reach: expect.any(String),
        eng: expect.any(String),
      })
    );

    expect(Array.isArray(MOCK_CAMPAIGN_HISTORY)).toBe(true);
    expect(MOCK_CAMPAIGN_HISTORY.length).toBeGreaterThan(0);
    expect(MOCK_CAMPAIGN_HISTORY[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        score: expect.any(Number),
      })
    );
  });

  it("exposes the talent proof and OS constants required by optional sections", () => {
    expect(TALENT_PROOF_STRIP).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        highlightWord: expect.any(String),
      })
    );
    expect(Array.isArray(TALENT_PROOF_STRIP.badges)).toBe(true);
    expect(Array.isArray(TALENT_PROOF_STRIP.bullets)).toBe(true);

    expect(TALENT_OS_SYSTEM).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        highlightWord: expect.any(String),
      })
    );
    expect(Array.isArray(TALENT_OS_SYSTEM.items)).toBe(true);
    expect(TALENT_OS_SYSTEM.items.length).toBeGreaterThan(0);
  });
});
