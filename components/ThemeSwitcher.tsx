"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Check,
  Moon,
  Palette,
  Sun,
  Waves,
  Gem,
  Leaf,
} from "lucide-react";

type Theme = "dark" | "light" | "reading" | "midnight" | "obsidian" | "sage";

const themes: {
  value: Theme;
  label: string;
  description: string;
  icon: typeof Moon;
}[] = [
  {
    value: "dark",
    label: "Dark",
    description: "Classic dark theme",
    icon: Moon,
  },
  {
    value: "light",
    label: "Light",
    description: "Clean light theme",
    icon: Sun,
  },
  {
    value: "reading",
    label: "Reading",
    description: "Warm reading mode",
    icon: BookOpen,
  },
  {
    value: "midnight",
    label: "Midnight Blue",
    description: "Deep navy with blue accents",
    icon: Waves,
  },
  {
    value: "obsidian",
    label: "Obsidian Gold",
    description: "Charcoal with gold accents",
    icon: Gem,
  },
  {
    value: "sage",
    label: "Sage & Ivory",
    description: "Soft ivory with sage accents",
    icon: Leaf,
  },
];

function isTheme(value: string | null): value is Theme {
  return themes.some((item) => item.value === value);
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const initialTheme = isTheme(savedTheme) ? savedTheme : "dark";

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    setMounted(true);
  }, []);

  function changeTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
  }

  if (!mounted) return null;

  return (
    <div data-preserve-theme="true" className="fixed bottom-5 right-5 z-[100]">
      {open && (
        <div
          id="theme-options"
          className="mb-3 w-56 rounded-2xl border p-2 shadow-2xl backdrop-blur-xl"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        >
          <p
            className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Appearance
          </p>

          {themes.map((item) => {
            const Icon = item.icon;
            const selected = theme === item.value;

            return (
              <button
                key={item.value}
                type="button"
                aria-pressed={selected}
                title={item.description}
                onClick={() => changeTheme(item.value)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors"
                style={{
                  backgroundColor: selected ? "var(--surface)" : "transparent",
                  color: selected ? "var(--accent)" : "var(--foreground)",
                }}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                {selected && <Check size={16} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}

      <button
        type="button"
        aria-label="Change website theme"
        aria-expanded={open}
        aria-controls="theme-options"
        onClick={() => setOpen((previous) => !previous)}
        className="ml-auto flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          color: "var(--foreground)",
        }}
      >
        <Palette size={21} aria-hidden="true" />
      </button>
    </div>
  );
}
