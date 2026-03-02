import type { Metadata } from "next"
import { siteConfig, sitePaths } from "@/lib/site"
import { LegalContainer, LegalHeader, LegalSection } from "@/components/legal/LegalComponents"

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
        <LegalContainer>
            <LegalHeader
                title="Politique de Confidentialité"
                subtitle="Votre confiance est notre actif le plus précieux. Nous protégeons vos données avec la même rigueur que nous gérons nos talents."
                date="03 Février 2026"
            />

            <LegalSection title="1. Collecte des données">
                <p>
                    Nous collectons uniquement les données strictement nécessaires au bon déroulement de nos échanges et de nos collaborations. Ces données sont recueillies lorsque vous utilisez nos formulaires de contact ou déposez une candidature.
                </p>
                <div className="mt-4 grid gap-3">
                    {["Nom et Prénom", "Adresse Email professionnelle", "Numéro de téléphone", "Liens sociaux (Instagram, TikTok, YouTube)"].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item}</span>
                        </div>
                    ))}
                </div>
            </LegalSection>

            <LegalSection title="2. Utilisation des données">
                <p>Vos données ne sont jamais revendues. Elles sont utilisées exclusivement pour :</p>
                <ul className="list-disc list-inside space-y-2 marker:text-violet-500 marker:text-xl">
                    <li>Répondre à vos demandes de contact et qualifier vos besoins.</li>
                    <li>Analyser votre profil talent pour évaluer une potentielle collaboration (Audit).</li>
                    <li>Vous envoyer des informations pertinentes sur nos offres (Newsletter), uniquement si vous y avez consenti.</li>
                </ul>
            </LegalSection>

            <LegalSection title="3. Vos droits & Contact">
                <div className="bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 rounded-2xl p-6 md:p-8">
                    <p className="mb-4">
                        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, de portabilité et de suppression de vos données personnelles.
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white">
                        Pour exercer ce droit, écrivez-nous simplement à :
                        <br />
                        <a href="mailto:privacy@wafia.agency" className="text-violet-600 dark:text-violet-400 hover:underline text-lg mt-1 inline-block">
                            privacy@wafia.agency
                        </a>
                    </p>
                </div>
            </LegalSection>
        </LegalContainer>
    )
}
