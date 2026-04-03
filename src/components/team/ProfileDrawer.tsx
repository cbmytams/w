"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Calendar, Award, Briefcase, GraduationCap, Quote, Linkedin, Instagram, Mail } from "lucide-react"
import { SPRING } from "@/lib/design-tokens"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { TeamMember } from "@/constants/team"
import { useFocusTrap } from "@/hooks/useFocusTrap"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { EASING } from "@/lib/easing"

// --- TYPES & DATA EXTENSIONS ---

interface ProfileDrawerProps {
    isOpen: boolean
    onClose: () => void
    member: TeamMember | null
    brandData: ProfileBrandData | null
}

interface ProfileBrandData {
    geo?: string
    [key: string]: unknown
}

type DrawerTab = "manifesto" | "expertise"

interface DrawerExpertiseItem {
    icon: LucideIcon
    title: string
    desc: string
}

interface DrawerContentEntry {
    manifesto: string
    expertise: DrawerExpertiseItem[]
}

// Extended content for the drawer to avoid polluting global team.ts for now
const DRAWER_CONTENT: Record<string, DrawerContentEntry> = {
    sasha: {
        manifesto: "Je ne crois pas au 'talent management'. Je crois à l'architecture de carrière. Un agent attend que le téléphone sonne. Un architecte dessine les plans, pose les fondations et construit l'édifice.",
        expertise: [
            { icon: Briefcase, title: "Brand Strategy", desc: "Positionnement & Identité" },
            { icon: Award, title: "Talent Development", desc: "Coaching & Trajectoire" },
            { icon: Calendar, title: "Campaign Ops", desc: "360° Operations" },
            { icon: ExternalLink, title: "Network Growth", desc: "Partenariats Stratégiques" }
        ]
    },
    yaelle: {
        manifesto: "L'image n'est rien sans le fond. Mon rôle est d'aligner la vérité du talent avec sa projection publique. Nous ne fabriquons pas des personnages, nous révélons des personnalités.",
        expertise: [
            { icon: Briefcase, title: "Direction Artistique", desc: "Identité visuelle & Ton" },
            { icon: Award, title: "Content Strategy", desc: "Editorial & Formats" },
            { icon: Calendar, title: "International", desc: "Marché Nord-Américain" },
            { icon: GraduationCap, title: "Formation", desc: "Coaching créateurs" }
        ]
    }
}

// --- ANIMATION VARIANTS ---

const overlayVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 1, backdropFilter: "blur(16px)", transition: { duration: 0.4 } },
    exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.3 } }
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            ...SPRING.responsive
        }
    },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }
}

const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1 + (i * 0.05),
            type: "spring" as const,
            ...SPRING.responsive
        }
    })
}

// --- COMPONENT ---

export function ProfileDrawer({ isOpen, onClose, member, brandData }: ProfileDrawerProps) {
    const [activeTab, setActiveTab] = useState<DrawerTab>("manifesto")
    const [mounted, setMounted] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            window.addEventListener("keydown", handleEscape)
        }
        return () => window.removeEventListener("keydown", handleEscape)
    }, [isOpen, onClose])

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => { document.body.style.overflow = "unset" }
    }, [isOpen])

    useFocusTrap(modalRef, isOpen)

    if (!mounted) return null
    if (!member || !brandData) return null

    const extendedData = DRAWER_CONTENT[member.id] || DRAWER_CONTENT["sasha"] // Fallback
    // Extract colors for styles
    const primaryColor = member.id === 'sasha' ? '#FF6B35' : '#4F46E5'
    const gradientClass = member.id === 'sasha'
        ? "from-orange-500 via-rose-500 to-amber-500"
        : "from-indigo-500 via-violet-500 to-blue-500"
    const bgSoftClass = member.id === 'sasha' ? "bg-orange-50 dark:bg-orange-900/10" : "bg-indigo-50 dark:bg-indigo-900/10"

    // Helper for proof parsing
    const parseProof = (proof: string) => {
        const match = proof.match(/^([\d\+~]+\s?\+?)(.*)$/);
        if (match) {
            return { number: match[1], text: match[2] };
        }
        return { number: "✓", text: proof };
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                        className="fixed inset-0 z-[1060] bg-black/40 dark:bg-black/70 flex items-center justify-center cursor-pointer"
                    >
                        {/* Centered Modal Container */}
                        <div className="w-full h-full flex items-center justify-center p-4">
                            <motion.div
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="profile-drawer-title"
                                tabIndex={-1}
                                ref={modalRef}
                                className="relative w-full max-w-[440px] max-h-[90vh] flex flex-col bg-white dark:bg-[#0b111a] shadow-2xl rounded-2xl overflow-hidden sm:aspect-[9/16] md:aspect-auto"
                            >
                                {/* Noise Texture Overlay */}
                                <div className="absolute inset-0 opacity-[0.03] z-[5] pointer-events-none"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                                />

                                {/* 1. Header Hero (Compact & Dynamic) */}
                                <div className="relative h-[260px] w-full overflow-hidden shrink-0">
                                    {/* Animated Background Gradient */}
                                    <motion.div
                                        className={cn("absolute inset-0 opacity-30 dark:opacity-40 bg-gradient-to-br bg-[length:400%_400%]", gradientClass)}
                                        animate={shouldReduceMotion ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                        transition={shouldReduceMotion ? undefined : { duration: 15, ease: "linear", repeat: Infinity }}
                                    />

                                    {/* Close Button */}
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="absolute top-5 right-5 z-20 min-h-11 min-w-11 p-2.5 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md transition-all text-black dark:text-white group active:scale-95 flex items-center justify-center"
                                    >
                                        <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
                                    </button>

                                    {/* Content Container */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-7 pb-6 z-10 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-[#0b111a] dark:via-[#0b111a]/20">
                                        <motion.div variants={contentVariants} custom={0} initial="hidden" animate="visible">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span
                                                    className="px-3 py-1 rounded-full text-[10px] uppercase font-bold bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/30 tracking-widest shadow-sm rotate-[-2deg]"
                                                    style={{ color: primaryColor }}
                                                >
                                                    {brandData.geo === 'france' ? '🇫🇷 Paris' : '🇨🇦 Montréal'}
                                                </span>
                                            </div>
                                            <h2 id="profile-drawer-title" className="text-4xl font-black text-slate-900 dark:text-white leading-[0.9] mb-1 tracking-tight">
                                                {member.name.split(" ")[0]}
                                                <span className="opacity-40 font-medium ml-2 text-2xl tracking-normal">{member.name.split(" ").slice(1).join(" ")}</span>
                                            </h2>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider opacity-80 mt-1">
                                                {member.role}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Image Avatar (Floating) */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className="absolute top-8 right-6 w-32 h-32 z-10"
                                    >
                                        <motion.div
                                            animate={shouldReduceMotion ? undefined : { y: [0, -8, 0], rotate: [3, 5, 3] }}
                                            transition={shouldReduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: EASING.easeInOut }}
                                            className="w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/40 dark:ring-white/10"
                                        >
                                            <Image src={member.image} alt={member.name} fill sizes="128px" className="object-cover" />
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* 2. Navigation Tabs (Segmented Control) */}
                                <div className="px-6 py-2 bg-white dark:bg-[#0b111a] shrink-0 sticky top-0 z-10">
                                    <div className="p-1 bg-slate-100 dark:bg-white/5 rounded-full flex relative">
                                        {/* Active background pill */}
                                        <motion.div
                                            className="absolute top-1 bottom-1 bg-white dark:bg-white/10 rounded-full shadow-sm"
                                            initial={false}
                                            animate={{
                                                left: activeTab === "manifesto" ? "4px" : "50%",
                                                width: "calc(50% - 4px)"
                                            }}
                                            transition={{ type: "spring", ...SPRING.responsive }}
                                        />

                                        {(["manifesto", "expertise"] as const).map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={cn(
                                                    "flex-1 relative z-10 py-2 text-sm font-bold text-center capitalize transition-colors duration-200",
                                                    activeTab === tab
                                                        ? "text-slate-900 dark:text-white"
                                                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                                                )}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. Scrollable Content Area */}
                                <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar bg-white dark:bg-[#0b111a]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, x: activeTab === "manifesto" ? -20 : 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: activeTab === "manifesto" ? 20 : -20 }}
                                            transition={{ duration: 0.2 }}
                                            className="min-h-full"
                                        >
                                            {/* MANIFESTO TAB */}
                                            {activeTab === "manifesto" && (
                                                <div className="space-y-6 pb-4">
                                                    {/* Links Row */}
                                                    <div className="flex items-center justify-center gap-3">
                                                        {member.links?.linkedin && (
                                                            <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                                                                <Link href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-colors block border border-transparent hover:border-[#0077b5]/20">
                                                                    <Linkedin className="w-5 h-5" />
                                                                </Link>
                                                            </motion.div>
                                                        )}
                                                        {member.links?.instagram && (
                                                            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                                                                <Link href={member.links.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition-colors block border border-transparent hover:border-[#E4405F]/20">
                                                                    <Instagram className="w-5 h-5" />
                                                                </Link>
                                                            </motion.div>
                                                        )}
                                                        {member.links?.email && (
                                                            <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                                                                <Link href={`mailto:${member.links.email}`} className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-orange-500 hover:bg-orange-500/10 transition-colors block border border-transparent hover:border-orange-500/20">
                                                                    <Mail className="w-5 h-5" />
                                                                </Link>
                                                            </motion.div>
                                                        )}
                                                    </div>

                                                    <div className="relative pt-2">
                                                        <Quote className="absolute -top-4 -left-3 w-10 h-10 opacity-5 dark:opacity-[0.03] text-current block" style={{ color: primaryColor }} />
                                                        <p className="text-xl font-medium leading-relaxed text-slate-900 dark:text-white relative z-10">
                                                            {extendedData.manifesto}
                                                        </p>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-3">
                                                        {member.proof.slice(0, 3).map((proof, i) => {
                                                            const { number, text } = parseProof(proof);
                                                            return (
                                                                <div key={i} className={cn("p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex items-center gap-4", bgSoftClass)}>
                                                                    <span className="text-2xl font-bold tracking-tight min-w-[60px] text-right" style={{ color: primaryColor }}>
                                                                        {number}
                                                                    </span>
                                                                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-snug">
                                                                        {text}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    <div className="pt-6 border-t border-slate-100 dark:border-white/5 text-center">
                                                        <p className="text-sm font-semibold italic text-slate-500 dark:text-slate-400">
                                                            &ldquo;{member.quote}&rdquo;
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* EXPERTISE TAB - 3D CARDS */}
                                            {activeTab === "expertise" && (
                                                <div className="grid grid-cols-2 gap-3 pb-4 perspective-[1000px]">
                                                    {extendedData.expertise.map((item, i: number) => (
                                                        <motion.div
                                                            key={i}
                                                            custom={i}
                                                            variants={contentVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            whileHover={{
                                                                scale: 1.05,
                                                                rotateX: 5,
                                                                rotateY: 5,
                                                                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
                                                                zIndex: 10
                                                            }}
                                                            className="group p-5 rounded-2xl bg-slate-50/80 dark:bg-white/5 border border-transparent transition-all hover:bg-white dark:hover:bg-white/10 cursor-pointer transform-gpu"
                                                        >
                                                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-[-5deg]", bgSoftClass)}>
                                                                <item.icon className="w-6 h-6 stroke-[1.5]" style={{ color: primaryColor }} />
                                                            </div>
                                                            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1.5 leading-tight">
                                                                {item.title}
                                                            </h3>
                                                            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-snug uppercase tracking-wide">
                                                                {item.desc}
                                                            </p>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* 4. Footer CTA */}
                                <div className="p-4 border-t border-slate-100 dark:border-white/10 bg-white dark:bg-[#0b111a] shrink-0 z-20">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Link
                                            href={`mailto:${member.links?.email || 'contact@wafia.fr'}?subject=Organiser un appel`}
                                            className={cn(
                                                "flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-white font-bold text-base shadow-lg shadow-orange-500/20 hover:shadow-xl transition-all",
                                                `bg-gradient-to-r ${gradientClass}`
                                            )}
                                        >
                                            Organiser un appel
                                            <Mail className="w-4 h-4" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    )
}
