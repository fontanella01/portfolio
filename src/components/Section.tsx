export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-nevoa py-16 sm:py-24">
      <div className="max-w-2xl">
        <h2 id={`${id}-title`} className="font-display text-3xl font-semibold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">
          {title}
        </h2>
        {subtitle && <p className="mt-3 text-lg text-muted">{subtitle}</p>}
      </div>
      <div className="mt-10 sm:mt-14">{children}</div>
    </section>
  );
}
