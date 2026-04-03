"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EASING } from "@/lib/easing";
import Link from "next/link";
import WikiNavBar from "./WikiNavBar";
import WikiTabSwitcher from "./WikiTabSwitcher";
import WikiSearchDialog from "./WikiSearchDialog";
import { useWikiDarkMode } from "@/hooks/useWikiDarkMode";
import { WIKI_PLATFORM_ITEMS, WIKI_THEME_ITEMS } from "@/lib/wiki-taxonomy";

interface WikiArticleSummary {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  theme?: string;
  platform?: string;
}

const TABS = [{ id: "theme", label: "Thèmes" }, { id: "platform", label: "Plateformes" }];

/**
 * Wiki index view — Client Component that replicates the original BlogPage.
 * Receives articles from the Server Component parent for search indexing.
 */
export default function WikiIndexView({ articles }: { articles: WikiArticleSummary[] }) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "platform" ? "platform" : "theme";
  const [tab, setTab] = useState<"theme" | "platform">(initialTab);
  const { isDark, toggle: toggleDark } = useWikiDarkMode();

  const items = tab === "theme" ? WIKI_THEME_ITEMS : WIKI_PLATFORM_ITEMS;
  const routePrefix = tab === "theme" ? "/wiki/theme" : "/wiki/platform";

  return (
    <div
      id="wiki-root"
      className="min-h-screen font-sans flex flex-col"
      style={{ color: "var(--wiki-ink)", backgroundColor: "var(--wiki-bg)" }}
    >
      <WikiSearchDialog articles={articles} />
      <WikiNavBar
        isDeep={false}
        isReading={false}
        parentLabel="Index"
        isDark={isDark}
        onToggleDark={toggleDark}
      />

      <main id="main-content" className="pt-32 px-6 md:px-12 max-w-5xl mx-auto pb-24 flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASING.premium }}
          className="mb-12"
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-medium leading-[0.9] tracking-tight">
            Wiki de <br />
            <span className="italic" style={{ color: "var(--wiki-ink-secondary)" }}>
              l&apos;Influence.
            </span>
          </h1>
        </motion.div>

        <div className="mb-12">
          <WikiTabSwitcher
            tabs={TABS}
            active={tab}
            onChange={(value) => setTab(value as "theme" | "platform")}
          />
        </div>

        <div className="relative min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 border-t"
              style={{ borderColor: "var(--wiki-line)" }}
            >
              {items.map((item) => (
                <motion.div key={item.id} className="border-b" style={{ borderColor: "var(--wiki-line)" }}>
                  <Link
                    href={`${routePrefix}/${item.id}`}
                    className="group py-8 flex items-start justify-between rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8"
                    aria-label={`Voir la section ${item.label}`}
                  >
                    <div className="transform transition-transform duration-300 ease-out group-hover:translate-x-2">
                      <span
                        className="font-mono text-xs mb-2 block"
                        style={{ color: "var(--wiki-ink-secondary)" }}
                      >
                        {item.num}
                      </span>
                      <p className="font-serif text-3xl transition-colors duration-300 group-hover:opacity-60">
                        {item.label}
                      </p>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0"
                      style={{ borderColor: "var(--wiki-line)" }}
                    >
                      <span className="text-sm leading-none mb-0.5">→</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <nav aria-label="Navigation wiki complète" className="sr-only">
          {WIKI_THEME_ITEMS.map((item) => (
            <Link key={`theme-${item.id}`} href={`/wiki/theme/${item.id}`}>
              {item.label}
            </Link>
          ))}
          {WIKI_PLATFORM_ITEMS.map((item) => (
            <Link key={`platform-${item.id}`} href={`/wiki/platform/${item.id}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      </main>

      <footer
        className="border-t py-12 px-6 md:px-12 max-w-5xl mx-auto w-full"
        style={{ borderColor: "var(--wiki-line)" }}
      >
        <div className="flex items-center justify-between" style={{ color: "var(--wiki-ink-muted)" }}>
          <p className="font-mono text-[10px] uppercase tracking-widest">Wiki de l&apos;Influence</p>
          <p className="font-mono text-[10px] uppercase tracking-widest">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
