import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localizedPath, pageAlternates } from "@/lib/seo";
import { ogDefaults } from "@/lib/social-metadata";
import { siteConfig } from "@/lib/site";
import {
  LEGAL_PATHS,
  type LegalBlock,
  type LegalDocument,
  type LegalDocumentKey,
} from "@/constants/legal-content";
import styles from "./LegalPage.module.css";

/** `generateMetadata` partagé par les trois pages légales. */
export async function getLegalMetadata(
  locale: string,
  docKey: LegalDocumentKey
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "legal" });
  const title = t(`documents.${docKey}.title`);
  const description = t(`documents.${docKey}.description`);
  const path = LEGAL_PATHS[docKey];

  return {
    title,
    description,
    alternates: pageAlternates(locale, path),
    openGraph: {
      ...(await ogDefaults(locale)),
      title: `${title} | ${siteConfig.name}`,
      description,
      url: localizedPath(path, locale),
    },
  };
}

/**
 * Rendu unique des trois pages légales.
 * Composant serveur : aucun JavaScript client ni animation, pour un
 * chargement rapide et une lisibilité maximale.
 */
export async function LegalPage({
  docKey,
  locale,
}: {
  docKey: LegalDocumentKey;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "legal" });
  const doc = t.raw(`documents.${docKey}`) as LegalDocument;
  const isCourtesyTranslation = locale !== routing.defaultLocale;

  return (
    <article className={styles.page}>
      {isCourtesyTranslation ? (
        <p
          role="note"
          className="mb-8 text-[13px] text-[color:var(--legal-muted)]"
        >
          {t("courtesyNotice")}
        </p>
      ) : null}
      <header className={styles.header}>
        <p className={styles.eyebrow}>{t("page.eyebrow")}</p>
        <h1 className={styles.title}>{doc.title}</h1>
        <p className={styles.lede}>{doc.lede}</p>
        <p className={styles.meta}>
          <span className={styles.metaDot} aria-hidden="true" />
          {t("page.updated", { date: doc.updatedAt })}
        </p>
      </header>

      <div className={styles.sections}>
        {doc.sections.map((section) => (
          <section key={section.title}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.body}>
              {section.blocks.map((block, index) => (
                <LegalBlockRenderer key={index} block={block} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

function LegalBlockRenderer({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className={styles.paragraph}>{block.text}</p>;

    case "list":
      return (
        <ul className={styles.list}>
          {block.items.map((item) => (
            <li key={item} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      );

    case "facts":
      return (
        <dl className={styles.facts}>
          {block.items.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className={styles.factLabel}>{fact.label}</dt>
              <dd className={styles.factValue}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      );

    case "links":
      return (
        <div className={styles.links}>
          {block.items.map((item) => {
            const external = /^https?:\/\//.test(item.href);
            if (external) {
              return (
                <a
                  key={item.href}
                  className={styles.link}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.href} className={styles.link} href={item.href}>
                {item.label}
              </Link>
            );
          })}
        </div>
      );
  }
}
