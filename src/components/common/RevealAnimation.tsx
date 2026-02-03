"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { EASING, DURATION } from "@/lib/easing"

interface RevealProps {
    children: ReactNode
    delay?: number
    className?: string
}

/**
 * Animation de révélation au scroll
 * Utilise les easings centralisés du design system
 */
export function RevealAnimation({ children, delay = 0, className = "" }: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: DURATION.slow,
                delay,
                ease: EASING.apple
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
