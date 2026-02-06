"use client"

import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"
import { ProductionsGrid } from "@/components/studio/ProductionsGrid"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function StudioPage() {
    return (
        <main id="main-content" className="fixed inset-0 z-50 bg-black text-white selection:bg-white selection:text-black overflow-hidden flex flex-col">
            {/* Ambient Background Light */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[1000px] h-[1000px] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[20%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
            </div>

            {/* Back Button (since we cover the navbar) */}
            <div className="absolute top-6 left-6 z-50">
                <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                </Link>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10 px-4 py-6 h-full">
                <Container className="h-full flex flex-col justify-between">
                    <h1 className="sr-only">Studio créatif Wafia</h1>
                    {/* Header Minimaliste - Top of Layout */}
                    <div className="text-center shrink-0 pt-4">
                        <FadeIn>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] uppercase font-bold tracking-[0.2em] text-white/50"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Wafia OS
                            </motion.div>
                        </FadeIn>
                    </div>

                    {/* Main Content - Centered */}
                    <div className="flex-1 min-h-0 flex items-center justify-center py-4 md:py-8">
                        <FadeIn delay={0.2} className="w-full h-full flex items-center justify-center">
                            <ProductionsGrid />
                        </FadeIn>
                    </div>

                    {/* Footer Hint - Bottom of Layout */}
                    <div className="text-center shrink-0 pb-4">
                        <FadeIn delay={0.4}>
                            <p className="text-xs font-medium text-white/20 tracking-widest uppercase">
                                Select a label to launch
                            </p>
                        </FadeIn>
                    </div>
                </Container>
            </div>
        </main>
    )
}
