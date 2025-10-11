"use client";

import { useTheme } from "@/hooks/useTheme";

export default function DarkModeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-xl">🌙</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label={theme === "dark" ? "Auf Hellmodus wechseln" : "Auf Dunkelmodus wechseln"}
    >
      <span className="text-xl">{theme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
}
