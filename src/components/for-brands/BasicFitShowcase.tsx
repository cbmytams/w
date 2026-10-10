"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { forwardRef, useEffect, useRef, type SVGProps } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./BasicFitShowcase.module.css";

type Preview = {
  readonly id: string;
  readonly talent: string;
  readonly handle: string;
  readonly platform: string;
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
    const t = useTranslations("cases");
    const services = t.raw("showcase.services") as string[];
    const previewCopy = t.raw("showcase.previews") as Array<{
      followers: string;
    }>;

    return (
      <article
        ref={ref}
        className={styles.case}
        data-nav-tone="light"
        data-revealed="false"
      >
        <div className={styles.kicker}>
          <span>{t("showcase.kicker")}</span>
          <i />
          <span>{t("showcase.previewCount", { count: previews.length })}</span>
        </div>

        <div className={styles.layout}>
          <div className={styles.copy}>
            <h3 className="sr-only">{t("showcase.heading")}</h3>
            <div className={styles.brandLogo} aria-hidden="true">
              <Image
                src="/logos/official/basic-fit-orange.png"
                alt=""
                fill
                sizes="(max-width: 760px) 250px, 360px"
              />
            </div>
            <span className={styles.mark} aria-hidden="true" />
            <p className={styles.title}>{t("showcase.title")}</p>
            <p className={styles.description}>{t("showcase.description")}</p>
            <button
              className={styles.cta}
              onClick={onOpen}
              aria-haspopup="dialog"
              aria-label={t("showcase.ctaAria")}
            >
              {t("viewCase")}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>

          <div
            className={styles.previewRail}
            aria-label={t("showcase.railAria")}
          >
            {previews.map((preview, index) => (
              <PreviewCard
                key={preview.id}
                preview={preview}
                followers={previewCopy[index].followers}
              />
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          {services.map((service) => (
            <span key={service}>{service}</span>
          ))}
          <small>{t("showcase.tagline")}</small>
        </div>
      </article>
    );
  }
);

function PreviewCard({
  preview,
  followers,
}: {
  readonly preview: Preview;
  readonly followers: string;
}) {
  const t = useTranslations("cases");
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
        aria-label={t("showcase.videoAria", { talent: preview.talent })}
      />
      <span className={styles.duration}>{preview.duration}</span>
      <span className={styles.more} aria-hidden="true">
        •••
      </span>
      <span className={styles.creator}>
        <span className={styles.avatar}>
          <Image
            src={preview.avatar}
            alt={t("showcase.avatarAlt", { talent: preview.talent })}
            width={48}
            height={48}
            sizes="48px"
          />
        </span>
        <span className={styles.platform}>
          <TikTokLogo aria-hidden="true" />
          <span>
            <strong>{preview.platform}</strong>
            <em>{t("showcase.followersLabel", { followers })}</em>
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
      aria-label={t("showcase.profileAria", {
        handle: preview.handle,
        talent: preview.talent,
        followers,
      })}
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
