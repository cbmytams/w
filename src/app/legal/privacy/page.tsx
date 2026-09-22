import type { Metadata } from "next";
import { siteConfig, sitePaths } from "@/lib/site";
import { politiqueConfidentialite } from "@/constants/legal-content";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Collecte, utilisation et protection de vos données personnelles sur le site Wafia.",
  alternates: {
    canonical: sitePaths.legalPrivacy,
  },
  openGraph: {
    title: "Politique de confidentialité | Wafia",
    description:
      "Collecte, utilisation et protection de vos données personnelles sur le site Wafia.",
    url: sitePaths.legalPrivacy,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={politiqueConfidentialite} />;
}
