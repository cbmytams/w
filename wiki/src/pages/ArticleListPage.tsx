import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "@/components/blog/NavBar";
import ArticleCard from "@/components/blog/ArticleCard";
import { getAllArticles, Article } from "@/lib/blog";
import { useDarkMode } from "@/lib/useDarkMode";

const DISPLAY_NAMES: Record<string, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
  twitch: "Twitch",
  snapchat: "Snapchat",
  x: "X / Twitter",
  facebook: "Facebook",
  algorithmes: "Algorithmes",
  monetisation: "Monétisation",
  croissance: "Croissance",
  branding: "Branding",
  audience: "Audience & Communauté",
  production: "Production & Outils",
  business: "Business & Contrats",
};

export default function ArticleListPage() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const { isDark, toggle: toggleDark } = useDarkMode();

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      const all = await getAllArticles();
      if (isCancelled) return;

      if (type === "theme") {
        setArticles(all.filter((a) => a.theme === id));
      } else if (type === "platform") {
        setArticles(all.filter((a) => a.platform === id));
      } else {
        setArticles(all);
      }
    };

    void load();

    return () => {
      isCancelled = true;
    };
  }, [type, id]);

  const title = id
    ? DISPLAY_NAMES[id] || id.charAt(0).toUpperCase() + id.slice(1)
    : "Articles";

  useEffect(() => {
    document.title = `${title} — Wiki de l'Influence`;
    return () => {
      document.title = "Wiki de l'Influence";
    };
  }, [title]);

  return (
    <div
      id="wiki-root"
      className="min-h-screen font-sans flex flex-col"
      style={{ backgroundColor: "var(--bg)", color: "var(--ink)" }}
    >
      <NavBar
        isDeep
        isReading={false}
        parentLabel="Back"
        onBack={() => navigate(-1)}
        isDark={isDark}
        onToggleDark={toggleDark}
      />

      <main className="pt-32 px-6 md:px-12 max-w-4xl mx-auto pb-24 flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 border-b pb-8"
          style={{ borderColor: "var(--line-dark)" }}
        >
          <p
            className="font-mono text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--ink-secondary)" }}
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
                style={{ color: "var(--ink-secondary)" }}
              >
                Aucun article trouvé.
              </p>
              <p
                className="font-serif text-lg italic"
                style={{ color: "var(--ink-muted)" }}
              >
                Ce contenu est en cours de rédaction.
              </p>
            </motion.div>
          ) : (
            articles.map((article, i) => (
              <ArticleCard
                key={article.slug || i}
                article={article}
                index={i}
                onClick={() => navigate(`/blog/${article.slug}`)}
              />
            ))
          )}
        </div>
      </main>

      <footer
        className="border-t py-12 px-6 md:px-12 max-w-4xl mx-auto w-full"
        style={{ borderColor: "var(--line)" }}
      >
        <div
          className="flex items-center justify-between"
          style={{ color: "var(--ink-secondary)" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest">
            Wiki de l'Influence
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
