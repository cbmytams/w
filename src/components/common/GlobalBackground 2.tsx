"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { BackgroundFlow } from "@/components/common/BackgroundFlow"

export function GlobalBackground() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Studio page has its own background
    if (pathname?.startsWith("/studio")) {
        return null
    }

    // Home page has its own background (Particles)
    if (pathname === "/") {
        return null
    }

    // Wiki has its own visual shell
    if (pathname?.startsWith("/wiki")) {
        return null
    }

    // Talents pages
    if (pathname?.startsWith("/for-talents")) {
        return <BackgroundFlow variant="talents" />
    }

    // Legal pages: respect ?context param, default to talents
    if (pathname?.startsWith("/legal")) {
        const context = searchParams.get("context")
        return <BackgroundFlow variant={context === "brands" ? "brands" : "talents"} />
    }

    // Default to brands background for other pages
    return <BackgroundFlow variant="brands" />
}
