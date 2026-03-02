"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SmartBackButton } from "@/components/ui/SmartBackButton"
import { cn } from "@/lib/utils"

export type LegalNavContext = "brands" | "talents" | "default"

const LEGAL_LINKS = [
    { href: "/legal/mentions", label: "Mentions légales" },
    { href: "/legal/privacy", label: "Confidentialité" },
    { href: "/legal/cookies", label: "Cookies" },
] as const

const CTA_CONFIG: Record<LegalNavContext, { href: string; label: string }> = {
    brands: { href: "/questionnaire-brands/index.html", label: "Estimer mon plan" },
    talents: { href: "/for-talents#contact", label: "Rejoindre Wafia" },
    default: { href: "/contact", label: "Nous contacter" },
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
        <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
                <SmartBackButton
                    fallback={BACK_ROUTE[context]}
                    ariaLabel="Retour"
                    className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                    ← Retour
                </SmartBackButton>

                <div className="hidden items-center gap-3 md:flex">
                    {LEGAL_LINKS.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "rounded-full px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                                    isActive ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
                                )}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </div>

                <a
                    href={cta.href}
                    className="inline-flex min-h-11 items-center rounded-full bg-orange-500 px-4 text-sm font-semibold text-black transition-colors hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                >
                    {cta.label}
                </a>
            </div>
        </nav>
    )
}
