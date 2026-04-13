import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ArticleSource, ArticleSourceType } from "@/types/content";
import {
  WIKI_PLATFORM_LABELS,
  WIKI_PLATFORM_ORDER,
  WIKI_THEME_LABELS,
  WIKI_THEME_ORDER,
} from "./wiki-taxonomy";

export interface WikiChapter {
  title: string;
  content: string;
  contentHtml: string;
}

export interface WikiArticle {
  slug: string;
  title: string;
  description: string;
  authorSlug: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  lastReviewedAt: string;
  theme?: string;
  platform?: string;
  sources: ArticleSource[];
  readTime: string;
  chapters: WikiChapter[];
  contentHtml: string;
  sourcePath: string;
}

export interface WikiArticleSummary {
  slug: string;
  title: string;
  description: string;
  authorSlug: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  lastReviewedAt: string;
  theme?: string;
  platform?: string;
}

const CONTENT_DIR = path.join(process.cwd(), "wiki", "src", "content", "blog");
const DEFAULT_DESCRIPTION =
  "Guides, analyses et stratégies sur l'influence, les plateformes et la monétisation des créateurs.";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_SOURCE_TYPES = new Set<ArticleSourceType>([
  "platform-doc",
  "first-party-data",
  "third-party-report",
  "field-observation",
]);
const VALID_AUTHOR_SLUGS = new Set(["sasha-guettat", "yaelle"]);

interface ParseResult {
  article: WikiArticle | null;
  errors: string[];
}

let cache: WikiArticle[] | null = null;

function toSafeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeDescription(value: string): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (!clean) return DEFAULT_DESCRIPTION;
  if (clean.length <= 165) return clean;
  return `${clean.slice(0, 162).trimEnd()}...`;
}

function stripMarkdown(input: string): string {
  return input
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/`{1,3}[^`]+`{1,3}/g, " ")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/_{1,2}(.*?)_{1,2}/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMetaDescription(markdownBody: string): string {
  const match = markdownBody.match(/^\*\*Meta description\s*:\*\*\s*(.+)$/im);
  return match ? match[1].trim() : "";
}

function cleanMarkdown(markdown: string): string {
  return markdown
    .replace(/^#\s+.*$/m, "")
    .replace(/^\*\*Slug\s*:.*$/gim, "")
    .replace(/^\*\*Meta description\s*:.*$/gim, "")
    .replace(/^\*\*Cat[ée]gorie\s*:.*$/gim, "")
    .replace(/^---$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractFirstParagraph(markdownBody: string): string {
  const cleaned = cleanMarkdown(markdownBody);
  const paragraphs = cleaned
    .split(/\n\s*\n/g)
    .map((part) => part.trim())
    .filter((part) => part && !part.startsWith("## "));
  return paragraphs[0] || "";
}

function computeReadTime(markdownBody: string): string {
  const wordCount = stripMarkdown(markdownBody)
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.ceil(wordCount / 225))} min`;
}

function toIsoDate(value: string): string | null {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString();
}

function normalizeWikiAuthorSlug(theme: string, rawAuthorSlug: string): string {
  const authorSlug = rawAuthorSlug.trim();
  if (authorSlug) return authorSlug;

  const yaelleThemes = new Set([
    "croissance",
    "branding",
    "production",
    "audience",
  ]);
  return yaelleThemes.has(theme) ? "yaelle" : "sasha-guettat";
}

function toSources(value: unknown, sourcePath: string): ArticleSource[] {
  if (value == null) return [];
  if (!Array.isArray(value)) {
    throw new Error(
      `Invalid wiki frontmatter in ${sourcePath}: sources must be an array.`
    );
  }

  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(
        `Invalid wiki frontmatter in ${sourcePath}: sources[${index}] must be an object.`
      );
    }

    const candidate = item as Record<string, unknown>;
    const label = toSafeString(candidate.label);
    const url = toSafeString(candidate.url);
    const sourceType = toSafeString(candidate.sourceType) as ArticleSourceType;
    const accessedAtRaw = toSafeString(candidate.accessedAt);
    const accessedAt = toIsoDate(accessedAtRaw);

    if (!label || !url || !sourceType || !accessedAt) {
      throw new Error(
        `Invalid wiki frontmatter in ${sourcePath}: sources[${index}] requires label, url, sourceType and accessedAt.`
      );
    }

    if (!VALID_SOURCE_TYPES.has(sourceType)) {
      throw new Error(
        `Invalid wiki frontmatter in ${sourcePath}: sources[${index}].sourceType "${sourceType}" is invalid.`
      );
    }

    try {
      new URL(url);
    } catch {
      throw new Error(
        `Invalid wiki frontmatter in ${sourcePath}: sources[${index}].url must be absolute.`
      );
    }

    return {
      label,
      url,
      sourceType,
      accessedAt,
    };
  });
}

async function markdownToHtml(markdown: string): Promise<string> {
  const [
    { unified },
    { default: remarkParse },
    { default: remarkGfm },
    { default: remarkRehype },
    { default: rehypeRaw },
    { default: rehypeStringify },
  ] = await Promise.all([
    import("unified"),
    import("remark-parse"),
    import("remark-gfm"),
    import("remark-rehype"),
    import("rehype-raw"),
    import("rehype-stringify"),
  ]);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);

  return String(result);
}

async function splitIntoChapters(markdown: string): Promise<WikiChapter[]> {
  const sections = cleanMarkdown(markdown)
    .split(/^(?=## )/m)
    .filter((section) => section.trim());
  const chapters: WikiChapter[] = [];

  for (const section of sections) {
    const lines = section.split("\n");
    const titleMatch = lines[0].match(/^##\s+(.+)/);

    if (titleMatch) {
      const content = lines.slice(1).join("\n").trim();
      const contentHtml = await markdownToHtml(content);
      chapters.push({
        title: titleMatch[1].trim(),
        content,
        contentHtml,
      });
      continue;
    }

    if (chapters.length === 0) {
      const content = section.trim();
      if (content) {
        const contentHtml = await markdownToHtml(content);
        chapters.push({
          title: "Introduction",
          content,
          contentHtml,
        });
      }
      continue;
    }

    const mergedContent =
      `${chapters[chapters.length - 1].content}\n\n${section.trim()}`.trim();
    chapters[chapters.length - 1].content = mergedContent;
    chapters[chapters.length - 1].contentHtml =
      await markdownToHtml(mergedContent);
  }

  return chapters;
}

function validateFrontmatter(
  frontmatter: Record<string, unknown>,
  sourcePath: string
): {
  errors: string[];
  normalized: Omit<WikiArticle, "chapters" | "contentHtml" | "readTime">;
} {
  const errors: string[] = [];

  const title = toSafeString(frontmatter.title);
  const slug = toSafeString(frontmatter.slug);
  const description = toSafeString(frontmatter.description);
  const authorSlugRaw = toSafeString(frontmatter.authorSlug);
  const category = toSafeString(frontmatter.category);
  const publishedAtRaw = toSafeString(frontmatter.publishedAt);
  const updatedAtRaw = toSafeString(frontmatter.updatedAt) || publishedAtRaw;
  const lastReviewedAtRaw =
    toSafeString(frontmatter.lastReviewedAt) || updatedAtRaw;
  const theme = toSafeString(frontmatter.theme);
  const platform = toSafeString(frontmatter.platform);
  let sources: ArticleSource[] = [];
  try {
    sources = toSources(frontmatter.sources, sourcePath);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  if (!title) errors.push(`title manquant (${sourcePath})`);
  if (!slug) errors.push(`slug manquant (${sourcePath})`);
  if (slug && !SLUG_PATTERN.test(slug)) {
    errors.push(`slug invalide "${slug}" (${sourcePath})`);
  }
  if (!category) errors.push(`category manquante (${sourcePath})`);
  if (!publishedAtRaw) errors.push(`publishedAt manquant (${sourcePath})`);
  if (!updatedAtRaw) errors.push(`updatedAt manquant (${sourcePath})`);
  if (!lastReviewedAtRaw)
    errors.push(`lastReviewedAt manquant (${sourcePath})`);
  if (!theme && !platform)
    errors.push(`theme ou platform requis (${sourcePath})`);

  const publishedAt = toIsoDate(publishedAtRaw);
  const updatedAt = toIsoDate(updatedAtRaw);
  const lastReviewedAt = toIsoDate(lastReviewedAtRaw);
  if (publishedAtRaw && !publishedAt) {
    errors.push(`publishedAt invalide "${publishedAtRaw}" (${sourcePath})`);
  }
  if (updatedAtRaw && !updatedAt) {
    errors.push(`updatedAt invalide "${updatedAtRaw}" (${sourcePath})`);
  }
  if (lastReviewedAtRaw && !lastReviewedAt) {
    errors.push(
      `lastReviewedAt invalide "${lastReviewedAtRaw}" (${sourcePath})`
    );
  }

  const authorSlug = normalizeWikiAuthorSlug(theme, authorSlugRaw);
  if (!authorSlug) {
    errors.push(`authorSlug manquant (${sourcePath})`);
  } else if (!VALID_AUTHOR_SLUGS.has(authorSlug)) {
    errors.push(`authorSlug invalide "${authorSlug}" (${sourcePath})`);
  }

  return {
    errors,
    normalized: {
      slug,
      title,
      description,
      authorSlug,
      category,
      publishedAt: publishedAt ?? "",
      updatedAt: updatedAt ?? "",
      lastReviewedAt: lastReviewedAt ?? "",
      theme: theme || undefined,
      platform: platform || undefined,
      sources,
      sourcePath,
    },
  };
}

async function parseRawWikiDocument(
  sourcePath: string,
  raw: string
): Promise<ParseResult> {
  const { data, content } = matter(raw);
  const { errors, normalized } = validateFrontmatter(data, sourcePath);

  if (errors.length > 0) {
    return { article: null, errors };
  }

  const metaDescription = extractMetaDescription(content);
  const firstParagraph = extractFirstParagraph(content);
  const description = normalizeDescription(
    normalized.description || metaDescription || stripMarkdown(firstParagraph)
  );
  const chapters = await splitIntoChapters(content);

  if (chapters.length === 0) {
    return {
      article: null,
      errors: [`aucun chapitre analysable (${sourcePath})`],
    };
  }

  const cleanedContent = cleanMarkdown(content);
  const contentHtml = await markdownToHtml(cleanedContent);
  const readTime = computeReadTime(content);

  return {
    article: {
      ...normalized,
      description,
      readTime,
      chapters,
      contentHtml,
    },
    errors: [],
  };
}

function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b, "fr"));
}

function ensureNoDuplicateSlugs(articles: WikiArticle[]) {
  const seen = new Map<string, string>();
  const duplicates: string[] = [];

  for (const article of articles) {
    const previous = seen.get(article.slug);
    if (previous) {
      duplicates.push(
        `slug dupliqué "${article.slug}" (${previous}) et (${article.sourcePath})`
      );
      continue;
    }
    seen.set(article.slug, article.sourcePath);
  }

  if (duplicates.length > 0) {
    throw new Error(
      `Invalid wiki content:\n${duplicates.map((d) => `- ${d}`).join("\n")}`
    );
  }
}

function sortIdsByKnownOrder(ids: string[], knownOrder: string[]): string[] {
  const index = new Map(knownOrder.map((id, position) => [id, position]));
  return [...ids].sort((a, b) => {
    const aIndex = index.get(a);
    const bIndex = index.get(b);
    if (aIndex !== undefined && bIndex !== undefined) return aIndex - bIndex;
    if (aIndex !== undefined) return -1;
    if (bIndex !== undefined) return 1;
    return a.localeCompare(b, "fr");
  });
}

async function loadAllWikiArticles(): Promise<WikiArticle[]> {
  const files = listMarkdownFiles(CONTENT_DIR);
  const parseErrors: string[] = [];
  const parsedArticles: WikiArticle[] = [];

  for (const fileName of files) {
    const absolutePath = path.join(CONTENT_DIR, fileName);
    const raw = fs.readFileSync(absolutePath, "utf8");
    const parsed = await parseRawWikiDocument(absolutePath, raw);
    if (parsed.errors.length > 0) {
      parseErrors.push(...parsed.errors);
      continue;
    }
    if (parsed.article) parsedArticles.push(parsed.article);
  }

  ensureNoDuplicateSlugs(parsedArticles);

  if (parseErrors.length > 0) {
    throw new Error(
      `Invalid wiki content:\n${parseErrors.map((d) => `- ${d}`).join("\n")}`
    );
  }

  return parsedArticles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getAllWikiArticles(): Promise<WikiArticle[]> {
  if (!cache) {
    cache = await loadAllWikiArticles();
  }
  return cache;
}

export async function getWikiArticleBySlug(
  slug: string
): Promise<WikiArticle | null> {
  const articles = await getAllWikiArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getAllWikiSlugs(): Promise<string[]> {
  const articles = await getAllWikiArticles();
  return articles.map((article) => article.slug);
}

export async function getWikiThemes(): Promise<string[]> {
  const articles = await getAllWikiArticles();
  const themeSet = new Set<string>(WIKI_THEME_ORDER);

  for (const article of articles) {
    if (article.theme) themeSet.add(article.theme);
  }

  return sortIdsByKnownOrder([...themeSet], WIKI_THEME_ORDER);
}

export async function getWikiPlatforms(): Promise<string[]> {
  const articles = await getAllWikiArticles();
  const platformSet = new Set<string>(WIKI_PLATFORM_ORDER);

  for (const article of articles) {
    if (article.platform) platformSet.add(article.platform);
  }

  return sortIdsByKnownOrder([...platformSet], WIKI_PLATFORM_ORDER);
}

export async function getWikiArticleSummaries(): Promise<WikiArticleSummary[]> {
  const articles = await getAllWikiArticles();
  return articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    authorSlug: article.authorSlug,
    category: article.category,
    readTime: article.readTime,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    lastReviewedAt: article.lastReviewedAt,
    theme: article.theme,
    platform: article.platform,
  }));
}

export function clearWikiCacheForTests() {
  cache = null;
}

export const __wikiInternals = {
  stripMarkdown,
  extractMetaDescription,
  extractFirstParagraph,
  cleanMarkdown,
  parseRawWikiDocument,
  ensureNoDuplicateSlugs,
};

export { WIKI_THEME_LABELS, WIKI_PLATFORM_LABELS };
