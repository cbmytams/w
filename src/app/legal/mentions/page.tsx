import type { Metadata } from "next";
import { siteConfig, sitePaths } from "@/lib/site";
import { mentionsLegales } from "@/constants/legal-content";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur, hébergement et propriété intellectuelle du site Wafia.",
  alternates: {
    canonical: sitePaths.legalMentions,
  },
  openGraph: {
    title: "Mentions légales | Wafia",
    description:
      "Éditeur, hébergement et propriété intellectuelle du site Wafia.",
    url: sitePaths.legalMentions,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function MentionsLegalesPage() {
  return <LegalPage doc={mentionsLegales} />;
}
