import { defaultLocale, locales, toLanguageTag } from "@/i18n/config";

/** Public path of `path` in `locale`: the default locale has no prefix. */
export function localizedPath(path: string, locale: string): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return path === "/" ? prefix || "/" : `${prefix}${path}`;
}

/** Canonical + hreflang alternates for `generateMetadata` (metadataBase makes them absolute). */
export function pageAlternates(locale: string, path: string) {
  return {
    canonical: localizedPath(path, locale),
    languages: {
      ...Object.fromEntries(
        locales.map((l) => [toLanguageTag(l), localizedPath(path, l)])
      ),
      "x-default": localizedPath(path, defaultLocale),
    },
  };
}
