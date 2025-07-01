"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="relative w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors flex items-center cursor-pointer"
    >
      {/* Track */}
      <span
        className={`absolute top-1 left-1 transition-transform duration-300 z-10 ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow">
          {isDark ? (
            <Moon className="w-4 h-4 text-yellow-500" />
          ) : (
            <Sun className="w-4 h-4 text-yellow-500" />
          )}
        </span>
      </span>
      {/* Track background */}
      <span className="w-full h-full flex items-center justify-between px-2 z-0">
        <Sun className="w-4 h-4 text-yellow-500 opacity-70" />
        <Moon className="w-4 h-4 text-gray-500 opacity-70" />
      </span>
    </button>
  );
}
