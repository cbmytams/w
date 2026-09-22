import type { Metadata } from "next";
import { siteConfig, sitePaths } from "@/lib/site";
import { politiqueCookies } from "@/constants/legal-content";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description:
    "Informations sur les cookies utilisés par le site Wafia et sur leur gestion.",
  alternates: {
    canonical: sitePaths.legalCookies,
  },
  openGraph: {
    title: "Politique de cookies | Wafia",
    description:
      "Informations sur les cookies utilisés par le site Wafia et sur leur gestion.",
    url: sitePaths.legalCookies,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function CookiesPolicyPage() {
  return <LegalPage doc={politiqueCookies} />;
}
