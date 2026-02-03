"use client"

import { Check, X } from "lucide-react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { SectionHeading } from "@/components/common/SectionHeading"

export function ComparisonSection() {
    return (
        <section className="py-32 px-4 bg-white">
            <Container>
                <div className="max-w-5xl mx-auto">
                    <SectionHeading
                        title={
                            <>
                                Ce qui change{" "}
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">vraiment</span>{" "}
                                avec Wafia
                            </>
                        }
                    />

                    <RevealAnimation delay={0.2}>
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                            <div className="grid md:grid-cols-2">
                                <div className="p-8 bg-gray-50">
                                    <h3 className="text-xl font-bold text-gray-500 mb-6 uppercase tracking-wide text-center">Agences classiques</h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Casting \"au feeling\"",
                                            "\"On vous envoie un reporting\"",
                                            "Contenus jetables",
                                            "One-shot sans suite",
                                            "Vous ne savez pas pourquoi ça marche"
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3 text-gray-600">
                                                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-8 bg-gradient-to-br from-orange-50 to-red-50">
                                    <h3 className="text-xl font-bold text-orange-600 mb-6 uppercase tracking-wide text-center">Wafia</h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Critères documentés + validation data",
                                            "Dashboard live 24/7",
                                            "Banque de contenus réutilisables",
                                            "Capitalisation long terme",
                                            "Vous comprenez et vous reproduisez"
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3 text-gray-900">
                                                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                                <span className="font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
