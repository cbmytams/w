"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { BackgroundFlow } from "@/components/common/BackgroundFlow"
import { getGlobalBackgroundConfig } from "@/lib/background-flow"

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

    const config = getGlobalBackgroundConfig(pathname, searchParams.get("context"))
    return <BackgroundFlow variant={config.variant} intensity={config.intensity} />
}
