export const siteConfig = {
  name: "Wafia",
  legalName: "Wafia",
  description:
    "Agence hybride : Influence, Talents, Studio Créatif et Stratégie. Campagnes traçables, production brand-ready.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "fr_FR",
  logo: "/wafia-logo.png",
  ogImage: "/opengraph-image",
  twitterHandle: "",
  socials: [] as string[],
} as const;

export const sitePaths = {
  home: "/",
  about: "/about",
  services: "/services",
  process: "/process",
  talents: "/talents",
  cases: "/cases",
  studio: "/studio",
  forBrands: "/for-brands",
  forTalents: "/for-talents",
  forAgencies: "/for-agencies",
  contact: "/contact",
  explore: "/explore",
  legalPrivacy: "/legal/privacy",
  legalMentions: "/legal/mentions",
  legalCookies: "/legal/cookies",
};

export const sitemapRoutes = [
  sitePaths.home,
  sitePaths.explore,
  sitePaths.forBrands,
  sitePaths.forTalents,
  sitePaths.forAgencies,
  sitePaths.services,
  sitePaths.process,
  sitePaths.cases,
  sitePaths.studio,
  sitePaths.talents,
  sitePaths.about,
  sitePaths.contact,
  sitePaths.legalPrivacy,
  sitePaths.legalMentions,
  sitePaths.legalCookies,
];
