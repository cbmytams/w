"use client"

import * as React from "react"
import Link from "next/link"
import { Instagram, Youtube, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Mock Data
const talents = [
    {
        id: 1,
        name: "Sarah M.",
        category: "Lifestyle",
        platforms: ["instagram", "tiktok"],
        style: "Esthétique, Voyage, Mode",
        gradient: "from-pink-400 via-rose-300 to-orange-200",
    },
    {
        id: 2,
        name: "Thomas Tech",
        category: "Tech",
        platforms: ["youtube", "twitter"],
        style: "Tests, Tutoriels, News",
        gradient: "from-cyan-400 via-blue-300 to-indigo-200",
    },
    {
        id: 3,
        name: "Léa Cuisine",
        category: "Food",
        platforms: ["instagram", "tiktok", "youtube"],
        style: "Recettes rapides, Healthy",
        gradient: "from-amber-400 via-orange-300 to-rose-200",
    },
    {
        id: 4,
        name: "Alex Sport",
        category: "Sport",
        platforms: ["instagram", "tiktok"],
        style: "Coaching, Motivation",
        gradient: "from-emerald-400 via-teal-300 to-cyan-200",
    },
    { // Duplicate for grid filling
        id: 5,
        name: "Julie Design",
        category: "Art",
        platforms: ["instagram", "linkedin"],
        style: "Illustration, Freelance life",
        gradient: "from-purple-400 via-violet-300 to-fuchsia-200",
    },
    {
        id: 6,
        name: "Marc Humor",
        category: "Entertainment",
        platforms: ["tiktok", "youtube"],
        style: "Sketchs, Personnages",
        gradient: "from-yellow-400 via-lime-300 to-green-200",
    },
]

const categories = ["Tous", "Lifestyle", "Tech", "Food", "Sport", "Art", "Entertainment"]

export default function TalentsPage() {
    const [activeCategory, setActiveCategory] = React.useState("Tous")

    const filteredTalents = activeCategory === "Tous"
        ? talents
        : talents.filter(t => t.category === activeCategory)

    return (
        <div className="py-24 bg-white">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                            Nos Talents
                        </h1>
                        <p className="text-xl text-slate-600">
                            Une sélection de créateurs authentiques, professionnels et brand-safe.
                            <br />
                            <span className="text-sm text-slate-500 mt-2 block">*Aucune statistique publique par souci de confidentialité.</span>
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/contact?type=talent">Rejoindre le roster</Link>
                    </Button>
                </div>

                {/* Filters */}
                <div className="mb-12 overflow-x-auto pb-4">
                    <div className="flex space-x-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                                    activeCategory === cat
                                        ? "bg-slate-900 text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredTalents.map((talent) => (
                            <motion.div
                                key={talent.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-none bg-slate-50 h-full">
                                    <div className="aspect-[4/5] w-full relative overflow-hidden">
                                        {/* Premium Gradient Background */}
                                        <div className={cn("absolute inset-0 bg-gradient-to-br", talent.gradient)} />
                                        {/* Subtle Pattern Overlay */}
                                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                                        {/* Initial Letter */}
                                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-6xl opacity-40 font-heading">
                                            {talent.name.charAt(0)}
                                        </div>
                                    </div>
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-heading text-xl font-bold text-slate-900">{talent.name}</h3>
                                                <p className="text-sm text-slate-500">{talent.category}</p>
                                            </div>
                                            <div className="flex -space-x-1">
                                                {/* Mock Platform Icons */}
                                                {talent.platforms.includes("instagram") && <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center border border-white"><Instagram className="h-3 w-3 text-pink-600" /></div>}
                                                {talent.platforms.includes("biktok") /* Typo intended to catch generic 'tiktok' if needed, here simple strings */}
                                                {talent.platforms.includes("tiktok") && <div className="h-6 w-6 rounded-full bg-black flex items-center justify-center border border-white"><span className="text-[8px] text-white font-bold">Tk</span></div>}
                                                {talent.platforms.includes("youtube") && <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center border border-white"><Youtube className="h-3 w-3 text-red-600" /></div>}
                                                {talent.platforms.includes("linkedin") && <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center border border-white"><Linkedin className="h-3 w-3 text-blue-600" /></div>}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-slate-600 italic">&ldquo;{talent.style}&rdquo;</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={`/contact?type=brand&talent=${talent.id}`}>Demander ce profil</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredTalents.length === 0 && (
                    <div className="text-center py-24 text-slate-500">
                        Aucun talent trouvé dans cette catégorie.
                    </div>
                )}
            </Container>
        </div>
    )
}
