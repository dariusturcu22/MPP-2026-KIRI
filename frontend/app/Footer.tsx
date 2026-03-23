import Link from "next/link";

const FOOTER_LINKS = ["Privacy", "Terms", "Contact"];

export function Footer() {
  return (
    <footer className="bg-night rounded-t-3xl py-8 px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm text-brown-muted">Kiri © 2026</p>
        <div className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-brown-muted hover:text-brown-light transition-colors no-underline"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
