"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"

interface CtaSectionProps {
    onEstimateClick: () => void
}

export function CtaSection({ onEstimateClick }: CtaSectionProps) {
    return (
        <section className="py-40 px-4">
            <Container>
                <div className="max-w-4xl mx-auto text-center">
                    <RevealAnimation>
                        <h2 className="text-5xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-8">
                            Votre prochaine campagne{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                                mérite mieux.
                            </span>
                        </h2>
                    </RevealAnimation>

                    <RevealAnimation delay={0.2}>
                        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-12">
                            Parlons de vos objectifs. On vous montre exactement comment on les atteint.
                        </p>
                    </RevealAnimation>

                    <RevealAnimation delay={0.4}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" asChild className="h-16 px-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xl font-semibold shadow-2xl shadow-orange-500/25">
                                <Link href="/contact?type=brand">Réserver un appel stratégique</Link>
                            </Button>
                            <Button size="lg" onClick={onEstimateClick} variant="outline" className="h-16 px-12 rounded-full border-2 border-gray-300 hover:border-gray-400 text-xl font-semibold">
                                Estimer mon plan
                            </Button>
                        </div>
                    </RevealAnimation>

                    <RevealAnimation delay={0.6}>
                        <p className="mt-8 text-sm text-gray-500 flex items-center justify-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Réponse sous 24h · Process clair · Zéro blabla
                        </p>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
