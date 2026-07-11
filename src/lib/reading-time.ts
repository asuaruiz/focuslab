const WORDS_PER_MINUTE = 200;

/**
 * Estimates reading time (in whole minutes, minimum 1) for an HTML string.
 * Strips tags, collapses whitespace, counts words, and rounds up against
 * an average adult reading speed of ~200 words per minute.
 */
export function getReadingTime(html: string): number {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-zA-Z#0-9]+;/g, " ")
    .trim();

  if (!text) return 1;

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return Math.max(1, minutes);
}
