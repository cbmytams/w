import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { siteConfig, sitePaths } from "@/lib/site"

export const metadata: Metadata = {
    title: "Politique de confidentialité",
    description: "Informations sur la collecte, l'utilisation et les droits liés aux données personnelles.",
    alternates: {
        canonical: sitePaths.legalPrivacy,
    },
    openGraph: {
        title: "Politique de confidentialité | Wafia",
        description: "Informations sur la collecte, l'utilisation et les droits liés aux données personnelles.",
        url: sitePaths.legalPrivacy,
        siteName: siteConfig.name,
        type: "article",
    },
}

export default function PrivacyPolicy() {
    return (
        <main id="main-content" className="py-24 bg-white">
            <Container className="prose prose-slate max-w-3xl mx-auto">
                <h1>Politique de Confidentialité</h1>
                <p>Dernière mise à jour : 3 février 2026</p>

                <h2>1. Collecte des données</h2>
                <p>
                    Nous collectons les données que vous nous transmettez via nos formulaires de contact et de candidature (nom, email, téléphone, réseaux sociaux).
                </p>

                <h2>2. Utilisation des données</h2>
                <p>Ces données sont utilisées uniquement pour :</p>
                <ul>
                    <li>Répondre à vos demandes de contact.</li>
                    <li>Traiter vos candidatures talents.</li>
                    <li>Vous envoyer des newsletters si vous y avez consenti.</li>
                </ul>

                <h2>3. Vos droits</h2>
                <p>
                    Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Contactez-nous à privacy@wafia.agency.
                </p>
            </Container>
        </main>
    )
}
