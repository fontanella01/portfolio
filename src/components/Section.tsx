export function Section({
  id,
  title,
  subtitle,
  tone = "light",
  divider = true,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  // a thin line on top; off for a light section that follows a dark band
  divider?: boolean;
  children: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    // dark sections run edge to edge; their content keeps the page width
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-16 ${dark ? "bg-band text-band-text" : ""}`}>
      <div className={`mx-auto max-w-6xl px-5 py-20 sm:py-28 ${dark || !divider ? "" : "border-t border-nevoa"}`}>
        <div className="max-w-2xl">
          <h2 id={`${id}-title`} className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.025em]">
            {title}
          </h2>
          {subtitle && <p className={`mt-4 text-lg ${dark ? "text-band-muted" : "text-muted"}`}>{subtitle}</p>}
        </div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
