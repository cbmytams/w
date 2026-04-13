import {
  __wikiInternals,
  clearWikiCacheForTests,
  getAllWikiArticles,
  type WikiArticle,
} from "../../lib/wiki";

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

    const parsed = await __wikiInternals.parseRawWikiDocument(
      "/tmp/wiki-test.md",
      raw
    );

    expect(parsed.article).toBeNull();
    expect(
      parsed.errors.some((error) => error.includes("title manquant"))
    ).toBe(true);
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

    const parsed = await __wikiInternals.parseRawWikiDocument(
      "/tmp/wiki-test.md",
      raw
    );

    expect(parsed.article).toBeNull();
    expect(
      parsed.errors.some((error) => error.includes("publishedAt invalide"))
    ).toBe(true);
  });

  it("throws when duplicate slugs are detected", () => {
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

    expect(() => __wikiInternals.ensureNoDuplicateSlugs(articles)).toThrow(
      "slug dupliqué"
    );
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
