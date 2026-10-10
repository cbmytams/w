import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // French keeps the clean root URLs already indexed; others live under /en, /es…
  localePrefix: "as-needed",
  // URL is the single source of truth: no Accept-Language redirect, no cookie.
  localeDetection: false,
  localeCookie: false,
  // hreflang is emitted in <head> and the sitemap; the Link header would use the request host.
  alternateLinks: false,
});
