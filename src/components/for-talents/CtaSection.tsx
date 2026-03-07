"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { MagneticButton } from "@/components/for-talents/redesign/MagneticButton"
import { TALENT_CTA } from "@/constants"
import { buildTalentQuestionnaireHref } from "@/lib/talent-questionnaire"

export function CtaSection() {
    const ctaHref = buildTalentQuestionnaireHref("for-talents-final-cta")

    return (
        <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 relative z-10">
            <Container>
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative p-12 sm:p-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:24px_24px]" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                                {TALENT_CTA.title}
                            </h2>

                            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                                {TALENT_CTA.description}
                            </p>

                            <MagneticButton href={ctaHref}>
                                {TALENT_CTA.ctaText} <ArrowRight className="h-5 w-5" />
                            </MagneticButton>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}
