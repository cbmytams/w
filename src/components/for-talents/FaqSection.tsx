"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, Sparkles } from "lucide-react"
import { Container } from "@/components/ui/container"
import { TALENT_FAQ } from "@/constants"
import { cn } from "@/lib/utils"
import { EASING } from "@/lib/easing"

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const allItems = TALENT_FAQ

    return (
        <section id="faq" className="py-24 lg:py-32 px-4 relative overflow-hidden bg-transparent z-10">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-[100px] -z-10" />

            <Container>
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider"
                        >
                            <Sparkles className="w-3 h-3" />
                            Support & Clarté
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight"
                        >
                            Questions fréquentes
                        </motion.h2>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-4">
                        {allItems.map((item, i) => (
                            <FaqItem
                                key={i}
                                item={item}
                                isOpen={openIndex === i}
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

function FaqItem({ item, isOpen, onClick, index }: { item: { q: string, a: React.ReactNode }, isOpen: boolean, onClick: () => void, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                "group rounded-2xl border transition-all duration-300 overflow-hidden",
                isOpen
                    ? "bg-white dark:bg-white/10 border-violet-200 dark:border-white/10 shadow-lg shadow-violet-500/5"
                    : "bg-white/50 dark:bg-white/5 border-transparent hover:border-violet-200/50 dark:hover:border-white/10 hover:bg-white/80 dark:hover:bg-white/10"
            )}
        >
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
            >
                <span className={cn(
                    "text-lg md:text-xl font-medium transition-colors pr-8",
                    isOpen ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
                )}>
                    {item.q}
                </span>
                <span className={cn(
                    "relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 shrink-0",
                    isOpen
                        ? "bg-violet-500 border-violet-500 text-white rotate-180"
                        : "bg-slate-100 dark:bg-white/10 border-slate-200 dark:border-white/10 text-slate-400 group-hover:bg-white group-hover:scale-110"
                )}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASING.easeInOut }}
                    >
                        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                            <div className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                                {item.a}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
