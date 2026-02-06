"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_DELIVERABLES } from "@/constants"
import { DeliverableDetailDrawer } from "./DeliverableDetailDrawer"
import { ArrowRight } from "lucide-react"

type DeliverableItem = typeof TALENT_DELIVERABLES.items[number]

export function DeliverablesSection() {
    const [selectedItem, setSelectedItem] = useState<DeliverableItem | null>(null)

    return (
        <section id={TALENT_DELIVERABLES.id} className="section-spacing px-4">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <RevealAnimation className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                            {TALENT_DELIVERABLES.title}
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-white/70">
                            {TALENT_DELIVERABLES.subtitle}
                        </p>
                    </RevealAnimation>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TALENT_DELIVERABLES.items.map((item, index) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                onClick={() => setSelectedItem(item)}
                                className="group relative p-6 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 active:scale-[0.98]"
                                aria-label={`Voir le détail: ${item.title}`}
                            >
                                {/* Chevron Indicator */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                                    <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>

                                {/* Icon */}
                                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                                    {item.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {item.title}
                                </h3>

                                {/* Subtitle */}
                                <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed mb-3">
                                    {item.subtitle}
                                </p>

                                {/* MicroDescription (NEW) */}
                                {item.microDescription && (
                                    <p className="text-xs text-slate-500 dark:text-white/60 leading-relaxed">
                                        {item.microDescription}
                                    </p>
                                )}

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-violet-500/0 group-hover:from-purple-500/5 group-hover:to-violet-500/5 rounded-2xl transition-all duration-300 pointer-events-none" />

                                {/* Subtle hint text on hover (desktop only) */}
                                <div className="hidden md:block absolute bottom-4 right-4 text-xs text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Voir le détail →
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </Container>

            {/* Detail Drawer */}
            <DeliverableDetailDrawer
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </section>
    )
}
