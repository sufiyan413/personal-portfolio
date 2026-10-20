export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 sm:px-10">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
          Frontend Developer
        </p>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          I build modern web experiences that help businesses grow.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          I create responsive websites and web applications using React,
          Next.js, TypeScript, and modern frontend technologies.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/projects"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            View My Projects
          </a>

          <a
            href="/contact"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium transition hover:bg-zinc-100"
          >
            Contact Me
          </a>
        </div>
      </section>
    </main>
  );
}
