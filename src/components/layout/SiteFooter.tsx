"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOOTER_NAVIGATION } from "@/constants/navigation";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname?.startsWith("/dev")) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav} aria-label="Informations légales">
        <ul>
          {FOOTER_NAVIGATION.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
