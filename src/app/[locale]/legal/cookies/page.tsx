import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage, getLegalMetadata } from "@/components/legal/LegalPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getLegalMetadata(locale, "cookies");
}

export default async function CookiesPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalPage docKey="cookies" locale={locale} />;
}
