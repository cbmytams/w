"use client"

import { Check, ArrowRight, CircleDashed, CheckCircle } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/common/SectionHeading"

export function ComparisonSectionV2() {
    return (
        <section className="py-32 px-4">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <SectionHeading
                        title={
                            <>
                                Pourquoi les agences classiques{" "}
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">vous coûtent cher</span>
                            </>
                        }
                        subtitle="Nous avons industrialisé ce que les autres font artisanalement."
                    />

                    <div className="mt-20 relative">
                        {/* Unified Glass Container */}
                        <div className="rounded-3xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-2xl overflow-hidden grid md:grid-cols-2 relative">

                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-[10%] bottom-[10%] left-1/2 w-px bg-gradient-to-b from-transparent via-gray-200 dark:via-zinc-700 to-transparent z-10" />

                            {/* LEFT: Standard Market (The Problem) */}
                            <div className="p-10 lg:p-14 bg-gray-50/50 dark:bg-zinc-900/40">
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="p-2 rounded-lg bg-gray-200/50 dark:bg-zinc-800 text-gray-500 dark:text-gray-300">
                                        <CircleDashed className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-500 dark:text-gray-300 uppercase tracking-widest">
                                        Ce que font les autres
                                    </h3>
                                </div>
                                <ul className="space-y-8">
                                    {[
                                        "Approche 'Casting' (subjectif)",
                                        "Reporting PDF statique (post-campagne)",
                                        "Contenus à usage unique",
                                        "Opérations 'One-shot'",
                                        "Black box (pas de learning)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 text-gray-500 dark:text-gray-300 items-start group">
                                            <span className="block w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-600 mt-2.5 group-hover:bg-gray-400 dark:group-hover:bg-zinc-500 transition-colors" />
                                            <span className="font-medium text-base leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* RIGHT: Wafia Methodology (The Solution) */}
                            <div className="p-10 lg:p-14 bg-white dark:bg-zinc-900 relative">
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20 text-orange-600">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                        Ce qu&apos;on fait pour vous
                                    </h3>
                                </div>
                                <ul className="space-y-8 relative z-10">
                                    {[
                                        "Approche 'Data' (critères validés)",
                                        "Dashboard Live 24/7 (accès direct)",
                                        "Asset Bank (réutilisable en Ads)",
                                        "Construction long terme",
                                        "Apprentissage itératif (Playbook)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 text-gray-900 dark:text-gray-100 items-start">
                                            <div className="mt-1">
                                                <Check className="w-4 h-4 text-orange-500" strokeWidth={3} />
                                            </div>
                                            <span className="font-semibold text-base leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Arrow Indicator */}
                                <div className="absolute bottom-10 right-10 opacity-10">
                                    <ArrowRight className="w-24 h-24 -rotate-45 text-orange-500" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
