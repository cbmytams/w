"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Barlow_Condensed } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { BasicFitShowcase } from "./BasicFitShowcase";
import styles from "./CaseStudiesSection.module.css";

const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

// Non-text data only; every user-visible string lives in messages/<locale>/cases.json
// (same order as the `studies` array there).
const STUDY_MEDIA: ReadonlyArray<{
  id: string;
  image: string;
  imageTreatment: string;
  brandMark: string | null;
}> = [
  {
    id: "basic-fit",
    image: "/images/cases/basic-fit-editorial.webp",
    imageTreatment: "panorama",
    brandMark: null,
  },
  {
    id: "korea-house",
    image: "/images/cases/korea-house-editorial-v2.webp",
    imageTreatment: "panorama",
    brandMark: "/logos/cj-logo.svg",
  },
  {
    id: "equip-auto",
    image: "/images/cases/salon-auto-editorial-v2.webp",
    imageTreatment: "panorama",
    brandMark: null,
  },
];

type StudyCopy = {
  client: string;
  subtitle?: string;
  context: string;
  title: string;
  description?: string;
  imageAlt?: string;
  detail: string;
  scope: string;
  proof: Array<{ value: string; label: string }>;
};

export function CaseStudiesSection() {
  const t = useTranslations("cases");
  const studies = t.raw("studies") as StudyCopy[];
  const section = useRef<HTMLElement>(null);
  const caseRefs = useRef<Array<HTMLElement | null>>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const study = studies[selected];

  useEffect(() => {
    if (!isOpen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const sectionNode = section.current;
    const caseNodes = caseRefs.current.filter(
      (node): node is HTMLElement => node !== null
    );
    if (!sectionNode || caseNodes.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      caseNodes.forEach((node) => {
        node.dataset.revealed = "true";
      });
      return;
    }

    sectionNode.dataset.motionReady = "true";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          node.dataset.revealed = "true";
          observer.unobserve(node);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );

    caseNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  function openCase(index: number) {
    setSelected(index);
    setIsOpen(true);
    dialog.current?.showModal();
  }

  return (
    <section
      ref={section}
      id="case-studies"
      className={styles.section}
      aria-labelledby="cases-title"
    >
      <h2 id="cases-title" className="sr-only">
        {t("title")}
      </h2>
      {studies.map((item, index) => {
        const media = STUDY_MEDIA[index];
        return index === 0 ? (
          <BasicFitShowcase
            key={media.id}
            ref={(node) => {
              caseRefs.current[index] = node;
            }}
            onOpen={() => openCase(index)}
          />
        ) : (
          <article
            key={media.id}
            ref={(node) => {
              caseRefs.current[index] = node;
            }}
            className={styles.case}
            data-nav-tone={index === 1 ? "light" : "dark"}
            data-revealed="false"
          >
            <div
              className={styles.visual}
              data-image-treatment={media.imageTreatment}
            >
              {media.imageTreatment !== "panorama" && (
                <Image
                  src={media.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, 80vw"
                  className={styles.imageBackdrop}
                  aria-hidden="true"
                />
              )}
              <div className={styles.imageStage}>
                <Image
                  src={media.image}
                  alt={item.imageAlt ?? ""}
                  fill
                  sizes="(max-width: 700px) 100vw, 80vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.meta}>
                <span>0{index + 1} / 03</span>
                {media.brandMark && (
                  <span className={styles.metaMark}>
                    <Image
                      src={media.brandMark}
                      alt={t("brandMarkAlt")}
                      width={30}
                      height={26}
                    />
                  </span>
                )}
                <i />
                <span>{item.context}</span>
              </div>
              <div className={styles.copy}>
                <h3 className={`${styles.client} ${condensed.className}`}>
                  {item.client}
                  {item.subtitle && <span>{item.subtitle}</span>}
                </h3>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.description}>{item.description}</p>
                <button
                  className={styles.link}
                  onClick={() => openCase(index)}
                  aria-haspopup="dialog"
                  aria-label={t("viewCaseAria", { client: item.client })}
                >
                  {t("viewCase")} <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
            <aside
              className={styles.proofs}
              aria-label={t("resultsAria", { client: item.client })}
            >
              <span className={styles.proofHeading}>{t("proofHeading")}</span>
              <dl>
                {item.proof.map(({ value, label }) => (
                  <div key={label}>
                    <dt>{value}</dt>
                    <dd>{label}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </article>
        );
      })}
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="case-dialog-title"
        onClose={() => setIsOpen(false)}
      >
        <div className={styles.dialogTop}>
          <span>{study.context}</span>
          <button
            autoFocus
            onClick={() => dialog.current?.close()}
            aria-label={t("closeAria")}
          >
            <X size={23} />
          </button>
        </div>
        <h2 id="case-dialog-title" className={condensed.className}>
          {study.client} {study.subtitle}
        </h2>
        <p className={styles.dialogTitle}>{study.title}</p>
        <p className={styles.dialogBody}>{study.detail}</p>
        <p className={styles.scope}>{study.scope}</p>
        <dl className={styles.dialogMetrics}>
          {study.proof.map(({ value, label }) => (
            <div key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
        <Link
          href="/contact/brands"
          className={styles.dialogContact}
          onClick={() => dialog.current?.close()}
        >
          {t("dialogContact")} <ArrowUpRight size={18} />
        </Link>
      </dialog>
    </section>
  );
}
