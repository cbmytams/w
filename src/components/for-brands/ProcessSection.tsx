"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Check, FileText } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/common/SectionHeading"
import { PROCESS_STEPS } from "@/constants/process-steps"
import { cn } from "@/lib/utils"

export function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // The central line fills up as we scroll
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section ref={containerRef} id="process" className="py-40 px-4 relative overflow-hidden">
            <Container>
                <div className="max-w-5xl mx-auto relative">
                    <SectionHeading
                        title={
                            <>
                                Un process{" "}
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">carré</span>
                            </>
                        }
                        subtitle="Simple, transparent, toujours humain. 🤝"
                        className="mb-24 text-center"
                    />

                    <div className="relative">
                        {/* THE NEURO-LINK SPINE (Central Line) */}
                        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 dark:bg-zinc-800 -translate-x-1/2 rounded-full overflow-hidden">
                            <motion.div
                                style={{ height: lineHeight }}
                                className="w-full bg-gradient-to-b from-orange-500 via-red-500 to-purple-600 shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                            />
                        </div>

                        <div className="space-y-24">
                            {PROCESS_STEPS.map((step, i) => {
                                const isEven = i % 2 === 0
                                return (
                                    <div key={i} className={cn(
                                        "relative flex items-center md:justify-between group",
                                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                                    )}>

                                        {/* Connector Node */}
                                        <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-zinc-950 border-4 border-gray-100 dark:border-zinc-800 z-10 flex items-center justify-center shadow-lg group-hover:border-orange-500 transition-colors duration-500">
                                            <div className="w-3 h-3 rounded-full bg-gray-300 group-hover:bg-orange-500 transition-colors duration-500" />
                                        </div>

                                        {/* Spacer to push content to side */}
                                        <div className="hidden md:block w-5/12" />

                                        {/* Content Card */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className={cn(
                                                "ml-16 md:ml-0 w-full md:w-5/12",
                                                "p-8 rounded-3xl",
                                                "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md", // Glass
                                                "border border-gray-200/50 dark:border-zinc-800",
                                                "hover:border-orange-500/30 hover:bg-white/80 dark:hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-orange-500/10",
                                                "transition-all duration-500"
                                            )}
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <span className="text-5xl font-bold text-gray-200 dark:text-zinc-800 font-heading select-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-red-600 transition-all duration-500">
                                                    {step.num}
                                                </span>
                                                <div className="h-px flex-1 bg-gray-100 dark:bg-zinc-800 group-hover:bg-orange-500/20 transition-colors" />
                                            </div>

                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                {step.title}
                                            </h3>

                                            <div className="flex items-center gap-2 text-sm font-semibold text-orange-600 mb-6 bg-orange-50 dark:bg-orange-900/20 w-fit px-3 py-1 rounded-full border border-orange-100 dark:border-orange-800/30">
                                                <FileText className="w-4 h-4" />
                                                {step.deliverable}
                                            </div>

                                            <ul className="space-y-3">
                                                {step.points.map((point, j) => (
                                                    <li key={j} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" strokeWidth={3} />
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
