"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { EASING } from "@/lib/easing"
import { useRevealViewport } from "@/hooks/useRevealViewport"

interface RevealProps {
    children: ReactNode
    delay?: number
    className?: string
    id?: string
}

/**
 * Animation de révélation au scroll.
 * Desktop: replay autorisé pour garder la page vivante.
 * Mobile: animation once pour préserver les performances.
 */
export function RevealAnimation({ children, delay = 0, className = "", id }: RevealProps) {
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()

    if (disableMotion) {
        return (
            <div id={id} className={className}>
                {children}
            </div>
        )
    }

    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{
                duration: transitionDuration,
                delay: clampDelay(delay),
                ease: EASING.subtle,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
