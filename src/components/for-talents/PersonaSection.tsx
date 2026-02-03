"use client"

import { useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Music, Clapperboard, Smartphone } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_PERSONA, BRAND_GRADIENT } from "@/constants"
import { ParallaxCard } from "./redesign/ParallaxCard"
import { WafiaOSWidget } from "./redesign/WafiaOSWidget"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type PersonaType = keyof typeof TALENT_PERSONA

const iconMap = {
    Music,
    Clapperboard,
    Smartphone
}

const tabs: { key: PersonaType; label: string }[] = [
    { key: "artist", label: "Musique" },
    { key: "comedian", label: "Fiction" },
    { key: "creator", label: "Créateur" }
]

// Composant visuel dynamique pour chaque persona
function PersonaVisual({ type }: { type: PersonaType }) {
    if (type === "artist") {
        const distribution = [
            { name: "Spotify", icon: "/logos/talents/spotify.svg" },
            { name: "Apple Music", icon: "/logos/talents/apple-music.svg" },
            { name: "Deezer", icon: "/logos/talents/deezer.svg" },
            { name: "Amazon Music", icon: "/logos/talents/amazon-music.svg" },
            { name: "YouTube Music", icon: "/logos/talents/youtube-music.svg" },
            { name: "Qobuz", icon: "/logos/talents/qobuz.svg" },
            { name: "Tidal", icon: "/logos/talents/tidal.svg" },
            { name: "SoundCloud", icon: "/logos/talents/soundcloud.svg" },
        ]

        const labels = [
            { name: "Universal", icon: "/logos/talents/universal-music-group.svg" },
            { name: "Warner", icon: "/logos/talents/warner-music-group.svg" },
            { name: "Sony", icon: "/logos/talents/sony.svg" },
            { name: "PIAS", icon: "/logos/talents/pias.svg" },
            { name: "Because", icon: "/logos/talents/because.png" },
            { name: "Wagram", icon: "/logos/talents/wagram.png" },
            { name: "Naïve", icon: "/logos/talents/naive.png" },
            { name: "Konbini", icon: "/logos/talents/konbini.svg" },
        ]

        const distributors = [
            { name: "Believe", icon: "/logos/talents/believe.svg" },
            { name: "IDOL", icon: "/logos/talents/idol.svg" },
            { name: "TuneCore", icon: "/logos/talents/tunecore.svg" },
            { name: "DistroKid", icon: "/logos/talents/distrokid.webp" },
        ]

        const prefersReducedMotion = useReducedMotion()
        const [activeCategory, setActiveCategory] = useState<"distribution" | "labels" | "access">("distribution")
        const [speed, setSpeed] = useState<"slow" | "normal" | "fast">("normal")
        const [isHovered, setIsHovered] = useState(false)

        const logoClass = "brightness-0 opacity-80"
        const tileWidth = 160
        const tileGap = 12

        const categories = [
            { id: "distribution", label: "Distribution", hint: "DSPs", logos: distribution },
            { id: "labels", label: "Labels", hint: "Industry", logos: labels },
            { id: "access", label: "Accès", hint: "Partners", logos: distributors },
        ] as const

        const speedMap = {
            slow: 4.6,
            normal: 3.4,
            fast: 2.4,
        } as const

        const active = categories.find((item) => item.id === activeCategory) ?? categories[0]
        const distance = (tileWidth + tileGap) * active.logos.length
        const duration = Math.max(16, active.logos.length * speedMap[speed])

        const marqueeStyle: CSSProperties = {
            ["--marquee-distance" as const]: `${distance}px`,
            ["--marquee-duration" as const]: `${duration}s`,
            animation: prefersReducedMotion ? "none" : "marquee var(--marquee-duration) linear infinite",
            animationPlayState: isHovered ? "paused" : "running",
        }

        const buttonBase =
            "text-[10px] font-semibold uppercase tracking-widest px-4 py-2 rounded-full border transition-all"

        const speedButtons: Array<{ id: typeof speed; label: string }> = [
            { id: "slow", label: "Lent" },
            { id: "normal", label: "Normal" },
            { id: "fast", label: "Rapide" },
        ]

        return (
            <div className="w-full h-full relative bg-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.08)_0%,rgba(248,250,252,1)_55%,rgba(255,255,255,1)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60" />
                <div className="relative h-full flex flex-col p-5 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.35em] text-slate-400 mb-2">Ecosystem</div>
                            <h4 className="text-2xl md:text-3xl font-bold text-slate-900">Distribution & Labels</h4>
                            <p className="text-sm text-slate-500 mt-2">
                                Structuration, droits, et accès aux réseaux de diffusion les plus solides.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {categories.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActiveCategory(item.id)}
                                    className={`${buttonBase} ${
                                        activeCategory === item.id
                                            ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                                            : "border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:border-slate-300"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-widest text-slate-400 mb-3">
                        <span>{active.label} · {active.hint}</span>
                        <div className="flex items-center gap-2">
                            {speedButtons.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setSpeed(item.id)}
                                    className={`text-[9px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                                        speed === item.id
                                            ? "border-slate-900 bg-slate-900 text-white"
                                            : "border-slate-200 bg-white text-slate-400 hover:text-slate-900 hover:border-slate-300"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div
                        className="relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/90 to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/90 to-transparent" />
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                            <div
                                key={activeCategory}
                                className="marquee-track flex gap-3 py-4 px-4 w-max"
                                style={marqueeStyle}
                            >
                                {[...active.logos, ...active.logos].map((item, i) => (
                                    <div
                                        key={`${item.name}-${i}`}
                                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                                        style={{ width: `${tileWidth}px` }}
                                    >
                                        <div className="flex flex-col items-center justify-center gap-2 text-center">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                                                <img src={item.icon} alt={item.name} className={`h-4 w-auto object-contain ${logoClass}`} />
                                            </div>
                                            <span className="text-xs font-semibold text-slate-700">{item.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 text-slate-600">
                        {[
                            {
                                title: "Architecture contractuelle",
                                text: "Droits, masters, exclusivité et durée: tout est cadré.",
                            },
                            {
                                title: "Négociation & levier",
                                text: "On sécurise la position et la valeur de chaque deal.",
                            },
                            {
                                title: "Label propriétaire",
                                text: "Structure, équipe, distribution et autonomie.",
                            },
                        ].map((item) => (
                            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">{item.title}</div>
                                <p className="text-sm text-slate-500">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <style jsx>{`
                    .marquee-track {
                        animation: marquee var(--marquee-duration) linear infinite;
                    }
                    @keyframes marquee {
                        from {
                            transform: translateX(0);
                        }
                        to {
                            transform: translateX(calc(-1 * var(--marquee-distance)));
                        }
                    }
                `}</style>
            </div>
        )
    }
if (type === "comedian") {
        // Nouvelle version : LE SCRIPT & L'OFFRE (Statutaire, Acteur Pro)
        return (
            <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-slate-900/5">
                {/* Cinematic Ambient Light */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />

                {/* The Script Card */}
                <motion.div
                    initial={{ y: 20, rotateX: 10, opacity: 0 }}
                    animate={{ y: 0, rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-64 aspect-[3/4] bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100"
                >
                    {/* Script Content */}
                    <div className="p-6 font-mono text-xs text-gray-800 leading-relaxed opacity-80">
                        <div className="w-full h-2 bg-gray-200 rounded mb-6 opacity-30" />
                        <p className="mb-4 font-bold tracking-widest uppercase text-gray-400">SCENE 24A - INT. STUDIO</p>

                        <p className="mb-2"><span className="font-bold">AGENT</span></p>
                        <p className="mb-4">C'est le rôle de ta vie. Ils te veulent toi.</p>

                        <p className="mb-2"><span className="font-bold">TALENT</span></p>
                        <p className="mb-4 relative">
                            <span className="relative z-10">Je suis prêt. On signe quand ?</span>
                            <motion.span
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="absolute left-0 top-0 h-full bg-yellow-200/50 -z-0"
                            />
                        </p>
                    </div>

                    {/* Paper grain/texture overlay */}
                    <div className="absolute inset-0 bg-yellow-50/20 mix-blend-multiply pointer-events-none" />
                </motion.div>

                {/* Notification Badge: ROLE CONFIRMED */}
                <motion.div
                    initial={{ y: 40, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute bottom-10 flex items-center gap-3 px-5 py-3 bg-gray-900/95 backdrop-blur-md text-white rounded-xl shadow-xl border border-white/10"
                >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Casting Update</div>
                        <div className="text-sm font-bold">Rôle Confirmé — Long Métrage</div>
                    </div>
                </motion.div>
            </div>
        )
    }

    // Creator - Wafia OS Dashboard Preview
    return <WafiaOSWidget />
}

export function PersonaSection() {
    const [activeTab, setActiveTab] = useState<PersonaType>("artist")
    const content = TALENT_PERSONA[activeTab]
    const IconComponent = iconMap[content.icon as keyof typeof iconMap]

    return (
        <section className="py-32 px-4 bg-gray-50">
            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <RevealAnimation className="text-center mb-16">
                        <span className="text-sm font-semibold text-pink-600 uppercase tracking-wider mb-4 block">
                            Ton profil
                        </span>
                        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900">
                            Chaque terrain a ses règles.
                        </h2>
                    </RevealAnimation>

                    {/* Tabs */}
                    <RevealAnimation delay={0.1} className="flex justify-center mb-12">
                        <div className="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab.key
                                        ? "text-white"
                                        : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    {activeTab === tab.key && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className={`absolute inset-0 bg-gradient-to-r ${BRAND_GRADIENT} rounded-xl shadow-lg`}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </RevealAnimation>

                    {/* Content */}
                    <RevealAnimation delay={0.2}>
                        <div className={`bg-gradient-to-br ${content.color} rounded-3xl p-8 md:p-12 border border-gray-200/50`}>
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                {/* Left: Text */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-900">
                                            <IconComponent size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                                {content.title}
                                            </h3>
                                            <p className="text-lg font-medium text-pink-600">
                                                {content.subtitle}
                                            </p>
                                        </div>
                                        <p className="text-gray-600 text-lg leading-relaxed">
                                            {content.desc}
                                        </p>

                                        <div className="space-y-3 pt-4">
                                            {content.points.map((point, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">
                                                        <Check size={14} className="text-pink-600" />
                                                    </div>
                                                    <span className="font-medium text-gray-700">{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Right: Dynamic Visual with ParallaxCard */}
                                <ParallaxCard className="h-[560px] lg:h-[600px] bg-white overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.4 }}
                                            className="w-full h-full"
                                        >
                                            <PersonaVisual type={activeTab} />
                                        </motion.div>
                                    </AnimatePresence>
                                </ParallaxCard>
                            </div>
                        </div>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
