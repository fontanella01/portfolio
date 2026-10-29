type Tone = "light" | "green" | "mustard" | "pink";

export function Section({
  id,
  title,
  subtitle,
  tone = "light",
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  // each colored section brings its own palette (see .tone-* in globals.css)
  tone?: Tone;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative scroll-mt-16 overflow-hidden ${tone === "light" ? "" : `tone-${tone}`}`}>
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="max-w-3xl">
          <h2 id={`${id}-title`} className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            {title}
          </h2>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-muted">{subtitle}</p>}
        </div>
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
