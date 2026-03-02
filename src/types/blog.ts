export interface BlogArticleChapter {
  title: string;
  content: string;
}

export interface BlogArticle {
  title: string;
  slug: string;
  platform: string;
  theme: string;
  category: string;
  time: string;
  publishedAt: string;
  chapters: BlogArticleChapter[];
  body: string;
  sourcePath: string;
}

export type BlogArticlePreview = Pick<
  BlogArticle,
  "title" | "slug" | "platform" | "theme" | "category" | "time" | "publishedAt"
>;

export type BlogArticleReaderData = Pick<
  BlogArticle,
  "title" | "slug" | "category" | "time" | "publishedAt" | "chapters"
>;

export type BlogArticleClient = Pick<
  BlogArticle,
  "title" | "slug" | "platform" | "theme" | "category" | "time" | "publishedAt" | "chapters"
>;
