import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllWikiArticles, getWikiPlatforms, getWikiThemes } from "@/lib/wiki";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, themes, platforms] = await Promise.all([
    getAllWikiArticles(),
    getWikiThemes(),
    getWikiPlatforms(),
  ]);
  const now = new Date();

  return [
    {
      url: new URL("/wiki", siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...themes.map((theme) => ({
      url: new URL(`/wiki/theme/${theme}`, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...platforms.map((platform) => ({
      url: new URL(`/wiki/platform/${platform}`, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: new URL(`/wiki/${article.slug}`, siteConfig.url).toString(),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
