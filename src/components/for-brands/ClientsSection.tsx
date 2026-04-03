"use client"

import Image from "next/image"
import { CLIENTS } from "@/constants/clients"
import { Marquee } from "@/components/ui/marquee"

const firstRow = CLIENTS.slice(0, Math.ceil(CLIENTS.length / 2))
const secondRow = CLIENTS.slice(Math.ceil(CLIENTS.length / 2))

function LogoCard({ name, logoLight }: { name: string; logoLight: string }) {
    return (
        <div className="flex items-center justify-center px-8 py-4">
            <Image
                src={logoLight}
                alt={name}
                width={120}
                height={40}
                sizes="120px"
                className="h-8 w-auto object-contain opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
            />
        </div>
    )
}

export function ClientsSection() {
    return (
        <section className="py-12 md:py-16 relative z-10 overflow-hidden">
            <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <Marquee pauseOnHover className="[--duration:40s]">
                    {firstRow.map((client) => (
                        <LogoCard key={client.name} name={client.name} logoLight={client.logoLight} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:40s] mt-4">
                    {secondRow.map((client) => (
                        <LogoCard key={client.name} name={client.name} logoLight={client.logoLight} />
                    ))}
                </Marquee>
            </div>
        </section>
    )
}
