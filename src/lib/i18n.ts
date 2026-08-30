import { cookies } from "next/headers";
import { headers } from "next/headers";

export type Locale = "es" | "en";

export function getLocale(): Locale {
  const routedLocale = headers().get("x-focuslab-locale");
  if (routedLocale === "en" || routedLocale === "es") return routedLocale;
  return cookies().get("focuslab_locale")?.value === "en" ? "en" : "es";
}

export function isEnglish(): boolean {
  return getLocale() === "en";
}
