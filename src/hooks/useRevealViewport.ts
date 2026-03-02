"use client"

import { useEffect, useMemo, useState } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type RevealViewport = {
    once: boolean
    amount: number
    margin: string
}

const DESKTOP_VIEWPORT: RevealViewport = {
    once: false,
    amount: 0.22,
    margin: "-120px 0px -120px 0px",
}

const MOBILE_VIEWPORT: RevealViewport = {
    once: true,
    amount: 0.16,
    margin: "-80px 0px -80px 0px",
}

export function useRevealViewport() {
    const prefersReducedMotion = useReducedMotion()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (typeof window === "undefined") return

        const media = window.matchMedia("(max-width: 768px)")
        const update = () => setIsMobile(media.matches)

        update()
        media.addEventListener("change", update)

        return () => media.removeEventListener("change", update)
    }, [])

    return useMemo(() => {
        const transitionDuration = isMobile ? 0.36 : 0.5
        const maxDelay = 0.36

        return {
            disableMotion: prefersReducedMotion,
            viewport: isMobile ? MOBILE_VIEWPORT : DESKTOP_VIEWPORT,
            transitionDuration,
            maxDelay,
            clampDelay: (delay = 0) => Math.min(Math.max(delay, 0), maxDelay),
        }
    }, [isMobile, prefersReducedMotion])
}
