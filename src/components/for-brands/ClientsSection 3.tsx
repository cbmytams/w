"use client"

import Image from "next/image"
import { Marquee } from "@/components/ui/marquee"
import { CLIENTS } from "@/constants/clients"

const firstRow = CLIENTS.slice(0, Math.ceil(CLIENTS.length / 2))
const secondRow = CLIENTS.slice(Math.ceil(CLIENTS.length / 2))

const LogoCard = ({
    name,
    logoLight,
}: {
    name: string
    logoLight: string
}) => {
    return (
        <div className="relative flex h-24 w-32 md:w-48 cursor-pointer items-center justify-center px-4">
            <div className="relative h-12 w-full">
                <Image
                    src={logoLight}
                    alt={`Logo ${name}`}
                    fill
                    className="object-contain grayscale transition-all duration-300 hover:grayscale-0 opacity-70 hover:opacity-100 dark:invert"
                />
            </div>
        </div>
    )
}

export function ClientsSection() {
    return (
        <section className="py-16 md:py-20 relative overflow-hidden bg-transparent">
            {/* Full width container with CSS Mask for smooth fade edges */}
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <Marquee pauseOnHover className="[--duration:40s]">
                    {firstRow.map((client) => (
                        <LogoCard key={client.name} {...client} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:40s]">
                    {secondRow.map((client) => (
                        <LogoCard key={client.name} {...client} />
                    ))}
                </Marquee>
            </div>
        </section>
    )
}
