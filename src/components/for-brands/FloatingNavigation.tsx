"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { OrbLink } from "@/components/navigation/OrbLink";
import styles from "./FloatingNavigation.module.css";

const links = [
  { href: "#case-studies", label: "Nos réalisations" },
  { href: "#process", label: "Notre méthode" },
  { href: "#faq", label: "Questions" },
];

interface FloatingNavigationProps {
  onEstimateClick?: () => void;
  estimateHref?: string;
}

export function FloatingNavigation({
  onEstimateClick,
  estimateHref,
}: FloatingNavigationProps) {
  const [dark, setDark] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const switcher = useRef<HTMLDetailsElement>(null);
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
      let current = "";
      links.forEach(({ href }) => {
        const rect = document.querySelector(href)?.getBoundingClientRect();
        if (rect && rect.top <= 160 && rect.bottom > 160) current = href;
      });
      setActiveSection(current);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function dismiss(event: PointerEvent) {
      if (switcher.current && !switcher.current.contains(event.target as Node))
        switcher.current.open = false;
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && switcher.current)
        switcher.current.open = false;
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
      if (savedOverflow.current !== null)
        document.body.style.overflow = savedOverflow.current;
    };
  }, []);

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
        Nous contacter <ArrowUpRight size={16} aria-hidden="true" />
      </OrbLink>
    ) : (
      <button
        className={mobile ? styles.mobileContact : styles.contact}
        onClick={() => {
          if (mobile) closeMenu();
          onEstimateClick?.();
        }}
      >
        Nous contacter <ArrowUpRight size={16} aria-hidden="true" />
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
              ariaLabel="Wafia, accueil"
            >
              <Image
                src="/wafia-w.svg"
                width={204}
                height={110}
                alt=""
                priority
              />
            </OrbLink>
          </div>
          <nav className={styles.links} aria-label="Navigation Marques">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                aria-current={activeSection === href ? "location" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className={styles.end}>{contact()}</div>
          <button
            ref={menuButton}
            className={styles.menuButton}
            aria-label="Ouvrir le menu"
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
            <Image src="/wafia-w.svg" width={204} height={110} alt="Wafia" />
          </span>
          <button autoFocus onClick={closeMenu} aria-label="Fermer le menu">
            <X size={25} />
          </button>
        </div>
        <p className={styles.mobileLabel}>Pour les marques</p>
        <nav
          aria-label="Navigation mobile Marques"
          className={styles.mobileLinks}
        >
          {links.map(({ href, label }, index) => (
            <a key={href} href={href} onClick={closeMenu}>
              <span>0{index + 1}</span>
              {label}
              <ArrowUpRight size={22} />
            </a>
          ))}
        </nav>
        {contact(true)}
      </dialog>
    </>
  );
}
