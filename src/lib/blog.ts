import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogArticle, BlogArticleChapter } from "@/types/blog";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

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
  const category = toSafeString(data.category, platform || theme).trim();
  const time = toSafeString(data.time, "").trim();
  const publishedAt = toSafeString(data.publishedAt).trim();
  const chapters = toChapters(data.chapters);

  if (!title || !platform || !theme || !category || !publishedAt || chapters.length === 0) {
    return null;
  }

  return {
    title,
    slug,
    platform,
    theme,
    category,
    time,
    publishedAt,
    chapters,
    body: content.trim(),
    sourcePath: filePath,
  };
}

export function getAllArticles(): BlogArticle[] {
  return listMdxFiles(BLOG_CONTENT_DIR)
    .map((filePath) => parseArticle(filePath))
    .filter((article): article is BlogArticle => article !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
