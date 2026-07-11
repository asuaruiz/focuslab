type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  quote?: string;
};

export default function SectionHeading({ eyebrow, title, quote }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <span className="mb-4 block font-heading text-xs tracking-widest uppercase text-amber">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl">{title}</h2>
      {quote && <p className="accent-quote mt-6 text-lg">&ldquo;{quote}&rdquo;</p>}
    </div>
  );
}
