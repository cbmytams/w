"use client"

import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_PROBLEM } from "@/constants"

export function ConstatSection() {
    return (
        <section id="constat" className="section-spacing px-4 relative z-10">
            <Container>
                <div className="max-w-4xl mx-auto text-center">

                    {/* Label */}
                    <RevealAnimation className="mb-6">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Le constat
                        </span>
                    </RevealAnimation>

                    {/* Title */}
                    <RevealAnimation delay={0.08} className="mb-8">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                            {TALENT_PROBLEM.title}
                        </h2>
                    </RevealAnimation>

                    {/* Description */}
                    <RevealAnimation delay={0.14} className="mb-8">
                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            {TALENT_PROBLEM.description}
                        </p>
                    </RevealAnimation>

                    {/* Pain Tags */}
                    <RevealAnimation delay={0.2} className="flex flex-wrap justify-center gap-2">
                        {TALENT_PROBLEM.painTags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 rounded-full text-xs font-medium bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
