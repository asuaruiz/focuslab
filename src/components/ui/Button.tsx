import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
};

export default function Button({ href, children, variant = "solid" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-8 py-4 font-heading text-xs tracking-widest uppercase transition-opacity hover:opacity-90";

  const styles =
    variant === "solid"
      ? `${base} bg-amber text-black`
      : `${base} border border-white/30 text-white`;

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}
