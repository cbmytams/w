"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

interface SlideDividerProps {
    index: string
    label: string
    className?: string
}

export function SlideDivider({ index, label, className = "" }: SlideDividerProps) {
    return (
        <div className={cn("py-8 md:py-12", className)}>
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-6"
                >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent dark:via-white/10 opacity-60" />
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/70 dark:bg-white/[0.08] border border-gray-200/70 dark:border-white/10 backdrop-blur-xl shadow-md shadow-black/5 dark:shadow-black/20">
                        <span className="text-xs font-mono text-pink-600 dark:text-pink-300 tracking-[0.3em]">
                            {index}
                        </span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-white/80">
                            {label}
                        </span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent dark:via-white/10 opacity-60" />
                </motion.div>
            </Container>
        </div>
    )
}
