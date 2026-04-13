import type { MetadataRoute } from "next";
import { siteConfig, sitePaths } from "@/lib/site";

const HIGH_PRIORITY_ROUTES = new Set([
  sitePaths.services,
  sitePaths.forBrands,
  sitePaths.forTalents,
]);

const MEDIUM_PRIORITY_ROUTES = new Set([sitePaths.studio, sitePaths.wiki]);

const LEGAL_ROUTES = new Set([
  sitePaths.legalPrivacy,
  sitePaths.legalMentions,
  sitePaths.legalCookies,
]);

function getRoutePriority(route: string): number {
  if (route === sitePaths.home) return 1.0;
  if (HIGH_PRIORITY_ROUTES.has(route)) return 0.9;
  if (MEDIUM_PRIORITY_ROUTES.has(route)) return 0.8;
  if (LEGAL_ROUTES.has(route)) return 0.4;
  return 0.7;
}

function getRouteChangeFrequency(
  route: string
): "weekly" | "monthly" | "yearly" {
  if (route === sitePaths.home) return "weekly";
  if (LEGAL_ROUTES.has(route)) return "yearly";
  return "monthly";
}

const ALL_ROUTES = [
  sitePaths.home,
  sitePaths.services,
  sitePaths.forBrands,
  sitePaths.forTalents,
  sitePaths.studio,
  sitePaths.wiki,
  sitePaths.legalPrivacy,
  sitePaths.legalMentions,
  sitePaths.legalCookies,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ALL_ROUTES.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: getRouteChangeFrequency(route),
    priority: getRoutePriority(route),
  }));
}
