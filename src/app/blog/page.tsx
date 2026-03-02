import BlogHome from "@/components/blog/BlogHome";
import { getAllArticles } from "@/lib/blog";
import type { BlogArticleClient } from "@/types/blog";

export const dynamic = "force-static";

export default function BlogPage() {
  const articles = getAllArticles();

  const serializedArticles: BlogArticleClient[] = articles.map((article) => ({
    title: article.title,
    slug: article.slug,
    platform: article.platform,
    theme: article.theme,
    category: article.category,
    time: article.time,
    publishedAt: article.publishedAt,
    chapters: article.chapters,
  }));

  return <BlogHome articles={serializedArticles} />;
}
