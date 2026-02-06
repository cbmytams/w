import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";
import { notFound } from "next/navigation";
import { TEAM } from "@/data/team";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const member = TEAM.find((p) => p.slug === slug);

    if (!member) {
        return {
            title: "Membre non trouvé | Wafia",
        };
    }

    return {
        title: `${member.name} - ${member.role}`,
        description: member.shortBio,
        openGraph: {
            title: `${member.name} | Wafia`,
            description: member.shortBio,
            images: [
                {
                    url: member.image,
                    width: 800,
                    height: 800,
                    alt: member.name,
                },
            ],
        },
    };
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const member = TEAM.find((p) => p.slug === slug);

    if (!member) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Back to Team Link */}
            <div className="fixed top-6 left-6 z-50 mix-blend-difference">
                <Link
                    href="/for-talents"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                >
                    <MoveLeft className="w-4 h-4" />
                    Retour à l&apos;équipe
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-16 md:py-32 px-4 overflow-hidden border-b border-[var(--neutral-200)] dark:border-[var(--neutral-800)]">
                <div className="max-w-4xl mx-auto text-center md:text-left md:flex md:items-end md:justify-between gap-10">
                    <div>
                        <div className="mb-6 relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-[var(--neutral-200)] dark:border-[var(--neutral-800)] mx-auto md:mx-0">
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[var(--foreground)] mb-4 font-[family-name:var(--font-heading)]">
                            {member.name}
                        </h1>

                        <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
                            <span className="inline-block text-sm font-bold text-[var(--brand-primary)] uppercase tracking-wide">
                                {member.role}
                            </span>
                            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-[var(--neutral-200)]"></span>
                            <span className="text-sm font-medium text-[var(--neutral-800)] dark:text-[var(--neutral-200)]">
                                {member.location}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote / Manifest */}
            <section className="py-16 md:py-24 px-4 bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex gap-6 md:gap-10 items-start">
                        <div className="hidden md:block w-1 h-24 bg-[var(--brand-primary)] rounded-full flex-shrink-0"></div>
                        <div>
                            <h2 className="text-2xl md:text-4xl font-semibold leading-tight text-[var(--foreground)] mb-8 font-[family-name:var(--font-heading)]">
                                &ldquo;{member.quote}&rdquo;
                            </h2>

                            {/* Proof chips inside bio section */}
                            <div className="flex flex-wrap gap-3 mb-8">
                                {member.proof.map((item, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--neutral-200)] dark:border-[var(--neutral-800)] text-xs font-semibold text-[var(--neutral-800)] dark:text-[var(--neutral-200)] shadow-sm"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep Dive Content (Commercial/Essential Sorting) */}
            <section className="py-20 px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-20">

                    {member.longSections.map((section, idx) => (
                        <div key={idx} className="md:grid md:grid-cols-12 gap-10">
                            <div className="md:col-span-4 mb-6 md:mb-0">
                                <h3 className="text-xl font-bold text-[var(--foreground)] sticky top-24 font-[family-name:var(--font-heading)]">
                                    {section.title}
                                </h3>
                            </div>
                            <div className="md:col-span-8">
                                {section.text && (
                                    <p className="text-lg text-[var(--neutral-800)] dark:text-[var(--neutral-200)] leading-relaxed mb-8">
                                        {section.text}
                                    </p>
                                )}

                                {section.bullets && (
                                    <div className="grid grid-cols-1 gap-4">
                                        {section.bullets.map((bullet, bIdx) => (
                                            <div
                                                key={bIdx}
                                                className="p-6 rounded-2xl bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)] border border-[var(--neutral-200)] dark:border-[var(--neutral-800)] hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/5 transition-colors"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center text-xs font-bold mt-0.5">
                                                        {bIdx + 1}
                                                    </span>
                                                    <span className="font-medium text-[var(--foreground)]">
                                                        {bullet}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[var(--foreground)] text-[var(--background)]">
                <div className="max-w-2xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-heading)]">
                        Prêt à construire ?
                    </h2>
                    <p className="text-[var(--neutral-200)] mb-10 text-lg">
                        On ne cherche pas des clients, on cherche des partenaires.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="mailto:contact@wafia.fr"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--background)] px-8 text-sm font-bold text-[var(--foreground)] transition-transform hover:scale-105 active:scale-95"
                        >
                            Nous contacter
                        </Link>
                        {member.links.linkedin && (
                            <Link
                                href={member.links.linkedin}
                                target="_blank"
                                className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--background)]/20 px-8 text-sm font-bold text-[var(--background)] transition-colors hover:bg-[var(--background)]/10"
                            >
                                Linkedin
                                <MoveRight className="ml-2 w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

