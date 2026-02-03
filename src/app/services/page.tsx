import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

const services = [
    {
        id: "influence",
        title: "Influence & Talent Management",
        subtitle: "Des campagnes performantes avec des talents structurés.",
        description: "Nous gérons une roster exclusif de talents et sourcons les meilleurs profils pour vos campagnes. Plus de 'wild west', place à la roadmap et à la rigueur.",
        points: [
            "Sélection data-driven et brand-safety check",
            "Positionnement carrière et roadmap talents",
            "Gestion administrative et contractuelle carrée",
            "Discipline de publication et respect des briefs"
        ],
        deliverables: ["Contrats", "Briefs validés", "Plannings respectés", "Post-mortem campagne"]
    },
    {
        id: "studio",
        title: "Studio Créatif & Production",
        subtitle: "Du contenu social-first qui convertit, pas de la TV recyclée.",
        description: "Notre studio interne produit des assets pensés pour le mobile, du shoot Lo-Fi authentique à la production premium. Nous maîtrisons les codes de chaque plateforme.",
        points: [
            "Tournage vertical et montage dynamique",
            "VFX et motion design pour le hook",
            "Format UGC authentique ou Studio Premium",
            "Déclinaisons multi-plateformes (Shorts, Reels, TikTok)"
        ],
        deliverables: ["Rushes", "Montages finaux", "Adaptations formats", "Packs ads"]
    },
    {
        id: "strategie",
        title: "Stratégie & FanOps",
        subtitle: "Transformer une audience en communauté engagée.",
        description: "L'influence ne s'arrête pas au post. Nous activons les communautés avec des stratégies de contenu long-terme et du community building actif.",
        points: [
            "Stratégie éditoriale et concepts de séries",
            "Activation communauté et DM automation",
            "Scaling organique et viralité",
            "Gestion de crise et réputation"
        ],
        deliverables: ["Audit de compte", "Ligne éditoriale", "Calendrier de contenu", "Playbook réponse"]
    },
    {
        id: "systemes",
        title: "Systèmes & Traçabilité",
        subtitle: "L'IA au service de l'humain pour une transparence totale.",
        description: "Nous avons construit nos propres outils pour suivre chaque étape de la campagne. Vous savez toujours où va votre budget.",
        points: [
            "Suivi de campagne en temps réel",
            "Traçabilité des validations (Casting -> Ops -> Reporting)",
            "Automatisation des tâches répétitives",
            "Reporting KPI unifié et clair"
        ],
        deliverables: ["Dashboard accès client", "Automated reporting", "Asset management", "Facturation claire"]
    }
]

export default function ServicesPage() {
    return (
        <div className="py-24 bg-white">
            <Container>
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sticky Navigation */}
                    <div className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-28 space-y-4 border-l-2 border-slate-100 pl-4">
                            <h3 className="font-bold text-slate-900 mb-6">Services</h3>
                            {services.map((service) => (
                                <Link
                                    key={service.id}
                                    href={`#${service.id}`}
                                    className="block text-sm text-slate-500 hover:text-slate-900 transition-colors py-1"
                                >
                                    {service.title}
                                </Link>
                            ))}
                            <div className="pt-8">
                                <Button className="w-full" asChild>
                                    <Link href="/contact?type=brand">Discuter d&apos;un projet</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-24">
                        <div className="mb-12">
                            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                                Expertise & Savoir-faire
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl">
                                Nous combinons créativité humaine et rigueur systémique pour délivrer des résultats prévisibles et performants.
                            </p>
                        </div>

                        {services.map((service) => (
                            <section key={service.id} id={service.id} className="scroll-mt-28 border-t border-slate-100 pt-16">
                                <div className="mb-4 text-sm font-bold text-slate-400 uppercase tracking-wider">{service.title}</div>
                                <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">{service.subtitle}</h2>
                                <p className="text-lg text-slate-600 mb-8 max-w-3xl">{service.description}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="bg-slate-50 p-6 rounded-xl">
                                        <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                                            Ce que nous faisons
                                        </h4>
                                        <ul className="space-y-3">
                                            {service.points.map((point, i) => (
                                                <li key={i} className="flex items-start text-sm text-slate-700">
                                                    <Check className="h-4 w-4 text-slate-900 mr-2 mt-0.5 shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                        <h4 className="font-semibold text-slate-900 mb-4">Livrables types</h4>
                                        <ul className="space-y-3">
                                            {service.deliverables.map((item, i) => (
                                                <li key={i} className="flex items-center text-sm text-slate-500">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 mr-2"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <Button variant="outline" asChild>
                                    <Link href="/contact?type=brand">
                                        Demander ce service <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </section>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}
