// Plain constants (no next-intl import) so they are usable from tests and scripts.
export const locales = ["fr", "en", "es", "zh"] as const;
export const defaultLocale = "fr";
export type Locale = (typeof locales)[number];

// BCP 47 tag for <html lang>, hreflang and JSON-LD (zh is Simplified Chinese).
export const languageTag: Record<Locale, string> = {
  fr: "fr",
  en: "en",
  es: "es",
  zh: "zh-Hans",
};

export function toLanguageTag(locale: string): string {
  return languageTag[locale as Locale] ?? locale;
}
