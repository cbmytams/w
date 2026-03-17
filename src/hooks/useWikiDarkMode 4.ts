"use client";

import { useState, useEffect } from "react";

export function useWikiDarkMode() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = window.localStorage.getItem("wiki-theme");
        const nextIsDark = stored === "dark"
            ? true
            : stored === "light"
                ? false
                : window.matchMedia("(prefers-color-scheme: dark)").matches;

        const frame = window.requestAnimationFrame(() => {
            setIsDark(nextIsDark);
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
