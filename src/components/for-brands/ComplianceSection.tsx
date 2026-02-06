"use client"

import { Check, Shield, Lock } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"

export function ComplianceSection() {
    return (
        <section className="py-32 px-4">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <RevealAnimation>
                        <div className="bg-white dark:bg-zinc-900/70 rounded-3xl p-12 shadow-xl border-2 border-gray-200 dark:border-zinc-800">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold mb-4">
                                    <Shield className="w-4 h-4" />
                                    Enterprise-ready
                                </div>
                                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                    Pas de mauvaise surprise. Jamais.
                                </h2>
                                <p className="text-xl text-gray-600 dark:text-gray-400">
                                    Même les détails juridiques sont pris en charge. Vous dormez tranquille.
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 mb-10">
                                {[
                                    { label: "ARPP validé", icon: Check },
                                    { label: "RGPD & DSA", icon: Lock },
                                    { label: "Brand Safety", icon: Shield }
                                ].map((badge, i) => (
                                    <div key={i} className="px-6 py-3 bg-gray-50 dark:bg-zinc-800/60 rounded-full border-2 border-gray-200 dark:border-zinc-700 flex items-center gap-2">
                                        <badge.icon className="w-5 h-5 text-green-600" />
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">{badge.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Respect ARPP", desc: "Influence responsable, mentions légales, transparence" },
                                    { title: "Traçabilité RGPD/DSA", desc: "Mentions, durées, territoires, droits d'utilisation" },
                                    { title: "Brand safety garantie", desc: "Validation manuelle + algorithmique de chaque profil" },
                                    { title: "Zéro risque reputationnel", desc: "Pas de fake followers, pas de bots, pas de profils controversés" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3">
                                        <Check className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
