import { Container } from "@/components/ui/container"
import { FadeIn, StaggerContainer } from "@/components/ui/fade-in"
import { AUTHENTICITY_CARDS } from "@/constants/brand-additions"

export function AuthenticitySection() {
    return (
        <section className="relative py-28 bg-transparent z-20">

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
                    <FadeIn>
                        <div className="max-w-2xl lg:pr-6">
                            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 mb-8 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                                Authenticité
                                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.05] dark:text-white">
                                Vos créateurs doivent parler de vous{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-rose-500">
                                    naturellement.
                                </span>
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-white/60">
                                Sinon, l&apos;audience le sent. Et vous perdez de l&apos;argent.
                            </p>

                            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
                                <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-3 dark:text-white/40">Pourquoi ça marche</p>
                                <p className="text-lg text-slate-700 leading-relaxed dark:text-white/80">
                                    Le public détecte instantanément le contenu plaqué. Nous privilégions la cohérence: ton, valeurs,
                                    audience, usage réel du produit.
                                </p>
                            </div>
                        </div>
                    </FadeIn>

                    <div className="relative mx-auto w-full max-w-[560px]">
                        {/* Subtle panel to anchor the stack (Apple-style) */}
                        <div className="absolute inset-0 -z-10 rounded-[36px] bg-white border border-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:bg-white/5 dark:border-white/10 dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)]" />
                        <StaggerContainer className="space-y-5 p-6 lg:p-8">
                            {AUTHENTICITY_CARDS.map((card) => (
                                <FadeIn key={card.id} delay={card.delay}>
                                    <div className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300/80 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10">
                                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-500 via-pink-500 to-rose-500 opacity-70" />
                                        <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 ${card.gradient} ${card.hover} group-hover:opacity-60`} />

                                        <div className="relative flex items-start gap-5">
                                            <div className="text-4xl md:text-5xl font-black text-slate-200 group-hover:text-slate-300 transition-colors dark:text-white/10 dark:group-hover:text-white/20">
                                                {card.id}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-semibold text-slate-900 mb-3 dark:text-white">
                                                    {card.title}
                                                </h3>
                                                <p className="text-slate-600 leading-relaxed dark:text-white/65">
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
                </div>
            </Container>
        </section>
    )
}
