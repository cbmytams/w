import type { MetadataRoute } from "next";
import { siteConfig, sitemapRoutes } from "@/lib/site";
import { getAllArticles } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const articles = getAllArticles();

  return [
    ...sitemapRoutes.map((route) => ({
      url: new URL(route, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: (route === "/" ? "weekly" : route === "/blog" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: route === "/" ? 1 : route === "/blog" ? 0.8 : 0.7,
    })),
    ...articles.map((article) => ({
      url: new URL(`/blog/${article.slug}`, siteConfig.url).toString(),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
