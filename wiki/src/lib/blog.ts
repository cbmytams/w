import matter from "gray-matter";

export interface Chapter {
  title: string;
  content: string;
}

export interface Article {
  title: string;
  slug: string;
  platform: string;
  theme: string;
  category: string;
  time: string;
  publishedAt: string;
  chapters: Chapter[];
}

const mdxFiles = import.meta.glob("/src/content/blog/**/*.{md,mdx}", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function parseMarkdownToChapters(content: string): Chapter[] {
  const chapters: Chapter[] = [];
  const parts = content.split(/(?=^## )/m);

  parts.forEach((part, index) => {
    if (!part.trim()) return;

    if (index === 0 && !part.startsWith("## ")) {
      chapters.push({
        title: "Introduction",
        content: part.trim(),
      });
    } else {
      const lines = part.split("\n");
      const titleLine = lines[0].replace(/^##\s+/, "").trim();
      const body = lines.slice(1).join("\n").trim();
      chapters.push({
        title: titleLine,
        content: body,
      });
    }
  });

  return chapters;
}

export function getAllArticles(): Article[] {
  const articles: Article[] = [];
  for (const path in mdxFiles) {
    try {
      const rawContent = mdxFiles[path] as string;
      if (typeof rawContent !== "string") {
        continue;
      }
      const { data, content } = matter(rawContent);
      let title = data.title;
      const titleMatch = content.match(/^#\s+(.*)/m);
      if (!title && titleMatch) title = titleMatch[1].trim();

      let category = data.category || "Article";
      const catMatch = content.match(/\*\*Cat[ée]gorie\s*:\*\*\s*(.*)/);
      if (catMatch && !data.category) category = catMatch[1].trim();

      const filename =
        path
          .split("/")
          .pop()
          ?.replace(/\.mdx?$/, "") || "";
      let theme = data.theme;
      let platform = data.platform;

      if (filename.includes("plateforme-")) {
        if (!platform) {
          platform = filename.split("plateforme-")[1];
          if (platform === "x-twitter") platform = "x";
        }
        category =
          category === "Article"
            ? `Plateforme — ${platform.charAt(0).toUpperCase() + platform.slice(1)}`
            : category;
      } else if (filename.includes("article-")) {
        const tMatch = filename.match(/article-\d+-(.*)/);
        if (tMatch && !theme) {
          theme = tMatch[1];
        }
        category = category === "Article" ? `Thème — ${theme}` : category;
      }

      let slug = data.slug;
      const slugMatch = content.match(/\*\*Slug\s*:\*\*\s*(.*)/);
      if (!slug && slugMatch) slug = slugMatch[1].trim();
      if (!slug) slug = filename;

      let cleanContent = content;
      cleanContent = cleanContent.replace(/^#\s+.*$/m, "");
      cleanContent = cleanContent.replace(/^\*\*Slug\s*:.*$/m, "");
      cleanContent = cleanContent.replace(/^\*\*Meta description\s*:.*$/m, "");
      cleanContent = cleanContent.replace(/^\*\*Cat[ée]gorie\s*:.*$/m, "");
      cleanContent = cleanContent.replace(/^---$/gm, "");
      cleanContent = cleanContent.replace(/^\s*[\r\n]/gm, "").trim();

      const chapters = data.chapters || parseMarkdownToChapters(cleanContent);
      const wordCount = content.split(/\s+/).filter((w) => w.length > 0).length;
      const readTime = Math.max(1, Math.ceil(wordCount / 225)) + " min";

      articles.push({
        ...data,
        title,
        category,
        theme,
        platform,
        time: readTime,
        chapters,
        slug,
      } as Article);
    } catch (error) {
      void error;
    }
  }
  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt || 0).getTime() -
      new Date(a.publishedAt || 0).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find((a) => a.slug === slug) || null;
}
