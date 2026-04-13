import type { Metadata } from "next";
import { siteConfig, sitePaths } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique cookies",
  description: "Informations sur l'utilisation des cookies et le consentement.",
  alternates: {
    canonical: sitePaths.legalCookies,
  },
  openGraph: {
    title: "Politique cookies | Wafia",
    description:
      "Informations sur l'utilisation des cookies et le consentement.",
    url: sitePaths.legalCookies,
    siteName: siteConfig.name,
    type: "article",
  },
};

import {
  LegalContainer,
  LegalHeader,
  LegalSection,
} from "@/components/legal/LegalComponents";

export default function CookiesPolicy() {
  return (
    <LegalContainer>
      <LegalHeader
        title="Politique des Cookies"
        subtitle="Nous utilisons les cookies avec parcimonie pour améliorer votre expérience sans compromettre votre vie privée."
        date="03 Février 2026"
      />

      <LegalSection title="Utilisation">
        <p>
          Ce site utilise des cookies pour améliorer votre expérience et mesurer
          l&apos;audience (via Google Analytics si activé).
        </p>
      </LegalSection>

      <LegalSection title="Vos choix">
        <p>Vous pouvez configurer votre navigateur pour refuser les cookies.</p>
      </LegalSection>
    </LegalContainer>
  );
}
