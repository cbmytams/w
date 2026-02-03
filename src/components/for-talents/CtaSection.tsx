"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { motion } from "framer-motion"

export function CtaSection() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-black" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-rose-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-rose-300 text-sm font-medium mb-8 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4" />
                            Rejoignez l'élite des créateurs
                        </span>

                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight font-heading">
                            Prêt à passer au <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400">
                                niveau supérieur
                            </span>
                            {" ?"}
                        </h2>

                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Nous ne cherchons pas tout le monde. Nous cherchons les visionnaires.
                            Postulez pour rejoindre le roster Wafia.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="h-14 px-8 rounded-full bg-white text-black hover:bg-gray-100 font-semibold text-lg transition-all hover:scale-105"
                            >
                                <Link href="/contact?type=talent">
                                    Candidater maintenant <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}
