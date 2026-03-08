"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SmartBackButton } from "@/components/ui/SmartBackButton"
import { cn } from "@/lib/utils"

import { motion } from "framer-motion"

export type LegalNavContext = "brands" | "talents" | "default"

const LEGAL_LINKS = [
    { href: "/legal/mentions", label: "Mentions légales" },
    { href: "/legal/privacy", label: "Confidentialité" },
    { href: "/legal/cookies", label: "Cookies" },
] as const

const CTA_CONFIG: Record<LegalNavContext, { href: string; label: string }> = {
    brands: { href: "/questionnaire/brands", label: "Estimer mon plan" },
    talents: { href: "/for-talents#contact", label: "Rejoindre Wafia" },
    default: { href: "/questionnaire/brands", label: "Nous contacter" },
}

const BACK_ROUTE: Record<LegalNavContext, string> = {
    brands: "/for-brands",
    talents: "/for-talents",
    default: "/",
}

interface LegalTopNavProps {
    context: LegalNavContext
}

export function LegalTopNav({ context }: LegalTopNavProps) {
    const pathname = usePathname()
    const cta = CTA_CONFIG[context]

    return (
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-fit px-4 sm:px-0">
            <div className="h-14 bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 flex items-center justify-between gap-2 md:gap-4 relative overflow-x-auto no-scrollbar">
                <SmartBackButton
                    fallback={BACK_ROUTE[context]}
                    ariaLabel="Retour"
                    className="shrink-0 flex items-center justify-center h-10 w-10 md:w-auto md:px-4 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-slate-300 group"
                >
                    <span className="md:hidden">←</span>
                    <span className="hidden md:inline-flex md:items-center md:gap-2">
                        <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Retour
                    </span>
                </SmartBackButton>

                <div className="flex items-center gap-1 shrink-0 relative z-10 h-10 px-2 lg:px-4">
                    {LEGAL_LINKS.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`relative h-9 px-4 sm:px-5 rounded-full transition-all duration-300 text-[13px] font-semibold leading-[1.2] text-center flex items-center justify-center whitespace-nowrap ${isActive ? "text-gray-900 dark:text-white" : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeBubbleLegal"
                                        className="absolute inset-0 bg-white/60 dark:bg-white/20 rounded-full shadow-sm border border-black/5 dark:border-white/10"
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>

                <a
                    href={cta.href}
                    className="shrink-0 inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#FF4C00] to-[#FF8C00] px-6 text-[13px] font-bold tracking-wide text-white transition-all hover:scale-105 active:scale-95 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40"
                >
                    {cta.label}
                </a>
            </div>
        </nav>
    )
}
