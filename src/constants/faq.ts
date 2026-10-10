import frFaq from "../../messages/fr/faq.json";

export type FaqItem = {
  readonly q: string;
  readonly a: string;
};

/**
 * French FAQ items, read from the French catalogue (single source of truth:
 * messages/fr/faq.json). Kept for the "@/constants" barrel; localized UI and
 * JSON-LD read `useTranslations("faq")` / `getTranslations("faq")` instead.
 */
export const FAQ_ITEMS: readonly FaqItem[] = frFaq.items;
