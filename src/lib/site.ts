const PROD_CANONICAL_ORIGIN = "https://wafia.fr";
const LOCAL_DEV_ORIGIN = "http://localhost:3000";
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function normalizeOrigin(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    return url.origin;
  } catch {
    return null;
  }
}

function isLocalOrigin(origin: string | null): boolean {
  if (!origin) return false;

  try {
    return LOOPBACK_HOSTS.has(new URL(origin).hostname);
  } catch {
    return false;
  }
}

function resolveSiteOrigin(): string {
  const envOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "");

  if (process.env.NODE_ENV === "production") {
    if (!envOrigin) return PROD_CANONICAL_ORIGIN;
    if (envOrigin === LOCAL_DEV_ORIGIN || isLocalOrigin(envOrigin)) {
      return PROD_CANONICAL_ORIGIN;
    }
    return envOrigin;
  }

  return envOrigin ?? LOCAL_DEV_ORIGIN;
}

function resolveSiteSocials(): string[] {
  const raw = process.env.NEXT_PUBLIC_SITE_SOCIALS ?? "";
  const values = raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return values.filter((value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:";
    } catch {
      return false;
    }
  });
}

export const siteConfig = {
  name: "Wafia",
  legalName: "Wafia",
  description:
    "Agence hybride : Influence, Talents, Studio Créatif et Stratégie. Campagnes traçables, production brand-ready.",
  url: resolveSiteOrigin(),
  locale: "fr_FR",
  logo: "/wafia.svg",
  ogImage: "/opengraph-image",
  twitterHandle: "",
  socials: resolveSiteSocials(),
} as const;

export const sitePaths = {
  home: "/",
  services: "/services",
  studio: "/studio",
  forBrands: "/for-brands",
  forTalents: "/for-talents",
  wiki: "/wiki",

  legalPrivacy: "/legal/privacy",
  legalMentions: "/legal/mentions",
  legalCookies: "/legal/cookies",
};

export const sitemapRoutes = [
  sitePaths.home,
  sitePaths.services,
  sitePaths.forBrands,
  sitePaths.forTalents,
  sitePaths.wiki,
  sitePaths.studio,

  sitePaths.legalPrivacy,
  sitePaths.legalMentions,
  sitePaths.legalCookies,
];
