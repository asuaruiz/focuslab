type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  quote?: string;
  as?: "h1" | "h2";
};

export default function SectionHeading({ eyebrow, title, quote, as = "h2" }: SectionHeadingProps) {
  const Heading = as;

  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <span className="mb-4 block font-heading text-xs tracking-widest uppercase text-amber">
          {eyebrow}
        </span>
      )}
      <Heading className="text-3xl md:text-4xl">{title}</Heading>
      {quote && <p className="accent-quote mt-6 text-lg">&ldquo;{quote}&rdquo;</p>}
    </div>
  );
}
