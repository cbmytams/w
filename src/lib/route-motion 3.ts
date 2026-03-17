import type { Transition, Variants } from "framer-motion"

export type RouteCluster = "home" | "talents" | "brands" | "studio" | "other"

export function getRouteCluster(pathname: string): RouteCluster {
    if (pathname === "/") return "home"
    if (pathname.startsWith("/for-talents")) return "talents"
    if (pathname.startsWith("/for-brands")) return "brands"
    if (pathname.startsWith("/studio")) return "studio"
    return "other"
}

export const routeTransitionVariants: Record<RouteCluster, Variants> = {
    home: {
        // Returning to home should feel like a downward settle (from top to center).
        initial: { opacity: 1, y: -34, scale: 0.996 },
        animate: { opacity: 1, y: 0, scale: 1 },
        // Leaving home for Studio should climb upward.
        exit: { opacity: 1, y: -34, scale: 0.996 },
    },
    talents: {
        // Smooth palette handoff from home dark stage to talents nebula background.
        initial: { opacity: 0.82, y: 14, scale: 1.002 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0.92, y: -8, scale: 0.998 },
    },
    brands: {
        // Smooth palette handoff from home dark stage to brands warm background.
        initial: { opacity: 0.82, y: 14, scale: 1.002 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0.92, y: -8, scale: 0.998 },
    },
    studio: {
        // Studio enters from below and exits downward when returning home.
        initial: { opacity: 1, y: 34, scale: 0.996 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 1, y: 34, scale: 0.996 },
    },
    other: {
        initial: { opacity: 0, y: 10, scale: 0.997 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.998 },
    },
}

const DESKTOP_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const TABLET_EASE: [number, number, number, number] = [0.24, 1, 0.34, 1]
const MOBILE_EASE: [number, number, number, number] = [0.25, 1, 0.3, 1]

export type RouteDeviceProfile = "desktop" | "tablet" | "mobile"

export const routeTransitionTiming: Record<RouteCluster, Record<RouteDeviceProfile, Transition>> = {
    home: {
        desktop: { duration: 0.46, ease: DESKTOP_EASE },
        tablet: { duration: 0.4, ease: TABLET_EASE },
        mobile: { duration: 0.34, ease: MOBILE_EASE },
    },
    talents: {
        desktop: { duration: 0.44, ease: DESKTOP_EASE },
        tablet: { duration: 0.38, ease: TABLET_EASE },
        mobile: { duration: 0.34, ease: MOBILE_EASE },
    },
    brands: {
        desktop: { duration: 0.44, ease: DESKTOP_EASE },
        tablet: { duration: 0.38, ease: TABLET_EASE },
        mobile: { duration: 0.34, ease: MOBILE_EASE },
    },
    studio: {
        desktop: { duration: 0.46, ease: DESKTOP_EASE },
        tablet: { duration: 0.4, ease: TABLET_EASE },
        mobile: { duration: 0.34, ease: MOBILE_EASE },
    },
    other: {
        desktop: { duration: 0.38, ease: DESKTOP_EASE },
        tablet: { duration: 0.34, ease: TABLET_EASE },
        mobile: { duration: 0.3, ease: MOBILE_EASE },
    },
}

export const veilVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: [0, 0.1, 0] },
    exit: { opacity: 0 },
}

export const veilTransition: Transition = {
    duration: 0.16,
    times: [0, 0.35, 1],
    ease: [0.4, 0, 0.2, 1],
}

export const routeVeilClassNames: Record<RouteCluster, string> = {
    home: "bg-transparent",
    talents: "bg-gradient-to-br from-violet-400/10 via-transparent to-transparent dark:from-violet-400/12",
    brands: "bg-gradient-to-br from-orange-400/10 via-transparent to-transparent dark:from-orange-400/12",
    studio: "bg-transparent",
    other: "bg-gradient-to-b from-white/10 via-transparent to-transparent dark:from-white/8",
}

// Fixed continuity backdrop to prevent body flash during route handoff.
export const routeBackdropClassNames: Record<RouteCluster, string> = {
    home: "bg-[#050510]",
    talents: "bg-[#f8f7ff] dark:bg-[#050508]",
    brands: "bg-[#fff7f1] dark:bg-[#07080c]",
    studio: "bg-black",
    other: "bg-[var(--background)]",
}
