"use client"

import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_LEVELS } from "@/constants"

export function LevelsSection() {
    return (
        <section id="levels" className="py-32 px-4 bg-black text-white">
            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <RevealAnimation className="mb-20">
                        <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                            {TALENT_LEVELS.title}
                        </h2>
                        <p className="text-xl text-gray-400 whitespace-pre-line max-w-2xl">
                            {TALENT_LEVELS.subtitle}
                        </p>
                    </RevealAnimation>

                    {/* Levels Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {TALENT_LEVELS.levels.map((level, i) => (
                            <RevealAnimation key={i} delay={i * 0.1}>
                                <div className="border border-white/10 rounded-3xl p-8 bg-white/5 hover:bg-white/10 transition-colors h-full">
                                    <div className="text-sm font-mono text-pink-400 mb-2">
                                        PHASE {i + 1}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">
                                        {level.name}
                                    </h3>
                                    <div className="text-sm text-gray-400 mb-8 border-b border-white/10 pb-4 inline-block">
                                        Durée : {level.duration}
                                    </div>
                                    <ul className="space-y-4">
                                        {level.items.map((item, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2.5" />
                                                <span className="text-gray-300 text-lg">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </RevealAnimation>
                        ))}
                    </div>

                    {/* Signature */}
                    <RevealAnimation delay={0.4} className="mt-16 text-center">
                        <p className="text-xl text-gray-400 italic">
                            &ldquo;{TALENT_LEVELS.signature}&rdquo;
                        </p>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
