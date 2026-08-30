import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionTitle({ children, as = "h2" }: { children: ReactNode; as?: "h1" | "h2" | "h3" }) {
  const Tag = as;
  return <Tag className="section-title">{children}</Tag>;
}

export function ArrowLink({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) {
  return (
    <Link href={href} className={primary ? "button-primary" : "text-link"}>
      <span>{children}</span><span aria-hidden="true">↗</span>
    </Link>
  );
}

export function AmberMark() {
  return <span className="amber-mark" aria-hidden="true"><span /></span>;
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <header className="page-hero page-grid">
      <div className="page-kicker"><AmberMark /><Eyebrow>{eyebrow}</Eyebrow></div>
      <div>
        <SectionTitle as="h1">{title}</SectionTitle>
        <p className="lede mt-8">{intro}</p>
      </div>
    </header>
  );
}
