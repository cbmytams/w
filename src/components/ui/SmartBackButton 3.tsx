"use client"

import type { ReactNode } from "react"
import { useCallback } from "react"
import { useRouter } from "next/navigation"

interface SmartBackButtonProps {
    fallback: string
    children: ReactNode
    className?: string
    ariaLabel?: string
}

export function SmartBackButton({ fallback, children, className, ariaLabel }: SmartBackButtonProps) {
    const router = useRouter()

    const onBack = useCallback(() => {
        if (typeof window !== "undefined" && window.history.length > 2) {
            router.back()
            return
        }
        router.push(fallback)
    }, [fallback, router])

    return (
        <button type="button" onClick={onBack} className={className} aria-label={ariaLabel}>
            {children}
        </button>
    )
}
