"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { EASING, DURATION } from "@/lib/easing"

interface PageTransitionProps {
    children: ReactNode
}

/**
 * Wraps page content with smooth entry animation
 * Simplified to avoid AnimatePresence conflicts with whileInView animations
 */
export function PageTransition({ children }: PageTransitionProps) {
    return (
        <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{
                duration: DURATION.fast,
                ease: EASING.apple
            }}
        >
            {children}
        </motion.div>
    )
}
