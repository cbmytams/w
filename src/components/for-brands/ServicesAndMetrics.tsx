"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import {
    Users, Zap, Mic, Palette, Link as LinkIcon,
    Share2, Rocket, Compass, Calendar, ArrowRight,
    BarChart3, Database, ArrowUpRight,
    MousePointer2, MonitorPlay, Layers
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"
import { useRevealViewport } from "@/hooks/useRevealViewport"
import { EASING } from "@/lib/easing"

// --- Constants ---

const TOOLS = [
    { name: "TikTok Creative Center", icon: "/tiktok.svg" },
    { name: "HypeAuditor", icon: BarChart3 },
    { name: "Favikon", icon: Zap },
    { name: "Traackr", icon: Database },
    { name: "Kolsquare", icon: BarChart3 },
]

const SERVICES = [
    {
        title: "CONSTRUCTION DE COMMUNAUTÉ",
        description: "Nous créons et gérons des communautés fidèles à votre marque, même après le TGE.",
        icon: Users,
        rotation: "-rotate-1"
    },
    {
        title: "MARKETING DE CONTENU",
        description: "Nous créons du contenu viral aligné sur les récits du marché et les tendances de l'industrie.",
        icon: MonitorPlay,
        rotation: "rotate-2"
    },
    {
        title: "CONTENU FONDATEURS",
        description: "Nous élaborons des stratégies pour transformer les fondateurs en leaders d'opinion et façonner les récits de demain.",
        icon: Mic,
        rotation: "-rotate-2"
    },
    {
        title: "BRANDING ET DESIGN",
        description: "Nous créons des expériences visuelles qui captent l'attention (et laissent une impression durable).",
        icon: Palette,
        rotation: "rotate-1"
    },
    {
        title: "RELATIONS PRESSE",
        description: "Nous rédigeons et diffusons des communiqués de presse qui percent le bruit médiatique et génèrent de la couverture.",
        icon: MousePointer2,
        rotation: "-rotate-1"
    },
    {
        title: "PARTENARIATS",
        description: "Nous identifions et sécurisons des collaborations stratégiques pour étendre la portée de votre marque.",
        icon: LinkIcon,
        rotation: "rotate-2"
    },
    {
        title: "DISTRIBUTION ET KOLS",
        description: "Nous utilisons des stratégies éprouvées et basées sur la data pour amplifier votre message sur les bons canaux.",
        icon: Share2,
        rotation: "-rotate-2"
    },
    {
        title: "CONCEPTION DE CAMPAGNE",
        description: "Nous concevons et exécutons des campagnes à fort impact, optimisées pour l'engagement, la conversion et la croissance.",
        icon: Rocket,
        rotation: "rotate-1"
    },
    {
        title: "STRATÉGIE ET POSITIONNEMENT",
        description: "Nous élaborons des stratégies claires alignant produit, récit et proposition de valeur pour attirer votre audience cible.",
        icon: Compass,
        rotation: "-rotate-1"
    },
    {
        title: "CONSEIL MARKETING",
        description: "Nous offrons un accompagnement stratégique complet, du positionnement aux playbooks de croissance et audits de campagnes.",
        icon: Layers,
        rotation: "rotate-2"
    },
    {
        title: "ÉVÉNEMENTIEL",
        description: "De l'idée à l'exécution, nous gérons vos événements de A à Z pour créer une expérience inoubliable.",
        icon: Calendar,
        rotation: "-rotate-2"
    }
]

// --- Components ---

type RevealConfig = ReturnType<typeof useRevealViewport>

function AnimatedCounter({
    value,
    suffix,
    disableMotion,
    viewport,
}: {
    value: number
    suffix: string
    disableMotion: boolean
    viewport: RevealConfig["viewport"]
}) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(
        ref,
        disableMotion
            ? undefined
            : {
                once: viewport.once,
                amount: viewport.amount,
            }
    )
    const springValue = useSpring(0, { duration: 2000, bounce: 0 })

    useEffect(() => {
        if (inView) {
            springValue.set(value)
        }
    }, [inView, value, springValue])

    const displayValue = useTransform(springValue, (current) => Math.round(current))

    return (
        <span ref={ref} className="flex items-center">
            <motion.span>{displayValue}</motion.span>
            <span>{suffix}</span>
        </span>
    )
}

function ServiceCard({ service }: { service: typeof SERVICES[number] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, ease: EASING.easeOut }}
            className={cn(
                "group relative h-full min-h-[220px] md:min-h-[280px] p-6 md:p-8 flex flex-col justify-between",
                "bg-white border-2 border-black rounded-xl",
                "dark:bg-zinc-900 dark:border-white", // Dark mode
                /* removed neo-brutalist shadow */
                /* removed dark neo-brutalist shadow */
                /* removed hover neo-brutalist shadow */
                "hover:-translate-y-1 hover:rotate-0 transition-all duration-300",
                service.rotation // Default tilt
            )}
        >
            {/* Title - Massive & Condensed */}
            <div>
                <h3 className="font-heading font-extrabold text-2xl md:text-3xl uppercase leading-[0.9] tracking-tighter text-black dark:text-white mb-6 break-words">
                    {service.title}
                </h3>
            </div>

            {/* Icon & Description */}
            <div className="mt-auto">
                <div className="mb-6">
                    <service.icon className="w-8 h-8 md:w-10 md:h-10 text-black dark:text-white stroke-[1.5]" />
                </div>

                <p className="text-sm md:text-base font-medium text-slate-600 dark:text-zinc-400 leading-snug group-hover:text-black dark:group-hover:text-white transition-colors">
                    {service.description}
                </p>
            </div>

            {/* Decor element for "sticker" look */}
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-black/10 dark:bg-white/10 group-hover:bg-black dark:group-hover:bg-white transition-colors" />

        </motion.div>
    )
}

function CTAWidget() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className={cn(
                "group relative h-full min-h-[220px] md:min-h-[280px] p-6 md:p-8 flex flex-col justify-center items-center text-center",
                "bg-black border-2 border-black rounded-xl",
                "dark:bg-white dark:border-white", // Invert for dark mode (White card on black bg)
                /* removed orange neo-brutalist shadow */
                "hover:-translate-y-1 hover:rotate-1 transition-all duration-300",
                "cursor-pointer rotate-1"
            )}
        >
            <a href="/questionnaire/brands" className="absolute inset-0 z-10" />

            <div className="mb-6 p-4 rounded-full bg-white text-black dark:bg-black dark:text-white">
                <ArrowRight className="w-8 h-8" />
            </div>

            <h3 className="font-heading font-extrabold text-2xl md:text-3xl uppercase leading-[0.9] tracking-tighter text-white dark:text-black mb-4">
                Votre Projet ?
            </h3>

            <span className="inline-block px-4 py-2 bg-white text-black dark:bg-black dark:text-white font-bold uppercase tracking-widest text-xs rounded-full group-hover:scale-105 transition-transform">
                Réserver un audit
            </span>
        </motion.div>
    )
}


export function ServicesAndMetrics() {
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()

    return (
        <section id="services" className="relative py-20 md:py-28 overflow-hidden bg-transparent z-10">

            <Container className="relative z-10 px-4 md:px-6">

                {/* --- Header & Nav --- */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 md:mb-24">
                    <motion.div
                        initial={disableMotion ? false : { opacity: 0, y: 30 }}
                        whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={disableMotion ? undefined : viewport}
                        transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.42) }}
                        className="max-w-3xl"
                    >
                        <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-7xl lg:text-[8rem] leading-[0.85] text-black dark:text-white uppercase tracking-tighter mb-6 md:mb-8 scale-y-110 origin-left">
                            NOS SERVICES
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-zinc-400 font-bold uppercase tracking-wide max-w-xl">
                            Une architecture complète pour transformer votre marque.
                        </p>
                    </motion.div>
                </div>

                {/* --- Row 1: Metrics (Simplified / Brutal) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-28 border-b-2 border-black/5 dark:border-white/10 pb-10">
                    {/* Metric 1 */}
                    <motion.div
                        initial={disableMotion ? false : { opacity: 0, y: 30 }}
                        whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={disableMotion ? undefined : viewport}
                        transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.42), delay: clampDelay(0.1) }}
                        className="p-6 md:p-8 rounded-xl bg-white border-2 border-black dark:bg-zinc-900 dark:border-white flex flex-col justify-between h-auto min-h-[160px] md:h-[240px]"
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-2 border-2 border-black rounded-lg bg-[#FFDE59]"> {/* Yellow accent - Keep color but ensure icon visibility */}
                                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
                            </div>
                        </div>
                        <div>
                            <div className="text-5xl md:text-7xl font-black tracking-tighter text-black dark:text-white mb-2">
                                <AnimatedCounter
                                    value={100}
                                    suffix="+"
                                    disableMotion={disableMotion}
                                    viewport={viewport}
                                />
                            </div>
                            <p className="text-slate-600 dark:text-zinc-400 font-bold uppercase text-xs tracking-wider">
                                Campagnes orchestrées
                            </p>
                        </div>
                    </motion.div>

                    {/* Metric 2 */}
                    <motion.div
                        initial={disableMotion ? false : { opacity: 0, y: 30 }}
                        whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={disableMotion ? undefined : viewport}
                        transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.42), delay: clampDelay(0.16) }}
                        className="p-6 md:p-8 rounded-xl bg-white border-2 border-black dark:bg-zinc-900 dark:border-white flex flex-col justify-between h-auto min-h-[160px] md:h-[240px]"
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-2 border-2 border-black rounded-lg bg-[#FF914D]"> {/* Orange accent */}
                                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-black" />
                            </div>
                        </div>
                        <div>
                            <div className="text-5xl md:text-7xl font-black tracking-tighter text-black dark:text-white mb-2">
                                <AnimatedCounter
                                    value={4}
                                    suffix="+"
                                    disableMotion={disableMotion}
                                    viewport={viewport}
                                />
                            </div>
                            <p className="text-slate-600 dark:text-zinc-400 font-bold uppercase text-xs tracking-wider">
                                Années d'expertise
                            </p>
                        </div>
                    </motion.div>

                    {/* Tech Stack - Brutal List */}
                    <motion.div
                        initial={disableMotion ? false : { opacity: 0, y: 30 }}
                        whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={disableMotion ? undefined : viewport}
                        transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.42), delay: clampDelay(0.22) }}
                        className="p-6 md:p-8 rounded-xl bg-white border-2 border-black dark:bg-zinc-900 dark:border-white flex flex-col h-auto min-h-[160px] md:h-[240px]"
                    >
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <Database className="w-5 h-5 md:w-6 md:h-6 text-black dark:text-white" />
                            <h3 className="font-black text-xl text-black dark:text-white uppercase">Tech Stack</h3>
                            <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-black text-white rounded-md border border-black dark:border-white">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF00] animate-pulse" />
                                <span className="text-[10px] font-bold uppercase">Live</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 md:gap-3 overflow-y-auto custom-scrollbar pr-2">
                            {TOOLS.map((tool, i) => (
                                <div key={i} className="flex items-center gap-2 px-2 py-1.5 border border-black rounded-md bg-slate-50 hover:bg-[#FFDE59] transition-colors cursor-default dark:bg-zinc-800 dark:border-white dark:text-white dark:hover:bg-[#FFDE59] dark:hover:text-black">
                                    <span className="text-[10px] font-bold text-black dark:text-inherit uppercase truncate">
                                        {tool.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </Container>

            {/* --- Row 2: Services Panorama (Marquee) --- */}
            {/* Full width - Outside Container */}
            <div className="relative w-full">
                <Marquee pauseOnHover className="[--duration:60s] py-14 px-2">
                    {SERVICES.map((service, index) => (
                        <div key={index} className="mx-4 md:mx-6 w-[280px] md:w-[320px]">
                            <ServiceCard service={service} />
                        </div>
                    ))}
                    {/* CTA Card */}
                    <div className="mx-4 md:mx-6 w-[280px] md:w-[320px]">
                        <CTAWidget />
                    </div>
                </Marquee>
            </div>
        </section >
    )
}
