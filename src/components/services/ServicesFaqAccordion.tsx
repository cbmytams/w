"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

type FaqItem = { q: string; a: string }

export function ServicesFaqAccordion({ items }: { items: FaqItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <div className="space-y-4">
            {items.map((item, i) => {
                const isOpen = openIndex === i
                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className={cn(
                            "group rounded-2xl border transition-all duration-300 overflow-hidden",
                            isOpen
                                ? "bg-white border-orange-200 shadow-lg shadow-orange-500/5"
                                : "bg-white/50 border-transparent hover:border-orange-200/50 hover:bg-white/80"
                        )}
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                        >
                            <span className={cn(
                                "text-lg md:text-xl font-medium transition-colors pr-8",
                                isOpen ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                            )}>
                                {item.q}
                            </span>
                            <span className={cn(
                                "relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 shrink-0",
                                isOpen
                                    ? "bg-orange-500 border-orange-500 text-white rotate-180"
                                    : "bg-slate-100 border-slate-200 text-slate-400 group-hover:bg-white group-hover:scale-110"
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
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                                        <p className="text-base leading-relaxed text-slate-600">
                                            {item.a}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )
            })}
        </div>
    )
}
