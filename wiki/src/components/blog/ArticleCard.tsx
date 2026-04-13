import { motion } from "framer-motion";
import { Article } from "@/lib/blog";

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  index: number;
}

export default function ArticleCard({
  article,
  onClick,
  index,
}: ArticleCardProps) {
  return (
    <motion.div
      layoutId={`card-${article.slug}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: index * 0.05,
      }}
      className="group cursor-pointer border-b py-8 relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 rounded-sm"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="flex justify-between items-start gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[10px] font-mono uppercase tracking-[0.2em]"
              style={{ color: "var(--ink-secondary)" }}
            >
              {article.category}
            </span>
            <span
              className="w-4 h-px"
              style={{ backgroundColor: "var(--line)" }}
            />
            <span
              className="text-[10px] font-mono uppercase tracking-[0.2em]"
              style={{ color: "var(--ink-secondary)" }}
            >
              {article.time}
            </span>
          </div>
          <motion.h2
            layoutId={`title-${article.slug}`}
            className="font-serif text-3xl md:text-4xl font-medium leading-tight transition-opacity duration-300 group-hover:opacity-60"
          >
            {article.title}
          </motion.h2>
        </div>
        <div
          className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:opacity-60 transition-all duration-300 shrink-0"
          style={{ borderColor: "var(--line)" }}
        >
          <span className="text-lg leading-none mb-1">→</span>
        </div>
      </div>
    </motion.div>
  );
}
