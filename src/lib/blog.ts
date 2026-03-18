import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogArticle, BlogArticleChapter } from "@/types/blog";
import type { ArticleSource, ArticleSourceType } from "@/types/content";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");
const VALID_AUTHOR_SLUGS = new Set(["sasha-guettat", "yaelle"]);
const VALID_SOURCE_TYPES = new Set<ArticleSourceType>([
  "platform-doc",
  "first-party-data",
  "third-party-report",
  "field-observation",
]);

function toIsoDateOrNull(value: string): string | null {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString();
}

function toSafeString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toChapters(value: unknown): BlogArticleChapter[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const title = toSafeString((item as Record<string, unknown>).title).trim();
      const content = toSafeString((item as Record<string, unknown>).content).trim();

      if (!title || !content) {
        return null;
      }

      return { title, content };
    })
    .filter((chapter): chapter is BlogArticleChapter => chapter !== null);
}

function normalizeDescription(
  description: string,
  chapters: BlogArticleChapter[],
  body: string,
): string {
  const fromFrontmatter = description.replace(/\s+/g, " ").trim();
  if (fromFrontmatter) return fromFrontmatter.length <= 155 ? fromFrontmatter : `${fromFrontmatter.slice(0, 152).trimEnd()}...`;

  const fallback = (chapters[0]?.content || body).replace(/\s+/g, " ").trim();
  if (!fallback) {
    return "Analyse Wafia Knowledge sur l'influence, les plateformes et la monetisation des createurs.";
  }

  return fallback.length <= 155 ? fallback : `${fallback.slice(0, 152).trimEnd()}...`;
}

function normalizeAuthorSlug(theme: string, rawAuthorSlug: string): string {
  const authorSlug = rawAuthorSlug.trim();
  if (authorSlug) return authorSlug;

  const yaelleThemes = new Set(["croissance", "branding", "production", "audience"]);
  return yaelleThemes.has(theme) ? "yaelle" : "sasha-guettat";
}

function toSources(value: unknown, sourcePath: string): ArticleSource[] {
  if (value == null) return [];
  if (!Array.isArray(value)) {
    throw new Error(`Invalid blog frontmatter in ${sourcePath}: sources must be an array.`);
  }

  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Invalid blog frontmatter in ${sourcePath}: sources[${index}] must be an object.`);
    }

    const candidate = item as Record<string, unknown>;
    const label = toSafeString(candidate.label).trim();
    const url = toSafeString(candidate.url).trim();
    const sourceType = toSafeString(candidate.sourceType).trim() as ArticleSourceType;
    const accessedAtRaw = toSafeString(candidate.accessedAt).trim();
    const accessedAt = toIsoDateOrNull(accessedAtRaw);

    if (!label || !url || !sourceType || !accessedAt) {
      throw new Error(
        `Invalid blog frontmatter in ${sourcePath}: sources[${index}] requires label, url, sourceType and accessedAt.`,
      );
    }

    if (!VALID_SOURCE_TYPES.has(sourceType)) {
      throw new Error(
        `Invalid blog frontmatter in ${sourcePath}: sources[${index}].sourceType "${sourceType}" is invalid.`,
      );
    }

    try {
      new URL(url);
    } catch {
      throw new Error(`Invalid blog frontmatter in ${sourcePath}: sources[${index}].url must be absolute.`);
    }

    return {
      label,
      url,
      sourceType,
      accessedAt,
    };
  });
}

function listMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return listMdxFiles(fullPath);
    }
    if (entry.isFile() && fullPath.endsWith(".mdx")) {
      return [fullPath];
    }
    return [];
  });
}

function parseArticle(filePath: string): BlogArticle | null {
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  const fallbackSlug = path.basename(filePath, ".mdx");
  const slug = toSafeString(data.slug, fallbackSlug).trim() || fallbackSlug;
  const title = toSafeString(data.title).trim();
  const platform = toSafeString(data.platform).trim();
  const theme = toSafeString(data.theme).trim();
  const description = toSafeString(data.description).trim();
  const authorSlugRaw = toSafeString(data.authorSlug).trim();
  const category = toSafeString(data.category, platform || theme).trim();
  const time = toSafeString(data.time, "").trim();
  const publishedAt = toSafeString(data.publishedAt).trim();
  const updatedAtRaw = toSafeString(data.updatedAt, publishedAt).trim();
  const lastReviewedAtRaw = toSafeString(data.lastReviewedAt, updatedAtRaw).trim();
  const chapters = toChapters(data.chapters);
  const sources = toSources(data.sources, filePath);
  const bodyTrimmed = content.trim();
  const normalizedDescription = normalizeDescription(description, chapters, bodyTrimmed);
  const authorSlug = normalizeAuthorSlug(theme, authorSlugRaw);
  const publishedAtIso = toIsoDateOrNull(publishedAt);
  const updatedAtIso = toIsoDateOrNull(updatedAtRaw);
  const lastReviewedAtIso = toIsoDateOrNull(lastReviewedAtRaw);

  if (
    !title ||
    !platform ||
    !theme ||
    !category ||
    !publishedAtIso ||
    !updatedAtIso ||
    !lastReviewedAtIso ||
    !authorSlug ||
    !VALID_AUTHOR_SLUGS.has(authorSlug) ||
    chapters.length === 0
  ) {
    return null;
  }

  return {
    title,
    slug,
    description: normalizedDescription,
    authorSlug,
    platform,
    theme,
    category,
    time,
    publishedAt: publishedAtIso,
    updatedAt: updatedAtIso,
    lastReviewedAt: lastReviewedAtIso,
    sources,
    chapters,
    body: bodyTrimmed,
    sourcePath: filePath,
  };
}

export function getAllArticles(): BlogArticle[] {
  return listMdxFiles(BLOG_CONTENT_DIR)
    .map((filePath) => parseArticle(filePath))
    .filter((article): article is BlogArticle => article !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getAllArticleSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}

export function getArticleBySlug(slug: string): BlogArticle | null {
  return getAllArticles().find((article) => article.slug === slug) ?? null;
}

export function getArticleDescription(article: Pick<BlogArticle, "description" | "body" | "chapters">): string {
  if (article.description && article.description.trim()) {
    return article.description.trim();
  }

  const source = article.body || article.chapters[0]?.content || "";
  const normalized = source.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return "Analyse Wafia Knowledge sur l'influence, les plateformes et la monétisation des créateurs.";
  }

  if (normalized.length <= 160) {
    return normalized;
  }

  return `${normalized.slice(0, 157).trimEnd()}...`;
}
