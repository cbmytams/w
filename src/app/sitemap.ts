import type { MetadataRoute } from "next";
import { locales, toLanguageTag } from "@/i18n/config";
import { localizedPath } from "@/lib/seo";
import { siteConfig, sitePaths } from "@/lib/site";

const HIGH_PRIORITY_ROUTES = new Set([sitePaths.forTalents]);

const MEDIUM_PRIORITY_ROUTES = new Set([sitePaths.wiki]);

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

// Single-page prod : seul l'accueil (page Marques) + les pages legales.
const ALL_ROUTES = [
  sitePaths.home,
  sitePaths.legalPrivacy,
  sitePaths.legalMentions,
  sitePaths.legalCookies,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (route: string, locale: string) =>
    new URL(localizedPath(route, locale), siteConfig.url).toString();

  return ALL_ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: abs(route, locale),
      lastModified: now,
      changeFrequency: getRouteChangeFrequency(route),
      priority: getRoutePriority(route),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [toLanguageTag(l), abs(route, l)])
        ),
      },
    }))
  );
}
