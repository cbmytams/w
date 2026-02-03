"use client"

import { Heart, MessageCircle, Activity, LucideIcon } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_PLATFORMS, BRAND_GRADIENT } from "@/constants"

const iconMap: Record<string, LucideIcon> = {
    Heart,
    MessageCircle,
    Activity
}

export function PlatformsSection() {
    return (
        <section id="platforms" className="py-32 px-4 bg-gray-50">
            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <RevealAnimation className="max-w-3xl mb-16">
                        <span className="text-sm font-semibold text-pink-600 uppercase tracking-wider mb-4 block">
                            {TALENT_PLATFORMS.label}
                        </span>
                        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
                            {TALENT_PLATFORMS.title}
                            <br />
                            <span className={`bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent`}>
                                {TALENT_PLATFORMS.titleLine2}
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            {TALENT_PLATFORMS.subtitle}
                        </p>
                    </RevealAnimation>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {TALENT_PLATFORMS.cards.map((card, i) => {
                            const Icon = iconMap[card.icon]
                            return (
                                <RevealAnimation key={i} delay={i * 0.1}>
                                    <div className="bg-white rounded-3xl p-10 h-full hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                        <div className={`w-16 h-16 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                                            {Icon && <Icon size={28} strokeWidth={2} />}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            {card.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {card.text}
                                        </p>
                                    </div>
                                </RevealAnimation>
                            )
                        })}
                    </div>
                </div>
            </Container>
        </section>
    )
}
