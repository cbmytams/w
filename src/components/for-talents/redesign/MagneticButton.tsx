"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ReactNode, MouseEvent } from "react"
import Link from "next/link"

interface MagneticButtonProps {
    children: ReactNode
    href?: string
    onClick?: () => void
    className?: string
}

export function MagneticButton({ children, href, onClick, className = "" }: MagneticButtonProps) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20])
    const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20])

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const buttonContent = (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                translateX,
                translateY,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-12 py-6 text-xl font-bold rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/70 transition-all cursor-pointer inline-flex items-center gap-3 relative overflow-hidden ${className}`}
        >
            {/* Animated shine effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                    x: ["-100%", "200%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <span className="relative z-10">{children}</span>
        </motion.div>
    )

    if (href) {
        return <Link href={href}>{buttonContent}</Link>
    }

    return <div onClick={onClick}>{buttonContent}</div>
}
