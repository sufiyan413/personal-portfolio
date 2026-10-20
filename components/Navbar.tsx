"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "../i18n/routing";

const navLinks = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

const languages = [
  { label: "English", value: "en", flag: "gb" },
  { label: "Español", value: "es", flag: "es" },
  { label: "Français", value: "fr", flag: "fr" },
  { label: "Deutsch", value: "de", flag: "de" },
  { label: "العربية", value: "ar", flag: "sa" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const selectedLanguage =
    languages.find((item) => item.value === locale) ?? languages[0];

  function changeLanguage(newLocale: string) {
    setLanguageOpen(false);
    router.replace(pathname, { locale: newLocale });
  }

  const languageSwitcher = (
    <div className="relative z-50">
      <button
        type="button"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={languageOpen}
        onClick={() => setLanguageOpen((prev) => !prev)}
        className="group flex items-center gap-2 rounded-full border px-3 py-2 transition-all duration-300 hover:opacity-80 active:scale-95"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          color: "var(--foreground)",
        }}
      >
        <span
          className={`fi fi-${selectedLanguage.flag} inline-block h-5 w-5 shrink-0 rounded-full shadow-sm`}
          aria-hidden="true"
        />

        <span className="text-sm" style={{ color: "var(--foreground)" }}>
          {selectedLanguage.label}
        </span>

        <span
          aria-hidden="true"
          className={`text-xs transition-transform duration-300 ${
            languageOpen ? "rotate-180" : ""
          }`}
          style={{ color: "var(--muted)" }}
        >
          ▼
        </span>
      </button>

      {languageOpen && (
        <>
          <button
            type="button"
            aria-label="Close language menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setLanguageOpen(false)}
          />

          <div
            role="listbox"
            aria-label="Choose language"
            className="theme-header theme-border absolute right-0 top-full z-[60] mt-2 min-w-44 rounded-xl border p-2 shadow-xl backdrop-blur-xl"
            style={{ color: "var(--foreground)" }}
          >
            {languages.map((item) => {
              const selected = locale === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => changeLanguage(item.value)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:opacity-75"
                  style={{
                    backgroundColor: selected
                      ? "var(--surface)"
                      : "transparent",
                    color: selected ? "var(--accent)" : "var(--foreground)",
                  }}
                >
                  <span
                    className={`fi fi-${item.flag} inline-block h-5 w-5 shrink-0 rounded-full shadow-sm`}
                    aria-hidden="true"
                  />

                  <span>{item.label}</span>

                  {selected && (
                    <span className="ml-auto" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      <header
        className="theme-header theme-border sticky top-0 z-40 border-b backdrop-blur-lg"
        style={{ color: "var(--foreground)" }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-10 sm:py-5">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="shrink-0 text-xl font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Sufiyan<span style={{ color: "var(--accent)" }}>.</span>
          </Link>

          {/* Desktop navigation and language switcher */}
          <div className="hidden items-center gap-5 md:flex lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: "var(--muted)" }}
              >
                {t(link.label)}
              </Link>
            ))}

            {languageSwitcher}
          </div>

          {/* Mobile controls */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <button
              type="button"
              aria-label="Open navigation sidebar"
              aria-expanded={menuOpen}
              aria-controls="mobile-sidebar"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:opacity-75"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              <span className="text-2xl leading-none">☰</span>
            </button>

            {languageSwitcher}
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close navigation sidebar"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Responsive sidebar */}
      <aside
        id="mobile-sidebar"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={`theme-header theme-border fixed right-0 top-0 z-50 flex h-dvh w-[min(82vw,320px)] flex-col border-l p-5 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ color: "var(--foreground)" }}
      >
        <div className="mb-8 flex items-center justify-between gap-3">
          <span className="text-lg font-bold">
            Sufiyan<span style={{ color: "var(--accent)" }}>.</span>
          </span>

          <button
            type="button"
            aria-label="Close sidebar"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-2xl transition-colors hover:opacity-75"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            ×
          </button>
        </div>

        <p
          className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--muted)" }}
        >
          {t("menu")}
        </p>

        <nav
          aria-label="Mobile navigation links"
          className="flex flex-col gap-2"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-medium transition-colors hover:opacity-75"
              style={{ color: "var(--foreground)" }}
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        <div
          className="mt-auto border-t pt-5"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--foreground)" }}>
            {t("projectPrompt")}
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
            {t("projectTagline")}
          </p>
        </div>
      </aside>
    </>
  );
}
