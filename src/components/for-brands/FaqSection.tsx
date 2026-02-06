"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { FAQ_ITEMS } from "@/constants/faq"

export function FaqSection() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <section id="faq" className="py-32 px-4">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <RevealAnimation>
                        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-16 text-center">
                            Questions fréquentes
                        </h2>
                    </RevealAnimation>

                    <div className="space-y-3">
                        {FAQ_ITEMS.map((faq, i) => (
                            <RevealAnimation key={i} delay={i * 0.03}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full text-left bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-zinc-900/80 transition-colors border border-gray-200/50 dark:border-zinc-800"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 pr-4">{faq.q}</h3>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                                    </div>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                <p className="text-gray-600 dark:text-gray-400 mt-4">
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
