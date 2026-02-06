"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, X, Check, ArrowRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { HERO_STATS } from "@/constants/clients"
import { BRAND_HERO_CONTENT } from "@/constants"

interface HeroSectionProps {
    onDashboardClick: () => void
}

export function HeroSection({ onDashboardClick }: HeroSectionProps) {
    return (
        <section className="pt-32 pb-20 px-4">
            <Container>
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider px-4 py-2 bg-gray-50 rounded-full">
                            <Sparkles className="w-4 h-4" />
                            {BRAND_HERO_CONTENT.badge}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 leading-[1.05] mb-8"
                    >
                        {BRAND_HERO_CONTENT.title.line1}{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            {BRAND_HERO_CONTENT.title.highlight}
                        </span>
                    </motion.h1>

                    {/* Sous-texte "Anti-Marché" */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="max-w-2xl mx-auto mb-12"
                    >
                        <div className="space-y-3 text-xl sm:text-2xl font-medium">
                            {BRAND_HERO_CONTENT.antiMarket.map((item, i) => (
                                <p key={i} className={`${item.type === 'check' ? 'text-green-600 font-semibold' : 'text-gray-700'} flex items-center justify-center gap-3`}>
                                    {item.type === 'check' ? (
                                        <Check className="w-6 h-6 shrink-0" />
                                    ) : (
                                        <X className="w-5 h-5 text-red-500 shrink-0" />
                                    )}
                                    <span>{item.text}</span>
                                </p>
                            ))}
                        </div>

                        {/* Timing line */}
                        <p className="text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
                            {BRAND_HERO_CONTENT.timing}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button size="lg" asChild className="h-14 px-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg font-semibold shadow-xl shadow-orange-500/25">
                            <Link href="/contact?type=brand">
                                Lancer une campagne <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" onClick={onDashboardClick} className="h-14 px-10 rounded-full border-2 border-gray-300 hover:border-gray-400 text-lg font-semibold">
                            <Eye className="mr-2 h-5 w-5" />
                            Voir le dashboard
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-wrap justify-center gap-12 mt-20 pt-12 border-t border-gray-200"
                    >
                        {HERO_STATS.map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <div className="text-4xl font-bold text-gray-900 mb-1">{item.stat}</div>
                                <div className="text-sm text-gray-600">{item.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}
