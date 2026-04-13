import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUp, Search, Moon, Sun } from "lucide-react";

interface NavBarProps {
  isDeep?: boolean;
  isReading?: boolean;
  parentLabel?: string;
  currentTitle?: string;
  onBack?: () => void;
  showUI?: boolean;
  isDark?: boolean;
  onToggleDark?: () => void;
}

export default function NavBar({
  isDeep,
  isReading,
  parentLabel,
  currentTitle,
  onBack,
  showUI = true,
  isDark,
  onToggleDark,
}: NavBarProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current !== null) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const handleRetour = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isTransitioning) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      window.location.assign("/");
      return;
    }

    const exitDelay = window.matchMedia("(max-width: 768px)").matches
      ? 520
      : 620;
    setIsTransitioning(true);
    window.sessionStorage.setItem("wafia-nav-transition", "wiki-to-home");
    document.getElementById("wiki-root")?.classList.add("wiki-to-home-exit");

    navigationTimeoutRef.current = window.setTimeout(() => {
      window.location.assign("/");
    }, exitDelay);
  };

  return (
    <motion.nav
      initial={false}
      animate={{ y: showUI ? 0 : "-100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      aria-label="Main Navigation"
      className="fixed top-0 inset-x-0 z-50 h-20 flex items-end pb-4 px-6"
      style={{
        backgroundColor: "var(--nav-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      {isDeep && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          aria-label={parentLabel ? `Back to ${parentLabel}` : "Go back"}
          className="flex items-center gap-2 absolute left-6 bottom-4 z-10 hover:opacity-60 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
          style={{ color: "var(--ink)" }}
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
          <span className="text-xs font-mono uppercase tracking-widest hidden sm:block">
            {parentLabel}
          </span>
        </motion.button>
      )}

      {!isDeep && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          type="button"
          onClick={handleRetour}
          disabled={isTransitioning}
          aria-label="Retour au site Wafia"
          className={`flex items-center gap-2 absolute left-6 bottom-4 z-10 hover:opacity-60 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm ${isTransitioning ? "wiki-retour--transitioning pointer-events-none" : ""}`}
          style={{ color: "var(--ink)" }}
        >
          <span className="wiki-retour-icon inline-flex">
            <ArrowUp size={20} strokeWidth={1.5} />
          </span>
          <span className="wiki-retour-label text-xs font-mono uppercase tracking-widest hidden sm:block">
            Retour à Wafia
          </span>
        </motion.button>
      )}

      {isReading && currentTitle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-0 bottom-4 text-center pointer-events-none hidden md:block px-32"
        >
          <span
            className="font-serif italic text-lg line-clamp-1 block px-4 opacity-80"
            style={{
              color: "var(--ink)",
              maskImage:
                "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            }}
          >
            {currentTitle}
          </span>
        </motion.div>
      )}

      <div className="absolute right-6 bottom-4 flex items-center gap-3">
        {/* Dark Mode Toggle */}
        {onToggleDark && (
          <button
            onClick={onToggleDark}
            aria-label={
              isDark ? "Passer en mode clair" : "Passer en mode sombre"
            }
            className="w-10 h-10 flex items-center justify-center rounded-full hover:opacity-60 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
            style={{ color: "var(--ink-secondary)" }}
          >
            {isDark ? (
              <Sun size={18} strokeWidth={1.5} />
            ) : (
              <Moon size={18} strokeWidth={1.5} />
            )}
          </button>
        )}

        {/* Search */}
        <button
          onClick={() => window.dispatchEvent(new Event("open-search"))}
          aria-label="Rechercher"
          className="flex items-center gap-2 hover:opacity-60 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
          style={{ color: "var(--ink-secondary)" }}
        >
          <span className="text-xs font-mono uppercase tracking-widest hidden sm:block">
            Rechercher
          </span>
          <Search size={20} strokeWidth={1.5} />
        </button>
      </div>
    </motion.nav>
  );
}
