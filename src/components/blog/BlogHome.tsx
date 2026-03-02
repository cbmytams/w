"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { wafiaGlass as G } from "@/styles/glass";
import IOSNavBar from "@/components/blog/IOSNavBar";
import TabSwitcher from "@/components/blog/TabSwitcher";
import ArticleCard from "@/components/blog/ArticleCard";
import ArticleReader from "@/components/blog/ArticleReader";
import BackdropCurtain from "@/components/blog/BackdropCurtain";
import type { BlogArticleClient } from "@/types/blog";

const TABS = [
  { id: "theme", label: "Par Theme" },
  { id: "platform", label: "Par Plateforme" },
] as const;

const THEMES = [
  { id: "algorithmes", label: "Algorithmes", icon: "📡", desc: "FYP, Explore, Recommandations" },
  { id: "monetisation", label: "Monetisation", icon: "💰", desc: "Ads, sponsors, offres propres" },
  { id: "croissance", label: "Croissance", icon: "📈", desc: "Hooks, retention, collabs" },
  { id: "branding", label: "Branding", icon: "🎯", desc: "Personal brand, niche, marques" },
] as const;

const PLATFORMS = [
  { id: "tiktok", label: "TikTok", icon: "🎵", count: 4 },
  { id: "instagram", label: "Instagram", icon: "📸", count: 3 },
  { id: "youtube", label: "YouTube", icon: "▶️", count: 4 },
  { id: "twitch", label: "Twitch", icon: "🎮", count: 3 },
  { id: "snapchat", label: "Snapchat", icon: "👻", count: 2 },
  { id: "x", label: "X / Twitter", icon: "✖️", count: 3 },
  { id: "facebook", label: "Facebook", icon: "👍", count: 3 },
] as const;

interface BlogHomeProps {
  articles: BlogArticleClient[];
}

function getSlugFromPathname(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "blog" || !parts[1]) {
    return null;
  }
  return parts[1];
}

export default function BlogHome({ articles }: BlogHomeProps) {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState<"theme" | "platform">("theme");
  const [openSlug, setOpenSlug] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const initialSlug = getSlugFromPathname(window.location.pathname);
    if (!initialSlug) {
      return null;
    }

    return articles.some((article) => article.slug === initialSlug) ? initialSlug : null;
  });
  const [chapter, setChapter] = useState(0);
  const [activeTheme, setActiveTheme] = useState<string>("algorithmes");
  const [activePlatform, setActivePlatform] = useState<string>("tiktok");

  const openArticle = useMemo(
    () => articles.find((article) => article.slug === openSlug) ?? null,
    [articles, openSlug]
  );

  const transition = reduceMotion ? { duration: 0 } : G.spring;

  const openArticleById = useCallback((slug: string) => {
    setOpenSlug(slug);
    setChapter(0);
    window.history.pushState({ slug }, "", `/blog/${slug}`);
  }, []);

  const closeArticle = useCallback(() => {
    setOpenSlug(null);
    setChapter(0);
    // Don't pushState repeatedly, instead pop the history if we originated from a blog internal link.
    // However, if the user deep-linked straight into an article from outside, they won't have the history state.
    // In React 18 / Next.js app router, the safest vanilla fallback is tracking depth or just `history.back()`.
    if (window.history.state?.slug) {
      window.history.back();
    } else {
      window.history.pushState({}, "", "/blog");
    }
  }, []);

  useEffect(() => {
    const handler = (event: PopStateEvent) => {
      const pathSlug = getSlugFromPathname(window.location.pathname);
      const stateSlug = typeof event.state?.slug === "string" ? event.state.slug : null;
      const slug = stateSlug ?? pathSlug;

      if (slug && articles.some((article) => article.slug === slug)) {
        setOpenSlug(slug);
        setChapter(0);
        return;
      }

      setOpenSlug(null);
      setChapter(0);
    };

    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [articles]);

  useEffect(() => {
    document.documentElement.classList.add("blog-mode");
    return () => document.documentElement.classList.remove("blog-mode");
  }, []);

  useEffect(() => {
    if (!openArticle) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setChapter((current) => Math.min(openArticle.chapters.length - 1, current + 1));
      }
      if (event.key === "ArrowLeft") {
        setChapter((current) => Math.max(0, current - 1));
      }
      if (event.key === "Escape") {
        closeArticle();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeArticle, openArticle]);

  const themeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const article of articles) {
      counts.set(article.theme, (counts.get(article.theme) ?? 0) + 1);
    }
    return counts;
  }, [articles]);

  const platformCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const article of articles) {
      if (article.platform === "all") {
        for (const platform of PLATFORMS) {
          counts.set(platform.id, (counts.get(platform.id) ?? 0) + 1);
        }
        continue;
      }
      counts.set(article.platform, (counts.get(article.platform) ?? 0) + 1);
    }
    return counts;
  }, [articles]);

  const visibleArticles = useMemo(() => {
    if (tab === "theme") {
      return articles.filter((article) => article.theme === activeTheme);
    }

    return articles.filter(
      (article) => article.platform === activePlatform || article.platform === "all"
    );
  }, [activePlatform, activeTheme, articles, tab]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black text-white">
      <LayoutGroup>
        <IOSNavBar
          isDeep={Boolean(openSlug)}
          isReading={Boolean(openSlug)}
          parentLabel={openSlug ? openArticle?.category : "Wafia Knowledge"}
          currentTitle={openSlug ? openArticle?.title : "Wiki de l'Influence"}
          onBack={openSlug ? closeArticle : undefined}
        />

        <BackdropCurtain open={Boolean(openSlug)} />

        <AnimatePresence mode="wait">
          {!openSlug ? (
            <motion.section
              key="wafia-blog-home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={transition}
              className="absolute inset-0 z-30 flex flex-col px-5 pb-8 pt-24"
            >
              <motion.div className="mb-5" transition={transition}>
                <h1
                  className="text-[1.9rem] leading-[1.06]"
                  style={{ fontFamily: G.fontSerif, fontWeight: 700, letterSpacing: "-.02em" }}
                >
                  Wiki de l&apos;Influence
                </h1>
                <p className="mt-1.5 text-xs" style={{ color: G.text3 }}>
                  Le manuel complet du createur moderne
                </p>
              </motion.div>

              <div className="mb-5 max-w-sm">
                <TabSwitcher
                  tabs={TABS.map((tabItem) => ({ id: tabItem.id, label: tabItem.label }))}
                  active={tab}
                  onChange={(value) => setTab(value as "theme" | "platform")}
                />
              </div>

              <AnimatePresence mode="wait">
                {tab === "theme" ? (
                  <motion.div
                    key="theme-tab"
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 14 }}
                    transition={transition}
                    className="flex min-h-0 flex-1 flex-col space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {THEMES.map((theme, index) => {
                        const isActive = activeTheme === theme.id;
                        return (
                          <motion.button
                            key={theme.id}
                            type="button"
                            onClick={() => setActiveTheme(theme.id)}
                            className="rounded-2xl border p-4 text-left"
                            style={{
                              ...G.cardStyle,
                              border: isActive
                                ? "1px solid rgba(255,210,100,.28)"
                                : "1px solid rgba(255, 235, 180, 0.09)",
                            }}
                            whileHover={{
                              background: G.cardHoverStyle.background,
                              borderColor: G.cardHoverStyle.borderColor,
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ ...transition, delay: index * 0.05 }}
                          >
                            <p className="text-sm" style={{ color: G.text2 }}>
                              {theme.icon}
                            </p>
                            <p
                              className="mt-2 text-base"
                              style={{ fontFamily: G.fontSerif, fontWeight: 700 }}
                            >
                              {theme.label}
                            </p>
                            <p className="mt-1 text-xs md:text-[11px]" style={{ color: G.text3 }}>
                              {theme.desc}
                            </p>
                            <p className="mt-2 text-xs md:text-[11px]" style={{ color: "rgba(255,245,220,.42)" }}>
                              {themeCounts.get(theme.id) ?? 0} article(s)
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
                        Articles sélectionnés
                      </h2>
                      <div className="h-px flex-1 ml-4 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    <div
                      className="blog-scroll min-h-0 flex-1 overflow-y-auto"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      <div className="space-y-2">
                        {visibleArticles.map((article, index) => (
                          <ArticleCard
                            key={article.slug}
                            article={article}
                            onOpen={openArticleById}
                            index={index}
                          />
                        ))}
                        {visibleArticles.length === 0 ? (
                          <div
                            className="flex flex-col items-center justify-center rounded-2xl border p-8 text-center"
                            style={{
                              ...G.cardStyle,
                              border: "1px solid rgba(255,235,180,.05)",
                              background: "rgba(255,248,230,.01)",
                            }}
                          >
                            <span className="mb-3 text-2xl opacity-40 grayscale filter">📰</span>
                            <p className="text-sm" style={{ color: G.text2 }}>
                              Aucun article pour cette categorie pour le moment.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="platform-tab"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={transition}
                    className="flex min-h-0 flex-1 flex-col space-y-3"
                  >
                    {PLATFORMS.map((platform, index) => {
                      const isActive = activePlatform === platform.id;
                      return (
                        <motion.button
                          key={platform.id}
                          type="button"
                          onClick={() => setActivePlatform(platform.id)}
                          className="flex w-full items-center justify-between rounded-2xl border px-5 py-3.5 text-left"
                          style={{
                            ...G.cardStyle,
                            border: isActive
                              ? "1px solid rgba(255,210,100,.28)"
                              : "1px solid rgba(255,235,180,.09)",
                          }}
                          whileHover={{
                            background: G.cardHoverStyle.background,
                            borderColor: G.cardHoverStyle.borderColor,
                          }}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ ...transition, delay: index * 0.04 }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs" style={{ color: G.text2 }}>
                              {platform.icon}
                            </span>
                            <span className="text-sm font-semibold" style={{ color: "#fff" }}>
                              {platform.label}
                            </span>
                          </div>
                          <span className="text-xs" style={{ color: G.text3 }}>
                            {platformCounts.get(platform.id) ?? 0}
                          </span>
                        </motion.button>
                      );
                    })}

                    <div className="flex items-center justify-between pt-3">
                      <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
                        Articles sélectionnés
                      </h2>
                      <div className="h-px flex-1 ml-4 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    <div
                      className="blog-scroll min-h-0 flex-1 overflow-y-auto pt-1"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      <div className="space-y-2">
                        {visibleArticles.map((article, index) => (
                          <ArticleCard
                            key={article.slug}
                            article={article}
                            onOpen={openArticleById}
                            index={index}
                          />
                        ))}
                        {visibleArticles.length === 0 ? (
                          <div
                            className="flex flex-col items-center justify-center rounded-2xl border p-8 text-center"
                            style={{
                              ...G.cardStyle,
                              border: "1px solid rgba(255,235,180,.05)",
                              background: "rgba(255,248,230,.01)",
                            }}
                          >
                            <span className="mb-3 text-2xl opacity-40 grayscale filter">📭</span>
                            <p className="text-sm" style={{ color: G.text2 }}>
                              Aucun article disponible pour cette plateforme.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {openArticle ? (
            <ArticleReader
              article={openArticle}
              chapter={chapter}
              reduceMotion={Boolean(reduceMotion)}
              onChapterChange={(nextChapter) =>
                setChapter(
                  Math.max(0, Math.min(openArticle.chapters.length - 1, Math.trunc(nextChapter)))
                )
              }
              onClose={closeArticle}
            />
          ) : null}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
