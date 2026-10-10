import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import NotFoundClient from "@/components/NotFoundClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "errors" });

  return {
    title: t("notFound.title"),
    description: t("notFound.metaDescription"),
    robots: { index: false, follow: true },
  };
}

export default function NotFound() {
  return <NotFoundClient />;
}
