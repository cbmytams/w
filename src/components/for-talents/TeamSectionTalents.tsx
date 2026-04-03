"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
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
        flag: "\u{1F1EB}\u{1F1F7}",
        city: "PARIS"
    },
    canada: {
        gradient: "from-[#4F46E5] to-[#7C3AED]",
        shadowColor: "rgba(79, 70, 229, 0.15)",
        ringColor: "rgba(79, 70, 229, 0.3)",
        badgeBg: "bg-indigo-50 dark:bg-indigo-900/20",
        badgeText: "text-[#4F46E5]",
        flag: "\u{1F1E8}\u{1F1E6}",
        city: "MONTR\u00C9AL"
    }
}

// Talent-specific data overrides
const TALENT_TEAM_DATA = {
    sasha: {
        geo: "france",
        role: "TALENT STRATEGIST",
        proof: ["8 ans d'exp\u00E9rience", "~400 talents", "\u00C9cosyst\u00E8mes durables"]
    },
    yaelle: {
        geo: "canada",
        role: "D\u00C9VELOPPEMENT CR\u00C9ATIF",
        proof: ["Identit\u00E9", "Trajectoires", "Storytelling"]
    }
} as const

type GeographyData = (typeof GEOGRAPHY_CONFIG)[keyof typeof GEOGRAPHY_CONFIG]
type TalentProfileData = (typeof TALENT_TEAM_DATA)[keyof typeof TALENT_TEAM_DATA]
type DrawerTalentData = GeographyData & TalentProfileData

function TeamCardTalents({
    member,
    index,
    onOpen
}: {
    member: TeamMember
    index: number
    onOpen: (member: TeamMember, talentData: DrawerTalentData) => void
}) {
    const [isHovered, setIsHovered] = useState(false)
    const { disableMotion, viewport, transitionDuration, clampDelay } = useRevealViewport()
    const talentData = TALENT_TEAM_DATA[member.id as keyof typeof TALENT_TEAM_DATA] ?? TALENT_TEAM_DATA.sasha
    const geoConfig = GEOGRAPHY_CONFIG[talentData.geo as keyof typeof GEOGRAPHY_CONFIG]

    const displayRole = talentData.role
    const displayProof = talentData.proof

    return (
        <motion.article
            initial={disableMotion ? false : { opacity: 0, y: 24 }}
            whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={disableMotion ? undefined : viewport}
            transition={disableMotion ? undefined : { duration: Math.max(transitionDuration, 0.44), delay: clampDelay(index * 0.1), ease: EASING.subtle }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative cursor-pointer"
            onClick={() => onOpen(member, { ...geoConfig, ...talentData })}
        >
            {/* Glow Effect - Geography Based */}
            <motion.div
                className="absolute -inset-1 rounded-3xl blur-2xl transition-all duration-500"
                style={{
                    background: `radial-gradient(circle, ${geoConfig.shadowColor.replace("0.15", "0.3")} 0%, transparent 70%)`,
                    opacity: isHovered ? 0.6 : 0
                }}
            />

            {/* Card Content */}
            <div
                className={cn(
                    "block relative h-full rounded-3xl overflow-hidden transition-all duration-300",
                    "bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl",
                    "border border-slate-200/50 dark:border-white/10",
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
                            <span className={cn(
                                "inline-block text-xs font-black uppercase tracking-widest mb-2",
                                "text-transparent bg-clip-text bg-gradient-to-r",
                                geoConfig.gradient
                            )}>
                                {displayRole}
                            </span>

                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1 transition-colors"
                                style={{ color: isHovered ? geoConfig.shadowColor.replace("0.15", "1") : undefined }}
                            >
                                {member.name}
                            </h3>

                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                {member.role}
                            </p>
                        </div>
                    </div>

                    {/* Bio Quote */}
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        &ldquo;{member.shortBio}&rdquo;
                    </p>

                    {/* Proof Chips */}
                    <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-slate-100 dark:border-white/10">
                        {displayProof.map((item, i) => (
                            <span
                                key={i}
                                className={cn(
                                    "inline-flex px-3.5 py-1.5 rounded-full text-sm font-medium",
                                    "bg-slate-50 dark:bg-white/5",
                                    "text-slate-600 dark:text-slate-300",
                                    "border border-slate-100 dark:border-white/5"
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
                        D&eacute;couvrir mon parcours
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

export function TeamSectionTalents() {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
    const [talentData, setTalentData] = useState<DrawerTalentData | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleOpenDrawer = (member: TeamMember, data: DrawerTalentData) => {
        setSelectedMember(member)
        setTalentData(data)
        setIsDrawerOpen(true)
    }

    return (
        <section id="team" className="pt-10 pb-28 lg:pt-20 lg:pb-36 px-4 relative z-10">
            <Container>
                <div className="max-w-5xl mx-auto">

                    <RevealAnimation className="text-center mb-16 lg:mb-20">
                        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1]">
                            Direction Op&eacute;rationnelle
                        </h2>
                    </RevealAnimation>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {TEAM.map((member, index) => (
                            <TeamCardTalents
                                key={member.id}
                                member={member}
                                index={index}
                                onOpen={handleOpenDrawer}
                            />
                        ))}
                    </div>
                </div>
            </Container>

            <ProfileDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                member={selectedMember}
                brandData={talentData}
            />
        </section>
    )
}
