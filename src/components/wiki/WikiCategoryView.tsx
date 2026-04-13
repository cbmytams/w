"use client";

import { motion } from "framer-motion";
import { EASING } from "@/lib/easing";
import { useRouter } from "next/navigation";
import WikiNavBar from "./WikiNavBar";
import WikiArticleCard from "./WikiArticleCard";
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

interface WikiCategoryViewProps {
  type: "theme" | "platform";
  title: string;
  articles: WikiArticleSummary[];
  allArticles: WikiArticleSummary[];
}

export default function WikiCategoryView({
  type,
  title,
  articles,
  allArticles,
}: WikiCategoryViewProps) {
  const router = useRouter();
  const { isDark, toggle: toggleDark } = useWikiDarkMode();

  return (
    <div
      id="wiki-root"
      className="min-h-screen font-sans flex flex-col"
      style={{ color: "var(--wiki-ink)", backgroundColor: "var(--wiki-bg)" }}
    >
      <WikiSearchDialog articles={allArticles} />
      <WikiNavBar
        isDeep
        isReading={false}
        parentLabel="Retour"
        onBack={() => router.push(`/wiki?tab=${type}`)}
        isDark={isDark}
        onToggleDark={toggleDark}
      />

      <main
        id="main-content"
        className="pt-32 px-6 md:px-12 max-w-4xl mx-auto pb-24 flex-1 w-full relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASING.premium }}
          className="mb-16 border-b pb-8"
          style={{ borderColor: "var(--wiki-line-dark)" }}
        >
          <p
            className="font-mono text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--wiki-ink-secondary)" }}
          >
            {type === "theme" ? "Thème" : "Plateforme"}
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight">
            {title}
          </h1>
        </motion.div>

        <div className="flex flex-col">
          {articles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <p
                className="font-mono text-sm mb-2"
                style={{ color: "var(--wiki-ink-secondary)" }}
              >
                Aucun article trouvé.
              </p>
              <p
                className="font-serif text-lg italic"
                style={{ color: "var(--wiki-ink-muted)" }}
              >
                Ce contenu est en cours de rédaction.
              </p>
            </motion.div>
          ) : (
            articles.map((article, i) => (
              <WikiArticleCard
                key={article.slug || i}
                article={article}
                index={i}
              />
            ))
          )}
        </div>
      </main>

      <footer
        className="border-t py-12 px-6 md:px-12 max-w-4xl mx-auto w-full relative z-10"
        style={{ borderColor: "var(--wiki-line)" }}
      >
        <div
          className="flex items-center justify-between"
          style={{ color: "var(--wiki-ink-muted)" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest">
            Wiki de l&apos;Influence
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
