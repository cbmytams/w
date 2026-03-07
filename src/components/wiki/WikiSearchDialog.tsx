"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, X } from "lucide-react";

interface SearchArticle {
    slug: string;
    title: string;
    category: string;
    readTime: string;
    platform?: string;
    theme?: string;
}

export default function WikiSearchDialog({ articles }: { articles: SearchArticle[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    const closeDialog = () => {
        setIsOpen(false);
        setQuery("");
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
                setQuery("");
            }
        };

        const handleOpenSearch = () => setIsOpen(true);

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("open-search", handleOpenSearch);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("open-search", handleOpenSearch);
        };
    }, [isOpen]);

    const results = useMemo(() => {
        if (query.length > 1) {
            const q = query.toLowerCase();

            const scored = articles.map(a => {
                let score = 0;
                if (a.title.toLowerCase().includes(q)) score += 10;
                if (a.category.toLowerCase().includes(q)) score += 5;
                if (a.platform?.toLowerCase().includes(q)) score += 8;
                if (a.theme?.toLowerCase().includes(q)) score += 8;
                return { article: a, score };
            });

            const filtered = scored
                .filter(s => s.score > 0)
                .sort((a, b) => b.score - a.score)
                .map(s => s.article);
            return filtered;
        }

        return [];
    }, [query, articles]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4"
                style={{ backgroundColor: 'var(--wiki-search-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                onClick={closeDialog}
                role="dialog"
                aria-modal="true"
                aria-label="Recherche Globale"
            >
                <motion.div
                    key="dialog"
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                    className="w-full max-w-2xl border rounded-xl shadow-2xl overflow-hidden flex flex-col mx-4 md:mx-0"
                    style={{ backgroundColor: 'var(--wiki-bg-elevated)', borderColor: 'var(--wiki-line)' }}
                >
                    <div className="flex items-center px-6 py-2 border-b gap-2" style={{ borderColor: 'var(--wiki-line)' }}>
                        <div className="w-12 h-12 flex items-center justify-center shrink-0">
                            <Search className="w-6 h-6" style={{ color: 'var(--wiki-ink-secondary)' }} />
                        </div>
                        <input
                            autoFocus
                            className="flex-1 px-2 py-6 text-xl md:text-2xl bg-transparent border-none outline-none font-sans"
                            style={{ color: 'var(--wiki-ink)' }}
                            placeholder="Rechercher des articles, thèmes..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            aria-label="Saisie de recherche"
                        />
                        <button
                            onClick={closeDialog}
                            className="w-12 h-12 flex items-center justify-center transition-opacity hover:opacity-60 rounded-sm focus-visible:outline focus-visible:outline-2 shrink-0"
                            style={{ color: 'var(--wiki-ink-secondary)' }}
                            aria-label="Fermer la recherche"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="max-h-[50vh] overflow-y-auto w-full">
                        {results.length > 0 ? (
                            <div className="py-2">
                                {results.map((r) => (
                                    <Link
                                        key={r.slug}
                                        href={`/wiki/${r.slug}`}
                                        onClick={closeDialog}
                                        className="w-full text-left px-6 py-4 flex items-center justify-between border-b last:border-0 group focus-visible:outline-none transition-opacity hover:opacity-70"
                                        style={{ borderColor: 'var(--wiki-line)' }}
                                    >
                                        <div>
                                            <p className="font-serif text-xl transition-all duration-300" style={{ color: 'var(--wiki-ink)' }}>{r.title}</p>
                                            <p className="font-mono text-[10px] uppercase tracking-widest mt-2" style={{ color: 'var(--wiki-ink-secondary)' }}>{r.category} • {r.readTime}</p>
                                        </div>
                                        <span style={{ color: 'var(--wiki-ink-secondary)' }}>→</span>
                                    </Link>
                                ))}
                            </div>
                        ) : query.length > 1 ? (
                            <div className="py-16 text-center font-mono text-sm max-w-md mx-auto" style={{ color: 'var(--wiki-ink-secondary)' }}>
                                Aucun résultat pour « {query} ».
                            </div>
                        ) : (
                            <div className="py-10 text-center font-mono text-sm uppercase tracking-widest border-t" style={{ color: 'var(--wiki-ink-muted)', borderColor: 'var(--wiki-line)' }}>
                                Tapez pour rechercher…
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
