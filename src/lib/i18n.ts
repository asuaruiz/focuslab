import { cookies } from "next/headers";

export type Locale = "es" | "en";

export function getLocale(): Locale {
  return cookies().get("focuslab_locale")?.value === "en" ? "en" : "es";
}

export function isEnglish(): boolean {
  return getLocale() === "en";
}

