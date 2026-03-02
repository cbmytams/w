"use client";

import { useState, useEffect } from "react";

export function useWikiDarkMode() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") return false;
        const stored = localStorage.getItem("wiki-theme");
        if (stored) return stored === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("wiki-dark");
            localStorage.setItem("wiki-theme", "dark");
        } else {
            root.classList.remove("wiki-dark");
            localStorage.setItem("wiki-theme", "light");
        }
    }, [isDark]);

    const toggle = () => setIsDark((prev) => !prev);

    return { isDark, toggle };
}
