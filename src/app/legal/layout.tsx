"use client"

import { PageShell } from "@/components/common/PageShell"
import { LegalTopNav, type LegalNavContext } from "@/components/legal/LegalTopNav"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function LegalLayoutContent({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams()
    const contextParam = searchParams.get("context")
    const context: LegalNavContext =
        contextParam === "brands" || contextParam === "talents" ? contextParam : "default"

    return (
        <PageShell nav={<LegalTopNav context={context} />}>
            <div className="relative z-10 min-h-screen px-4 pb-24 pt-28">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </div>
        </PageShell>
    )
}

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={null}>
            <LegalLayoutContent>{children}</LegalLayoutContent>
        </Suspense>
    )
}
