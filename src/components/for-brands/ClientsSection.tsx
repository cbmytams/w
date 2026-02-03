"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { CLIENTS } from "@/constants/clients"

export function ClientsSection() {
    return (
        <section className="py-20 px-4 border-y border-gray-100">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <RevealAnimation>
                        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Ces marques ont choisi l'excellence
                        </p>
                        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
                            De Citroën à HoYoverse, nous accompagnons les marques qui veulent dépasser les standards.
                        </p>
                    </RevealAnimation>
                    <RevealAnimation delay={0.1}>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-8 gap-y-10 items-center justify-items-center">
                            {CLIENTS.map((client, i) => (
                                <motion.div
                                    key={client.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="flex items-center justify-center"
                                >
                                    <div className="group cursor-pointer">
                                        <div
                                            className={`${client.width} h-12 flex items-center justify-center px-4 py-2 rounded-xl 
                                                        transition-all duration-300 
                                                        grayscale opacity-50 
                                                        hover:grayscale-0 hover:opacity-100 hover:scale-110
                                                        hover:bg-gray-50`}
                                            title={client.name}
                                        >
                                            {/* Affiche le logo si disponible, sinon le nom en texte */}
                                            <Image
                                                src={client.logo}
                                                alt={`Logo ${client.name}`}
                                                width={120}
                                                height={40}
                                                className="object-contain max-h-10"
                                                onError={(e) => {
                                                    // Fallback: cacher l'image et afficher le texte
                                                    const target = e.currentTarget
                                                    target.style.display = 'none'
                                                    const textEl = target.nextElementSibling as HTMLElement
                                                    if (textEl) textEl.style.display = 'block'
                                                }}
                                            />
                                            {/* Fallback texte (caché par défaut, affiché si l'image échoue) */}
                                            <span
                                                className="font-bold text-gray-700 text-lg tracking-tight whitespace-nowrap hidden"
                                            >
                                                {client.name}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
