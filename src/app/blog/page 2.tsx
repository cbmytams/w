import BlogHome from "@/components/blog/BlogHome";
import { getAllArticles } from "@/lib/blog";
import { collectionPageSchema } from "@/lib/structured-data";
import { siteConfig, sitePaths } from "@/lib/site";
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionPageSchema({
              name: "Wafia Knowledge",
              description:
                "Blog Wafia Knowledge sur l'influence, les plateformes et la monetisation des createurs.",
              url: new URL(sitePaths.blog, siteConfig.url).toString(),
              items: articles.map((article) => ({
                url: new URL(`/blog/${article.slug}`, siteConfig.url).toString(),
                name: article.title,
              })),
            }),
          ),
        }}
      />
      <BlogHome articles={serializedArticles} />
    </>
  );
}
