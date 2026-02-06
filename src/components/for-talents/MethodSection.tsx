"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_METHOD } from "@/constants"

export function MethodSection() {
    return (
        <section id={TALENT_METHOD.id} className="section-spacing px-4">
            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <RevealAnimation className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                            {TALENT_METHOD.title}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-white/70">
                            {TALENT_METHOD.subtitle}
                        </p>
                    </RevealAnimation>

                    {/* Steps Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TALENT_METHOD.steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative group"
                            >
                                {/* Connecting Line (Desktop Only) */}
                                {index < TALENT_METHOD.steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-16 left-full w-6 h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent -translate-x-full" />
                                )}

                                {/* Step Card */}
                                <div className="relative p-6 bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-500/30 transition-all duration-300 h-full">
                                    {/* Step Number */}
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white font-bold text-xl flex items-center justify-center mb-4 shadow-lg">
                                        {step.number}
                                    </div>

                                    {/* Duration Badge */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400 mb-4">
                                        {step.duration}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-600 dark:text-white/70 mb-3 leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Details */}
                                    <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">
                                        {step.details}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
