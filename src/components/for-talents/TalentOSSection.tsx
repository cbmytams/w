"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_OS_SYSTEM, BRAND_GRADIENT } from "@/constants"
import { cn } from "@/lib/utils"

export function TalentOSSection() {
    const titleParts = TALENT_OS_SYSTEM.title.split(TALENT_OS_SYSTEM.highlightWord)

    return (
        <section id={TALENT_OS_SYSTEM.id} className="section-spacing px-4">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <RevealAnimation className="max-w-3xl mb-14">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            {titleParts[0]}
                            <span className={`bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent`}>
                                {TALENT_OS_SYSTEM.highlightWord}
                            </span>
                            {titleParts[1]}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-white/70">
                            {TALENT_OS_SYSTEM.subtitle}
                        </p>
                    </RevealAnimation>

                    <div className="grid md:grid-cols-3 gap-6">
                        {TALENT_OS_SYSTEM.items.map((item, i) => {
                            const isWide = i === 0 || i === 3
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-120px" }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className={cn(
                                        "relative rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.35)] overflow-hidden",
                                        isWide && "md:col-span-2"
                                    )}
                                >
                                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-pink-500/10 via-violet-500/10 to-transparent" />
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl">{item.icon}</span>
                                        <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed">
                                        {item.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>

                    <RevealAnimation delay={0.2} className="mt-12">
                        <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-6 py-5 text-sm text-gray-600 dark:text-white/70 backdrop-blur-xl shadow-[0_18px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
                            {TALENT_OS_SYSTEM.footer}
                        </div>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
