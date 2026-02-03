"use client"

import { RevealAnimation } from "@/components/common/RevealAnimation"
import { SectionHeading } from "@/components/common/SectionHeading"
import { DELIVERABLE_ASSETS } from "@/constants/features"
import { Container } from "@/components/ui/container"

export function DeliverablesSection() {
    return (
        <section id="deliverables" className="py-32 px-4">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <SectionHeading
                        title={
                            <>
                                Ce que vous{" "}
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                    récupérez
                                </span>{" "}
                                (et gardez)
                            </>
                        }
                        subtitle="Des assets exploitables à long terme"
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {DELIVERABLE_ASSETS.map((asset, i) => (
                            <RevealAnimation key={i} delay={i * 0.05}>
                                <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 dark:border-zinc-800 hover:border-orange-500/30 hover:shadow-xl hover:bg-white/80 dark:hover:bg-zinc-900/80 transition-all duration-300 group">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                        <asset.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{asset.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{asset.desc}</p>
                                </div>
                            </RevealAnimation>
                        ))}
                    </div>

                    <RevealAnimation delay={0.4}>
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-center text-white">
                            <p className="text-3xl sm:text-4xl font-bold leading-tight">
                                La campagne ne s&apos;arrête pas quand les posts sortent.<br />
                                Elle commence quand vous comprenez ce qui marche.
                            </p>
                        </div>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
