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
                        value="Wafia Agency SASU"
                        icon={<Building2 className="w-4 h-4 text-slate-400" />}
                    />
                    <LegalCard
                        title="SIREN"
                        value="929 439 735"
                    />
                    <LegalCard
                        title="RCS Créteil"
                        value="929 439 735"
                    />
                    <LegalCard
                        title="Capital Social"
                        value="1 000,00 €"
                    />
                    <LegalCard
                        title="Date de création"
                        value="30 mai 2024"
                    />
                    <LegalCard
                        title="Siège Social"
                        value="Villeneuve-le-Roi, 94290"
                        icon={<Globe className="w-4 h-4 text-slate-400" />}
                    />
                    <LegalCard
                        title="Directeur de la publication"
                        value="Wahib GUETTAT"
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
                <div className="relative bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-[40px] border border-black/[0.05] dark:border-white/[0.05] rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-none">
                    <div className="absolute inset-0 rounded-[2.5rem] border border-white/20 dark:border-white/5 pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 md:gap-8">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">Tous droits réservés</h3>
                            <p className="text-slate-600 dark:text-white/70 text-base md:text-lg leading-relaxed font-medium">
                                L&apos;ensemble de ce site (structure, design, textes, images, animations, logo) relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Toute reproduction, modification ou utilisation non autorisée est strictement interdite sans l&apos;accord écrit de Wafia Agency.
                            </p>
                        </div>
                    </div>
                </div>
            </LegalSection>
        </LegalContainer>
    )
}
