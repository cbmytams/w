"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/common/SectionHeading"

/**
 * Section "Nos Réalisations" - Version premium pour la page Brands
 * Affiche 3 case studies avec images, résultats chiffrés et style glassmorphism
 */

const CASE_STUDIES = [
    {
        id: "aurum-tech",
        image: "/cases/tech-launch.png",
        category: "Lancement Produit",
        tags: ["Tech", "YouTube", "Macro-influenceurs"],
        title: "Aurum Tech",
        subtitle: "Lancement smartphone nouvelle génération",
        description: "Orchestration d'une campagne de lancement avec 15 micro-influenceurs Tech + 2 macro-influenceurs pour un reach maximal.",
        results: [
            { value: "1.5M", label: "Vues cumulées" },
            { value: "3.2%", label: "Taux d'engagement" },
            { value: "450", label: "Ventes trackées" }
        ],
        gradient: "from-orange-500 to-rose-500"
    },
    {
        id: "summer-vibes",
        image: "/cases/fashion-ugc.png",
        category: "UGC Campaign",
        tags: ["Fashion", "TikTok", "UGC"],
        title: "Summer Vibes",
        subtitle: "Collection été pour marque lifestyle",
        description: "Production de contenus 'Summer' authentiques avec 25 créateurs pour alimenter le compte TikTok et les assets Ads.",
        results: [
            { value: "25", label: "Créateurs activés" },
            { value: "50+", label: "Assets livrés" },
            { value: "100%", label: "Reuse rate Ads" }
        ],
        gradient: "from-yellow-500 to-orange-500"
    },
    {
        id: "neon-legends",
        image: "/cases/gaming-app.png",
        category: "App Install",
        tags: ["Gaming", "Twitch", "Performance"],
        title: "Neon Legends",
        subtitle: "Campagne acquisition mobile gaming",
        description: "Campagne à la performance avec tracking lien unique par créateur et challenge inter-communautés sur Twitch.",
        results: [
            { value: "-40%", label: "CPI vs Benchmark" },
            { value: "+15%", label: "Retention D30" },
            { value: "#1", label: "App Store France" }
        ],
        gradient: "from-purple-500 to-indigo-600"
    }
] as const

export function CaseStudiesSection() {
    return (
        <section className="py-32 px-4 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 dark:via-zinc-900/50 to-transparent pointer-events-none" />

            <Container>
                <div className="max-w-7xl mx-auto">
                    <SectionHeading
                        title={
                            <>
                                Ce qu'on a{" "}
                                <span className="text-gradient-brand">déjà fait.</span>
                            </>
                        }
                        subtitle="Des résultats concrets, pas des promesses."
                        className="mb-16 text-center"
                    />

                    {/* Case Studies Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {CASE_STUDIES.map((study, i) => (
                            <motion.div
                                key={study.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="group cursor-pointer"
                            >
                                <div className="h-full bg-white dark:bg-zinc-900 rounded-[28px] overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2">

                                    {/* Image Container */}
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={study.image}
                                            alt={study.title}
                                            fill
                                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-t ${study.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${study.gradient} shadow-lg`}>
                                                {study.category}
                                            </span>
                                        </div>

                                        {/* Play icon on hover */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                                                <Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {study.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-1 bg-gray-100 dark:bg-zinc-800 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-400"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Title & Description */}
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                            {study.title}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                                            {study.subtitle}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                            {study.description}
                                        </p>

                                        {/* Results */}
                                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
                                            {study.results.map((result, j) => (
                                                <div key={j} className="text-center">
                                                    <div className={`text-xl font-bold bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}>
                                                        {result.value}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                        {result.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-center"
                    >
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            Votre marque pourrait être la prochaine.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                asChild
                                className="rounded-full bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-semibold px-8 h-14 shadow-lg shadow-orange-500/20"
                            >
                                <Link href="/contact?type=brand">
                                    Discuter de votre projet
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="rounded-full border-2 border-gray-300 dark:border-zinc-700 hover:border-gray-400 px-8 h-14 font-semibold"
                            >
                                <Link href="/cases">
                                    Voir tous les projets
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}
