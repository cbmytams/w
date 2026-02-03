"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Play, ExternalLink, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/**
 * Page Cases - Version premium avec animations et design moderne
 * Affiche tous les case studies avec images, résultats et animations
 */

const CASE_STUDIES = [
    {
        id: "aurum-tech",
        image: "/cases/tech-launch.png",
        category: "Lancement Produit",
        tags: ["Tech", "YouTube", "Macro-influenceurs"],
        title: "Aurum Tech",
        subtitle: "Lancement smartphone nouvelle génération",
        description: "Orchestration d'une campagne de lancement avec 15 micro-influenceurs Tech + 2 macro-influenceurs pour un reach maximal. Stratégie multi-plateforme coordonnée sur YouTube, Instagram et Twitter.",
        challenge: "Générer du hype pré-launch et convertir en ventes day-one.",
        results: [
            { value: "1.5M", label: "Vues cumulées" },
            { value: "3.2%", label: "Taux d'engagement" },
            { value: "450", label: "Ventes trackées" },
            { value: "48h", label: "Sold out" }
        ],
        gradient: "from-orange-500 to-rose-500"
    },
    {
        id: "summer-vibes",
        image: "/cases/fashion-ugc.png",
        category: "UGC Campaign",
        tags: ["Fashion", "TikTok", "UGC", "Instagram"],
        title: "Summer Vibes",
        subtitle: "Collection été pour marque lifestyle",
        description: "Production de contenus 'Summer' authentiques avec 25 créateurs diversifiés pour alimenter le compte TikTok et générer des assets réutilisables en paid media.",
        challenge: "Créer un catalogue UGC varié et authentique, réutilisable en Ads.",
        results: [
            { value: "25", label: "Créateurs activés" },
            { value: "50+", label: "Assets livrés" },
            { value: "100%", label: "Reuse rate Ads" },
            { value: "-35%", label: "CPA vs stock" }
        ],
        gradient: "from-yellow-500 to-orange-500"
    },
    {
        id: "neon-legends",
        image: "/cases/gaming-app.png",
        category: "App Install",
        tags: ["Gaming", "Twitch", "Performance", "Streaming"],
        title: "Neon Legends",
        subtitle: "Campagne acquisition mobile gaming",
        description: "Campagne à la performance avec tracking lien unique par créateur et challenge inter-communautés sur Twitch. Activation de streamers mid-tier pour un équilibre reach/engagement.",
        challenge: "Maximiser les installs qualifiés tout en maintenant une rétention D30 élevée.",
        results: [
            { value: "-40%", label: "CPI vs Benchmark" },
            { value: "+15%", label: "Retention D30" },
            { value: "#1", label: "App Store France" },
            { value: "50K+", label: "Installs/semaine" }
        ],
        gradient: "from-purple-500 to-indigo-600"
    },
    {
        id: "beauty-launch",
        image: "/cases/tech-launch.png",
        category: "Brand Awareness",
        tags: ["Beauté", "Instagram", "YouTube"],
        title: "Glow Cosmetics",
        subtitle: "Lancement nouvelle gamme skincare",
        description: "Activation de 30 créatrices beauté pour le lancement d'une gamme skincare premium. Mix de macro et micro influence avec contenus tutoriels et avant/après authentiques.",
        challenge: "Créer de la confiance autour d'une nouvelle marque sur un marché saturé.",
        results: [
            { value: "2.8M", label: "Impressions" },
            { value: "30", label: "Créatrices" },
            { value: "+180%", label: "Traffic site" },
            { value: "4.8★", label: "Note moyenne" }
        ],
        gradient: "from-pink-500 to-rose-500"
    },
    {
        id: "food-delivery",
        image: "/cases/fashion-ugc.png",
        category: "Performance",
        tags: ["Food", "TikTok", "Performance"],
        title: "QuickBite",
        subtitle: "Expansion app livraison food",
        description: "Campagne d'acquisition massive sur TikTok pour le lancement dans 5 nouvelles villes. Codes promo trackés par créateur et contenus natifs humoristiques.",
        challenge: "Acquérir rapidement des first-time users dans des zones à forte concurrence.",
        results: [
            { value: "15K+", label: "Nouveaux users" },
            { value: "€3.20", label: "CPA moyen" },
            { value: "45%", label: "Retention D7" },
            { value: "5", label: "Villes lancées" }
        ],
        gradient: "from-green-500 to-emerald-500"
    },
    {
        id: "fitness-app",
        image: "/cases/gaming-app.png",
        category: "Subscription",
        tags: ["Fitness", "YouTube", "Subscription"],
        title: "FitPro Plus",
        subtitle: "Croissance abonnements app fitness",
        description: "Partenariats long-terme avec 10 créateurs fitness/lifestyle pour promouvoir l'abonnement premium. Contenus type 'ma routine avec FitPro' authentiques.",
        challenge: "Générer des conversions sur un modèle subscription avec trial gratuit.",
        results: [
            { value: "+85%", label: "Trial starts" },
            { value: "38%", label: "Trial→Paid" },
            { value: "10", label: "Ambassadeurs" },
            { value: "€8.50", label: "CPA paid sub" }
        ],
        gradient: "from-blue-500 to-cyan-500"
    }
] as const

export default function CasesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-zinc-950 dark:to-black">

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px]" />
                <div className="absolute top-[60%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <Container className="relative z-10">
                {/* Header with Back Button */}
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="pt-8 pb-4"
                >
                    <Button
                        variant="ghost"
                        asChild
                        className="group mb-8 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        <Link href="/for-brands">
                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Retour aux services
                        </Link>
                    </Button>
                </motion.div>

                {/* Hero Header */}
                <motion.div
                    initial={{ y: 30 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-center max-w-4xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-rose-100 dark:from-orange-900/30 dark:to-rose-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-6">
                        <Sparkles className="w-4 h-4" />
                        Nos réalisations
                    </div>
                    <h1 className="font-heading text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Des résultats,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">
                            pas des promesses.
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Chaque campagne est unique. Voici comment nous avons aidé des marques à atteindre leurs objectifs.
                    </p>
                </motion.div>

                {/* Cases Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {CASE_STUDIES.map((study, i) => (
                        <motion.div
                            key={study.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                            className="group"
                        >
                            <div className="h-full bg-white dark:bg-zinc-900 rounded-[28px] overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2">

                                {/* Image Container */}
                                <div className="relative h-52 overflow-hidden">
                                    <Image
                                        src={study.image}
                                        alt={study.title}
                                        fill
                                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t ${study.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${study.gradient} shadow-lg`}>
                                            {study.category}
                                        </span>
                                    </div>

                                    {/* View icon on hover */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                                            <ExternalLink className="w-5 h-5 text-gray-900" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {study.tags.slice(0, 3).map(tag => (
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
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                                        {study.description}
                                    </p>

                                    {/* Challenge */}
                                    <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-3 mb-4">
                                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Challenge</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{study.challenge}</p>
                                    </div>

                                    {/* Results */}
                                    <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100 dark:border-zinc-800">
                                        {study.results.map((result, j) => (
                                            <div key={j} className="text-center">
                                                <div className={`text-lg font-bold bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}>
                                                    {result.value}
                                                </div>
                                                <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-tight">
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

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center pb-24"
                >
                    <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800 rounded-[32px] p-12 border border-gray-100 dark:border-zinc-700 shadow-xl">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Votre marque pourrait être ici.
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Prêt à créer votre propre success story ?
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                asChild
                                className="rounded-full bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-semibold px-8 h-14 shadow-lg shadow-orange-500/20"
                            >
                                <Link href="/contact?type=brand">
                                    Discuter de votre projet
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="rounded-full border-2 border-gray-300 dark:border-zinc-700 px-8 h-14 font-semibold"
                            >
                                <Link href="/for-brands">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Voir nos services
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </div>
    )
}
