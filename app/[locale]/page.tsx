
"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";

const services = [
  {
    number: "01",
    icon: "⌘",
    title: "businessTitle",
    description: "businessText",
  },
  {
    number: "02",
    icon: "▦",
    title: "ecommerceTitle",
    description: "ecommerceText",
  },
  {
    number: "03",
    icon: "⌘",
    title: "appsTitle",
    description: "appsText",
  },
  {
    number: "04",
    icon: "↗",
    title: "uiTitle",
    description: "uiText",
  },
] as const;

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <section className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 h-80 w-80 rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--accent)",
            opacity: 0.09,
          }}
        />

        {/* Hero content */}
        <div className="relative z-10">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium tracking-wide"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--muted)",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
              aria-hidden="true"
            />
            {t("role")}
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-7xl">
            {t("title")}
          </h1>

          <p
            className="mt-6 max-w-xl text-base leading-8 sm:text-lg"
            style={{ color: "var(--muted)" }}
          >
            {t("description")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--background)",
              }}
            >
              {t("projectsButton")}
              <span aria-hidden="true">↗</span>
            </Link>

            <Link
              href="/contact"
              className="theme-border inline-flex min-h-12 items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--surface)]"
            >
              {t("contactButton")}
            </Link>
          </div>

       <div
  className="mt-10 flex flex-wrap gap-2"
  aria-label={t("skillsLabel")}
>
  {[
    "React",
    "TypeScript",
    "Next.js",
    "Material UI",
    "REST APIs",
  ].map((skill) => (
    <span
      key={skill}
      className="rounded-full border px-3 py-2 text-xs font-medium sm:text-sm"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
        color: "var(--muted)",
      }}
    >
      {skill}
    </span>
  ))}
</div>
        </div>

        {/* What I Can Build */}
        <div className="relative z-10 min-w-0">
          <div className="mb-7">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              {t("servicesEyebrow")}
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("servicesTitle")}
            </h2>

            <p
              className="mt-4 max-w-xl text-sm leading-7 sm:text-base"
              style={{ color: "var(--muted)" }}
            >
              {t("servicesDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.number}
                className="group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--surface-hover)] sm:p-6"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition-colors"
                    style={{
                      backgroundColor: "var(--background)",
                      color: "var(--accent)",
                    }}
                    aria-hidden="true"
                  >
                    {service.icon}
                  </span>

                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--muted)" }}
                  >
                    {service.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold leading-snug">
                  {t(service.title)}
                </h3>

                <p
                  className="mt-3 text-sm leading-6"
                  style={{ color: "var(--muted)" }}
                >
                  {t(service.description)}
                </p>
              </article>
            ))}
          </div>

          <p
            className="mt-5 text-xs leading-6"
            style={{ color: "var(--muted)" }}
          >
            {t("servicesNote")}
          </p>
        </div>
      </section>
    </main>
  );
}
