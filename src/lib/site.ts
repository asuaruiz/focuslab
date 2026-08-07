export const DEFAULT_SITE_URL = "https://www.focuslabsmg.com";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

  try {
    return new URL(raw).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}
