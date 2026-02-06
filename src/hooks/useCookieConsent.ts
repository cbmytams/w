"use client";

import { useEffect, useState } from "react";

export type CookieConsent = "accepted" | "declined" | null;

const STORAGE_KEY = "wafia_cookie_consent";
const EVENT_NAME = "wafia-cookie-consent";

export function getStoredConsent(): CookieConsent {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "accepted" || value === "declined") return value;
  return null;
}

export function setStoredConsent(value: Exclude<CookieConsent, null>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
    const handler = () => setConsent(getStoredConsent());
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  return consent;
}
