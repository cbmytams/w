"use client"

import { motion } from "framer-motion"

interface FloatingMetricsProps {
    value: string
    label: string
    delay?: number
}

export function FloatingMetrics({ value, label, delay = 0 }: FloatingMetricsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20"
        >
            <motion.div
                animate={{
                    y: [0, -5, 0],
                    rotateY: [0, 10, 0, -10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent"
                style={{ transformStyle: "preserve-3d" }}
            >
                {value}
            </motion.div>
            <span className="text-sm font-medium text-slate-600 dark:text-white/80">{label}</span>

            {/* Floating particles */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-pink-400 rounded-full"
                    animate={{
                        y: [0, -20, 0],
                        x: [0, (i - 1) * 10, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                />
            ))}
        </motion.div>
    )
}
