import { ReactNode } from "react"

interface InlineCalloutProps {
    title: string
    subtitle?: string
    bullets?: string[]
    children?: ReactNode
    accentColor?: "orange" | "red" | "pink"
    className?: string
}

/**
 * Composant callout inline pour mettre en avant des informations
 * Server Component - pas besoin de "use client"
 */
export function InlineCallout({
    title,
    subtitle,
    bullets,
    children,
    accentColor = "orange",
    className = ""
}: InlineCalloutProps) {
    const colorClasses = {
        orange: "border-orange-200 bg-orange-50/50",
        red: "border-red-200 bg-red-50/50",
        pink: "border-pink-200 bg-pink-50/50"
    }

    const textColorClasses = {
        orange: "text-orange-600",
        red: "text-red-600",
        pink: "text-pink-600"
    }

    return (
        <div className={`mt-6 p-6 rounded-2xl border-2 ${colorClasses[accentColor]} ${className}`}>
            <h4 className={`text-lg font-bold ${textColorClasses[accentColor]} mb-2`}>
                {title}
            </h4>

            {subtitle && (
                <p className="text-sm text-slate-600 mb-3 font-medium">
                    {subtitle}
                </p>
            )}

            {bullets && bullets.length > 0 && (
                <ul className="space-y-2">
                    {bullets.map((bullet, i) => (
                        <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                            <span className={`${textColorClasses[accentColor]} mt-1`}>•</span>
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            )}

            {children}
        </div>
    )
}
