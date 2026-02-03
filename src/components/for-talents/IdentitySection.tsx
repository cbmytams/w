"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_IDENTITY, BRAND_GRADIENT } from "@/constants"

export function IdentitySection() {
    return (
        <section id="identity" className="py-32 px-4 bg-white">
            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <RevealAnimation className="mb-16">
                        <span className="text-sm font-semibold text-pink-600 uppercase tracking-wider mb-4 block">
                            {TALENT_IDENTITY.label}
                        </span>
                        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900">
                            {TALENT_IDENTITY.title}
                            <br />
                            <span className={`bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent`}>
                                {TALENT_IDENTITY.titleLine2}
                            </span>
                        </h2>
                    </RevealAnimation>

                    <div className="grid md:grid-cols-12 gap-8">
                        {/* Main Text Card */}
                        <RevealAnimation delay={0.1} className="md:col-span-7">
                            <div className="bg-gray-50 rounded-3xl p-10 md:p-12 h-full">
                                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                    {TALENT_IDENTITY.subtitle}
                                </h3>
                                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                    {TALENT_IDENTITY.description}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {TALENT_IDENTITY.points.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 group">
                                            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                                                <Check size={16} strokeWidth={3} />
                                            </div>
                                            <span className="font-semibold text-gray-800">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealAnimation>

                        {/* Image Card */}
                        <RevealAnimation delay={0.2} className="md:col-span-5">
                            <div className="relative h-[400px] md:h-full rounded-3xl overflow-hidden group">
                                <Image
                                    src="/images/talent-identity.png"
                                    alt="Creator Identity"
                                    fill
                                    sizes="(min-width: 1024px) 42vw, (min-width: 768px) 42vw, 100vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                                    <div className="w-12 h-1 bg-pink-500 mb-4" />
                                    <p className="text-xl font-semibold leading-tight">
                                        &ldquo;{TALENT_IDENTITY.quote}&rdquo;
                                    </p>
                                </div>
                            </div>
                        </RevealAnimation>
                    </div>
                </div>
            </Container>
        </section>
    )
}
