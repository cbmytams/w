"use client";

import { motion } from "framer-motion";
import { SPRING } from "@/lib/design-tokens";
import Link from "next/link";

interface WikiArticleSummary {
    slug: string;
    title: string;
    category: string;
    readTime: string;
}

interface WikiArticleCardProps {
    article: WikiArticleSummary;
    index: number;
}

export default function WikiArticleCard({ article, index }: WikiArticleCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...SPRING.responsive, delay: index * 0.05 }}
            className="group border-b relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 rounded-sm"
            style={{ borderColor: 'var(--wiki-line)' }}
        >
            <Link
                href={`/wiki/${article.slug}`}
                className="block py-8 cursor-pointer no-underline"
                aria-label={`Lire l'article : ${article.title}`}
            >
                <div className="flex justify-between items-start gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--wiki-ink-secondary)' }}>
                                {article.category}
                            </span>
                            <span className="w-4 h-px" style={{ backgroundColor: 'var(--wiki-line)' }} />
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--wiki-ink-secondary)' }}>
                                {article.readTime}
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight transition-opacity duration-300 group-hover:opacity-60" style={{ color: 'var(--wiki-ink)' }}>
                            {article.title}
                        </h2>
                    </div>
                    <div className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:opacity-60 transition-all duration-300 shrink-0" style={{ borderColor: 'var(--wiki-line)', color: 'var(--wiki-ink)' }}>
                        <span className="text-lg leading-none mb-1">→</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
