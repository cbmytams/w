"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { BarChart3, Database, Globe, LineChart, Zap } from "lucide-react"
import { Container } from "@/components/ui/container"

/**
 * Global Presentation Widget - Bento Grid Style
 * Présente l'autorité de l'agence : Chiffres clés, Expertise visuelle, Outils.
 */

const TOOLS = [
    { name: "TikTok Creative Center", icon: "/tiktok.svg" },
    { name: "HypeAuditor", icon: BarChart3 },
    { name: "Favikon", icon: Zap },
    { name: "Traackr", icon: Database },
    { name: "Kolsquare", icon: LineChart },
    { name: "Modash", icon: Globe },
]

export function GlobalPresentationSection() {
    return (
        <section className="py-24 px-4 w-full overflow-hidden">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* 1. Stats Card: Projets (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-4 bg-white dark:bg-zinc-900 rounded-[32px] p-8 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-center items-start hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group"
                    >
                        <div className="flex items-start gap-1 mb-4">
                            <span className="text-7xl font-bold tracking-tighter text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors duration-300">
                                100
                            </span>
                            <span className="text-4xl font-light text-orange-500 mt-2">+</span>
                        </div>
                        <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
                            Projets et campagnes d&apos;influence orchestrés depuis 2020.
                        </p>
                    </motion.div>

                    {/* 2. Stats Card: Années (Small) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:col-span-3 bg-white dark:bg-zinc-900 rounded-[32px] p-8 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-center items-start hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group"
                    >
                        <div className="flex items-start gap-1 mb-4">
                            <span className="text-7xl font-bold tracking-tighter text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors duration-300">
                                4
                            </span>
                            <span className="text-4xl font-light text-purple-500 mt-2">+</span>
                        </div>
                        <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
                            Années d&apos;expertise data-driven.
                        </p>
                    </motion.div>

                    {/* 3. Expertise Visual Card (Tall) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:col-span-5 md:row-span-2 relative rounded-[32px] overflow-hidden group min-h-[400px]"
                    >
                        <Image
                            src="/wafia_abstract_expertise.png"
                            alt="Wafia Expertise Abstract"
                            fill
                            sizes="(min-width: 768px) 42vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-xs font-medium text-white uppercase tracking-wider">Expertise</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                                Stratèges Influence & Contenu.
                            </h3>
                            <p className="text-white/70 text-sm mb-6">
                                Une approche chirurgicale qui mêle créativité et performance pour maximiser votre ROI.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {["Beauté", "Tech", "Lifestyle", "Food"].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-xs text-white font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. Tools Marquee (Wide) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="md:col-span-7 bg-white dark:bg-zinc-900 rounded-[32px] p-8 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-slate-200 dark:hover:border-zinc-700 transition-colors"
                    >
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                            Powered by Data.
                        </h4>

                        <div className="flex flex-wrap gap-4 items-center justify-start opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {TOOLS.map((tool, i) => (
                                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-zinc-800 rounded-full border border-slate-100 dark:border-zinc-700">
                                    {typeof tool.icon === 'string' ? (
                                        <Image src={tool.icon} alt={tool.name} width={16} height={16} className="w-4 h-4" />
                                    ) : (
                                        <tool.icon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                    )}
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </Container>
        </section>
    )
}
