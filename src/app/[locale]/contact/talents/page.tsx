import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { pageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("meta.talents.title"),
    description: t("meta.talents.description"),
    alternates: pageAlternates(locale, "/contact/talents"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ContactTalentsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactForm variant="talents" />;
}
