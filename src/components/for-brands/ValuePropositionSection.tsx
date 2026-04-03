"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Users, Camera, BarChart3, ArrowRight, Check } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { EASING } from "@/lib/easing"
import { useRevealViewport } from "@/hooks/useRevealViewport"

/**
 * ValuePropositionSection - Version "Social Cut"
 * Following brand guidelines: Heat gradient, glassmorphism, bold typography
 * Premium cards with clear hierarchy and proper symmetry
 */

const VALUE_PILLARS = [
    {
        id: "creators",
        icon: Users,
        number: "01",
        gradient: "from-orange-500 to-rose-500",
        glowColor: "rgba(249, 115, 22, 0.4)",
        title: "Créateurs vérifiés",
        stat: { value: "15K+", label: "profils" },
        description: "Fake follower check. Historique de collab. Brand affinity score.",
        points: [
            "Audience qualifiée",
            "Alignement valeurs",
            "Track record documenté"
        ]
    },
    {
        id: "studio",
        icon: Camera,
        number: "02",
        gradient: "from-purple-500 to-indigo-500",
        glowColor: "rgba(168, 85, 247, 0.4)",
        title: "Production premium",
        stat: { value: "12", label: "mois de droits" },
        description: "Assets réutilisables en Ads. Direction artistique cohérente.",
        points: [
            "Formats multi-ratio",
            "Droits cédés",
            "DA brandée"
        ]
    },
    {
        id: "data",
        icon: BarChart3,
        number: "03",
        gradient: "from-green-500 to-emerald-500",
        glowColor: "rgba(34, 197, 94, 0.4)",
        title: "ROI en temps réel",
        stat: { value: "24/7", label: "live" },
        description: "Dashboard live. Chaque euro tracké. Ajustements en cours de campagne.",
        points: [
            "Tracking instantané",
            "Optimisation live",
            "Reports actionnables"
        ]
    }
] as const

function PillarCard({ pillar, index }: { pillar: typeof VALUE_PILLARS[number]; index: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()

    return (
        <motion.div
            initial={disableMotion ? false : { opacity: 0, y: 50 }}
            whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={disableMotion ? undefined : viewport}
            transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.46), delay: clampDelay(index * 0.12), ease: EASING.subtle }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative"
        >
            {/* Glow Effect - Brand Heat */}
            <motion.div
                className="absolute -inset-1 rounded-2xl blur-2xl transition-all duration-500"
                style={{
                    background: `radial-gradient(circle, ${pillar.glowColor} 0%, transparent 70%)`,
                    opacity: isHovered ? 0.6 : 0
                }}
            />

            {/* Card - Glassmorphism */}
            <div className={cn(
                "relative h-full rounded-2xl overflow-hidden transition-all duration-500",
                "bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl",
                "border border-slate-200/50 dark:border-white/10",
                "hover:shadow-2xl hover:-translate-y-2"
            )}>
                {/* Top Gradient Bar */}
                <motion.div
                    className={cn("h-1.5 w-full bg-gradient-to-r", pillar.gradient)}
                    initial={disableMotion ? false : { scaleX: 0, originX: 0 }}
                    whileInView={disableMotion ? undefined : { scaleX: 1 }}
                    viewport={disableMotion ? undefined : viewport}
                    transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.44), delay: clampDelay(0.18 + index * 0.08) }}
                />

                <div className="p-8">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-6">
                        {/* Number */}
                        <span className={cn(
                            "text-5xl font-heading font-bold",
                            "bg-gradient-to-br bg-clip-text text-transparent opacity-30",
                            pillar.gradient
                        )}>
                            {pillar.number}
                        </span>

                        {/* Icon */}
                        <motion.div
                            className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br",
                                pillar.gradient
                            )}
                            animate={{
                                scale: isHovered ? 1.05 : 1,
                                rotate: isHovered ? 3 : 0
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <pillar.icon className="w-6 h-6" strokeWidth={2} />
                        </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-3">
                        {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                        {pillar.description}
                    </p>

                    {/* Stat Highlight */}
                    <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-100 dark:border-white/10">
                        <span className={cn(
                            "text-4xl font-heading font-black bg-gradient-to-r bg-clip-text text-transparent",
                            pillar.gradient
                        )}>
                            {pillar.stat.value}
                        </span>
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {pillar.stat.label}
                        </span>
                    </div>

                    {/* Points */}
                    <ul className="space-y-3">
                        {pillar.points.map((point, j) => (
                            <motion.li
                                key={j}
                                initial={disableMotion ? false : { opacity: 0, x: -10 }}
                                whileInView={disableMotion ? undefined : { opacity: 1, x: 0 }}
                                viewport={disableMotion ? undefined : viewport}
                                transition={disableMotion ? undefined : { duration: transitionDuration, delay: clampDelay(0.18 + index * 0.1 + j * 0.05) }}
                                className="flex items-center gap-3"
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br",
                                    pillar.gradient
                                )}>
                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {point}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}

export function ValuePropositionSection() {
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()

    return (
        <section id="proposition" className="py-20 md:py-28 px-4">

            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Header - Social Cut Style */}
                    <motion.div
                        initial={disableMotion ? false : { opacity: 0 }}
                        whileInView={disableMotion ? undefined : { opacity: 1 }}
                        viewport={disableMotion ? undefined : viewport}
                        transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.44) }}
                        className="text-center mb-16 lg:mb-20"
                    >
                        {/* Eyebrow */}
                        <motion.p
                            initial={disableMotion ? false : { opacity: 0, y: 15 }}
                            whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={disableMotion ? undefined : viewport}
                            transition={disableMotion ? undefined : { duration: transitionDuration }}
                            className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500 mb-4"
                        >
                            Notre différence
                        </motion.p>

                        {/* Main Title - Big, Bold, Punchy */}
                        <motion.h2
                            initial={disableMotion ? false : { opacity: 0, y: 20 }}
                            whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={disableMotion ? undefined : viewport}
                            transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.42), delay: clampDelay(0.1) }}
                            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-4"
                        >
                            Trois piliers.{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
                                Zéro compromis.
                            </span>
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            initial={disableMotion ? false : { opacity: 0, y: 15 }}
                            whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={disableMotion ? undefined : viewport}
                            transition={disableMotion ? undefined : { duration: transitionDuration, delay: clampDelay(0.18) }}
                            className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto"
                        >
                            Ce qui nous sépare des autres agences.
                        </motion.p>
                    </motion.div>

                    {/* Cards Grid - Equal 3 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                        {VALUE_PILLARS.map((pillar, i) => (
                            <PillarCard key={pillar.id} pillar={pillar} index={i} />
                        ))}
                    </div>

                    {/* Bottom CTA - Brand Heat Button */}
                    <motion.div
                        initial={disableMotion ? false : { opacity: 0, y: 30 }}
                        whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={disableMotion ? undefined : viewport}
                        transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.42), delay: clampDelay(0.22) }}
                        className="text-center"
                    >
                        <Button
                            size="lg"
                            asChild
                            className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold px-8 h-14 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105"
                        >
                            <Link href="#case-studies">
                                Découvrir nos réalisations
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}
