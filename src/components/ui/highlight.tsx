import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HighlightProps {
    children: ReactNode
    className?: string
    color?: "primary" | "secondary" | "default"
}

const colorClasses = {
    primary: "text-indigo-600",
    secondary: "text-pink-600",
    default: "text-slate-600",
}

export function Highlight({ children, className, color = "primary" }: HighlightProps) {
    return (
        <span className={cn(colorClasses[color], "font-extrabold", className)}>
            {children}
        </span>
    )
}
