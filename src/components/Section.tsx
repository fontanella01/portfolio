import { Shapes, type ShapeVariant } from "./Shapes";

type Tone = "light" | ShapeVariant;

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
      {tone !== "light" && <Shapes variant={tone} />}
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="max-w-3xl">
          <h2 id={`${id}-title`} className="font-display text-[clamp(2.8rem,8vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">
            {title}
          </h2>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-muted">{subtitle}</p>}
        </div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
