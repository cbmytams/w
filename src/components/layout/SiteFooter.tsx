"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import styles from "./SiteFooter.module.css";

const LINKS = [
  { key: "mentions", href: "/legal/mentions" },
  { key: "privacy", href: "/legal/privacy" },
  { key: "cookies", href: "/legal/cookies" },
] as const;

export function SiteFooter() {
  const pathname = usePathname();
  const t = useTranslations("footer");

  if (pathname?.startsWith("/dev")) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav} aria-label={t("navAriaLabel")}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{t(`links.${link.key}`)}</Link>
            </li>
          ))}
          <li>
            <LocaleSwitcher className={styles.locales} />
          </li>
        </ul>
      </nav>
    </footer>
  );
}
