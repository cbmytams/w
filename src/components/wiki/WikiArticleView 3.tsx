"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import WikiNavBar from "./WikiNavBar";
import WikiSearchDialog from "./WikiSearchDialog";
import { useWikiDarkMode } from "@/hooks/useWikiDarkMode";

interface Chapter {
    title: string;
    content: string;
    /** Pre-rendered HTML — used for the initial server render (SEO) */
    contentHtml: string;
}

interface ArticleData {
    slug: string;
    title: string;
    category: string;
    readTime: string;
    chapters: Chapter[];
    theme?: string;
    platform?: string;
}

interface SearchArticle {
    slug: string;
    title: string;
    category: string;
    readTime: string;
    platform?: string;
    theme?: string;
}

/**
 * WikiArticleView — Client Component for the chapter-based reader.
 *
 * SEO strategy: Every chapter is rendered **once** in the DOM inside a
 * semantic <section>. The active chapter is shown via CSS (`display:block`),
 * inactive chapters are hidden via CSS (`display:none`). This gives crawlers
 * the full article text without hidden-text duplication.
 */
export default function WikiArticleView({
    article,
    allArticles,
}: {
    article: ArticleData;
    allArticles: SearchArticle[];
}) {
    const router = useRouter();
    const [chapter, setChapter] = useState(0);
    const [showUI, setShowUI] = useState(true);
    const mainRef = useRef<HTMLElement>(null);
    const lastScrollY = useRef(0);
    const { isDark, toggle: toggleDark, mounted } = useWikiDarkMode();

    // --- Zen Mode: hide navbar on scroll down ---
    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            if (y > lastScrollY.current + 10) setShowUI(false);
            else if (y < lastScrollY.current - 10 || y < 50) setShowUI(true);
            lastScrollY.current = y;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // --- Swipe gesture ---
    const touchStart = useRef({ x: 0, y: 0 });
    const touchEnd = useRef({ x: 0, y: 0 });

    const goNext = useCallback(() => {
        if (article.chapters && chapter < article.chapters.length - 1) {
            setChapter(c => c + 1);
        }
    }, [article, chapter]);

    const goPrev = useCallback(() => {
        if (chapter > 0) {
            setChapter(c => c - 1);
        }
    }, [chapter]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
        touchEnd.current = { x: 0, y: 0 };
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
    };

    const handleTouchEnd = () => {
        if (touchEnd.current.x === 0 && touchEnd.current.y === 0) return;
        const dx = touchEnd.current.x - touchStart.current.x;
        const dy = touchEnd.current.y - touchStart.current.y;
        if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 50) {
            if (dx < 0) goNext();
            else goPrev();
        }
    };

    // --- Keyboard navigation ---
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goNext, goPrev]);

    // --- Scroll to top when chapter changes ---
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [chapter]);

    const progress = article.chapters?.length ? ((chapter + 1) / article.chapters.length) * 100 : 0;

    return (
        <div id="wiki-root" className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: 'var(--wiki-bg)', color: 'var(--wiki-ink)' }}>
            <WikiSearchDialog articles={allArticles} />
            <WikiNavBar isDeep isReading parentLabel={article.category}
                currentTitle={article.title} onBack={() => {
                    if (article.theme) {
                        router.push(`/wiki/theme/${article.theme}`);
                    } else if (article.platform) {
                        router.push(`/wiki/platform/${article.platform}`);
                    } else {
                        router.push("/wiki");
                    }
                }} showUI={showUI}
                isDark={isDark} onToggleDark={toggleDark} mounted={mounted} />

            {/* Progress Bar */}
            <motion.div
                animate={{ y: showUI ? 0 : -80 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed top-20 left-0 right-0 h-[2px] z-40"
                style={{ backgroundColor: 'var(--wiki-line)' }}
            >
                <motion.div
                    className="h-full"
                    style={{ backgroundColor: 'var(--wiki-ink)' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut", duration: 0.3 }}
                />
            </motion.div>

            {/* Main Content */}
            <article
                ref={mainRef as React.RefObject<HTMLElement>}
                className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-6 pt-32 pb-8"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <header className="mb-16 text-center max-w-3xl mx-auto mt-4">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] mb-6 block" style={{ color: 'var(--wiki-ink-secondary)' }}>
                        {article.category} • {article.readTime}
                    </span>

                    <h1 className="font-serif text-4xl sm:text-5xl md:text-[4.5vw] lg:text-[3.5vw] font-medium leading-[1.05] tracking-tight overflow-hidden">
                        {article.title.split(' ').map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-[0.25em]"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.7,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: i * 0.03
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>
                </header>

                {/* 
                  SEO: All chapters are rendered in the DOM as semantic <section>.
                  Only the active chapter is visible (display:block).
                  Crawlers see the full article text in a single pass.
                */}
                <div className="flex-1 relative">
                    {article.chapters?.length > 0 ? (
                        article.chapters.map((c, i) => {
                            const isActive = chapter === i;
                            return (
                                <section
                                    key={i}
                                    id={`chapitre-${i + 1}`}
                                    aria-labelledby={`titre-chapitre-${i + 1}`}
                                    style={{ display: isActive ? 'block' : 'none' }}
                                    className="prose prose-lg md:prose-xl max-w-2xl mx-auto relative"
                                >
                                    <h2
                                        id={`titre-chapitre-${i + 1}`}
                                        className="font-sans text-xl md:text-2xl font-semibold tracking-tight mb-8"
                                    >
                                        <span className="mr-3 font-mono text-sm md:text-base font-normal" style={{ color: 'var(--wiki-ink-secondary)' }}>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        {c.title}
                                    </h2>
                                    <div
                                        className="font-serif text-lg md:text-[1.3rem] leading-[1.8] prose-p:mb-6 prose-a:underline prose-strong:font-semibold prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2 prose-h3:font-sans prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4 prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:italic prose-hr:hidden"
                                        style={{ color: 'var(--wiki-prose-body)' }}
                                        dangerouslySetInnerHTML={{ __html: c.contentHtml }}
                                    />
                                </section>
                            );
                        })
                    ) : (
                        <div className="prose prose-lg max-w-none">
                            <p className="font-serif text-xl leading-relaxed" style={{ color: 'var(--wiki-prose-body)' }}>
                                Contenu de l&apos;article non disponible ou en cours de rédaction.
                            </p>
                        </div>
                    )}
                </div>

                {/* Chapter Navigation */}
                {article.chapters?.length > 1 && (
                    <nav
                        aria-label="Navigation des chapitres"
                        className="mt-16 border-t pt-8 pb-12 flex items-center justify-between max-w-2xl mx-auto w-full"
                        style={{ borderColor: 'var(--wiki-line)' }}
                    >
                        <button
                            onClick={goPrev}
                            disabled={chapter === 0}
                            aria-label={chapter > 0 ? `Chapitre précédent : ${article.chapters[chapter - 1].title}` : 'Aucun chapitre précédent'}
                            className="group flex items-center gap-3 disabled:opacity-20 transition-opacity p-3 -ml-3 min-w-0"
                        >
                            <div className="w-12 h-12 rounded-full border flex items-center justify-center group-hover:opacity-60 transition-all shrink-0" style={{ borderColor: 'var(--wiki-line)' }}>
                                <span className="text-lg leading-none">←</span>
                            </div>
                            <div className="text-left hidden sm:block min-w-0">
                                <span className="font-mono text-[10px] uppercase tracking-widest block mb-1" style={{ color: 'var(--wiki-ink-secondary)' }}>Précédent</span>
                                <span className="font-sans text-sm font-medium line-clamp-1 block">{chapter > 0 ? article.chapters[chapter - 1].title : ''}</span>
                            </div>
                        </button>

                        <div className="font-mono text-xs shrink-0 px-2" style={{ color: 'var(--wiki-ink-secondary)' }} aria-live="polite">
                            {chapter + 1} / {article.chapters.length}
                        </div>

                        <button
                            onClick={goNext}
                            disabled={chapter === article.chapters.length - 1}
                            aria-label={chapter < article.chapters.length - 1 ? `Chapitre suivant : ${article.chapters[chapter + 1].title}` : 'Aucun chapitre suivant'}
                            className="group flex items-center gap-3 disabled:opacity-20 transition-opacity p-3 -mr-3 min-w-0"
                        >
                            <div className="text-right hidden sm:block min-w-0">
                                <span className="font-mono text-[10px] uppercase tracking-widest block mb-1" style={{ color: 'var(--wiki-ink-secondary)' }}>Suivant</span>
                                <span className="font-sans text-sm font-medium line-clamp-1 block">{chapter < article.chapters.length - 1 ? article.chapters[chapter + 1].title : ''}</span>
                            </div>
                            <div className="w-12 h-12 rounded-full border flex items-center justify-center group-hover:opacity-60 transition-all shrink-0" style={{ borderColor: 'var(--wiki-line)' }}>
                                <span className="text-lg leading-none">→</span>
                            </div>
                        </button>
                    </nav>
                )}
            </article>

            {/* Table of Contents (Desktop Sidebar) */}
            {article.chapters?.length > 1 && (
                <motion.aside
                    animate={{ opacity: showUI ? 1 : 0.15 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="hidden xl:block fixed top-40 right-12 w-64 2xl:right-auto 2xl:left-[calc(50%+26rem)] max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide"
                >
                    <nav aria-label="Sommaire de l'article">
                        <h4 className="font-mono text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--wiki-ink-secondary)' }}>Sommaire</h4>
                        <ul className="space-y-5 border-l relative" style={{ borderColor: 'var(--wiki-line)' }}>
                            <motion.div
                                layoutId="toc-indicator"
                                className="absolute left-[-1px] top-0 w-[2px]"
                                style={{ backgroundColor: 'var(--wiki-ink)' }}
                                initial={false}
                                animate={{ top: `${chapter * 48}px`, height: '24px' }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />

                            {article.chapters.map((c, i) => {
                                const isActive = chapter === i;
                                const distance = Math.abs(chapter - i);
                                const itemOpacity = isActive ? 1 : distance === 1 ? 0.4 : 0.15;

                                return (
                                    <motion.li
                                        key={i}
                                        initial={false}
                                        animate={{ opacity: itemOpacity }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="pl-5 relative flex items-center min-h-[24px]"
                                    >
                                        <button
                                            onClick={() => { setChapter(i); }}
                                            aria-current={isActive ? "step" : undefined}
                                            className={`text-sm font-sans text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm line-clamp-2 w-full pr-4 ${isActive ? 'font-medium' : ''}`}
                                            title={c.title}
                                        >
                                            <span className="font-mono text-[10px] mr-3 opacity-50">{String(i + 1).padStart(2, '0')}</span>
                                            {c.title}
                                        </button>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </nav>
                </motion.aside>
            )}
        </div>
    );
}
