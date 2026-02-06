"use client"

import { Check } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_PROOF_STRIP, BRAND_GRADIENT } from "@/constants"

export function ProofStripSection() {
    const titleParts = TALENT_PROOF_STRIP.title.split(TALENT_PROOF_STRIP.highlightWord)

    return (
        <section id={TALENT_PROOF_STRIP.id} className="section-spacing px-4">
            <Container>
                <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
                    <RevealAnimation>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            {titleParts[0]}
                            <span className={`bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent`}>
                                {TALENT_PROOF_STRIP.highlightWord}
                            </span>
                            {titleParts[1]}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-white/70 whitespace-pre-line mb-8">
                            {TALENT_PROOF_STRIP.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {TALENT_PROOF_STRIP.badges.map((badge) => (
                                <span
                                    key={badge}
                                    className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/80"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </RevealAnimation>

                    <RevealAnimation delay={0.15}>
                        <div className="rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-xl p-8 shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                                <span className="text-xs font-mono text-gray-500 dark:text-white/60 tracking-[0.3em]">
                                    STANDARD
                                </span>
                            </div>
                            <ul className="space-y-4">
                                {TALENT_PROOF_STRIP.bullets.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-white/80">
                                        <span className="mt-1 h-5 w-5 rounded-full bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center">
                                            <Check className="h-3.5 w-3.5 text-pink-600 dark:text-pink-300" strokeWidth={3} />
                                        </span>
                                        <span className="text-base leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
