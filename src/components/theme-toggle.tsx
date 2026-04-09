"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { captureEvent } from "@/lib/analytics";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    captureEvent('theme_change', { theme });
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-white/10 transition-colors"
      aria-label={`Toggle ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
      aria-live="polite"
      aria-controls="theme-root"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}
