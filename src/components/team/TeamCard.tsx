"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { TeamMember } from "@/data/team";

interface TeamCardProps {
    member: TeamMember;
    index: number;
}

export function TeamCard({ member, index }: TeamCardProps) {
    return (
        <Link
            href={`/equipe/${member.slug}`}
            className="group block relative w-full"
        >
            <div
                className={`
          relative w-full h-full bg-[var(--background)] rounded-3xl overflow-hidden
          border border-[var(--neutral-200)] dark:border-[var(--neutral-800)]
          shadow-lg dark:shadow-none
          transition-all duration-300 ease-out
          hover:-translate-y-1.5 hover:border-[var(--brand-primary)] hover:shadow-xl
          flex flex-col
        `}
            >
                {/* Header: Photo + Name/Role */}
                <div className="p-8 md:p-10 pb-0">
                    <div className="flex flex-col md:flex-row gap-6 md:items-start mb-4">
                        {/* Photo Avatar */}
                        <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full overflow-hidden border border-[var(--neutral-200)] dark:border-[var(--neutral-800)] bg-[var(--neutral-100)] dark:bg-[var(--neutral-900)]">
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--foreground)] mb-2 group-hover:text-[var(--brand-primary)] transition-colors duration-300 font-[family-name:var(--font-heading)]">
                                {member.name}
                            </h3>
                            <div className="inline-flex px-2.5 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold uppercase tracking-wider">
                                {member.role.split(" • ")[0]}
                            </div>
                            <p className="text-sm text-[var(--neutral-800)] dark:text-[var(--neutral-200)] mt-2 font-medium">
                                {member.role.split(" • ").slice(1).join(" • ")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Middle: Short Bio */}
                <div className="px-8 md:px-10 mb-8 flex-grow">
                    <p className="text-base md:text-lg text-[var(--neutral-800)] dark:text-[var(--neutral-200)] leading-relaxed max-w-lg">
                        &ldquo;{member.shortBio.trim().replace(/^"|"$/g, '')}&rdquo;
                    </p>
                </div>

                {/* Bottom: Proof + CTA */}
                <div className="mt-auto px-8 md:px-10 pb-8 md:pb-10 border-t border-[var(--neutral-200)] dark:border-[var(--neutral-800)] pt-6 bg-[var(--neutral-50)]/50 dark:bg-[var(--neutral-900)]/50 flex flex-col sm:flex-row sm:items-end justify-between gap-6">

                    {/* Proof Chips */}
                    <div className="flex flex-wrap gap-2">
                        {member.proof.map((item, i) => (
                            <span
                                key={i}
                                className="inline-flex px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--neutral-200)] dark:border-[var(--neutral-800)] text-xs font-semibold text-[var(--neutral-800)] dark:text-[var(--neutral-200)] shadow-sm"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors duration-300 whitespace-nowrap">
                        Découvrir mon parcours
                        <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

