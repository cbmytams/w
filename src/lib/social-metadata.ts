import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site";

/**
 * Next replaces (not merges) `openGraph` when a page defines its own, so pages
 * spread these defaults to keep image, site name and locale.
 */
export async function ogDefaults(locale: string) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    siteName: siteConfig.name,
    type: "website" as const,
    locale: t("ogLocale"),
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  };
}
