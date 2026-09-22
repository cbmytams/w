import Link from "next/link";
import type { LegalBlock, LegalDocument } from "@/constants/legal-content";
import styles from "./LegalPage.module.css";

/**
 * Rendu unique des trois pages légales.
 * Composant serveur : aucun JavaScript client ni animation, pour un
 * chargement rapide et une lisibilité maximale.
 */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Document officiel</p>
        <h1 className={styles.title}>{doc.title}</h1>
        <p className={styles.lede}>{doc.lede}</p>
        <p className={styles.meta}>
          <span className={styles.metaDot} aria-hidden="true" />
          Mise à jour : {doc.updatedAt}
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
