/**
 * Indexal ships an optional `faqSchema` array with each article. Its exact
 * shape is not pinned down in their docs, so both plausible forms are accepted
 * — a plain `{ question, answer }` pair, or an entry already shaped as
 * schema.org `Question` — and anything else is ignored rather than emitted as
 * malformed structured data.
 */
type FaqEntry = { question: string; answer: string };

function toEntry(value: unknown): FaqEntry | null {
  if (typeof value !== "object" || value === null) return null;

  const entry = value as Record<string, unknown>;

  const question = entry.question ?? entry.name;
  const rawAnswer = entry.answer ?? entry.acceptedAnswer;
  const answer =
    typeof rawAnswer === "object" && rawAnswer !== null
      ? (rawAnswer as Record<string, unknown>).text
      : rawAnswer;

  if (typeof question !== "string" || typeof answer !== "string") return null;
  if (!question.trim() || !answer.trim()) return null;

  return { question: question.trim(), answer: answer.trim() };
}

/** Returns a schema.org FAQPage object, or null when there is nothing valid. */
export function toFaqPageJsonLd(faqSchema: unknown): Record<string, unknown> | null {
  if (!Array.isArray(faqSchema)) return null;

  const entries = faqSchema
    .map(toEntry)
    .filter((entry): entry is FaqEntry => entry !== null);

  if (entries.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}
