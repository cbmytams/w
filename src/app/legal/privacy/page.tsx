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
                <div className="mt-6 grid gap-4">
                    {["Nom et Prénom", "Adresse Email professionnelle", "Numéro de téléphone", "Liens sociaux (Instagram, TikTok, YouTube)"].map((item, i) => (
                        <div key={i} className="group relative flex items-center gap-4 p-4 md:p-5 rounded-[1.5rem] bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.05] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-r from-violet-500/0 to-transparent group-hover:from-violet-500/5 transition-colors duration-300 pointer-events-none" />
                            <div className="relative z-10 w-2 h-2 rounded-full bg-violet-500/80 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_rgba(139,92,246,0.3)]"></div>
                            <span className="relative z-10 text-sm md:text-base font-medium text-slate-700 dark:text-slate-200">{item}</span>
                        </div>
                    ))}
                </div>
            </LegalSection>

            <LegalSection title="2. Utilisation des données">
                <p>Vos données ne sont jamais revendues. Elles sont utilisées exclusivement pour :</p>
                <ul className="mt-6 space-y-4">
                    {[
                        "Répondre à vos demandes de contact et qualifier vos besoins.",
                        "Analyser votre profil talent pour évaluer une potentielle collaboration (Audit).",
                        "Vous envoyer des informations pertinentes sur nos offres (Newsletter), uniquement si vous y avez consenti."
                    ].map((text, i) => (
                        <li key={i} className="flex items-start gap-4">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500/80 shrink-0"></div>
                            <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{text}</span>
                        </li>
                    ))}
                </ul>
            </LegalSection>

            <LegalSection title="3. Vos droits & Contact">
                <div className="relative bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-[40px] border border-violet-500/20 dark:border-violet-400/20 rounded-[2.5rem] p-8 md:p-10">
                    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-violet-500/10 to-transparent dark:from-violet-500/10 pointer-events-none" />
                    <div className="relative z-10">
                        <p className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed">
                            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, de portabilité et de suppression de vos données personnelles.
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white">
                            Pour exercer ce droit, écrivez-nous simplement à :
                            <br />
                            <a href="mailto:contact@wafia.fr" className="inline-block mt-3 px-6 py-3 bg-white/50 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-black/5 dark:border-white/10 rounded-full text-violet-600 dark:text-violet-400 font-semibold tracking-tight transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                                contact@wafia.fr
                            </a>
                        </p>
                    </div>
                </div>
            </LegalSection>
        </LegalContainer>
    )
}
