"use client"

import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"
import { ProductionsGrid } from "@/components/studio/ProductionsGrid"
import { SmartBackButton } from "@/components/ui/SmartBackButton"
import { ArrowLeft } from "lucide-react"

export default function StudioPage() {
    return (
        <main id="main-content" className="fixed inset-0 z-50 bg-[#0b111a] text-white selection:bg-white selection:text-black flex flex-col overflow-hidden">
            {/* Ambient Background Light */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[1000px] h-[1000px] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[20%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
            </div>

            {/* Back Button (since we cover the navbar) */}
            <div className="absolute top-6 left-6 z-50">
                <SmartBackButton
                    fallback="/"
                    ariaLabel="Retour à l'accueil"
                    className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                </SmartBackButton>
            </div>

            <div className="flex-1 flex flex-col relative z-10 h-full overflow-y-auto overflow-x-hidden pt-24 pb-6 px-4 md:pt-6 md:justify-center">
                <Container className="flex-none min-h-full flex flex-col justify-between">
                    <h1 className="sr-only">Studio créatif Wafia</h1>

                    {/* Main Content - Centered */}
                    <div className="flex-1 min-h-0 flex items-center justify-center py-4 md:py-8">
                        <FadeIn delay={0.2} className="w-full flex items-center justify-center">
                            <ProductionsGrid />
                        </FadeIn>
                    </div>

                    {/* Footer Hint - Bottom of Layout */}
                    <div className="text-center shrink-0 pb-4">
                        <FadeIn delay={0.4}>
                            <p className="text-xs font-medium text-white/20 tracking-widest uppercase">
                                Sélectionnez un label pour explorer
                            </p>
                        </FadeIn>
                    </div>
                </Container>
            </div>
        </main>
    )
}
