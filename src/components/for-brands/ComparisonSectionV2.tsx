"use client"

import { motion } from "framer-motion"
import { ArrowRight, X, Check } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/common/SectionHeading"

const COMPARISON_DATA = [
    {
        old: "Intuition & Casting subjectif",
        new: "Qualification par la Data"
    },
    {
        old: "PDF statique post-campagne",
        new: "Dashboard de pilotage Live 24/7"
    },
    {
        old: "Contenu jetable (usage unique)",
        new: "Asset Bank réutilisable (Ads)"
    },
    {
        old: "Opération ponctuelle 'One-Shot'",
        new: "Stratégie d'acquisition continue"
    },
    {
        old: "Black box (aucun apprentissage)",
        new: "Playbook itératif & transparent"
    }
]

export function ComparisonSectionV2() {
    return (
        <section className="py-24 md:py-32 px-4 bg-transparent relative overflow-hidden text-black dark:text-white">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <SectionHeading
                        title={
                            <>
                                Pourquoi les agences classiques{" "}
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">vous coûtent cher</span>
                            </>
                        }
                    />

                    <div className="mt-24 max-w-5xl mx-auto">

                        {/* Headers (Desktop only) */}
                        <div className="hidden md:flex items-center justify-between px-8 mb-6">
                            <div className="flex-1">
                                <span className="text-xs font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase">
                                    L'approche artisanale
                                </span>
                            </div>
                            <div className="w-16"></div>
                            <div className="flex-1 text-right">
                                <span className="text-xs font-bold tracking-[0.2em] text-orange-500 uppercase">
                                    Le standard Wafia
                                </span>
                            </div>
                        </div>

                        {/* Interactive List */}
                        <div className="space-y-4">
                            {COMPARISON_DATA.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                                    className="group relative flex flex-col md:flex-row items-center justify-between p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 hover:border-orange-500/30 transition-all duration-700 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.05)] overflow-hidden cursor-default"
                                >
                                    {/* Subtle Sweep Background on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/[0.03] dark:via-orange-500/[0.05] to-orange-500/[0.08] dark:to-orange-500/[0.1] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none" />

                                    {/* LEFT: Old Way */}
                                    <div className="flex-1 w-full flex flex-row-reverse md:flex-row items-center justify-between md:justify-start gap-4 text-slate-400 dark:text-slate-500 opacity-40 md:opacity-100 md:group-hover:opacity-40 transition-opacity duration-500 relative z-10">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 relative">
                                            <X className="w-4 h-4" />
                                        </div>
                                        <span className="text-lg md:text-xl font-medium tracking-tight">
                                            {item.old}
                                        </span>
                                    </div>

                                    {/* CENTER: The Bridge */}
                                    <div className="w-full md:w-24 h-12 md:h-16 shrink-0 flex items-center justify-center relative my-4 md:my-0 z-10">
                                        {/* Connecting Line */}
                                        <div className="absolute w-[2px] h-full md:w-full md:h-[2px] bg-orange-500/20 md:bg-slate-100 dark:md:bg-white/5 md:group-hover:bg-orange-500/20 transition-colors duration-700" />

                                        {/* Morphing Connector Button */}
                                        <div className="relative w-10 h-10 flex items-center justify-center transition-all duration-500 ease-[0.19,1,0.22,1] rounded-full border border-orange-500/50 scale-110 bg-white dark:bg-[#1a1a1a] shadow-[0_0_20px_rgba(249,115,22,0.2)] md:border-slate-200 dark:md:border-white/10 md:scale-100 md:bg-slate-50 dark:md:bg-[#111] md:shadow-sm md:group-hover:border-orange-500/50 md:group-hover:scale-110 md:group-hover:bg-white dark:md:group-hover:bg-[#1a1a1a] md:group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                                            <ArrowRight className="w-4 h-4 text-orange-500 rotate-90 md:text-slate-400 dark:md:text-slate-600 md:rotate-0 md:group-hover:text-orange-500 transition-colors duration-500" />
                                        </div>
                                    </div>

                                    {/* RIGHT: New Way (Wafia) */}
                                    <div className="flex-1 w-full flex items-center justify-end gap-5 text-slate-900 dark:text-white transition-transform duration-700 ease-[0.19,1,0.22,1] md:group-hover:-translate-x-2 relative z-10">
                                        <span className="text-xl md:text-2xl font-bold tracking-tight text-right drop-shadow-sm">
                                            {item.new}
                                        </span>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner group-hover:bg-gradient-to-br transition-all duration-700 ease-[0.19,1,0.22,1] bg-gradient-to-br from-orange-500 to-red-500 text-white md:bg-none md:bg-orange-100 dark:md:bg-orange-500/20 md:text-orange-600 dark:md:text-orange-400 md:group-hover:from-orange-500 md:group-hover:to-red-500 md:group-hover:text-white md:group-hover:bg-[length:100%_100%]">
                                            <Check className="w-5 h-5" strokeWidth={2.5} />
                                        </div>
                                    </div>

                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    )
}
