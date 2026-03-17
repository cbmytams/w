"use client"

import { useEffect, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import {
    getRouteCluster,
    routeBackdropClassNames,
    type RouteDeviceProfile,
    routeTransitionTiming,
    routeTransitionVariants,
    routeVeilClassNames,
    veilTransition,
    veilVariants,
} from "@/lib/route-motion"

interface PageTransitionProps {
    children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname() ?? "/"
    const prefersReducedMotion = useReducedMotion()
    const [deviceProfile, setDeviceProfile] = useState<RouteDeviceProfile>("desktop")
    const [routeContext, setRouteContext] = useState({ current: pathname, prev: pathname })

    // Use derived state pattern to update previousPathname *during* render synchronously
    // Eliminates the double-render/framer-motion reset caused by useEffect
    if (routeContext.current !== pathname) {
        setRouteContext({
            prev: routeContext.current,
            current: pathname,
        })
    }

    useEffect(() => {
        if (typeof window === "undefined") return

        const mobileMedia = window.matchMedia("(max-width: 768px)")
        const tabletMedia = window.matchMedia("(min-width: 769px) and (max-width: 1024px)")
        const update = () => {
            if (mobileMedia.matches) {
                setDeviceProfile("mobile")
                return
            }
            if (tabletMedia.matches) {
                setDeviceProfile("tablet")
                return
            }
            setDeviceProfile("desktop")
        }

        update()
        mobileMedia.addEventListener("change", update)
        tabletMedia.addEventListener("change", update)

        return () => {
            mobileMedia.removeEventListener("change", update)
            tabletMedia.removeEventListener("change", update)
        }
    }, [])

    // (useEffect for previousPathname removed, handled synchronously above)

    if (prefersReducedMotion) {
        return <>{children}</>
    }

    const previousCluster = getRouteCluster(routeContext.prev)
    const cluster = getRouteCluster(pathname)
    const isHomeToTalentsOrBrands =
        previousCluster === "home" && (cluster === "talents" || cluster === "brands")
    const transition = routeTransitionTiming[cluster][deviceProfile]
    const presenceMode: "sync" | "wait" =
        cluster === "home" || cluster === "studio" || isHomeToTalentsOrBrands ? "sync" : "wait"
    const backdropDurationClass = isHomeToTalentsOrBrands
        ? deviceProfile === "desktop"
            ? "duration-500"
            : "duration-300"
        : deviceProfile === "desktop"
            ? "duration-300"
            : "duration-200"
    const showContinuityBackdrop = cluster !== "talents" && cluster !== "brands"
    const veilClassName = isHomeToTalentsOrBrands
        ? cluster === "talents"
            ? "bg-gradient-to-b from-violet-500/16 via-transparent to-transparent"
            : "bg-gradient-to-b from-orange-500/16 via-transparent to-transparent"
        : routeVeilClassNames[cluster]

    return (
        <div className="relative w-full">
            {showContinuityBackdrop ? (
                <div
                    aria-hidden="true"
                    className={`pointer-events-none fixed inset-0 z-0 transition-colors ${backdropDurationClass} ${routeBackdropClassNames[cluster]}`}
                />
            ) : null}
            <AnimatePresence mode={presenceMode} initial={false}>
                <motion.div
                    key={pathname}
                    variants={routeTransitionVariants[cluster]}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="relative z-[1] w-full"
                >
                    <motion.div
                        aria-hidden="true"
                        className={`pointer-events-none fixed inset-0 z-[80] ${veilClassName}`}
                        variants={veilVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={veilTransition}
                    />
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
