"use client";

import Image from "next/image";
import { forwardRef, useEffect, useRef, type SVGProps } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./BasicFitShowcase.module.css";

type Preview = {
  readonly id: string;
  readonly talent: string;
  readonly handle: string;
  readonly platform: string;
  readonly followers: string;
  readonly avatar: string;
  readonly poster: string;
  readonly duration: string;
  readonly video: string;
  readonly href: string;
};

const previews: readonly Preview[] = [
  {
    id: "redha",
    talent: "Redha",
    handle: "@redhajr",
    platform: "TikTok",
    followers: "5,8M",
    avatar: "/images/talents/basic-fit/redha.jpeg",
    duration: "00:43",
    video: "/studio/krh/basic-fit-redha-preview.mp4",
    poster: "/studio/krh/basic-fit-redha-poster.jpg",
    href: "https://www.tiktok.com/@redhajr",
  },
  {
    id: "noah",
    talent: "Noah",
    handle: "@noah_sgds",
    platform: "TikTok",
    followers: "1,6M",
    avatar: "/images/talents/basic-fit/noah.jpeg",
    duration: "00:59",
    video: "/studio/krh/noah-basic-fit-preview.mp4",
    poster: "/studio/krh/noah-basic-fit-poster.jpg",
    href: "https://www.tiktok.com/@noah_sgds",
  },
  {
    id: "ana",
    talent: "Ana",
    handle: "@ana.hnf",
    platform: "TikTok",
    followers: "2M",
    avatar: "/images/talents/basic-fit/ana.jpeg",
    duration: "00:51",
    video: "/studio/krh/ana-basic-fit-preview.mp4",
    poster: "/studio/krh/ana-basic-fit-poster.jpg",
    href: "https://www.tiktok.com/@ana.hnf",
  },
  {
    id: "shayna",
    talent: "Shayna",
    handle: "@shaynapropagandeclub",
    platform: "TikTok",
    followers: "256K",
    avatar: "/images/talents/basic-fit/shayna.jpeg",
    duration: "00:55",
    video: "/studio/krh/shayna-basic-fit-preview.mp4",
    poster: "/studio/krh/shayna-basic-fit-poster.jpg",
    href: "https://www.tiktok.com/@shaynapropagandeclub",
  },
];

type BasicFitShowcaseProps = {
  readonly onOpen: () => void;
};

export const BasicFitShowcase = forwardRef<HTMLElement, BasicFitShowcaseProps>(
  function BasicFitShowcase({ onOpen }, ref) {
    return (
      <article
        ref={ref}
        className={styles.case}
        data-nav-tone="light"
        data-revealed="false"
      >
        <div className={styles.kicker}>
          <span>Production créateur</span>
          <i />
          <span>4 previews</span>
        </div>

        <div className={styles.layout}>
          <div className={styles.copy}>
            <h3 className="sr-only">BASIC-FIT</h3>
            <div className={styles.brandLogo} aria-hidden="true">
              <Image
                src="/logos/official/basic-fit-orange.png"
                alt=""
                fill
                sizes="(max-width: 760px) 250px, 360px"
              />
            </div>
            <span className={styles.mark} aria-hidden="true" />
            <p className={styles.title}>
              Du contenu qui fait bouger les lignes.
            </p>
            <p className={styles.description}>
              Campagne Boost Your Mood : dix créateurs racontent comment le
              sport change leur humeur, pour engager une nouvelle génération
              autour du sport au quotidien.
            </p>
            <button
              className={styles.cta}
              onClick={onOpen}
              aria-haspopup="dialog"
              aria-label="Voir le cas client Basic-Fit"
            >
              Voir le cas client
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>

          <div
            className={styles.previewRail}
            aria-label="Previews vidéo Basic-Fit"
          >
            {previews.map((preview) => (
              <PreviewCard key={preview.id} preview={preview} />
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <span>Influence</span>
          <span>Création</span>
          <span>Production</span>
          <span>Ads</span>
          <small>Des idées à leur diffusion.</small>
        </div>
      </article>
    );
  }
);

function PreviewCard({ preview }: { readonly preview: Preview }) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.1 }
    );
    observer.observe(card);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  const content = (
    <>
      <video
        ref={videoRef}
        className={styles.video}
        src={preview.video}
        poster={preview.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`Preview vidéo ${preview.talent} pour Basic-Fit`}
      />
      <span className={styles.duration}>{preview.duration}</span>
      <span className={styles.more} aria-hidden="true">
        •••
      </span>
      <span className={styles.creator}>
        <span className={styles.avatar}>
          <Image
            src={preview.avatar}
            alt={`Photo de profil TikTok de ${preview.talent}`}
            width={48}
            height={48}
            sizes="48px"
          />
        </span>
        <span className={styles.platform}>
          <TikTokLogo aria-hidden="true" />
          <span>
            <strong>{preview.platform}</strong>
            <em>{preview.followers} abonnés</em>
          </span>
        </span>
      </span>
    </>
  );

  return (
    <a
      ref={cardRef}
      className={styles.previewCard}
      href={preview.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Voir le profil TikTok ${preview.handle} de ${preview.talent}, ${preview.followers} abonnés`}
    >
      {content}
    </a>
  );
}

function TikTokLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M16.63 5.15a6.26 6.26 0 0 0 3.65 1.18v3.23a9.4 9.4 0 0 1-3.66-.76v6.39a6.03 6.03 0 1 1-6.03-6.03c.43 0 .85.05 1.25.14v3.34a2.8 2.8 0 1 0 1.95 2.67V2.77h2.84v2.38Z"
      />
    </svg>
  );
}
