"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_DELIVERABLES } from "@/constants"
import { DeliverableDetailDrawer } from "./DeliverableDetailDrawer"
import { ArrowRight } from "lucide-react"
import { useRevealViewport } from "@/hooks/useRevealViewport"

type DeliverableItem = typeof TALENT_DELIVERABLES.items[number]

export function DeliverablesSection() {
    const [selectedItem, setSelectedItem] = useState<DeliverableItem | null>(null)
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()

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
                                initial={disableMotion ? false : { opacity: 0, y: 20 }}
                                whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                                viewport={disableMotion ? undefined : viewport}
                                transition={disableMotion ? undefined : { duration: transitionDuration, delay: clampDelay(index * 0.07) }}
                                whileTap={disableMotion ? undefined : {
                                    scale: 0.96,
                                    transition: { duration: 0.1, ease: "easeOut" }
                                }}
                                onClick={() => setSelectedItem(item)}
                                className="group relative p-8 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-[40px] rounded-2xl border border-black/[0.05] dark:border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.08)] dark:shadow-none hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 text-left cursor-pointer focus-visible:outline-none flex flex-col min-h-[240px] active:scale-[0.98]"
                                aria-label={`Voir le détail: ${item.title}`}
                            >
                                <div className="flex flex-col h-full relative z-10">
                                    {/* Top Row: Huge Icon + Minimal Arrow */}
                                    <div className="flex justify-between items-start mb-auto w-full">
                                        <div className="text-[42px] leading-none drop-shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.15] origin-top-left">
                                            {item.icon}
                                        </div>
                                        {/* Always-visible subtle affordance (fixes mobile non-clickability issue), highlights on hover */}
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] group-hover:bg-purple-500/10 dark:group-hover:bg-purple-500/20 group-hover:border-purple-500/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-110">
                                            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-white/30 group-hover:text-purple-600 dark:group-hover:text-purple-300 -rotate-45 transition-colors duration-500" />
                                        </div>
                                    </div>

                                    {/* Bottom Content: Ultra Clean Typography */}
                                    <div className="mt-12">
                                        <h3 className="text-[22px] font-bold tracking-tight text-slate-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-[14px] font-medium text-slate-500 dark:text-white/50 leading-relaxed tracking-wide">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>

                                {/* Subtle Light Leak for Glass Edge */}
                                <div className="absolute inset-0 rounded-2xl border border-white/20 dark:border-white/5 pointer-events-none" />

                                {/* Organic Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-violet-500/0 group-hover:from-purple-500/[0.03] group-hover:to-violet-500/[0.03] dark:group-hover:from-purple-500/[0.05] dark:group-hover:to-violet-500/[0.05] rounded-2xl transition-all duration-500 pointer-events-none" />
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
