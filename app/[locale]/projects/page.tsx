"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/routing";

export default function ProjectsPage() {
  const t = useTranslations("Projects");

  return (
    <main
      className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-20 sm:px-6"
      aria-labelledby="projects-title"
    >
      <section className="w-full max-w-2xl text-center">
        <span
          className="inline-flex rounded-full border px-4 py-2 text-sm font-medium"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
            color: "var(--muted)",
          }}
        >
          {t("eyebrow")}
        </span>

        <h1
          id="projects-title"
          className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ color: "var(--foreground)" }}
        >
          {t("title")}
        </h1>

        <p
          className="mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg"
          style={{ color: "var(--muted)" }}
        >
          {t("description")}
        </p>

        <div
          className="mx-auto mt-8 h-1 w-20 rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
          aria-hidden="true"
        />

        <p
          className="mt-6 text-sm"
          style={{ color: "var(--muted)" }}
        >
          {t("note")}
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--background)",
          }}
        >
          {t("contactButton")}
        </Link>
      </section>
    </main>
  );
}