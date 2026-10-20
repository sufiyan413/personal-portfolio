import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10"
      >
        <Link href="/" className="text-lg font-bold tracking-tight">
          Portfolio<span className="text-zinc-400">.</span>
        </Link>

        <div className="flex items-center gap-5 sm:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
