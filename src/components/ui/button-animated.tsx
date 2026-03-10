"use client"

import { ReactNode, forwardRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { EASING } from "@/lib/easing"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface BaseButtonProps {
    children: ReactNode
    className?: string
    variant?: "primary" | "secondary" | "ghost"
    size?: "sm" | "md" | "lg"
    href?: string
    onClick?: () => void
    disabled?: boolean
}

const ButtonAnimated = forwardRef<HTMLButtonElement | HTMLAnchorElement, BaseButtonProps>(
    ({ children, className, variant = "primary", size = "md", href, onClick, disabled }, ref) => {
        const prefersReducedMotion = useReducedMotion()

        // Size classes
        const sizeClasses = {
            sm: "px-6 py-2.5 text-sm",
            md: "px-8 py-3.5 text-base",
            lg: "px-12 py-4 text-lg",
        }

        // Variant classes
        const variantClasses = {
            primary: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40",
            secondary: "border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-900",
            ghost: "bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900",
        }

        const baseClasses = cn(
            "relative inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all overflow-hidden",
            sizeClasses[size],
            variantClasses[variant],
            disabled && "opacity-50 cursor-not-allowed pointer-events-none",
            className
        )

        // Animation variants
        const buttonVariants = prefersReducedMotion
            ? undefined
            : {
                rest: { scale: 1 },
                hover: { scale: 1.02 },
                tap: { scale: 0.98 },
            }

        const shineVariants = {
            rest: { x: "-100%" },
            hover: {
                x: "200%",
                transition: {
                    duration: 0.8,
                    ease: EASING.apple,
                },
            },
        }

        const content = (
            <>
                {/* Shine effect for primary variant */}
                {variant === "primary" && !disabled && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        variants={shineVariants}
                        initial="rest"
                    />
                )}
                <span className="relative z-10">{children}</span>
            </>
        )

        if (href) {
            return (
                <Link href={href} className="inline-block">
                    <motion.div
                        className={baseClasses}
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        {content}
                    </motion.div>
                </Link>
            )
        }

        return (
            <motion.button
                ref={ref as React.Ref<HTMLButtonElement>}
                className={baseClasses}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={onClick}
                disabled={disabled}
            >
                {content}
            </motion.button>
        )
    }
)

ButtonAnimated.displayName = "ButtonAnimated"

export { ButtonAnimated }
