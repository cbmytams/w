"use client"

import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_IDENTITY, BRAND_GRADIENT } from "@/constants"
import { IdentityPhoneWidget } from "./redesign/IdentityPhoneWidget"

export function IdentitySection() {
    return (
        <section id="identity" className="section-spacing px-4 bg-transparent">
            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <RevealAnimation className="mb-16">
                        <span className="text-sm font-semibold text-pink-600 dark:text-pink-300 uppercase tracking-wider mb-4 block">
                            {TALENT_IDENTITY.label}
                        </span>
                        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white">
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
                            <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-10 md:p-12 h-full border border-gray-200 dark:border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">
                                    {TALENT_IDENTITY.subtitle}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-white/70 mb-10 leading-relaxed">
                                    {TALENT_IDENTITY.description}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {TALENT_IDENTITY.services.map((service) => (
                                        <div
                                            key={service.title}
                                            className="group relative overflow-hidden rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-pink-300/60 dark:hover:border-pink-500/40"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-transparent to-orange-200/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${BRAND_GRADIENT}`} />
                                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {service.title}
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealAnimation>

                        {/* Image Card */}
                        <RevealAnimation delay={0.2} className="md:col-span-5">
                            <div className="relative h-full min-h-[460px] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-slate-50 dark:bg-white/5 backdrop-blur-xl">
                                <div className="absolute inset-0 bg-[radial-gradient(280px_240px_at_20%_20%,rgba(236,72,153,0.18),transparent_60%)] dark:bg-[radial-gradient(280px_240px_at_20%_20%,rgba(236,72,153,0.25),transparent_60%)]" />
                                <div className="absolute inset-0 bg-[radial-gradient(320px_260px_at_80%_80%,rgba(249,115,22,0.18),transparent_60%)] dark:bg-[radial-gradient(320px_260px_at_80%_80%,rgba(249,115,22,0.22),transparent_60%)]" />
                                <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px] opacity-40" />

                                <div className="relative z-10 flex flex-col items-center justify-between h-full p-8 md:p-10 gap-8">
                                    <IdentityPhoneWidget />
                                    <div className="text-center">
                                        <div className="w-12 h-1 bg-pink-500 mb-4 mx-auto" />
                                        <p className="text-base font-semibold text-gray-800 dark:text-white/85">
                                            &ldquo;{TALENT_IDENTITY.quote}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </RevealAnimation>
                    </div>
                </div>
            </Container>
        </section>
    )
}
