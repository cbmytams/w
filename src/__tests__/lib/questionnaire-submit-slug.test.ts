import { buildLeadSlug, normalizeLeadSlugBase } from "../../lib/questionnaireSlug";

describe("questionnaire submit slug generation", () => {
    it("transliterates accents and collapses separators", () => {
    const base = normalizeLeadSlugBase("  Élodie   Créateur  ");
    expect(base).toBe("elodie-createur");
  });

  it("falls back to unknown when normalization yields an empty slug", () => {
    const slug = buildLeadSlug("日本語", "");
    expect(slug.startsWith("unknown-")).toBe(true);
  });

  it("can use email when name is empty", () => {
    const slug = buildLeadSlug("", "hello.world+test@example.com");
    expect(slug.startsWith("hello-world-test-example-com-")).toBe(true);
  });

  it("adds a unique suffix to reduce collisions", () => {
    const slugA = buildLeadSlug("John Doe", "john@example.com");
    const slugB = buildLeadSlug("John Doe", "john@example.com");

    expect(slugA).not.toBe(slugB);
  });
});
