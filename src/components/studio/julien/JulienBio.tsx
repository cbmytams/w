"use client"

import { FadeIn } from "@/components/ui/fade-in"
import { Container } from "@/components/ui/container"
import Image from "next/image"

export function JulienBio() {
    return (
        <section className="py-24 md:py-32 bg-zinc-950 relative border-t border-white/5 overflow-hidden">
            <Container className="max-w-7xl px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    <FadeIn delay={0.1}>
                        <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src="/korea_house_paris_2024.png"
                                alt="Julien Ardid"
                                fill
                                className="object-cover"
                            />
                            {/* Subtle inner overlay */}
                            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="flex flex-col gap-8 md:gap-10">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
                                Du terrain <br className="md:hidden" />
                                <span className="text-zinc-600 block mt-2">au studio.</span>
                            </h2>

                            <div className="space-y-6 md:space-y-8 text-[17px] md:text-xl text-zinc-400 font-medium leading-relaxed">
                                <p>
                                    Depuis toujours passionné de captation vidéo, j'ai débuté la réalisation il y a plus de 9 ans. D'abord dans une boîte de production spécialisée dans les mariages, l'événementiel et la course automobile. C'est là que j'ai appris <strong className="text-white font-bold">tout ce qu'il y a à savoir sur la captation sur le terrain.</strong>
                                </p>
                                <p>
                                    Puis j'ai décidé de me lancer à mon compte. J'ai commencé à réaliser des <span className="italic text-zinc-300">« fausses pubs »</span> dans ma chambre avec le matériel que j'avais. J'ai partagé les coulisses sur les réseaux pour montrer l'envers du décor. <strong className="text-purple-400 font-bold">Ça a explosé.</strong>
                                </p>
                                <p>
                                    Aujourd'hui, je me suis spécialisé dans la <strong className="text-white font-bold">publicité de produits en studio.</strong> J'ai une vision très particulière de la publicité : les codes des réseaux sont bien différents de ceux de la télé, et c'est en ce sens que j'essaie de créer des vidéos <strong className="text-white font-bold">impactantes, colorées, dynamiques et très basées sur le visuel et le sound design.</strong>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-4">
                                {['Impactant', 'Coloré', 'Dynamique', 'Social-First'].map((tag) => (
                                    <div key={tag} className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center font-bold text-xs uppercase tracking-widest text-white/70">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                </div>
            </Container>
        </section>
    )
}
