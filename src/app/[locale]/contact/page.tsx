import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { ArrowLeft } from "lucide-react";
import { pageAlternates } from "@/lib/seo";
import styles from "./contact-hub.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("meta.hub.title"),
    description: t("meta.hub.description"),
    alternates: pageAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <main className={styles.section}>
      <div className={styles.top}>
        <Link
          href="/"
          aria-label={t("common.homeAriaLabel")}
          className={styles.logo}
        >
          <Image
            src="/wafia.svg"
            alt={t("common.logoAlt")}
            width={104}
            height={34}
            priority
          />
        </Link>
        <div className={styles.topEnd}>
          <LocaleSwitcher className={styles.locales} />
          <Link href="/" className={styles.back}>
            <ArrowLeft aria-hidden="true" size={15} />
            {t("common.back")}
          </Link>
        </div>
      </div>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t("hub.eyebrow")}</p>
        <h1 className={styles.title}>{t("hub.title")}</h1>
        <p className={styles.intro}>{t("hub.intro")}</p>
        <div className={styles.choices}>
          <Link href="/contact/brands" className={styles.primary}>
            {t("hub.brandsCta")}
          </Link>
          <Link href="/contact/talents" className={styles.secondary}>
            {t("hub.talentsCta")}
          </Link>
        </div>
      </div>
    </main>
  );
}
