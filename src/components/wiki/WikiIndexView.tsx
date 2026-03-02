"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import WikiNavBar from "./WikiNavBar";
import WikiTabSwitcher from "./WikiTabSwitcher";
import WikiSearchDialog from "./WikiSearchDialog";
import { useWikiDarkMode } from "@/hooks/useWikiDarkMode";

interface WikiArticleSummary {
    slug: string;
    title: string;
    category: string;
    readTime: string;
    theme?: string;
    platform?: string;
}

const TABS = [{ id: "theme", label: "Thèmes" }, { id: "platform", label: "Plateformes" }];
const THEMES = [
    { id: "algorithmes", label: "Algorithmes", num: "01" },
    { id: "monetisation", label: "Monétisation", num: "02" },
    { id: "croissance", label: "Croissance", num: "03" },
    { id: "branding", label: "Branding", num: "04" },
    { id: "audience", label: "Audience & Communauté", num: "05" },
    { id: "production", label: "Production & Outils", num: "06" },
    { id: "business", label: "Business & Contrats", num: "07" },
];
const PLATFORMS = [
    { id: "tiktok", label: "TikTok", num: "01" },
    { id: "instagram", label: "Instagram", num: "02" },
    { id: "youtube", label: "YouTube", num: "03" },
    { id: "twitch", label: "Twitch", num: "04" },
    { id: "snapchat", label: "Snapchat", num: "05" },
    { id: "x", label: "X / Twitter", num: "06" },
    { id: "facebook", label: "Facebook", num: "07" },
];

/**
 * Wiki index view — Client Component that replicates the original BlogPage.
 * Receives articles from the Server Component parent for search indexing.
 */
export default function WikiIndexView({ articles }: { articles: WikiArticleSummary[] }) {
    const [tab, setTab] = useState<"theme" | "platform">("theme");
    const router = useRouter();
    const { isDark, toggle: toggleDark } = useWikiDarkMode();

    const items = tab === "theme" ? THEMES : PLATFORMS;

    const handleNavigate = (type: string, id: string) => {
        const routePrefix = type === "theme" ? "/wiki/theme" : "/wiki/plateforme";
        router.push(`${routePrefix}/${id}`);
    };

    return (
        <div id="wiki-root" className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: 'var(--wiki-bg)', color: 'var(--wiki-ink)' }}>
            <WikiSearchDialog articles={articles} />
            <WikiNavBar isDeep={false} isReading={false} parentLabel="Index" isDark={isDark} onToggleDark={toggleDark} />

            <main id="main-content" className="pt-32 px-6 md:px-12 max-w-5xl mx-auto pb-24 flex-1 w-full">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12"
                >
                    <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-medium leading-[0.9] tracking-tight">
                        Wiki de <br />
                        <span className="italic" style={{ color: 'var(--wiki-ink-secondary)' }}>l&apos;Influence.</span>
                    </h1>
                </motion.div>

                <div className="mb-12">
                    <WikiTabSwitcher tabs={TABS} active={tab} onChange={v => setTab(v as "theme" | "platform")} />
                </div>

                <div className="relative min-h-[50vh]">
                    <AnimatePresence mode="wait">
                        <motion.div key={tab}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 border-t"
                            style={{ borderColor: 'var(--wiki-line)' }}
                        >
                            {items.map((item) => (
                                <motion.div key={item.id}
                                    onClick={() => handleNavigate(tab, item.id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNavigate(tab, item.id); } }}
                                    className="group cursor-pointer py-8 flex items-start justify-between border-b focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 rounded-sm"
                                    style={{ borderColor: 'var(--wiki-line)' }}
                                >
                                    <div className="transform transition-transform duration-300 ease-out group-hover:translate-x-2">
                                        <span className="font-mono text-xs mb-2 block" style={{ color: 'var(--wiki-ink-secondary)' }}>{item.num}</span>
                                        <p className="font-serif text-3xl transition-colors duration-300 group-hover:opacity-60">
                                            {item.label}
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0" style={{ borderColor: 'var(--wiki-line)' }}>
                                        <span className="text-sm leading-none mb-0.5">→</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <footer className="border-t py-12 px-6 md:px-12 max-w-5xl mx-auto w-full" style={{ borderColor: 'var(--wiki-line)' }}>
                <div className="flex items-center justify-between" style={{ color: 'var(--wiki-ink-muted)' }}>
                    <p className="font-mono text-[10px] uppercase tracking-widest">Wiki de l&apos;Influence</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest">© {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    );
}
