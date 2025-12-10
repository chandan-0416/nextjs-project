"use client";

import React, { createContext, useEffect, useState } from "react";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("system");
  const [mounted, setMounted] = useState(false);

  // Apply theme on mount
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as ThemeType) || "system";
    setTheme(saved);

    const root = document.documentElement;
    const applyTheme = (theme: ThemeType) => {
      const isDark =
        theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      if (isDark) root.classList.add("dark");
      else root.classList.remove("dark");
    };

    applyTheme(saved);
    setMounted(true);

    // Listen to system preference change
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if ((localStorage.getItem("theme") as ThemeType) === "system") {
        applyTheme("system");
        setTheme("system");
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Update theme when changed
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    const isDark =
      theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme, mounted]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
