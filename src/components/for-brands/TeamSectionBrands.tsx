"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { TEAM, TeamMember } from "@/constants/team"
import { cn } from "@/lib/utils"
import { ProfileDrawer } from "@/components/team/ProfileDrawer"
import { EASING } from "@/lib/easing"
import { useRevealViewport } from "@/hooks/useRevealViewport"


// Geography configurations
const GEOGRAPHY_CONFIG = {
    france: {
        gradient: "from-[#FF6B35] to-[#F7931E]",
        shadowColor: "rgba(255, 107, 53, 0.15)",
        ringColor: "rgba(255, 107, 53, 0.3)",
        badgeBg: "bg-orange-50 dark:bg-orange-900/20",
        badgeText: "text-[#FF6B35]",
        flag: "🇫🇷",
        city: "PARIS"
    },
    canada: {
        gradient: "from-[#4F46E5] to-[#7C3AED]",
        shadowColor: "rgba(79, 70, 229, 0.15)",
        ringColor: "rgba(79, 70, 229, 0.3)",
        badgeBg: "bg-indigo-50 dark:bg-indigo-900/20",
        badgeText: "text-[#4F46E5]",
        flag: "🇨🇦",
        city: "MONTRÉAL"
    }
}

// Data overrides for specific branding
const BRAND_TEAM_DATA = {
    sasha: {
        geo: "france",
        role: "BRAND STRATEGIST",
        proof: ["8 ans d'expérience", "350+ marques", "~400 talents"]
    },
    yaelle: {
        geo: "canada",
        role: "DIRECTION ARTISTIQUE",
        proof: ["Positionnement", "Storytelling", "Cohérence créative"]
    }
} as const

type GeographyData = (typeof GEOGRAPHY_CONFIG)[keyof typeof GEOGRAPHY_CONFIG]
type BrandProfileData = (typeof BRAND_TEAM_DATA)[keyof typeof BRAND_TEAM_DATA]
type DrawerBrandData = GeographyData & BrandProfileData

function TeamCardBrands({
    member,
    index,
    onOpen
}: {
    member: TeamMember
    index: number
    onOpen: (member: TeamMember, brandData: DrawerBrandData) => void
}) {
    const [isHovered, setIsHovered] = useState(false)
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()
    const brandData = BRAND_TEAM_DATA[member.id as keyof typeof BRAND_TEAM_DATA] ?? BRAND_TEAM_DATA.sasha
    const geoConfig = GEOGRAPHY_CONFIG[brandData.geo as keyof typeof GEOGRAPHY_CONFIG]

    // Merge data
    const displayRole = brandData.role
    const displayProof = brandData.proof


    return (
        <motion.article
            initial={disableMotion ? false : { opacity: 0, y: 24 }}
            whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={disableMotion ? undefined : viewport}
            transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.44), delay: clampDelay(index * 0.1), ease: EASING.subtle }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative cursor-pointer"
            onClick={() => onOpen(member, { ...geoConfig, ...brandData })}
        >
            {/* Glow Effect - Geography Based */}
            <motion.div
                className="absolute -inset-1 rounded-3xl blur-2xl transition-all duration-500"
                style={{
                    background: `radial-gradient(circle, ${geoConfig.shadowColor.replace("0.15", "0.3")} 0%, transparent 70%)`,
                    opacity: isHovered ? 0.6 : 0
                }}
            />

            {/* Card Content - Div instead of Link */}
            <div
                className={cn(
                    "block relative h-full rounded-3xl overflow-hidden transition-all duration-300",
                    "bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl",
                    "border border-gray-200/50 dark:border-white/10",
                    "hover:shadow-2xl hover:-translate-y-2"
                )}
                style={{
                    boxShadow: isHovered ? `0 20px 50px ${geoConfig.shadowColor}` : undefined,
                    borderColor: isHovered ? geoConfig.shadowColor.replace("0.15", "0.3") : undefined
                }}
            >
                {/* Top Gradient Bar */}
                <motion.div
                    className={cn("h-1 w-full bg-gradient-to-r", geoConfig.gradient)}
                    initial={disableMotion ? false : { scaleX: 0, originX: 0 }}
                    whileInView={disableMotion ? undefined : { scaleX: 1 }}
                    viewport={disableMotion ? undefined : viewport}
                    transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.44), delay: clampDelay(0.16 + index * 0.08) }}
                />

                <div className="p-8 md:p-10">

                    {/* Location Badge */}
                    <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] uppercase font-black tracking-widest mb-6",
                        geoConfig.badgeBg,
                        geoConfig.badgeText
                    )}>
                        <span>{geoConfig.flag}</span>
                        <span>{geoConfig.city}</span>
                    </div>

                    {/* Header: Photo + Name/Role */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:items-start mb-6">
                        {/* Photo Avatar */}
                        <div
                            className="relative w-24 h-24 flex-shrink-0 rounded-3xl overflow-hidden ring-4 transition-all duration-300"
                            style={{
                                "--tw-ring-color": isHovered ? geoConfig.ringColor : "transparent",
                                boxShadow: isHovered ? `0 8px 20px ${geoConfig.shadowColor}` : "none"
                            } as React.CSSProperties}
                        >
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                sizes="96px"
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1 mt-2">
                            {/* Role Badge */}
                            <span className={cn(
                                "inline-block text-xs font-black uppercase tracking-widest mb-2",
                                "text-transparent bg-clip-text bg-gradient-to-r",
                                geoConfig.gradient
                            )}>
                                {displayRole}
                            </span>

                            {/* Name */}
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-1 transition-colors"
                                style={{ color: isHovered ? geoConfig.shadowColor.replace("0.15", "1") : undefined }}
                            >
                                {member.name}
                            </h3>

                            {/* Subtitle */}
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {member.role}
                            </p>
                        </div>
                    </div>

                    {/* Bio Quote */}
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        &ldquo;{member.shortBio}&rdquo;
                    </p>

                    {/* Proof Chips */}
                    <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-100 dark:border-white/10">
                        {displayProof.map((item, i) => (
                            <span
                                key={i}
                                className={cn(
                                    "inline-flex px-3.5 py-1.5 rounded-full text-sm font-medium",
                                    "bg-gray-50 dark:bg-white/5",
                                    "text-gray-600 dark:text-gray-300",
                                    "border border-gray-100 dark:border-white/5"
                                )}
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className={cn(
                        "flex items-center gap-2 text-sm font-bold transition-all duration-300",
                        geoConfig.badgeText
                    )}>
                        Découvrir mon parcours
                        <ArrowRight className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            isHovered ? "translate-x-1" : ""
                        )} />
                    </div>
                </div>
            </div>
        </motion.article>
    )
}

export function TeamSectionBrands() {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
    const [brandData, setBrandData] = useState<DrawerBrandData | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()

    const handleOpenDrawer = (member: TeamMember, data: DrawerBrandData) => {
        setSelectedMember(member)
        setBrandData(data)
        setIsDrawerOpen(true)
    }

    return (
        <section id="team" className="py-20 md:py-28 px-4">
            <Container>
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <motion.div
                        initial={disableMotion ? false : { opacity: 0 }}
                        whileInView={disableMotion ? undefined : { opacity: 1 }}
                        viewport={disableMotion ? undefined : viewport}
                        transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.44) }}
                        className="text-center mb-16 lg:mb-20"
                    >
                        {/* Title */}
                        <motion.h2
                            initial={disableMotion ? false : { opacity: 0, y: 20 }}
                            whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={disableMotion ? undefined : viewport}
                            transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.42), delay: clampDelay(0.1) }}
                            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[1.1] mb-6"
                        >
                            Direction Opérationnelle
                        </motion.h2>


                    </motion.div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {TEAM.map((member, index) => (
                            <TeamCardBrands
                                key={member.id}
                                member={member}
                                index={index}
                                onOpen={handleOpenDrawer}
                            />
                        ))}
                    </div>

                    {/* Bottom Tagline */}
                    <motion.div
                        initial={disableMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={disableMotion ? undefined : viewport}
                        transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.42), delay: clampDelay(0.24) }}
                        className="text-center mt-16"
                    >
                        <p className="text-lg text-gray-500 dark:text-gray-400 italic max-w-2xl mx-auto mb-3">
                            &ldquo;Wafia n&apos;est pas une agence : c&apos;est une architecture.&rdquo;
                        </p>
                        <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wide uppercase">
                            Paris 🇫🇷 • Montréal 🇨🇦
                        </p>
                    </motion.div>

                </div>
            </Container>

            {/* Profile Drawer */}
            <ProfileDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                member={selectedMember}
                brandData={brandData}
            />
        </section>
    )
}
