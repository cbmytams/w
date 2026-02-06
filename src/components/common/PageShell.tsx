import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { BackgroundFlow, type BackgroundFlowVariant } from "@/components/common/BackgroundFlow"

interface PageShellProps {
    variant?: BackgroundFlowVariant
    nav?: ReactNode
    children: ReactNode
    className?: string
}

export function PageShell({ variant = "brands", nav, children, className }: PageShellProps) {
    return (
        <main
            id="main-content"
            className={cn(
                "min-h-screen relative overflow-x-hidden text-slate-900 dark:text-white bg-transparent",
                className
            )}
        >
            <BackgroundFlow variant={variant} />

            <div className="relative z-10">
                {nav}
                {children}
            </div>
        </main>
    )
}
