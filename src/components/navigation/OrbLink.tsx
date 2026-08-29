"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { useOrbNavigate } from "@/components/home/orb/useOrbNavigate";
import { isModifiedClick, resolveOrbTarget } from "@/lib/orb-targets";

interface OrbLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  onFocus?: () => void;
  prefetch?: boolean;
  onClick?: (event: MouseEvent) => void;
}

/**
 * Smart internal link: keeps Next.js prefetch and semantics, but when the
 * destination belongs to an orb cluster (home, brands, talents, contact
 * forms) it intercepts the click so the persistent orb field morphs toward
 * the target variant before the route pushes.
 *
 * Modified clicks (⌘/Ctrl/Shift/Alt, middle click) always fall through to
 * the browser so new-tab behaviour keeps working.
 */
export function OrbLink({
  href,
  children,
  className,
  ariaLabel,
  onFocus,
  prefetch,
  onClick,
}: OrbLinkProps) {
  const navigateWithOrb = useOrbNavigate();
  const target = resolveOrbTarget(href);

  const handleClick = (event: MouseEvent) => {
    onClick?.(event);
    if (isModifiedClick(event)) return;
    if (target) {
      event.preventDefault();
      navigateWithOrb(href, target)(event);
    }
  };

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onFocus={onFocus}
      prefetch={prefetch}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
