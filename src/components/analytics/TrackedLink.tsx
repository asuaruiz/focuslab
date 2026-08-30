"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

export default function TrackedLink({ href, event, children, className }: { href: string; event: AnalyticsEvent; children: ReactNode; className?: string }) {
  return <Link href={href} className={className} onClick={() => trackEvent(event, { href })}>{children}</Link>;
}
