"use client"

import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"
import { EASING } from "@/lib/easing"
import { useRevealViewport } from "@/hooks/useRevealViewport"

interface FadeInProps {
    children: ReactNode
    className?: string
    delay?: number
    direction?: "up" | "down" | "left" | "right"
    noOpacity?: boolean
}

const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: 20 },
    right: { y: 0, x: -20 },
}

export function FadeIn({ children, className, delay = 0, direction = "up", noOpacity = false }: FadeInProps) {
    const offset = directions[direction]
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()

    if (disableMotion) {
        return <div className={className}>{children}</div>
    }

    const variants: Variants = {
        hidden: {
            opacity: noOpacity ? 1 : 0,
            ...offset,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: transitionDuration,
                delay: clampDelay(delay),
                ease: EASING.subtle,
            },
        },
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface StaggerContainerProps {
    children: ReactNode
    className?: string
    staggerDelay?: number
}

export function StaggerContainer({ children, className, staggerDelay = 0.1 }: StaggerContainerProps) {
    const { disableMotion, viewport } = useRevealViewport()

    if (disableMotion) {
        return <div className={className}>{children}</div>
    }

    const variants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: Math.min(Math.max(staggerDelay, 0), 0.18),
            },
        },
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}
