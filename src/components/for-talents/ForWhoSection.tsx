"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_FOR_WHO } from "@/constants"

export function ForWhoSection() {
    return (
        <section id={TALENT_FOR_WHO.id} className="section-spacing px-4 bg-transparent">
            <Container>
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <RevealAnimation className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
                            {TALENT_FOR_WHO.title}
                        </h2>
                    </RevealAnimation>

                    {/* Two Column Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* For You */}
                        <RevealAnimation delay={0.1}>
                            <div className="p-8 bg-white dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-green-200 dark:border-green-900/30 shadow-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                        <Check className="w-6 h-6 text-white" strokeWidth={3} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {TALENT_FOR_WHO.forYou.title}
                                    </h3>
                                </div>

                                <ul className="space-y-4">
                                    {TALENT_FOR_WHO.forYou.items.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <Check className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                                            <span className="text-slate-700 dark:text-white/80 leading-relaxed">
                                                {item}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </RevealAnimation>

                        {/* Not For You */}
                        <RevealAnimation delay={0.2}>
                            <div className="p-8 bg-white dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-red-200 dark:border-red-900/30 shadow-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                                        <X className="w-6 h-6 text-white" strokeWidth={3} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {TALENT_FOR_WHO.notForYou.title}
                                    </h3>
                                </div>

                                <ul className="space-y-4">
                                    {TALENT_FOR_WHO.notForYou.items.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <X className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                                            <span className="text-slate-700 dark:text-white/80 leading-relaxed">
                                                {item}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </RevealAnimation>
                    </div>
                </div>
            </Container>
        </section>
    )
}
