import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ShieldCheck, BarChart3, Clock } from "lucide-react"
import { siteConfig, sitePaths } from "@/lib/site"
import { breadcrumbSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
    title: "Process & Méthode",
    description:
        "Découvrez la méthode Wafia : audit, casting, production, reporting et gates de validation.",
    alternates: {
        canonical: sitePaths.process,
    },
    openGraph: {
        title: "Process & Méthode | Wafia",
        description:
            "Découvrez la méthode Wafia : audit, casting, production, reporting et gates de validation.",
        url: sitePaths.process,
        siteName: siteConfig.name,
        type: "website",
    },
}

export default function ProcessPage() {
    return (
        <main id="main-content" className="py-24 bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbSchema([
                            { name: "Accueil", url: new URL(sitePaths.home, siteConfig.url).toString() },
                            { name: "Process", url: new URL(sitePaths.process, siteConfig.url).toString() },
                        ])
                    ),
                }}
            />
            <Container>
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="font-heading text-4xl font-bold text-slate-900 mb-6">
                        La méthode Wafia
                    </h1>
                    <p className="text-xl text-slate-600">
                        Nous avons industrialisé l&apos;influence marketing sans sacrifier la créativité.
                        Notre process garantit la sécurité de votre marque et la performance de vos campagnes.
                    </p>
                </div>

                {/* Timeline */}
                <section className="mb-24">
                    <h2 className="font-heading text-2xl font-bold mb-12 flex items-center">
                        <Clock className="mr-3 h-6 w-6 text-slate-900" /> Timeline Type
                    </h2>

                    <div className="relative border-l-2 border-slate-200 ml-4 lg:ml-8 space-y-16">
                        {[
                            {
                                title: "Semaine 1 : Alignement & Casting",
                                desc: "Audit de vos besoins, définition de la stratégie éditoriale et sélection data-driven des profils. Validation de la liste des talents.",
                                points: ["Brief créatif", "Signature contrats", "Validation Brand Safety"]
                            },
                            {
                                title: "Semaine 2 : Conception & Validation",
                                desc: "Écriture des scripts par notre studio ou les talents. Allers-retours correctifs avant lancement production.",
                                points: ["Scripts & Storyboards", "Validation wording", "Gate Juridique"]
                            },
                            {
                                title: "Semaine 3-4 : Production & Ops",
                                desc: "Tournage, montage, validation des assets finaux. Programmation des publications.",
                                points: ["Tournage studio ou home", "Montage & VFX", "Aprobation finale"]
                            },
                            {
                                title: "Post-Campagne : Reporting & Analyse",
                                desc: "Consolidation des statistiques, calcul du ROI et identification des learnings pour la prochaine itération.",
                                points: ["Dashboard live", "Bilan performance", "Recommandations"]
                            }
                        ].map((step, i) => (
                            <div key={i} className="relative pl-12 lg:pl-16">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white border-4 border-slate-900 shadow-sm"></div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-600 mb-4 max-w-2xl">{step.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {step.points.map((pt, j) => (
                                        <span key={j} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                            {pt}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Validation Gates */}
                <section className="mb-24">
                    <div className="bg-slate-900 rounded-2xl p-8 lg:p-12 text-white">
                        <h2 className="font-heading text-2xl font-bold mb-8 flex items-center">
                            <ShieldCheck className="mr-3 h-6 w-6" /> 3 Gates de Validation
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                <h4 className="font-bold mb-3 text-lg">1. Gate Stratégique</h4>
                                <p className="text-sm text-slate-300">
                                    Le talent sélectionné correspond-il à l&apos;ADN de marque ? Les audiences sont-elles affinitaires (vérification HypeAuditor) ?
                                </p>
                            </div>
                            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                <h4 className="font-bold mb-3 text-lg">2. Gate Artistique</h4>
                                <p className="text-sm text-slate-300">
                                    Le script est-il assez engageant ? La qualité visuelle est-elle aux standards Wafia ? Le hook est-il efficace ?
                                </p>
                            </div>
                            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                <h4 className="font-bold mb-3 text-lg">3. Gate Compliance</h4>
                                <p className="text-sm text-slate-300">
                                    Mentions légales présentes ? Droits musicaux validés ? Respect des règles ARPP et transparence publicité ?
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reporting */}
                <section>
                    <h2 className="font-heading text-2xl font-bold mb-12 flex items-center">
                        <BarChart3 className="mr-3 h-6 w-6 text-slate-900" /> Reporting & KPIs
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-lg text-slate-600 mb-6">
                                Nous ne vous envoyons pas des captures d&apos;écran floues. Vous accédez à un dashboard clair et structuré.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Reach réel et impressions uniques",
                                    "Taux d&apos;engagement qualifié (hors bots)",
                                    "Coût par vue (CPV) et CPM",
                                    "Sauvegardes et partages (indicateurs d&apos;intérêt)",
                                    "Clics sortants et attribution (si applicable)"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-slate-700">
                                        <Check className="h-4 w-4 text-green-500 mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Card className="bg-slate-50 border-slate-100 shadow-sm">
                            <CardContent className="p-8 text-center text-slate-400 italic">
                                [Visuel factice Dashboard Reporting]
                                <br />
                                Graphiques d&apos;évolution et top contenus
                            </CardContent>
                        </Card>
                    </div>
                </section>

            </Container>
        </main>
    )
}
