import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// One JSON file per namespace under messages/<locale>/ keeps edits and
// reviews local; they are merged into a single catalogue here.
export const NAMESPACES = [
  "common",
  "metadata",
  "nav",
  "footer",
  "hero",
  "method",
  "clients",
  "cases",
  "team",
  "faq",
  "cta",
  "contact",
  "legal",
  "errors",
] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const entries = await Promise.all(
    NAMESPACES.map(async (ns) => [
      ns,
      (await import(`../../messages/${locale}/${ns}.json`)).default,
    ])
  );

  return { locale, messages: Object.fromEntries(entries) };
});
