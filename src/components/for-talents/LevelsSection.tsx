"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Check, Circle } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_TIMELINE } from "@/constants"

export function LevelsSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
    const highlight = TALENT_TIMELINE.highlightWord
    const titleParts = highlight ? TALENT_TIMELINE.title.split(highlight) : [TALENT_TIMELINE.title]

    return (
        <section ref={containerRef} id={TALENT_TIMELINE.id} className="section-spacing px-4 text-gray-900 dark:text-white relative">
            <Container>
                <div className="max-w-6xl mx-auto relative">
                    {/* Header */}
                    <RevealAnimation className="mb-20 max-w-3xl mx-auto text-center">
                        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            {titleParts.length > 1 ? (
                                <>
                                    {titleParts[0]}
                                    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                                        {highlight}
                                    </span>
                                    {titleParts[1]}
                                </>
                            ) : (
                                TALENT_TIMELINE.title
                            )}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 whitespace-pre-line">
                            {TALENT_TIMELINE.subtitle}
                        </p>
                    </RevealAnimation>

                    <div className="relative">
                        {/* Vertical Progress Line */}
                        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                style={{ height: lineHeight }}
                                className="w-full bg-gradient-to-b from-indigo-500 to-purple-500 origin-top"
                            />
                        </div>

                        {/* Phases */}
                        <div className="space-y-16">
                            {TALENT_TIMELINE.phases.map((phase, index) => (
                                <motion.div
                                    key={phase.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="relative pl-20 md:pl-28"
                                >
                                    {/* Phase Number Circle */}
                                    <div className="absolute left-0 md:left-3 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white dark:border-slate-900 z-10">
                                        {index}
                                    </div>

                                    {/* Phase Content Card */}
                                    <div className="group bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 hover:border-purple-500/50 dark:hover:border-purple-500/30 transition-all duration-300 shadow-xl hover:shadow-2xl">
                                        {/* Header */}
                                        <div className="mb-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-semibold tracking-widest text-purple-600 dark:text-purple-400">
                                                    {phase.name}
                                                </span>
                                                <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                                    {phase.duration}
                                                </span>
                                            </div>
                                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                                                {phase.objective}
                                            </h3>
                                        </div>

                                        {/* Actions */}
                                        <div className="mb-6">
                                            <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 tracking-wider">
                                                ACTIONS
                                            </div>
                                            <ul className="space-y-2">
                                                {phase.actions.map((action, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-white/80">
                                                        <Circle className="w-1.5 h-1.5 mt-2 shrink-0 fill-purple-500 text-purple-500" />
                                                        <span>{action}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Deliverables */}
                                        <div className="mb-6">
                                            <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 tracking-wider">
                                                LIVRABLES
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                {phase.deliverables.map((deliverable, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-900/30 rounded-lg"
                                                    >
                                                        <Check className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                                                        <span className="text-sm text-slate-700 dark:text-white/80">{deliverable}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Exit Criteria */}
                                        <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center shrink-0">
                                                    <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div>
                                                    <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1 tracking-wider">
                                                        SORTIE
                                                    </div>
                                                    <div className="text-slate-900 dark:text-white font-medium">
                                                        {phase.exitCriteria}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Signature */}
                    <RevealAnimation delay={0.5} className="mt-20 text-center">
                        <div className="inline-block px-6 py-4 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl">
                            <p className="text-lg text-slate-700 dark:text-white/90 font-medium">
                                {TALENT_TIMELINE.signature}
                            </p>
                        </div>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
