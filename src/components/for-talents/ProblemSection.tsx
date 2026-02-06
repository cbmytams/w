"use client"

import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_PROBLEM } from "@/constants"

export function ProblemSection() {
    return (
        <section id={TALENT_PROBLEM.id} className="section-spacing px-4 bg-transparent">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <RevealAnimation className="text-center">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8">
                            {TALENT_PROBLEM.title}
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-white/70 mb-8 leading-relaxed whitespace-pre-line">
                            {TALENT_PROBLEM.description}
                        </p>
                        <div className="inline-block px-6 py-3 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl">
                            <p className="text-lg font-medium text-slate-900 dark:text-white">
                                {TALENT_PROBLEM.conclusion}
                            </p>
                        </div>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
