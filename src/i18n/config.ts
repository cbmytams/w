// Plain constants (no next-intl import) so they are usable from tests and scripts.
export const locales = ["fr", "en"] as const;
export const defaultLocale = "fr";
export type Locale = (typeof locales)[number];
