"use client"

import { RevealAnimation } from "./RevealAnimation"

interface SectionHeadingProps {
    title: React.ReactNode
    subtitle?: string
    align?: "left" | "center"
    className?: string
    id?: string
}

export function SectionHeading({ title, subtitle, align = "center", className = "", id }: SectionHeadingProps) {
    return (
        <RevealAnimation className={className} id={id}>
            <div className={`${align === "center" ? "text-center" : "text-left"} mb-16`}>
                <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-xl text-slate-600 dark:text-slate-400">{subtitle}</p>
                )}
            </div>
        </RevealAnimation>
    )
}
