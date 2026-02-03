"use client"

import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MAIN_NAVIGATION, FOOTER_NAVIGATION, SOCIAL_LINKS } from "@/constants/navigation"

export function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200">
            <Container className="py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand & Social */}
                    <div className="space-y-4 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold font-heading text-slate-900">
                            Wafia
                        </Link>
                        <p className="text-sm text-slate-600 max-w-xs">
                            Agence hybride : Influence &amp; Talent Management, Studio Créatif, Stratégie et Systèmes.
                            Campagnes traçables, production brand-ready.
                        </p>
                        <div className="flex gap-3 pt-4">
                            {SOCIAL_LINKS.map((item) => {
                                const Icon = item.icon
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="h-9 w-9 rounded-full bg-slate-200 hover:bg-slate-900 flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 hover:scale-110"
                                        aria-label={item.name}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Main Navigation */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-4">Agence</h3>
                        <ul className="space-y-3">
                            {[...MAIN_NAVIGATION, { name: "Contact", href: "/contact" }].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Navigation */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-4">Légal</h3>
                        <ul className="space-y-3">
                            {FOOTER_NAVIGATION.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-4">Newsletter</h3>
                        <p className="text-sm text-slate-600 mb-4">
                            Recevez nos insights sur l&apos;influence marketing.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Email"
                                className="h-9"
                            />
                            <Button size="sm" className="shrink-0">
                                OK
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} Wafia. Tous droits réservés.
                    </p>
                    <div className="flex gap-4">
                        <span className="text-xs text-slate-400">Compliance by design</span>
                        <span className="text-xs text-slate-400">ARPP / RGPD</span>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
