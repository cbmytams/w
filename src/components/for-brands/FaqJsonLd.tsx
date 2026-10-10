import { getTranslations } from "next-intl/server";
import type { FaqItem } from "@/constants/faq";
import { faqSchema } from "@/lib/structured-data";

/** FAQPage JSON-LD built from the active locale's FAQ catalogue. */
export async function FaqJsonLd() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema([...items])),
      }}
    />
  );
}
