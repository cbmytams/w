"use client"

import { useEffect, useState } from "react"

/**
 * Hook to detect if user prefers reduced motion
 * Respects system-level accessibility settings
 */
export function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        // Initialize with SSR-safe default
        if (typeof window === "undefined") return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

        // Listen for changes
        const handleChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches)
        }

        mediaQuery.addEventListener("change", handleChange)

        return () => {
            mediaQuery.removeEventListener("change", handleChange)
        }
    }, [])

    return prefersReducedMotion
}
