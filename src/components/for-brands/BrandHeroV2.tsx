"use client";

import dynamic from "next/dynamic";
import { Link } from "@/i18n/navigation";
import { Fragment, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  transform,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { chapterAt, type BookChapterCopy } from "./brand-book-content";
import styles from "./BrandBook.module.css";

const BrandBookScene = dynamic(() => import("./BrandBookScene"), {
  ssr: false,
});

export function BrandHeroV2() {
  const t = useTranslations("hero");
  const chapters = t.raw("chapters") as BookChapterCopy[];
  const disciplines = t.raw("intro.disciplines") as string[];
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
      aria-label={t("sectionLabel")}
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
          data-book-slot="intro"
        >
          <h1>
            {t.rich("intro.title", {
              br: () => <br />,
              accent: (chunks) => <span>{chunks}</span>,
            })}
          </h1>
          <p>{t("intro.text")}</p>
          <div className={styles.actions}>
            <Link href="#case-studies" className={styles.primary}>
              {t("intro.seeWork")} <ArrowUpRight size={18} />
            </Link>
            <button
              onClick={() => goToChapter(0)}
              className={styles.textButton}
            >
              {t("intro.openBook")} <ArrowDown size={16} />
            </button>
          </div>
          <div className={styles.disciplines}>
            {disciplines.map((name, index) => (
              <Fragment key={name}>
                {index > 0 && (
                  <>
                    {" "}
                    <span>/</span>{" "}
                  </>
                )}
                {name}
              </Fragment>
            ))}
          </div>
        </motion.div>
        <motion.div
          className={styles.coverNote}
          style={{ opacity: introOpacity }}
          aria-hidden="true"
          data-book-slot="cover-note"
        >
          <span>{t("cover.label")}</span>
          <span>{t("cover.tagline")}</span>
        </motion.div>
        <motion.div
          className={styles.bookHeader}
          style={{ opacity: chapterOpacity }}
          aria-hidden="true"
          data-book-slot="book-header"
        >
          <span>{t("bookHeader.title")}</span>
          <div>
            <motion.i style={{ scaleX: scrollYProgress }} />
          </div>
          <span>0{chapter + 1} / 04</span>
        </motion.div>
        <div className={styles.dock}>
          <motion.aside
            className={styles.chapterPanel}
            style={{ opacity: chapterOpacity }}
            inert={!opened}
            aria-label={t("panel.ariaLabel")}
            data-book-slot="panel"
          >
            <nav
              className={styles.chapterNav}
              aria-label={t("panel.navAriaLabel")}
            >
              {chapters.map((item, index) => (
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
            <div className={styles.pitches}>
              {chapters.map((item, index) => (
                <div
                  className={styles.pitch}
                  key={item.service}
                  data-active={index === chapter}
                  inert={index !== chapter}
                >
                  <h2>{item.promise}</h2>
                  <p>{item.body}</p>
                  <ul>
                    {item.deliverables.map((deliverable) => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link href="/contact/brands" className={styles.chapterCta}>
              {t("panel.cta")} <ArrowUpRight size={17} />
            </Link>
          </motion.aside>
          <div className={styles.bottomLine}>
            <span>
              {opened ? t("bottomLine.opened") : t("bottomLine.closed")}
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
                  ? t("bottomLine.next")
                  : t("bottomLine.nextChapter")
                : t("bottomLine.discover")}{" "}
              {opened && chapter === 3 ? (
                <ArrowRight size={16} />
              ) : (
                <ArrowDown size={16} />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
