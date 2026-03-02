"use client"

import { usePathname } from "next/navigation"
import { FloatingNavigation } from "@/components/for-brands/FloatingNavigation"
import { TalentsFloatingNavigation } from "@/components/for-talents/TalentsFloatingNavigation"

export function GlobalNav() {
    const pathname = usePathname()

    // Studio page has its own layout/UI
    if (pathname?.startsWith("/studio")) {
        return null
    }

    // Wiki has its own navigation
    if (pathname?.startsWith("/wiki")) {
        return null
    }

    // Home page has its own specific navigation
    if (pathname === "/") {
        return null
    }

    // Brands page specific nav
    if (pathname?.startsWith("/for-brands")) {
        const navigateToQuestionnaire = () => {
            if (typeof window !== 'undefined') {
                window.location.assign('/questionnaire-brands/index.html')
            }
        }
        return <FloatingNavigation onEstimateClick={navigateToQuestionnaire} />
    }

    // Talents page specific nav
    if (pathname?.startsWith("/for-talents")) {
        return <TalentsFloatingNavigation />
    }

    // All other pages manage their own navigation
    return null
}
