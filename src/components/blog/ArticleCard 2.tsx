"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { wafiaGlass as G } from "@/styles/glass";
import type { BlogArticlePreview } from "@/types/blog";

interface ArticleCardProps {
  article: BlogArticlePreview;
  onOpen: (slug: string) => void;
  index?: number;
}

export default function ArticleCard({ article, onOpen, index = 0 }: ArticleCardProps) {
  return (
    <motion.article
      layoutId={`card-${article.slug}`}
      initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ ...G.spring, delay: index * 0.04 }}
      className="group relative overflow-hidden rounded-2xl border"
      style={{
        ...G.cardStyle,
        border: "1px solid rgba(255, 235, 180, 0.09)",
      }}
      whileHover={{
        y: -2,
        background: G.cardHoverStyle.background,
        borderColor: G.cardHoverStyle.borderColor,
      }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,240,190,0.20) 50%, transparent 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 90% at 0% 100%, rgba(255,210,100,0.14) 0%, rgba(255,210,100,0.02) 42%, transparent 70%)",
        }}
      />

      <Link
        href={`/blog/${article.slug}`}
        onClick={(event) => {
          // Allow native cmd/ctrl+click to open in new tab
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) {
            return;
          }
          event.preventDefault();
          onOpen(article.slug);
        }}
        className="relative block p-5"
        aria-label={`Ouvrir l'article: ${article.title}`}
      >
        <motion.p
          layoutId={`category-${article.slug}`}
          className="mb-2 text-[11px] md:text-[10px] uppercase tracking-[0.12em]"
          style={{ color: "rgba(255, 245, 220, 0.25)" }}
        >
          {article.category}
        </motion.p>

        <motion.h2
          layoutId={`title-${article.slug}`}
          className="pr-5 text-[1.05rem] leading-tight"
          style={{
            fontFamily: G.fontSerif,
            fontWeight: 700,
            letterSpacing: "-.01em",
            color: "#fff",
          }}
        >
          {article.title}
        </motion.h2>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span style={{ color: "rgba(255,245,220,.40)" }}>{article.time || "Lecture"}</span>
          <span style={{ color: "rgba(255,245,220,.24)" }}>{article.publishedAt}</span>
        </div>
      </Link>
    </motion.article>
  );
}
