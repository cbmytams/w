"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { OrbLink } from "@/components/navigation/OrbLink";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import styles from "./FloatingNavigation.module.css";

const BRAND_LINKS = [
  { href: "#case-studies", key: "cases" },
  { href: "#process", key: "process" },
  { href: "#faq", key: "faq" },
] as const;

interface FloatingNavigationLink {
  href: string;
  label: string;
}

interface FloatingNavigationProps {
  onEstimateClick?: () => void;
  estimateHref?: string;
  /**
   * Liens de route (par ex. les pages légales). Omis, la navigation suit
   * les ancres de la page Marques.
   */
  routeLinks?: readonly FloatingNavigationLink[];
  /** Légende au-dessus des liens dans le menu mobile. */
  mobileLabel?: string;
  navAriaLabel?: string;
  mobileNavAriaLabel?: string;
}

export function FloatingNavigation({
  onEstimateClick,
  estimateHref,
  routeLinks,
  mobileLabel,
  navAriaLabel,
  mobileNavAriaLabel,
}: FloatingNavigationProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const items =
    routeLinks ??
    BRAND_LINKS.map(({ href, key }) => ({
      href,
      label: t(`brandLinks.${key}`),
    }));
  const isRouteNavigation = Boolean(routeLinks);
  // Route links go through the localized Link; anchors stay plain.
  const NavLink = isRouteNavigation ? Link : "a";
  const [dark, setDark] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const savedOverflow = useRef<string | null>(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const story = document.querySelector("[data-book-story]");
      const bounds = story?.getBoundingClientRect();
      let isDark = Boolean(
        bounds &&
        bounds.bottom > 80 &&
        -bounds.top / (bounds.height - innerHeight) > 0.24
      );
      document
        .querySelectorAll<HTMLElement>("[data-nav-tone]")
        .forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80)
            isDark = section.dataset.navTone === "dark";
        });
      setDark(isDark);
      if (isRouteNavigation) return;
      let current = "";
      BRAND_LINKS.forEach(({ href }) => {
        const rect = document.querySelector(href)?.getBoundingClientRect();
        if (rect && rect.top <= 160 && rect.bottom > 160) current = href;
      });
      setActiveSection(current);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (savedOverflow.current !== null)
        document.body.style.overflow = savedOverflow.current;
    };
  }, [isRouteNavigation]);

  function openMenu() {
    savedOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
  }

  function closeMenu() {
    dialog.current?.close();
  }

  function restoreMenu() {
    if (savedOverflow.current !== null) {
      document.body.style.overflow = savedOverflow.current;
      savedOverflow.current = null;
    }
    menuButton.current?.focus();
  }

  const contact = (mobile = false) =>
    estimateHref ? (
      <OrbLink
        href={estimateHref}
        className={mobile ? styles.mobileContact : styles.contact}
        onClick={mobile ? closeMenu : undefined}
      >
        {t("contact")} <ArrowUpRight size={16} aria-hidden="true" />
      </OrbLink>
    ) : (
      <button
        className={mobile ? styles.mobileContact : styles.contact}
        onClick={() => {
          if (mobile) closeMenu();
          onEstimateClick?.();
        }}
      >
        {t("contact")} <ArrowUpRight size={16} aria-hidden="true" />
      </button>
    );

  return (
    <>
      <header className={styles.header} data-tone={dark ? "dark" : "light"}>
        <div className={styles.inner}>
          <div className={styles.identity}>
            <OrbLink
              href="/"
              className={styles.logo}
              ariaLabel={t("homeAriaLabel")}
            >
              <Image
                src="/wafia.svg"
                width={711}
                height={231}
                alt=""
                priority
              />
            </OrbLink>
          </div>
          <nav
            className={styles.links}
            aria-label={navAriaLabel ?? t("navAriaLabel")}
          >
            {items.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                aria-current={
                  isRouteNavigation
                    ? pathname === href
                      ? "page"
                      : undefined
                    : activeSection === href
                      ? "location"
                      : undefined
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className={styles.end}>
            <LocaleSwitcher className={styles.locales} />
            {contact()}
          </div>
          <button
            ref={menuButton}
            className={styles.menuButton}
            aria-label={t("openMenu")}
            aria-haspopup="dialog"
            onClick={openMenu}
          >
            <Menu size={23} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        className={styles.mobileMenu}
        aria-labelledby="brands-menu-title"
        onClose={restoreMenu}
      >
        <div className={styles.mobileTop}>
          <span className={styles.logo} id="brands-menu-title">
            <Image src="/wafia.svg" width={711} height={231} alt="Wafia" />
          </span>
          <button autoFocus onClick={closeMenu} aria-label={t("closeMenu")}>
            <X size={25} />
          </button>
        </div>
        <p className={styles.mobileLabel}>{mobileLabel ?? t("mobileLabel")}</p>
        <nav
          aria-label={mobileNavAriaLabel ?? t("mobileNavAriaLabel")}
          className={styles.mobileLinks}
        >
          {items.map(({ href, label }, index) => (
            <NavLink key={href} href={href} onClick={closeMenu}>
              <span>0{index + 1}</span>
              {label}
              <ArrowUpRight size={22} />
            </NavLink>
          ))}
        </nav>
        <LocaleSwitcher className={styles.mobileLocales} />
        {contact(true)}
      </dialog>
    </>
  );
}
