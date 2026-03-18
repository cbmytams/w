import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"

const PROOF_STATS = [
    { value: "17M+", label: "Impressions cumulées" },
    { value: "100+", label: "Créateurs activés" },
    { value: "250+", label: "Contenus produits" },
    { value: "21%", label: "Taux d'engagement moyen" },
]

export function AgencyProofSection() {
    return (
        <section id="proof" className="section-spacing bg-blue-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px]" />

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto">
                    <FadeIn>
                        <p className="text-center text-sm font-mono uppercase tracking-widest text-blue-400 mb-6">
                            Résultats cumulés de nos campagnes
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {PROOF_STATS.map((stat, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="text-center">
                                    <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-blue-300 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
