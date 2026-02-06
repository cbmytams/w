"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface GradientBackgroundProps {
    variant?: "hero" | "dark" | "medium" | "light" | "blend"
    children: ReactNode
    className?: string
}

export function GradientBackground({ variant = "hero", children, className = "" }: GradientBackgroundProps) {
    const gradients = {
        hero: "bg-gradient-to-b from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-indigo-950 dark:to-violet-900",
        dark: "bg-gradient-to-br from-slate-800 via-indigo-900 to-violet-900 dark:from-indigo-950 dark:via-purple-900 dark:to-violet-900",
        medium: "bg-gradient-to-br from-blue-200 via-indigo-200 to-violet-200 dark:from-blue-600 dark:via-indigo-600 dark:to-violet-600",
        light: "bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50",
        blend: "bg-transparent"
    }
    const isBlend = variant === "blend"

    return (
        <div className={`relative ${gradients[variant]} ${className}`}>
            {isBlend && (
                <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/60 to-transparent dark:from-[#0b0f1a]/80 dark:via-[#0b0f1a]/50 dark:to-transparent pointer-events-none" />
            )}
            {/* Animated gradient overlay */}
            <motion.div
                className={`absolute inset-0 ${isBlend ? "opacity-[0.16] dark:opacity-[0.28] [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]" : "opacity-20 dark:opacity-35"}`}
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
            <div className={`absolute inset-0 ${isBlend ? "opacity-[0.05] dark:opacity-[0.08] [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]" : "opacity-10"} bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:32px_32px]`} />

            {/* Content */}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    )
}
