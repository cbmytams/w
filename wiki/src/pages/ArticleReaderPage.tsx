import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import NavBar from "@/components/blog/NavBar";
import { getArticleBySlug, Article } from "@/lib/blog";
import { useDarkMode } from "@/lib/useDarkMode";

export default function ArticleReaderPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(0);
  const [direction, setDirection] = useState(1);
  const [article, setArticle] = useState<Article | null>(null);
  const [showUI, setShowUI] = useState(true);
  const mainRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const { isDark, toggle: toggleDark } = useDarkMode();

  // --- Zen Mode: hide ONLY the top navbar on scroll down ---
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

  // --- Swipe gesture using refs (no re-renders, no stale state) ---
  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });

  const goNext = useCallback(() => {
    if (article?.chapters && chapter < article.chapters.length - 1) {
      setDirection(1);
      setChapter((c) => c + 1);
    }
  }, [article, chapter]);

  const goPrev = useCallback(() => {
    if (chapter > 0) {
      setDirection(-1);
      setChapter((c) => c - 1);
    }
  }, [chapter]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
    touchEnd.current = { x: 0, y: 0 };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
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

  // --- Keyboard navigation (← →) ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // --- Load article ---
  useEffect(() => {
    if (slug) {
      const found = getArticleBySlug(slug);
      setArticle(found);
      setChapter(0);
    }
  }, [slug]);

  // --- SEO: dynamic page title ---
  useEffect(() => {
    if (article) {
      document.title = `${article.title} — Wiki de l'Influence`;
    }
    return () => {
      document.title = "Wiki de l'Influence";
    };
  }, [article]);

  // --- Scroll to top when chapter changes ---
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapter]);

  if (!article)
    return (
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }} />
    );

  const progress = article.chapters?.length
    ? ((chapter + 1) / article.chapters.length) * 100
    : 0;

  return (
    <div
      id="wiki-root"
      className="min-h-screen font-sans flex flex-col"
      style={{ backgroundColor: "var(--bg)", color: "var(--ink)" }}
    >
      <NavBar
        isDeep
        isReading
        parentLabel={article.category}
        currentTitle={article.title}
        onBack={() => navigate(-1)}
        showUI={showUI}
        isDark={isDark}
        onToggleDark={toggleDark}
      />

      {/* Progress Bar — follows navbar */}
      <motion.div
        animate={{ y: showUI ? 0 : -80 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-20 left-0 right-0 h-[2px] z-40"
        style={{ backgroundColor: "var(--line)" }}
      >
        <motion.div
          className="h-full"
          style={{ backgroundColor: "var(--ink)" }}
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
          <span
            className="font-mono text-xs uppercase tracking-[0.2em] mb-6 block"
            style={{ color: "var(--ink-secondary)" }}
          >
            {article.category} • {article.time}
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-[4.5vw] lg:text-[3.5vw] font-medium leading-[1.05] tracking-tight overflow-hidden">
            {article.title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.03,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </header>

        <div className="flex-1 relative">
          <AnimatePresence mode="wait" custom={direction}>
            {article.chapters?.length > 0 ? (
              <motion.div
                key={chapter}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  mass: 0.8,
                }}
                className="prose prose-lg md:prose-xl max-w-2xl mx-auto relative"
              >
                <h2
                  className="font-sans text-xl md:text-2xl font-semibold tracking-tight mb-8"
                  id="chapter-title"
                >
                  <span
                    className="mr-3 font-mono text-sm md:text-base font-normal"
                    style={{ color: "var(--ink-secondary)" }}
                  >
                    {String(chapter + 1).padStart(2, "0")}
                  </span>
                  {article.chapters[chapter].title}
                </h2>
                <div
                  className="font-serif text-lg md:text-[1.3rem] leading-[1.8] prose-p:mb-6 prose-a:underline prose-strong:font-semibold prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2 prose-h3:font-sans prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4 prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:italic"
                  style={{ color: "var(--prose-body)" }}
                >
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {article.chapters[chapter].content}
                  </Markdown>
                </div>
              </motion.div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <p
                  className="font-serif text-xl leading-relaxed"
                  style={{ color: "var(--prose-body)" }}
                >
                  Contenu de l'article non disponible ou en cours de rédaction.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Chapter Navigation — ALWAYS VISIBLE */}
        {article.chapters?.length > 1 && (
          <nav
            aria-label="Navigation des chapitres"
            className="mt-16 border-t pt-8 pb-12 flex items-center justify-between max-w-2xl mx-auto w-full"
            style={{ borderColor: "var(--line)" }}
          >
            <button
              onClick={goPrev}
              disabled={chapter === 0}
              aria-label={
                chapter > 0
                  ? `Chapitre précédent : ${article.chapters[chapter - 1].title}`
                  : "Aucun chapitre précédent"
              }
              className="group flex items-center gap-3 disabled:opacity-20 transition-opacity p-3 -ml-3 min-w-0"
            >
              <div
                className="w-12 h-12 rounded-full border flex items-center justify-center group-hover:opacity-60 transition-all shrink-0"
                style={{ borderColor: "var(--line)" }}
              >
                <span className="text-lg leading-none">←</span>
              </div>
              <div className="text-left hidden sm:block min-w-0">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest block mb-1"
                  style={{ color: "var(--ink-secondary)" }}
                >
                  Précédent
                </span>
                <span className="font-sans text-sm font-medium line-clamp-1 block">
                  {chapter > 0 ? article.chapters[chapter - 1].title : ""}
                </span>
              </div>
            </button>

            <div
              className="font-mono text-xs shrink-0 px-2"
              style={{ color: "var(--ink-secondary)" }}
              aria-live="polite"
            >
              {chapter + 1} / {article.chapters.length}
            </div>

            <button
              onClick={goNext}
              disabled={chapter === article.chapters.length - 1}
              aria-label={
                chapter < article.chapters.length - 1
                  ? `Chapitre suivant : ${article.chapters[chapter + 1].title}`
                  : "Aucun chapitre suivant"
              }
              className="group flex items-center gap-3 disabled:opacity-20 transition-opacity p-3 -mr-3 min-w-0"
            >
              <div className="text-right hidden sm:block min-w-0">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest block mb-1"
                  style={{ color: "var(--ink-secondary)" }}
                >
                  Suivant
                </span>
                <span className="font-sans text-sm font-medium line-clamp-1 block">
                  {chapter < article.chapters.length - 1
                    ? article.chapters[chapter + 1].title
                    : ""}
                </span>
              </div>
              <div
                className="w-12 h-12 rounded-full border flex items-center justify-center group-hover:opacity-60 transition-all shrink-0"
                style={{ borderColor: "var(--line)" }}
              >
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
          className="hidden xl:flex flex-col fixed top-40 right-12 w-64 2xl:right-auto 2xl:left-[calc(50%+26rem)] bottom-12"
        >
          <nav
            aria-label="Sommaire de l'article"
            className="flex flex-col h-full"
          >
            <h4
              className="font-mono text-xs uppercase tracking-widest mb-6 shrink-0"
              style={{ color: "var(--ink-secondary)" }}
            >
              Sommaire
            </h4>
            <div
              className="flex-1 overflow-y-auto pr-4 pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>{`
                                nav div::-webkit-scrollbar { display: none; }
                            `}</style>
              <ul
                className="space-y-5 border-l relative"
                style={{ borderColor: "var(--line)" }}
              >
                <motion.div
                  layoutId="toc-indicator"
                  className="absolute left-[-1px] top-0 w-[2px]"
                  style={{ backgroundColor: "var(--ink)" }}
                  initial={false}
                  animate={{ top: `${chapter * 48}px`, height: "24px" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />

                {article.chapters.map((c, i) => {
                  const isActive = chapter === i;
                  const distance = Math.abs(chapter - i);
                  const itemOpacity = isActive
                    ? 1
                    : distance === 1
                      ? 0.4
                      : 0.15;

                  return (
                    <motion.li
                      key={i}
                      initial={false}
                      animate={{ opacity: itemOpacity }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="pl-5 relative flex items-center min-h-[24px]"
                    >
                      <button
                        onClick={() => {
                          setDirection(i > chapter ? 1 : -1);
                          setChapter(i);
                        }}
                        aria-current={isActive ? "step" : undefined}
                        className={`text-sm font-sans text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm line-clamp-2 w-full pr-4 ${isActive ? "font-medium" : ""}`}
                        title={c.title}
                      >
                        <span className="font-mono text-[10px] mr-3 opacity-50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {c.title}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </motion.aside>
      )}
    </div>
  );
}
