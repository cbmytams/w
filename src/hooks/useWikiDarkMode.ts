"use client";

import { useState, useEffect } from "react";

export function useWikiDarkMode() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("wiki-theme");
        if (stored) {
            setIsDark(stored === "dark");
        } else {
            setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
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
