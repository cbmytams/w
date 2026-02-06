"use client"

import { ShieldCheck, Calendar } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_BUSINESS, BRAND_GRADIENT } from "@/constants"
import { DealFlowWidget } from "./redesign/DealFlowWidget"

export function BusinessSection() {
    return (
        <section id="business" className="section-spacing px-4 bg-transparent">
            <Container>
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    {/* Left: Text */}
                    <RevealAnimation>
                        <span className="text-sm font-semibold text-pink-600 dark:text-pink-300 uppercase tracking-wider mb-4 block">
                            {TALENT_BUSINESS.label}
                        </span>
                        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-8">
                            {TALENT_BUSINESS.title}
                            <br />
                            <span className={`bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent`}>
                                {TALENT_BUSINESS.titleLine2}
                            </span>
                        </h2>

                        <div className="space-y-6 mb-10">
                            <p className="text-lg text-gray-600 dark:text-white/70">
                                {TALENT_BUSINESS.description}
                            </p>
                            <div className="pl-6 border-l-4 border-pink-300 dark:border-pink-500/40">
                                <p className="text-gray-500 dark:text-white/60 italic">
                                    &ldquo;{TALENT_BUSINESS.quote}&rdquo;
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {TALENT_BUSINESS.steps.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-pink-500/30 transition-colors"
                                >
                                    <span className={`w-10 h-10 rounded-full bg-gradient-to-r ${BRAND_GRADIENT} text-white text-sm font-bold flex items-center justify-center mr-4`}>
                                        {i + 1}
                                    </span>
                                    <p className="font-semibold text-gray-900 dark:text-white">{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <p className="text-xl font-medium text-gray-900 dark:text-white">
                                {TALENT_BUSINESS.conclusion.replace("Valider.", "")}
                                <span className={`bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent font-bold`}>
                                    Valider.
                                </span>
                            </p>
                        </div>
                    </RevealAnimation>

                    {/* Right: Visual */}
                    <RevealAnimation delay={0.2}>
                        <div className="relative bg-slate-50 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 flex flex-col items-center justify-center overflow-hidden min-h-[500px] shadow-[0_24px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                            <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px] opacity-50 dark:opacity-40" />
                            <div className="absolute inset-0 bg-[radial-gradient(340px_260px_at_20%_20%,rgba(236,72,153,0.08),transparent_60%)] dark:bg-[radial-gradient(340px_260px_at_20%_20%,rgba(236,72,153,0.12),transparent_60%)]" />

                            <div className="relative z-10 w-full">
                                <DealFlowWidget />
                            </div>
                        </div>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
