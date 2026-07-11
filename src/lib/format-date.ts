// Formats an ISO date string as Spanish long-form, e.g. "18 de marzo, 2024".
export function formatPublishedDate(isoDate: string | null): string | null {
  if (!isoDate) return null;

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return null;

  const formatted = new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

  // Intl gives "18 de marzo de 2024" in es locale — swap the final
  // connector for a comma to match the requested "18 de marzo, 2024" style.
  return formatted.replace(" de " + date.getUTCFullYear(), ", " + date.getUTCFullYear());
}
