"use client";

import Image from "next/image";
import Link from "next/link";
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

const studies = [
  {
    client: "BASIC-FIT",
    context: "Boost Your Mood / Fitness",
    title: "Et toi, comment boostes-tu ton humeur ?",
    description:
      "Pour Basic-Fit, le sport n’est pas une performance, c’est un état d’esprit. Dix créateurs racontent comment une séance change leur journée, chacun dans son style.",
    image: "/images/cases/basic-fit-editorial.webp",
    imageTreatment: "panorama",
    imageAlt: "Une sportive à l'entraînement dans une salle de fitness",
    brandMark: null,
    brandLabel: null,
    detail:
      "Le brief tient en un Reel : une accroche sur l’humeur, la routine d’entraînement, le moment d’après (balade, lecture, repas sain), puis une note inspirante qui invite l’audience à répondre. Wafia assure le casting de dix profils lifestyle et fitness, rédige le brief d’intention et laisse chaque créateur l’adapter à son univers : aucune réplique imposée, le hashtag #BoostYourMood comme seul fil rouge. Résultat : des TikTok et Reels crédibles, qui vivent au-delà de la première diffusion et dans lesquels chacun peut se reconnaître.",
    scope:
      "Campagne Boost Your Mood · Casting de 10 créateurs · Brief créatif · TikTok & Reels",
    proof: [
      { value: "10", label: "créateurs activés" },
      { value: "6M", label: "vues organiques" },
      { value: "21,44%", label: "d’engagement" },
    ],
  },
  {
    client: "CJ GROUP",
    subtitle: "KOREA HOUSE",
    context: "Activation / Paris 2024",
    title: "Une immersion culturelle au cœur de Paris.",
    description:
      "Faire rayonner la culture coréenne à travers ceux qui la découvrent. Et prolonger la rencontre au-delà de l’événement.",
    image: "/images/cases/korea-house-editorial-v2.webp",
    imageTreatment: "panorama",
    imageAlt: "Accueil du public devant Korea House à Paris",
    brandMark: "/logos/cj-logo.svg",
    detail:
      "À Korea House, la présence des créateurs transforme l’activation en récits de découverte. Des rencontres sur place aux contenus partagés, la campagne donne à la culture coréenne des voix, des regards et une présence qui continue après l’événement.",
    scope:
      "Activation de créateurs · Couverture événementielle · Contenus sociaux",
    proof: [
      { value: "67", label: "créateurs mobilisés" },
      { value: "11M", label: "impressions" },
      { value: "+150", label: "contenus" },
    ],
  },
  {
    client: "SALON DE L’AUTO",
    subtitle: "50e ÉDITION",
    context: "Couverture média / Paris Expo",
    title: "Le salon se vit sur place. Et bien au-delà.",
    description:
      "Quatre jours au rythme du salon : interviews, innovations et formats courts. Une couverture pensée pour faire vivre l’événement sur les réseaux.",
    image: "/images/cases/salon-auto-editorial-v2.webp",
    imageTreatment: "panorama",
    imageAlt:
      "Révélation automobile photographiée par le public au salon EQUIP AUTO Paris",
    brandMark: null,
    brandLabel: null,
    detail:
      "À Paris Expo, Wafia déploie un dispositif média et campagne pour couvrir les innovations du salon en temps réel. Une content factory réunit 23 créateurs et journalistes autour d’interviews, de live et de formats courts. L’approche newsroom relie les temps forts sur place aux usages des réseaux sociaux, pour parler aux professionnels comme au grand public.",
    scope: "Dispositif média & campagne · Interviews · Content factory · Live",
    proof: [
      { value: "23", label: "créateurs / journalistes" },
      { value: "+100", label: "contenus produits" },
      { value: "4 jours", label: "de live" },
    ],
  },
];

export function CaseStudiesSection() {
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
        Nos réalisations : trois marques, trois terrains d’expression.
      </h2>
      {studies.map((item, index) =>
        index === 0 ? (
          <BasicFitShowcase
            key={item.client}
            ref={(node) => {
              caseRefs.current[index] = node;
            }}
            onOpen={() => openCase(index)}
          />
        ) : (
          <article
            key={item.client}
            ref={(node) => {
              caseRefs.current[index] = node;
            }}
            className={styles.case}
            data-nav-tone={index === 1 ? "light" : "dark"}
            data-revealed="false"
          >
            <div
              className={styles.visual}
              data-image-treatment={item.imageTreatment}
            >
              {item.imageTreatment !== "panorama" && (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, 80vw"
                  className={styles.imageBackdrop}
                  aria-hidden="true"
                />
              )}
              <div className={styles.imageStage}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 700px) 100vw, 80vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.meta}>
                <span>0{index + 1} / 03</span>
                {item.brandMark && (
                  <span className={styles.metaMark}>
                    <Image
                      src={item.brandMark}
                      alt="Logo officiel CJ"
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
                  aria-label={`Voir le cas client ${item.client}`}
                >
                  Voir le cas client <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
            <aside
              className={styles.proofs}
              aria-label={`Résultats ${item.client}`}
            >
              <span className={styles.proofHeading}>Cas client</span>
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
        )
      )}
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
            aria-label="Fermer le cas client"
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
          Et pour votre marque ? <ArrowUpRight size={18} />
        </Link>
      </dialog>
    </section>
  );
}
