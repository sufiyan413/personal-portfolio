"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

const EMAIL = "sufiyanattari184@gmail.com";
// const WHATSAPP = "918149613109";
const LINKEDIN = "https://www.linkedin.com/in/shaikh-sufiyan-979376175/";

export default function ContactPage() {
  const t = useTranslations("Contact");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `${t("nameLabel")}: ${form.name}\n` +
        `${t("emailLabel")}: ${form.email}\n\n` +
        `${form.message}`
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24">
        {/* Header */}
        <section className="max-w-3xl">
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
            className="mt-6 max-w-2xl text-lg leading-8"
            style={{ color: "var(--muted)" }}
          >
            {t("description")}
          </p>
        </section>

        {/* Contact Layout */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Contact Details */}
          <section>
            <h2 className="text-2xl font-semibold">
              {t("detailsTitle")}
            </h2>

            <p
              className="mt-3 leading-7"
              style={{ color: "var(--muted)" }}
            >
              {t("detailsDescription")}
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-start gap-4 rounded-2xl border p-5 transition-colors hover:opacity-80"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
                  style={{
                    backgroundColor: "var(--background)",
                    color: "var(--accent)",
                  }}
                >
                  @
                </span>

                <span className="min-w-0">
                  <span className="block text-sm" style={{ color: "var(--muted)" }}>
                    {t("emailLabel")}
                  </span>
                  <span className="mt-1 block break-all font-medium">
                    {EMAIL}
                  </span>
                </span>
              </a>

              {/* <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl border p-5 transition-colors hover:opacity-80"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
                  style={{
                    backgroundColor: "var(--background)",
                    color: "var(--accent)",
                  }}
                >
                  ↗
                </span>

                <span className="min-w-0">
                  <span className="block text-sm" style={{ color: "var(--muted)" }}>
                    {t("whatsappLabel")}
                  </span>
                  <span className="mt-1 block font-medium">
                    +91 8149613109
                  </span>
                </span>
              </a> */}

              <a
  href={LINKEDIN}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-start gap-4 rounded-2xl border p-5 transition-colors hover:opacity-80"
  style={{
    borderColor: "var(--border)",
    backgroundColor: "var(--surface)",
  }}
>
  <span
    aria-hidden="true"
    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
    style={{
      backgroundColor: "var(--background)",
      color: "var(--accent)",
    }}
  >
    in
  </span>

  <span className="min-w-0">
    <span
      className="block text-sm"
      style={{ color: "var(--muted)" }}
    >
      LinkedIn
    </span>
    <span className="mt-1 block break-all font-medium">
      {t("linkedinText")}
    </span>
  </span>
</a>
            </div>

            <div
              className="mt-8 rounded-2xl border p-5"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="font-medium">{t("availabilityTitle")}</p>
              <p
                className="mt-2 text-sm leading-6"
                style={{ color: "var(--muted)" }}
              >
                {t("availabilityText")}
              </p>
            </div>
          </section>

          {/* Contact Form */}
          <section
            className="rounded-3xl border p-6 sm:p-8"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <h2 className="text-2xl font-semibold">
              {t("formTitle")}
            </h2>

            <p
              className="mt-2 text-sm leading-6"
              style={{ color: "var(--muted)" }}
            >
              {t("formDescription")}
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium"
                >
                  {t("nameLabel")}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder={t("namePlaceholder")}
                  className="min-h-12 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                    outlineColor: "var(--accent)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-medium"
                >
                  {t("emailLabel")}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder={t("emailPlaceholder")}
                  className="min-h-12 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                    outlineColor: "var(--accent)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-medium"
                >
                  {t("subjectLabel")}
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={(event) =>
                    setForm({ ...form, subject: event.target.value })
                  }
                  placeholder={t("subjectPlaceholder")}
                  className="min-h-12 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                    outlineColor: "var(--accent)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium"
                >
                  {t("messageLabel")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(event) =>
                    setForm({ ...form, message: event.target.value })
                  }
                  placeholder={t("messagePlaceholder")}
                  className="w-full resize-y rounded-xl border px-4 py-3 outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                    outlineColor: "var(--accent)",
                  }}
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80 sm:w-auto"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--background)",
                }}
              >
                {t("submitButton")}
                <span aria-hidden="true">↗</span>
              </button>

              <p
                className="text-xs leading-5"
                style={{ color: "var(--muted)" }}
              >
                {t("formNote")}
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
