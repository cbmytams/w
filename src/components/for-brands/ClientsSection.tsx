"use client"

import Image from "next/image"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { CLIENTS } from "@/constants/clients"

function LogoCard({ name, logoLight }: { name: string; logoLight: string }) {
    return (
        <div className="flex items-center justify-center p-4">
            <Image
                src={logoLight}
                alt={name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
            />
        </div>
    )
}

export function ClientsSection() {
    return (
        <section className="py-16 md:py-20 px-4 relative z-10">
            <Container>
                <RevealAnimation>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-8 items-center max-w-6xl mx-auto">
                        {CLIENTS.map((client) => (
                            <LogoCard key={client.name} name={client.name} logoLight={client.logoLight} />
                        ))}
                    </div>
                </RevealAnimation>
            </Container>
        </section>
    )
}
