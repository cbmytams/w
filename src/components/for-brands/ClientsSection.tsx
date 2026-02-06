"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { CLIENTS } from "@/constants/clients"

const listVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.05 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0 }
}

function LogoTile({ name, logoLight, logoDark, logoClass }: { name: string; logoLight: string; logoDark?: string; logoClass?: string }) {
    const [failed, setFailed] = useState(false)
    const darkLogo = logoDark ?? logoLight
    const baseLogoClass = "object-contain max-h-9 max-w-full grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"

    return (
        <div
            className="group relative h-20 w-full rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300/70 dark:hover:border-white/20"
            title={name}
        >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/8 via-transparent to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full w-full flex items-center justify-center px-6">
                {!failed && (
                    <>
                        <Image
                            src={logoLight}
                            alt={`Logo ${name}`}
                            width={160}
                            height={48}
                            className={`${baseLogoClass} ${logoClass ?? ""} dark:hidden`}
                            onError={() => setFailed(true)}
                        />
                        <Image
                            src={darkLogo}
                            alt={`Logo ${name}`}
                            width={160}
                            height={48}
                            className={`${baseLogoClass} ${logoClass ?? ""} hidden dark:block`}
                            onError={() => setFailed(true)}
                        />
                    </>
                )}
                {failed && (
                    <span className="text-sm font-semibold tracking-tight text-gray-700 dark:text-gray-200 whitespace-nowrap">
                        {name}
                    </span>
                )}
            </div>
        </div>
    )
}

export function ClientsSection() {
    return (
        <section className="py-24 px-4">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <RevealAnimation>
                        <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                            Ces marques ont choisi l&apos;excellence
                        </p>
                        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
                            De Citroën à HoYoverse, nous accompagnons les marques qui veulent dépasser les standards.
                        </p>
                    </RevealAnimation>
                    <RevealAnimation delay={0.1}>
                        <motion.ul
                            variants={listVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10%" }}
                            className="mt-2 flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-6"
                        >
                            {CLIENTS.map((client) => (
                                <motion.li
                                    key={client.name}
                                    variants={itemVariants}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                                    className="w-[170px] sm:w-[190px]"
                                >
                                    <LogoTile
                                        name={client.name}
                                        logoLight={client.logoLight}
                                        logoDark={client.logoDark}
                                        logoClass={client.logoClass}
                                    />
                                </motion.li>
                            ))}
                        </motion.ul>
                    </RevealAnimation>
                </div>
            </Container>
        </section>
    )
}
