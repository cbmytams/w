"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * bfcache (Back-Forward Cache) can snapshot a page right as it is animating
 * or has scroll locks applied (e.g., when a drawer was open or transitioning).
 * 
 * When the user navigates "Back", Safari/iOS/Chrome restore the exact frozen DOM state,
 * which means `overflow: hidden` might still be attached to the body/html, completely
 * freezing the user out of scrolling.
 * 
 * This component listens to `pageshow` (which fires on bfcache restore)
 * and forcefully cleans up any global scroll locks.
 */
export function BfCacheScrollRecovery() {
    const pathname = usePathname()

    useEffect(() => {
        const handlePageShow = (event: PageTransitionEvent) => {
            // event.persisted is true if the page was restored from bfcache
            if (event.persisted) {
                const html = document.documentElement
                const body = document.body

                html.style.overflow = ""
                html.style.overscrollBehavior = ""

                body.style.overflow = ""
                body.style.touchAction = ""
                body.style.overscrollBehavior = ""
                body.style.position = ""
                body.style.top = ""
                body.style.width = ""
                body.style.paddingRight = ""
            }
        }

        window.addEventListener("pageshow", handlePageShow)

        // Also fire cleanup immediately on mount (React strict mode / client nav fallback)
        const html = document.documentElement
        const body = document.body
        html.style.overflow = ""
        body.style.overflow = ""

        return () => {
            window.removeEventListener("pageshow", handlePageShow)
        }
    }, [pathname])

    return null
}
