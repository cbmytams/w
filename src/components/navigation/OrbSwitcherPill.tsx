"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WafiaLogo } from "@/components/ui/WafiaLogo";
import { sitePaths } from "@/lib/site";
import { useOrbNavigate } from "@/components/home/orb/useOrbNavigate";
import type { OrbTargetVariant } from "@/components/home/orb/OrbTransitionProvider";

export type OrbSwitcherCurrent = "home" | "brands" | "talents";

/** Grace period before the dropdown closes after the pointer leaves it. */
const CLOSE_DELAY_MS = 180;

interface OrbSwitcherItem {
  href: string;
  target: OrbTargetVariant;
  label: string;
  hint?: string;
  accent: "brands" | "talents" | null;
}

function itemsFor(current: OrbSwitcherCurrent): OrbSwitcherItem[] {
  const marques: OrbSwitcherItem = {
    href: sitePaths.forBrands,
    target: "brands",
    label: "MARQUES",
    hint: "Campagnes créateurs & ROI",
    accent: "brands",
  };
  const talents: OrbSwitcherItem = {
    href: sitePaths.forTalents,
    target: "talents",
    label: "TALENTS",
    hint: "Carrière, image & droits",
    accent: "talents",
  };
  const accueil: OrbSwitcherItem = {
    href: sitePaths.home,
    target: "home",
    label: "ACCUEIL",
    accent: null,
  };

  switch (current) {
    case "home":
      return [marques, talents];
    case "brands":
      return [accueil, talents];
    case "talents":
      return [accueil, marques];
  }
}

const CURRENT_LABEL: Record<OrbSwitcherCurrent, string> = {
  home: "ACCUEIL",
  brands: "MARQUES",
  talents: "TALENTS",
};

const DOT_CLASS: Record<OrbSwitcherCurrent, string> = {
  home: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]",
  brands: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]",
  talents: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]",
};

interface OrbSwitcherPillProps {
  current: OrbSwitcherCurrent;
  /** "dark": always dark glass (home). "auto": adapts to light/dark mode. */
  tone?: "dark" | "auto";
}

export function OrbSwitcherPill({
  current,
  tone = "auto",
}: OrbSwitcherPillProps) {
  const [open, setOpen] = useState(false);
  const [menuId] = useState(
    () => `orb-switch-menu-${current}`
  );
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const navigateWithCloud = useOrbNavigate();
  const items = itemsFor(current);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setOpen(false);
    }, CLOSE_DELAY_MS);
  }, []);

  const closeNow = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(false);
  }, []);

  // Clear any pending close timer on unmount.
  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    []
  );

  // Close on outside pointerdown (touch / click away).
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        closeNow();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, closeNow]);

  const pillTone =
    tone === "dark"
      ? "border-white/10 bg-[#1c1c1e]/60 text-white"
      : "border-white/50 bg-white/40 text-slate-900 dark:border-white/10 dark:bg-[#1c1c1e]/60 dark:text-white";
  const dropdownTone =
    tone === "dark"
      ? "border-white/10 bg-[#1c1c1e]/80"
      : "border-white/50 bg-white/70 dark:border-white/10 dark:bg-[#1c1c1e]/80";
  const labelTone =
    tone === "dark" ? "text-white" : "text-slate-900 dark:text-white";
  const chevronTone =
    tone === "dark" ? "text-white/50" : "text-slate-900/50 dark:text-white/50";
  const itemLabelTone =
    tone === "dark" ? "text-white" : "text-slate-900 dark:text-white";
  const itemHintTone =
    tone === "dark" ? "text-white/40" : "text-slate-500 dark:text-white/40";
  const itemArrowTone =
    tone === "dark" ? "text-white/40" : "text-slate-900/40 dark:text-white/40";

  return (
    <div
      ref={rootRef}
      className="group relative"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        // Close when focus leaves the pill wrapper (keyboard navigation).
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          closeNow();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          closeNow();
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          cancelClose();
          setOpen((v) => !v);
        }}
        className={`flex h-12 items-center gap-2.5 rounded-full border px-5 shadow-lg backdrop-blur-[40px] saturate-150 transition-all duration-300 hover:scale-105 hover:bg-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:hover:bg-[#1c1c1e]/80 ${pillTone}`}
      >
        <WafiaLogo className="h-4 w-auto" />
        <span
          aria-hidden="true"
          className={`orb-dot h-[5px] w-[5px] rounded-full ${DOT_CLASS[current]}`}
        />
        <span
          className={`text-xs font-bold uppercase tracking-[0.18em] leading-none mb-[1px] ${labelTone}`}
        >
          {CURRENT_LABEL[current]}
        </span>
        <span
          aria-hidden="true"
          className={`text-[10px] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          } ${chevronTone}`}
        >
          ▲
        </span>
      </button>

      {/* Invisible bridge over the gap between the pill and the dropdown:
          keeps the wrapper's hover zone continuous while the pointer travels down. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-full h-[14px] w-[250px]"
      />

      <div
        id={menuId}
        role="menu"
        onMouseEnter={cancelClose}
        className={`absolute left-0 top-[58px] w-[250px] rounded-2xl border p-2 shadow-2xl backdrop-blur-[40px] saturate-150 transition-all duration-300 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-[0.97] opacity-0"
        } ${dropdownTone}`}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            onClick={navigateWithCloud(item.href, item.target)}
            onFocus={() => setOpen(true)}
            className={`orb-switch-item flex items-center justify-between rounded-xl px-4 py-3 transition-colors duration-200 ${
              item.accent === "brands"
                ? "orb-switch-item-brands"
                : item.accent === "talents"
                  ? "orb-switch-item-talents"
                  : ""
            }`}
          >
            <span>
              <b
                className={`block text-[13px] font-bold tracking-[0.14em] ${itemLabelTone}`}
              >
                {item.label}
              </b>
              {item.hint ? (
                <small
                  className={`mt-0.5 block text-[10px] font-normal ${itemHintTone}`}
                >
                  {item.hint}
                </small>
              ) : null}
            </span>
            <span aria-hidden="true" className={`text-sm ${itemArrowTone}`}>
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
