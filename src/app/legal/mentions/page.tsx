import type { Metadata } from "next"
import { siteConfig, sitePaths } from "@/lib/site"
import { LegalContainer, LegalHeader, LegalSection, LegalGrid, LegalCard } from "@/components/legal/LegalComponents"
import { Building2, Globe, Server, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
    title: "Mentions légales",
    description: "Informations légales et éditoriales du site Wafia.",
    alternates: {
        canonical: sitePaths.legalMentions,
    },
    openGraph: {
        title: "Mentions légales | Wafia",
        description: "Informations légales et éditoriales du site Wafia.",
        url: sitePaths.legalMentions,
        siteName: siteConfig.name,
        type: "article",
    },
}

export default function MentionsLegales() {
    return (
        <LegalContainer>
            <LegalHeader
                title="Mentions Légales"
                subtitle="La transparence est au cœur de notre modèle. Voici les informations officielles concernant Wafia Agency."
                date="03 Février 2026"
            />

            <LegalSection title="Éditeur du site">
                <p className="mb-6">
                    Le site Wafia est édité par l&apos;agence Wafia, une structure dédiée à l&apos;accompagnement des talents et à la stratégie des marques.
                </p>
                <LegalGrid>
                    <LegalCard
                        title="Raison Sociale"
                        value="Wafia Agency SAS"
                        icon={<Building2 className="w-4 h-4 text-slate-400" />}
                    />
                    <LegalCard
                        title="Capital Social"
                        value="1 000,00 €"
                    />
                    <LegalCard
                        title="RCS Paris"
                        value="B 123 456 789"
                    />
                    <LegalCard
                        title="Siège Social"
                        value="[Adresse Wafia]"
                        icon={<Globe className="w-4 h-4 text-slate-400" />}
                    />
                    <LegalCard
                        title="Directeur de la publication"
                        value="Sasha"
                    />
                </LegalGrid>
            </LegalSection>

            <LegalSection title="Hébergement">
                <p>
                    L&apos;infrastructure technique du site est assurée par un leader mondial de l&apos;hébergement cloud, garantissant performance et sécurité.
                </p>
                <div className="mt-6">
                    <LegalCard
                        title="Hébergeur"
                        value={
                            <div className="space-y-1">
                                <span className="block font-bold">Vercel Inc.</span>
                                <span className="block text-sm text-slate-500 font-normal">440 N Barranca Ave #4133<br />Covina, CA 91723<br />United States</span>
                            </div>
                        }
                        icon={<Server className="w-4 h-4 text-slate-400" />}
                    />
                </div>
            </LegalSection>

            <LegalSection title="Propriété Intellectuelle">
                <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8">
                    <div className="flex items-start gap-4">
                        <ShieldCheck className="w-8 h-8 text-violet-500 mt-1 shrink-0" />
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Tous droits réservés</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                L&apos;ensemble de ce site (structure, design, textes, images, animations, logo) relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Toute reproduction, modification ou utilisation non autorisée est strictement interdite sans l&apos;accord écrit de Wafia Agency.
                            </p>
                        </div>
                    </div>
                </div>
            </LegalSection>
        </LegalContainer>
    )
}
