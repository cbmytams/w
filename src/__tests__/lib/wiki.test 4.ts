import { __wikiInternals, clearWikiCacheForTests, getAllWikiArticles, type WikiArticle } from "../../lib/wiki";

describe("wiki content layer", () => {
  beforeEach(() => {
    clearWikiCacheForTests();
  });

  it("rejects frontmatter when title is missing", async () => {
    const raw = `---
slug: "article-test"
category: "Categorie test"
publishedAt: "2025-01-01"
theme: "monetisation"
---

## Intro
Contenu de test.
`;

    const parsed = await __wikiInternals.parseRawWikiDocument("/tmp/wiki-test.md", raw);

    expect(parsed.article).toBeNull();
    expect(parsed.errors.some((error) => error.includes("title manquant"))).toBe(true);
  });

  it("rejects frontmatter when publishedAt is invalid", async () => {
    const raw = `---
title: "Article test"
slug: "article-test"
category: "Categorie test"
publishedAt: "not-a-date"
theme: "monetisation"
---

## Intro
Contenu de test.
`;

    const parsed = await __wikiInternals.parseRawWikiDocument("/tmp/wiki-test.md", raw);

    expect(parsed.article).toBeNull();
    expect(parsed.errors.some((error) => error.includes("publishedAt invalide"))).toBe(true);
  });

  it("collects duplicate slug errors", () => {
    const articles: WikiArticle[] = [
      {
        slug: "slug-dup",
        title: "Titre 1",
        description: "Description 1",
        authorSlug: "sasha-guettat",
        category: "Categorie",
        publishedAt: new Date("2025-01-01").toISOString(),
        updatedAt: new Date("2025-01-01").toISOString(),
        lastReviewedAt: new Date("2025-01-01").toISOString(),
        sources: [],
        readTime: "3 min",
        chapters: [],
        contentHtml: "<p>Article 1</p>",
        sourcePath: "/tmp/a.md",
      },
      {
        slug: "slug-dup",
        title: "Titre 2",
        description: "Description 2",
        authorSlug: "yaelle",
        category: "Categorie",
        publishedAt: new Date("2025-01-02").toISOString(),
        updatedAt: new Date("2025-01-02").toISOString(),
        lastReviewedAt: new Date("2025-01-02").toISOString(),
        sources: [],
        readTime: "4 min",
        chapters: [],
        contentHtml: "<p>Article 2</p>",
        sourcePath: "/tmp/b.md",
      },
    ];

    const duplicateErrors = __wikiInternals.ensureNoDuplicateSlugs(articles);
    expect(duplicateErrors).toHaveLength(1);
    expect(duplicateErrors[0]).toContain("slug dupliqué");
  });

  it("does not require updatedAt/lastReviewedAt when publishedAt is missing", async () => {
    const raw = `---
title: "Article test"
slug: "article-test"
category: "Categorie test"
theme: "monetisation"
---

## Intro
Contenu de test.
`;

    const parsed = await __wikiInternals.parseRawWikiDocument("/tmp/wiki-test.md", raw);
    expect(parsed.article).toBeNull();
    expect(parsed.errors.some((error) => error.includes("publishedAt manquant"))).toBe(true);
    expect(parsed.errors.some((error) => error.includes("updatedAt manquant"))).toBe(false);
    expect(parsed.errors.some((error) => error.includes("lastReviewedAt manquant"))).toBe(false);
  });

  it("sorts parsed articles by publishedAt descending", async () => {
    const articles = await getAllWikiArticles();
    expect(articles.length).toBeGreaterThan(1);

    for (let index = 1; index < articles.length; index += 1) {
      const previous = new Date(articles[index - 1].publishedAt).getTime();
      const current = new Date(articles[index].publishedAt).getTime();
      expect(previous).toBeGreaterThanOrEqual(current);
    }
  });
});
