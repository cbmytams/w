"use client";

import { useState, useEffect } from "react";

export function useWikiDarkMode() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") return false;
        const stored = localStorage.getItem("wiki-theme");
        if (stored === "dark") return true;
        if (stored === "light") return false;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            setMounted(true);
        });

        return () => window.cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("wiki-dark");
            localStorage.setItem("wiki-theme", "dark");
        } else {
            root.classList.remove("wiki-dark");
            localStorage.setItem("wiki-theme", "light");
        }
    }, [isDark, mounted]);

    const toggle = () => setIsDark((prev) => !prev);

    return { isDark, toggle, mounted };
}
