"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  transform,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { BOOK_CHAPTERS, chapterAt } from "./brand-book-content";
import styles from "./BrandBook.module.css";

const BrandBookScene = dynamic(() => import("./BrandBookScene"), {
  ssr: false,
});

export function BrandHeroV2() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [chapter, setChapter] = useState(0);
  const [opened, setOpened] = useState(false);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  // Function transforms keep DOM and WebGL on the same section-local timeline.
  const introOpacity = useTransform(() =>
    transform(scrollYProgress.get(), [0, 0.06, 0.19], [1, 1, 0])
  );
  const introY = useTransform(() =>
    transform(scrollYProgress.get(), [0.04, 0.22], [0, -90])
  );
  const introScale = useTransform(() =>
    transform(scrollYProgress.get(), [0.04, 0.22], [1, 0.96])
  );
  const stageColor = useTransform(() =>
    transform(scrollYProgress.get(), [0.06, 0.3], ["#f5f5f2", "#151716"])
  );
  const chapterOpacity = useTransform(() =>
    transform(scrollYProgress.get(), [0.23, 0.32], [0, 1])
  );
  const entry = BOOK_CHAPTERS[chapter];

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setChapter(chapterAt(progress + 0.025));
    setOpened(progress > 0.24);
  });

  // Stable spread centers: each chapter spans 0.205 of progress from 0.32,
  // minus the +/-0.045 page-turn window at every boundary. Aiming at a
  // boundary parks the book mid-turn, frozen.
  const CHAPTER_TARGETS = [0.34, 0.63, 0.83, 0.99] as const;

  function goToChapter(index: number) {
    if (!section.current) return;
    const clamped = Math.min(3, Math.max(0, index));
    const top = section.current.getBoundingClientRect().top + window.scrollY;
    const distance = section.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + distance * CHAPTER_TARGETS[clamped],
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  return (
    <section
      ref={section}
      className={styles.story}
      aria-label="Wafia, du premier brief à la diffusion"
      data-book-story
    >
      <motion.div
        className={styles.stage}
        style={{ backgroundColor: stageColor }}
        data-open={opened}
      >
        <div className={styles.scene} aria-hidden="true">
          <BrandBookScene
            progress={scrollYProgress}
            reducedMotion={Boolean(reducedMotion)}
          />
        </div>
        <motion.div
          className={styles.intro}
          style={{
            opacity: introOpacity,
            y: reducedMotion ? 0 : introY,
            scale: reducedMotion ? 1 : introScale,
          }}
          inert={opened}
        >
          <h1>
            Des campagnes
            <br />
            créateurs
            <br />
            <span>structurées.</span>
          </h1>
          <p>
            Une idée juste. Les bons créateurs. Des contenus qui restent. Wafia
            réunit influence, création, production et ads pour faire avancer
            votre marque.
          </p>
          <div className={styles.actions}>
            <Link href="#case-studies" className={styles.primary}>
              Voir nos réalisations <ArrowUpRight size={18} />
            </Link>
            <button
              onClick={() => goToChapter(0)}
              className={styles.textButton}
            >
              Ouvrir le dossier <ArrowDown size={16} />
            </button>
          </div>
          <div className={styles.disciplines}>
            Influence <span>/</span> Création <span>/</span> Production{" "}
            <span>/</span> Ads
          </div>
        </motion.div>
        <motion.div
          className={styles.coverNote}
          style={{ opacity: introOpacity }}
          aria-hidden="true"
        >
          <span>LE DOSSIER WAFIA</span>
          <span>Des idées à leur diffusion.</span>
        </motion.div>
        <motion.div
          className={styles.bookHeader}
          style={{ opacity: chapterOpacity }}
          aria-hidden="true"
        >
          <span>Le dossier Wafia</span>
          <div>
            <motion.i style={{ scaleX: scrollYProgress }} />
          </div>
          <span>0{chapter + 1} / 04</span>
        </motion.div>
        <motion.aside
          className={styles.chapterPanel}
          style={{ opacity: chapterOpacity }}
          inert={!opened}
          aria-label="Nos expertises"
        >
          <nav className={styles.chapterNav} aria-label="Chapitres du dossier">
            {BOOK_CHAPTERS.map((item, index) => (
              <button
                key={item.service}
                onClick={() => goToChapter(index)}
                aria-current={chapter === index ? "step" : undefined}
              >
                <span>0{index + 1}</span>
                {item.service}
                <ArrowUpRight size={15} />
              </button>
            ))}
          </nav>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              className={styles.pitch}
              key={entry.service}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
              transition={{ duration: reducedMotion ? 0.1 : 0.18 }}
            >
              <h2>{entry.promise}</h2>
              <p>{entry.body}</p>
              <ul>
                {entry.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
          <Link href="/contact/brands" className={styles.chapterCta}>
            Construisons votre campagne <ArrowUpRight size={17} />
          </Link>
        </motion.aside>
        <div className={styles.bottomLine}>
          <span>
            {opened
              ? "UNE ÉQUIPE. DU BRIEF À LA DIFFUSION."
              : "VOTRE MARQUE A UNE HISTOIRE. DONNONS-LUI DE L’ÉCHO."}
          </span>
          <button
            onClick={() =>
              chapter < 3
                ? goToChapter(opened ? chapter + 1 : 0)
                : section.current?.nextElementSibling?.scrollIntoView({
                    behavior: reducedMotion ? "instant" : "smooth",
                  })
            }
          >
            {opened
              ? chapter === 3
                ? "La suite"
                : "Chapitre suivant"
              : "Découvrir"}{" "}
            {opened && chapter === 3 ? (
              <ArrowRight size={16} />
            ) : (
              <ArrowDown size={16} />
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
