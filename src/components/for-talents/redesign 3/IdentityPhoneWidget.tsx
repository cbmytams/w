"use client"

import Image from "next/image"

const PRIMARY_PLATFORMS = [
    { name: "Spotify", src: "/logos/talents/spotify.svg" },
    { name: "Apple Music", src: "/logos/talents/apple-music.svg" },
    { name: "Deezer", src: "/logos/talents/deezer.svg" },
    { name: "YouTube Music", src: "/logos/talents/youtube-music.svg" }
] as const

const PARTNER_LOGOS = [
    { name: "Nike", src: "/logos/talents/nike.svg" },
    { name: "Universal Music Group", src: "/logos/talents/universal-music-group.svg" },
    { name: "Sony", src: "/logos/talents/sony.svg" }
] as const

export function IdentityPhoneWidget() {
    return (
        <div className="relative w-full flex items-center justify-center py-2">
            <div className="absolute -top-6 -left-10 w-28 h-28 rounded-full bg-pink-400/20 blur-3xl" />
            <div className="absolute -bottom-10 -right-8 w-28 h-28 rounded-full bg-orange-400/20 blur-3xl" />

            <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[9/19]">
                <div className="absolute inset-0 rounded-[34px] bg-white/95 dark:bg-slate-950/90 border border-gray-200/70 dark:border-white/10 shadow-[0_30px_70px_rgba(15,23,42,0.22)]" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200/70 dark:border-white/10" />

                <div className="relative z-10 h-full p-4 pt-7 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-white/50">
                        <span>Identity Kit</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Live
                        </span>
                    </div>

                    <div className="rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 p-3 shadow-sm">
                        <div className="text-[11px] font-semibold text-gray-900 dark:text-white">
                            Plateformes clés
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                            {PRIMARY_PLATFORMS.map((platform) => (
                                <div
                                    key={platform.name}
                                    className="w-9 h-9 rounded-xl bg-white dark:bg-white/10 border border-gray-200/70 dark:border-white/10 flex items-center justify-center shadow-sm"
                                >
                                    <Image
                                        src={platform.src}
                                        alt={platform.name}
                                        width={20}
                                        height={20}
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-3 shadow-sm">
                            <div className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-white/50">
                                Positionnement
                            </div>
                            <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                Signature
                            </div>
                        </div>
                        <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200/70 dark:border-white/10 p-3 shadow-sm">
                            <div className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-white/50">
                                Contenu
                            </div>
                            <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                Rythme
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-gray-900 text-white p-3 shadow-lg">
                        <div className="text-[10px] uppercase tracking-widest text-white/60">
                            Brand-fit
                        </div>
                        <div className="mt-1 text-sm font-semibold">Deals alignés</div>
                        <div className="mt-2 flex items-center gap-2">
                            {PARTNER_LOGOS.map((partner) => (
                                <div
                                    key={partner.name}
                                    className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center"
                                >
                                    <Image
                                        src={partner.src}
                                        alt={partner.name}
                                        width={18}
                                        height={18}
                                        className="object-contain brightness-0 invert"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white px-3 py-2 text-xs font-semibold flex items-center justify-between shadow-lg">
                        <span>Image score</span>
                        <span className="text-sm font-bold">A+</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
