"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface GradientRevealTextProps {
    children: ReactNode
    className?: string
    delay?: number
}

export function GradientRevealText({ children, className = "", delay = 0 }: GradientRevealTextProps) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay }}
            className={`relative ${className}`}
        >
            {/* Gradient text */}
            <motion.div
                initial={{ backgroundPosition: "0% 100%" }}
                whileInView={{ backgroundPosition: "0% 0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
                className="bg-gradient-to-b from-slate-900 via-slate-600 to-pink-600 dark:from-white dark:via-pink-200 dark:to-cyan-300 bg-clip-text text-transparent"
                style={{ backgroundSize: "100% 200%" }}
            >
                {children}
            </motion.div>

            {/* Glow effect */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 0.5, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: delay + 0.5 }}
                className="absolute inset-0 blur-3xl bg-gradient-to-r from-pink-500/20 via-cyan-500/20 to-violet-500/20 dark:from-pink-500/30 dark:via-cyan-500/30 dark:to-violet-500/30 -z-10"
            />
        </motion.div>
    )
}
