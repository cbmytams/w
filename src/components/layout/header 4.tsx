"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MAIN_NAVIGATION } from "@/constants/navigation"
import { buildTalentQuestionnaireHref } from "@/lib/talent-questionnaire"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const talentDesktopHref = buildTalentQuestionnaireHref("header-desktop")
    const talentMobileHref = buildTalentQuestionnaireHref("header-mobile")

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Lock body scroll when mobile menu is open
    React.useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [mobileMenuOpen])

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "border-b border-slate-200 bg-white/80 backdrop-blur-md"
                    : "bg-transparent py-2"
            )}
        >
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold tracking-tight font-heading">
                            Wafia
                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-8">
                        {MAIN_NAVIGATION.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium leading-6 text-slate-900 transition-colors hover:text-slate-600"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:gap-x-4">
                        <Button variant="ghost" asChild>
                            <Link href="/questionnaire/brands">Je suis une Marque</Link>
                        </Button>
                        <Button asChild>
                            <Link href={talentDesktopHref}>Je suis un Talent</Link>
                        </Button>
                    </div>
                    <div className="flex lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
                            aria-expanded={mobileMenuOpen}
                        >
                            <span className="sr-only">Ouvrir le menu principal</span>
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </Button>
                    </div>
                </div>
            </Container>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full border-b border-slate-200 bg-white shadow-lg">
                    <Container className="py-6 space-y-4">
                        {MAIN_NAVIGATION.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-base font-semibold leading-7 text-slate-900 hover:text-slate-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="mt-6 flex flex-col gap-3">
                            <Button className="w-full justify-center" variant="secondary" asChild onClick={() => setMobileMenuOpen(false)}>
                                <Link href="/questionnaire/brands">Marque / Agence</Link>
                            </Button>
                            <Button className="w-full justify-center" asChild onClick={() => setMobileMenuOpen(false)}>
                                <Link href={talentMobileHref}>Talent / Créateur</Link>
                            </Button>
                        </div>
                    </Container>
                </div>
            )}
        </header>
    )
}
