"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface GradientBackgroundProps {
    variant?: "hero" | "dark" | "medium" | "light"
    children: ReactNode
    className?: string
}

export function GradientBackground({ variant = "hero", children, className = "" }: GradientBackgroundProps) {
    const gradients = {
        hero: "bg-gradient-to-b from-slate-900 via-indigo-950 to-violet-900",
        dark: "bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-900",
        medium: "bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600",
        light: "bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50"
    }

    return (
        <div className={`relative ${gradients[variant]} ${className}`}>
            {/* Animated gradient overlay */}
            <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                    background: [
                        "radial-gradient(circle at 0% 0%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 0%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
                    ]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:32px_32px]" />

            {/* Content */}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    )
}
