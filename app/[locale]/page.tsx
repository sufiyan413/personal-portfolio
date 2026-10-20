"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 sm:px-10">
        <p
          className="mb-4 text-sm font-medium uppercase tracking-[0.25em]"
          style={{ color: "var(--accent)" }}
        >
          {t("role")}
        </p>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>

        <p
          className="mt-6 max-w-2xl text-lg leading-8"
          style={{ color: "var(--muted)" }}
        >
          {t("description")}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--accent)",
              color: "#ffffff",
            }}
          >
            {t("projectsButton")}
          </Link>

          <Link
            href="/contact"
            className="theme-border rounded-full border px-6 py-3 text-sm font-medium transition-opacity hover:opacity-70"
            style={{
              color: "var(--foreground)",
            }}
          >
            {t("contactButton")}
          </Link>
        </div>
      </section>
    </main>
  );
}
