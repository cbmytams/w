import { Container } from "@/components/ui/container"
import { FadeIn, StaggerContainer } from "@/components/ui/fade-in"
import { AUTHENTICITY_CARDS } from "@/constants/brand-additions"

export function AuthenticitySection() {
    return (
        <section className="relative py-28 overflow-hidden bg-[#0B0F14] z-20">
            {/* Atmospheric background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.12)_0%,rgba(236,72,153,0.08)_35%,rgba(11,15,20,1)_70%)] pointer-events-none" />
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(transparent_0%,transparent_85%,rgba(255,255,255,0.03)_100%)] pointer-events-none" />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
                    <FadeIn>
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-8">
                                Authenticité
                                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
                                Vos créateurs doivent parler de vous{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-rose-500">
                                    naturellement.
                                </span>
                            </h2>
                            <p className="text-xl text-white/60">
                                Sinon, l&apos;audience le sent. Et vous perdez de l&apos;argent.
                            </p>

                            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
                                <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-3">Pourquoi ça marche</p>
                                <p className="text-lg text-white/80 leading-relaxed">
                                    Le public détecte instantanément le contenu plaqué. Nous privilégions la cohérence: ton, valeurs,
                                    audience, usage réel du produit.
                                </p>
                            </div>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="space-y-5">
                        {AUTHENTICITY_CARDS.map((card) => (
                            <FadeIn key={card.id} delay={card.delay}>
                                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
                                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-500 via-pink-500 to-rose-500 opacity-70" />
                                    <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 ${card.gradient} ${card.hover} group-hover:opacity-60`} />

                                    <div className="relative flex items-start gap-5">
                                        <div className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                                            {card.id}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold text-white mb-3">
                                                {card.title}
                                            </h3>
                                            <p className="text-white/65 leading-relaxed">
                                                {card.description}
                                                {card.highlight && (
                                                    <>
                                                        {" "}
                                                        <span className={`${card.color} font-semibold`}>
                                                            {card.highlight}
                                                        </span>{" "}
                                                    </>
                                                )}
                                                {card.suffix}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </StaggerContainer>
                </div>
            </Container>
        </section>
    )
}
