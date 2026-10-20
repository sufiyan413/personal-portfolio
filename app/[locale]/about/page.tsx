"use client";

import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/routing";

const skills = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "HTML & CSS",
  "Tailwind CSS",
  "Material UI",
  "React Router",
  "Zustand",
  "REST API Integration",
  "Reusable Components",
  "Responsive Design",
  "Web Accessibility",
  "Frontend Performance",
];

const processSteps = [
  { number: "01", title: "processUnderstand", text: "processUnderstandText" },
  { number: "02", title: "processPlan", text: "processPlanText" },
  { number: "03", title: "processBuild", text: "processBuildText" },
  { number: "04", title: "processDeliver", text: "processDeliverText" },
] as const;

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24">
        {/* Introduction */}
        <section >
          <p
            className="text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: "var(--accent)" }}
          >
            {t("eyebrow")}
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            {t("title")}
          </h1>

          <p
            className="mt-6 text-lg leading-8"
            style={{ color: "var(--muted)" }}
          >
            {t("intro")}
          </p>

          <p className="mt-4 leading-8" style={{ color: "var(--muted)" }}>
            {t("description")}
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--background)",
            }}
          >
            {t("contactButton")}
            <span aria-hidden="true">↗</span>
          </Link>
        </section>

        {/* Technical Skills */}
        <section className="mt-24">
          <div className="max-w-2xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              {t("skillsEyebrow")}
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("skillsTitle")}
            </h2>

            <p
              className="mt-4 leading-7"
              style={{ color: "var(--muted)" }}
            >
              {t("skillsDescription")}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border px-4 py-2.5 text-sm transition-colors"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Working Process */}
        <section className="mt-24">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            {t("processEyebrow")}
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("processTitle")}
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border p-5 sm:p-6"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  {step.number}
                </p>

                <h3 className="mt-5 text-lg font-semibold">
                  {t(step.title)}
                </h3>

                <p
                  className="mt-3 text-sm leading-6"
                  style={{ color: "var(--muted)" }}
                >
                  {t(step.text)}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section
          className="mt-24 rounded-3xl border p-7 sm:p-12"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("closingTitle")}
          </h2>

          <p
            className="mt-4 max-w-xl leading-7"
            style={{ color: "var(--muted)" }}
          >
            {t("closingText")}
          </p>

          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--background)",
            }}
          >
            {t("contactButton")}
          </Link>
        </section>
      </div>
    </main>
  );
}
