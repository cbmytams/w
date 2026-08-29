"use client";

import type { ReactNode } from "react";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SmartBackButtonProps {
  fallback: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Back button with a light exit animation: the current content fades and
 * slightly scales down (300ms) before the history navigation plays, so the
 * return trip feels as deliberate as the arrival. Reduced-motion users
 * navigate instantly.
 */
export function SmartBackButton({
  fallback,
  children,
  className,
  ariaLabel,
}: SmartBackButtonProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [isLeaving, setIsLeaving] = useState(false);
  const timerRef = useRef<number | null>(null);

  const onBack = useCallback(() => {
    if (isLeaving) return;

    const navigate = () => {
      if (typeof window !== "undefined" && window.history.length > 2) {
        router.back();
        return;
      }
      router.push(fallback);
    };

    if (prefersReducedMotion) {
      navigate();
      return;
    }

    setIsLeaving(true);
    document.getElementById("main-content")?.classList.add("smart-back-exit");

    timerRef.current = window.setTimeout(navigate, 280);
  }, [fallback, isLeaving, prefersReducedMotion, router]);

  return (
    <button
      type="button"
      onClick={onBack}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
