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
                date="17 Mars 2026"
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

            <LegalSection title="3. Base légale des traitements">
                <p>Chaque traitement de données repose sur une base légale au sens de l&apos;article 6 du RGPD :</p>
                <div className="mt-6 grid gap-4">
                    {[
                        {
                            base: "Exécution d'un contrat",
                            detail: "Traitement nécessaire dans le cadre de la relation prospect ou collaborateur (réponse aux demandes, gestion des candidatures)."
                        },
                        {
                            base: "Intérêt légitime",
                            detail: "Analyse de votre profil talent dans le cadre de l'Audit, dans l'intérêt de Wafia et des créateurs concernés."
                        },
                        {
                            base: "Consentement",
                            detail: "Envoi de la Newsletter et communications marketing, uniquement sur opt-in explicite. Vous pouvez retirer votre consentement à tout moment."
                        }
                    ].map((item, i) => (
                        <div key={i} className="group relative flex items-start gap-4 p-4 md:p-5 rounded-[1.5rem] bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.05] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-r from-violet-500/0 to-transparent group-hover:from-violet-500/5 transition-colors duration-300 pointer-events-none" />
                            <div className="relative z-10 w-2 h-2 rounded-full bg-violet-500/80 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_rgba(139,92,246,0.3)] mt-1.5 shrink-0"></div>
                            <div className="relative z-10">
                                <span className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100">{item.base}</span>
                                <span className="text-slate-500 dark:text-slate-500"> — </span>
                                <span className="text-sm md:text-base text-slate-600 dark:text-slate-300">{item.detail}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </LegalSection>

            <LegalSection title="4. Durées de conservation">
                <p>Vos données sont conservées pour la durée strictement nécessaire aux finalités pour lesquelles elles ont été collectées :</p>
                <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-black/[0.05] dark:border-white/[0.05]">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-black/[0.03] dark:bg-white/[0.03] border-b border-black/[0.05] dark:border-white/[0.05]">
                                <th className="text-left px-5 py-4 font-semibold text-slate-800 dark:text-slate-100 tracking-tight">Catégorie de données</th>
                                <th className="text-left px-5 py-4 font-semibold text-slate-800 dark:text-slate-100 tracking-tight">Durée de conservation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { category: "Formulaires de contact", duration: "3 ans à compter du dernier contact" },
                                { category: "Profils talents (Audit)", duration: "2 ans à compter de la dernière interaction" },
                                { category: "Données de navigation (Google Analytics)", duration: "14 mois maximum" },
                                { category: "Données de facturation", duration: "10 ans (obligation légale — art. L123-22 C.com.)" },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-black/[0.03] dark:border-white/[0.03] last:border-0 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors duration-200">
                                    <td className="px-5 py-4 text-slate-700 dark:text-slate-300 font-medium">{row.category}</td>
                                    <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{row.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </LegalSection>

            <LegalSection title="5. Transferts hors UE">
                <p>
                    Certains de nos sous-traitants peuvent être établis en dehors de l&apos;Union Européenne. Dans ce cas, nous veillons à ce que des garanties appropriées encadrent ces transferts conformément au chapitre V du RGPD.
                </p>
                <div className="mt-6 group relative flex items-start gap-4 p-4 md:p-5 rounded-[1.5rem] bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.05]">
                    <div className="relative z-10 w-2 h-2 rounded-full bg-violet-500/80 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.3)]"></div>
                    <div className="relative z-10">
                        <span className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100">Google Analytics</span>
                        <span className="text-slate-500 dark:text-slate-500"> — </span>
                        <span className="text-sm md:text-base text-slate-600 dark:text-slate-300">
                            Transfert vers les États-Unis encadré par les Clauses Contractuelles Types (CCT) adoptées par la Commission Européenne.
                        </span>
                    </div>
                </div>
            </LegalSection>

            <LegalSection title="6. Responsable des traitements">
                <div className="relative bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-[40px] border border-black/[0.05] dark:border-white/[0.05] rounded-[2rem] p-8 md:p-10">
                    <div className="relative z-10 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 shrink-0 sm:w-32">Société</span>
                            <span className="text-base font-semibold text-slate-900 dark:text-white">WAFIA SAS — SIREN 929 439 735</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 shrink-0 sm:w-32">Siège social</span>
                            <span className="text-base text-slate-700 dark:text-slate-300">8 rue Amédée Simon, 94290 Villeneuve-le-Roi</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 shrink-0 sm:w-32">Responsable</span>
                            <span className="text-base text-slate-700 dark:text-slate-300">Wahib Guettat</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 shrink-0 sm:w-32">Contact</span>
                            <a href="mailto:contact@wafia.fr" className="text-base text-violet-600 dark:text-violet-400 hover:underline font-medium">
                                contact@wafia.fr
                            </a>
                        </div>
                    </div>
                </div>
            </LegalSection>

            <LegalSection title="7. Vos droits & Recours">
                <div className="relative bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-[40px] border border-violet-500/20 dark:border-violet-400/20 rounded-[2.5rem] p-8 md:p-10">
                    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-violet-500/10 to-transparent dark:from-violet-500/10 pointer-events-none" />
                    <div className="relative z-10">
                        <p className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed">
                            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants sur vos données personnelles :
                        </p>
                        <ul className="mb-8 space-y-3">
                            {[
                                { droit: "Droit d'accès", detail: "obtenir une copie des données vous concernant." },
                                { droit: "Droit de rectification", detail: "corriger des données inexactes ou incomplètes." },
                                { droit: "Droit à l'effacement", detail: "demander la suppression de vos données (« droit à l'oubli »)." },
                                { droit: "Droit à la portabilité", detail: "recevoir vos données dans un format structuré et lisible." },
                                { droit: "Droit d'opposition", detail: "vous opposer à tout moment au traitement fondé sur l'intérêt légitime ou à des fins de prospection." },
                                { droit: "Droit à la limitation", detail: "demander la suspension du traitement de vos données dans certaines circonstances prévues par le RGPD." },
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500/80 shrink-0"></div>
                                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                        <span className="font-semibold text-slate-900 dark:text-white">{item.droit}</span>
                                        {" — "}
                                        {item.detail}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="mb-4 font-medium text-slate-900 dark:text-white">
                            Pour exercer l&apos;un de ces droits, écrivez-nous à :
                        </p>
                        <a href="mailto:contact@wafia.fr" className="inline-block mb-8 px-6 py-3 bg-white/50 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-black/5 dark:border-white/10 rounded-full text-violet-600 dark:text-violet-400 font-semibold tracking-tight transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                            contact@wafia.fr
                        </a>
                        <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                                Si vous estimez que vos droits ne sont pas respectés, vous disposez du droit d&apos;introduire une réclamation auprès de l&apos;autorité de contrôle compétente :{" "}
                                <a
                                    href="https://www.cnil.fr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-violet-600 dark:text-violet-400 font-semibold hover:underline"
                                >
                                    Commission Nationale de l&apos;Informatique et des Libertés (CNIL) — cnil.fr
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </LegalSection>
        </LegalContainer>
    )
}
