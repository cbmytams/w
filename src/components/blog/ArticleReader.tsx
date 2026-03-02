"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wafiaGlass as G } from "@/styles/glass";
import ChapterDots from "@/components/blog/ChapterDots";
import type { BlogArticleReaderData } from "@/types/blog";

interface ArticleReaderProps {
  article: BlogArticleReaderData;
  chapter: number;
  reduceMotion: boolean;
  onChapterChange: (index: number) => void;
  onClose: () => void;
}

export default function ArticleReader({
  article,
  chapter,
  reduceMotion,
  onChapterChange,
  onClose,
}: ArticleReaderProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const transition = reduceMotion ? { duration: 0 } : G.spring;
  const chapterTransition = reduceMotion
    ? { duration: 0 }
    : ({
      type: "spring",
      stiffness: 280,
      damping: 32,
    } as const);

  const total = article.chapters.length;
  const canGoPrev = chapter > 0;
  const canGoNext = chapter < total - 1;

  useEffect(() => {
    titleRef.current?.focus();
  }, [article.slug]);

  const goPrev = () => {
    if (!canGoPrev) return;
    onChapterChange(chapter - 1);
  };

  const goNext = () => {
    if (!canGoNext) return;
    onChapterChange(chapter + 1);
  };

  return (
    <motion.section
      layoutId={`card-${article.slug}`}
      className="fixed inset-0 z-50 flex flex-col px-7 pb-8 pt-24"
      style={{
        background: "rgba(8, 8, 6, 0.86)",
        backdropFilter: "blur(48px) saturate(200%)",
        WebkitBackdropFilter: "blur(48px) saturate(200%)",
      }}
      transition={transition}
      aria-label={`Lecture de ${article.title}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,240,190,0.18) 50%, transparent 100%)",
        }}
      />

      <motion.p
        layoutId={`category-${article.slug}`}
        className="mb-3 text-[11px] md:text-[10px] uppercase tracking-[0.14em]"
        style={{ color: G.text3 }}
      >
        {article.category}
      </motion.p>

      <motion.h1
        ref={titleRef}
        tabIndex={-1}
        layoutId={`title-${article.slug}`}
        className="mb-3 text-[clamp(1.6rem,4.8vw,2.7rem)] leading-tight text-white outline-none"
        style={{
          fontFamily: G.fontSerif,
          fontWeight: 700,
          letterSpacing: "-.02em",
        }}
      >
        {article.title}
      </motion.h1>

      <p className="mb-8 text-xs" style={{ color: G.text2 }}>
        {article.time || "Lecture rapide"} · {article.publishedAt}
      </p>

      <motion.div
        className="relative flex-1"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0.2, right: 0.2 }}
        style={{ touchAction: "pan-y" }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 && info.velocity.y > 200) {
            onClose();
            return;
          }
          if (info.offset.x > 70 && info.velocity.x > 200) {
            goPrev();
          }
          if (info.offset.x < -70 && info.velocity.x < -200) {
            goNext();
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${article.slug}-${chapter}`}
            initial={{ opacity: 0, x: 28, filter: "blur(3px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -28, filter: "blur(3px)" }}
            transition={chapterTransition}
            className="flex h-full flex-col justify-center"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.11em]" style={{ color: G.backColor }}>
              {article.chapters[chapter].title}
            </p>
            <p
              className="max-w-3xl text-[1.06rem] leading-[1.7]"
              style={{ color: "rgba(255,245,220,.78)", fontFamily: G.fontUI }}
            >
              {article.chapters[chapter].content}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-8">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Chapitre précédent"
          className="inline-flex h-11 min-w-11 items-center justify-center rounded-full text-2xl"
          style={{ color: canGoPrev ? G.text2 : "rgba(255,245,220,.15)" }}
        >
          &lt;
        </button>

        <ChapterDots total={total} current={chapter} onChange={onChapterChange} />

        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Chapitre suivant"
          className="inline-flex h-11 min-w-11 items-center justify-center rounded-full text-2xl"
          style={{ color: canGoNext ? G.text2 : "rgba(255,245,220,.15)" }}
        >
          &gt;
        </button>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-5 inline-flex h-11 items-center justify-center rounded-full border px-4 text-xs uppercase tracking-[0.1em]"
        style={{
          borderColor: "rgba(255,235,180,.12)",
          color: "rgba(255,245,220,.50)",
          background: "rgba(255,248,230,.02)",
        }}
        aria-label="Fermer l'article"
      >
        Fermer
      </button>
    </motion.section>
  );
}
