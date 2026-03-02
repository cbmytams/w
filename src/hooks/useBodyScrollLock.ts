"use client"

import { useCallback, useEffect, useRef } from "react"

type LockSnapshot = {
    scrollY: number
    previousBody: {
        position: string
        top: string
        left: string
        right: string
        width: string
        overflow: string
        paddingRight: string
        touchAction: string
        overscrollBehavior: string
    }
    previousHtml: {
        overflow: string
        overscrollBehavior: string
    }
    previousScrollBehavior: string
}

export function useBodyScrollLock() {
    const snapshotRef = useRef<LockSnapshot | null>(null)

    const lock = useCallback(() => {
        if (typeof window === "undefined" || snapshotRef.current) return

        const html = document.documentElement
        const body = document.body
        const scrollY = window.scrollY
        const scrollbarWidth = window.innerWidth - html.clientWidth

        snapshotRef.current = {
            scrollY,
            previousBody: {
                position: body.style.position,
                top: body.style.top,
                left: body.style.left,
                right: body.style.right,
                width: body.style.width,
                overflow: body.style.overflow,
                paddingRight: body.style.paddingRight,
                touchAction: body.style.touchAction,
                overscrollBehavior: body.style.overscrollBehavior,
            },
            previousHtml: {
                overflow: html.style.overflow,
                overscrollBehavior: html.style.overscrollBehavior,
            },
            previousScrollBehavior: html.style.scrollBehavior,
        }

        // Mobile-safe scroll lock: avoid body fixed positioning, which can crash
        // or freeze rendering on some WebKit builds when combined with overlays.
        html.style.overflow = "hidden"
        html.style.overscrollBehavior = "none"
        body.style.overflow = "hidden"
        body.style.touchAction = "none"
        body.style.overscrollBehavior = "none"

        if (scrollbarWidth > 0) {
            body.style.paddingRight = `${scrollbarWidth}px`
        }
    }, [])

    const unlock = useCallback(() => {
        if (typeof window === "undefined" || !snapshotRef.current) return

        const html = document.documentElement
        const body = document.body
        const snapshot = snapshotRef.current

        html.style.scrollBehavior = "auto"

        body.style.position = snapshot.previousBody.position
        body.style.top = snapshot.previousBody.top
        body.style.left = snapshot.previousBody.left
        body.style.right = snapshot.previousBody.right
        body.style.width = snapshot.previousBody.width
        body.style.overflow = snapshot.previousBody.overflow
        body.style.paddingRight = snapshot.previousBody.paddingRight
        body.style.touchAction = snapshot.previousBody.touchAction
        body.style.overscrollBehavior = snapshot.previousBody.overscrollBehavior
        html.style.overflow = snapshot.previousHtml.overflow
        html.style.overscrollBehavior = snapshot.previousHtml.overscrollBehavior

        window.scrollTo({ top: snapshot.scrollY, left: 0, behavior: "auto" })
        snapshotRef.current = null

        requestAnimationFrame(() => {
            html.style.scrollBehavior = snapshot.previousScrollBehavior
        })
    }, [])

    useEffect(() => {
        return () => {
            unlock()
        }
    }, [unlock])

    return { lock, unlock }
}
