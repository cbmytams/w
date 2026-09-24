"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FAQ_ITEMS } from "@/constants/faq";
import styles from "./FaqSection.module.css";

const VIEWPORT = { once: true, amount: 0.28 } as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={styles.inner}>
        <motion.header
          className={styles.header}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>FAQ</p>
          <h2 id="faq-title">
            Vos questions.
            <br />
            Nos réponses.
          </h2>
        </motion.header>

        <div className={styles.list}>
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem
              key={item.q}
              answer={item.a}
              index={index}
              isOpen={openIndex === index}
              question={item.q}
              reduceMotion={Boolean(reduceMotion)}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type FaqItemProps = {
  readonly answer: string;
  readonly index: number;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly question: string;
  readonly reduceMotion: boolean;
};

function FaqItem({
  answer,
  index,
  isOpen,
  onToggle,
  question,
  reduceMotion,
}: FaqItemProps) {
  const panelId = `faq-brands-panel-${index}`;
  const triggerId = `faq-brands-trigger-${index}`;

  return (
    <motion.article
      className={styles.item}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: 0.48,
        delay: reduceMotion ? 0 : index * 0.035,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        id={triggerId}
        type="button"
        className={styles.trigger}
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className={styles.number}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={styles.question}>{question}</span>
        <span className={styles.icon} data-open={isOpen}>
          <Plus aria-hidden="true" size={21} strokeWidth={1.8} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            className={styles.answer}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={
              reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }
            }
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0.16 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p>{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
