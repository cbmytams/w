/**
 * Wiki article library — server-side only.
 *
 * Reads Markdown files from `content/wiki/`, parses frontmatter via
 * gray-matter, and converts Markdown → HTML with remark/rehype at build time.
 * Every function here runs during `next build` (SSG) and never ships to the
 * client bundle.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WikiChapter {
    title: string;
    /** Raw markdown content */
    content: string;
    /** Pre-rendered HTML for SSR/SEO */
    contentHtml: string;
}

/** FAQ item auto-extracted from H3 headings ending with "?" */
export interface WikiFaqItem {
    q: string;
    a: string;
}

export interface WikiArticle {
    /** URL-safe identifier (from frontmatter `slug`) */
    slug: string;
    /** Human-readable title */
    title: string;
    /** Short description for meta tags */
    description: string;
    /** Category label, e.g. "Plateforme — Instagram" */
    category: string;
    /** ISO date string, e.g. "2025-06-01" */
    publishedAt: string;
    /** Optional theme id, e.g. "algorithmes" */
    theme?: string;
    /** Optional platform id, e.g. "instagram" */
    platform?: string;
    /** SEO keywords */
    keywords: string[];
    /** Slugs of related articles for internal linking */
    relatedSlugs: string[];
    /** Estimated reading time, e.g. "8 min" */
    readTime: string;
    /** Author name for E-E-A-T (from frontmatter, defaults to "Équipe Wafia") */
    author: string;
    /** Pre-rendered HTML of the full article body */
    contentHtml: string;
    /** Chapters with both raw markdown AND pre-rendered HTML */
    chapters: WikiChapter[];
    /** Auto-extracted FAQ items from H3 headings ending with "?" */
    faqItems: WikiFaqItem[];
}

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const CONTENT_DIR = path.join(process.cwd(), "content", "wiki");

// ---------------------------------------------------------------------------
// Markdown → HTML pipeline
// ---------------------------------------------------------------------------

async function markdownToHtml(markdown: string): Promise<string> {
    const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify)
        .process(markdown);

    return String(result);
}

/**
 * Strip duplicated title / slug / meta description lines written
 * inside the body of the Markdown (they're already in frontmatter).
 */
function cleanMarkdown(markdown: string): string {
    let cleaned = markdown;
    cleaned = cleaned.replace(/^#\s+.*$/m, ""); // remove leading # title
    cleaned = cleaned.replace(/^\*\*Slug\s*:.*$/m, "");
    cleaned = cleaned.replace(/^\*\*Meta description\s*:.*$/m, "");
    cleaned = cleaned.replace(/^\*\*Cat[ée]gorie\s*:.*$/m, "");
    return cleaned;
}

// ---------------------------------------------------------------------------
// Chapter splitting (matches original wiki/src/lib/blog.ts)
// ---------------------------------------------------------------------------

async function splitIntoChapters(markdown: string): Promise<WikiChapter[]> {
    const cleaned = cleanMarkdown(markdown);

    const sections = cleaned.split(/^(?=## )/m).filter((s) => s.trim());
    const chapters: WikiChapter[] = [];

    for (const section of sections) {
        const lines = section.split("\n");
        const titleLine = lines[0];
        const titleMatch = titleLine.match(/^##\s+(.+)/);
        if (titleMatch) {
            chapters.push({
                title: titleMatch[1].trim(),
                content: lines.slice(1).join("\n").trim(),
                contentHtml: "", // filled below
            });
        } else if (chapters.length === 0) {
            // Content before first heading — add as intro chapter
            const trimmed = section.trim();
            if (trimmed) {
                chapters.push({ title: "Introduction", content: trimmed, contentHtml: "" });
            }
        } else {
            // Append to last chapter
            chapters[chapters.length - 1].content += "\n\n" + section.trim();
        }
    }

    // Strip trailing --- (horizontal rules) from each chapter
    // and generate per-chapter HTML
    const result: WikiChapter[] = [];
    for (const ch of chapters) {
        const cleanedContent = ch.content.replace(/\n---\s*$/g, "").trim();
        const html = await markdownToHtml(cleanedContent);
        result.push({
            title: ch.title,
            content: cleanedContent,
            contentHtml: html,
        });
    }

    return result;
}

// ---------------------------------------------------------------------------
// FAQ extraction — finds H3 headings ending with "?" and uses the
// following paragraph(s) as the answer. Powers FAQPage JSON-LD.
// ---------------------------------------------------------------------------

function extractFaqItems(chapters: WikiChapter[]): WikiFaqItem[] {
    const items: WikiFaqItem[] = [];

    for (const ch of chapters) {
        // Split chapter content by H3 headings
        const h3Sections = ch.content.split(/^(?=### )/m);

        for (const section of h3Sections) {
            const match = section.match(/^###\s+(.+\?)\s*\n([\s\S]*?)(?=\n###|\s*$)/);
            if (match) {
                const question = match[1].trim();
                // Take the answer text: strip markdown formatting for the JSON-LD
                const answerRaw = match[2].trim();
                // Convert to plain text: strip bold, links, etc.
                const answer = answerRaw
                    .replace(/\*\*(.+?)\*\*/g, "$1")
                    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
                    .replace(/^[-*]\s+/gm, "• ")
                    .trim();

                if (question && answer) {
                    items.push({ q: question, a: answer });
                }
            }
        }
    }

    return items;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

let _cache: WikiArticle[] | null = null;

/**
 * Return every wiki article, parsed and HTML-rendered.
 * Results are cached in-process (safe for build-time SSG).
 */
export async function getAllWikiArticles(): Promise<WikiArticle[]> {
    if (_cache) return _cache;

    const files = fs
        .readdirSync(CONTENT_DIR)
        .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

    const articles: WikiArticle[] = [];

    for (const file of files) {
        const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
        const { data, content } = matter(raw);

        const wordCount = content.split(/\s+/).filter((w) => w.length > 0).length;
        const readTime = `${Math.max(1, Math.ceil(wordCount / 225))} min`;

        const contentHtml = await markdownToHtml(cleanMarkdown(content));
        const chapters = await splitIntoChapters(content);
        const faqItems = extractFaqItems(chapters);

        articles.push({
            slug: data.slug ?? file.replace(/\.mdx?$/, ""),
            title: data.title ?? "Sans titre",
            description: data.description ?? "",
            category: data.category ?? "Article",
            publishedAt: data.publishedAt ?? "2025-01-01",
            theme: data.theme,
            platform: data.platform,
            keywords: data.keywords ?? [],
            relatedSlugs: data.relatedSlugs ?? [],
            readTime,
            author: data.author ?? "Équipe Wafia",
            contentHtml,
            chapters,
            faqItems,
        });
    }

    // Sort by publication date descending
    articles.sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    _cache = articles;
    return articles;
}

/**
 * Return a single article by slug, or `null` if not found.
 */
export async function getWikiArticleBySlug(
    slug: string,
): Promise<WikiArticle | null> {
    const articles = await getAllWikiArticles();
    return articles.find((a) => a.slug === slug) ?? null;
}

/**
 * Return all slugs — used by `generateStaticParams`.
 */
export async function getAllWikiSlugs(): Promise<string[]> {
    const articles = await getAllWikiArticles();
    return articles.map((a) => a.slug);
}
