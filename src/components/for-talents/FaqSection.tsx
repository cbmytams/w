"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_FAQ } from "@/constants"

export function FaqSection() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <section id="faq" className="py-32 px-4 bg-gray-50">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <RevealAnimation>
                        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-16 text-center">
                            Questions fréquentes
                        </h2>
                    </RevealAnimation>

                    <div className="space-y-3">
                        {TALENT_FAQ.map((faq, i) => (
                            <RevealAnimation key={i} delay={i * 0.03}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full text-left bg-white rounded-2xl p-6 hover:bg-gray-100/50 transition-colors border border-gray-100"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-gray-900 pr-4">{faq.q}</h3>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                                    </div>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                <p className="text-gray-600 mt-4">
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </RevealAnimation>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
