import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTENT, LINKS, isLang } from "@/content";
import { SITE_URL } from "@/site";
import { ChatDemo } from "@/components/ChatDemo";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";

type Params = Promise<{ lang: string }>;

export default async function Home({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = CONTENT[lang];
  const other = lang === "pt" ? "en" : "pt";

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: c.hero.name,
    jobTitle: lang === "pt" ? "Desenvolvedor Full Stack" : "Full Stack Developer",
    url: `${SITE_URL}/${lang}`,
    email: `mailto:${LINKS.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Joinville", addressRegion: "SC", addressCountry: "BR" },
    sameAs: [LINKS.github, LINKS.linkedin],
  };

  // Passos de cada estudo de caso, na ordem em que aconteceram.
  const steps = [
    { key: "problem", dot: "border-2 border-muted bg-papel" },
    { key: "solution", dot: "bg-sinal" },
    { key: "result", dot: "bg-entregue" },
  ] as const;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />

      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-20 focus:rounded focus:bg-surface focus:px-3 focus:py-2">
        {lang === "pt" ? "Pular para o conteúdo" : "Skip to content"}
      </a>

      <header className="sticky top-0 z-10 border-b border-nevoa/70 bg-papel/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 font-display text-sm">
          <a href="#top" className="font-semibold tracking-tight">
            Vinícius F. Kleis
          </a>
          <div className="flex items-center gap-5 text-muted">
            <a href="#projects" className="hidden hover:text-tinta md:inline">
              {c.nav.projects}
            </a>
            <a href="#work" className="hidden hover:text-tinta md:inline">
              {c.nav.work}
            </a>
            <a href="#cases" className="hidden hover:text-tinta md:inline">
              {c.nav.cases}
            </a>
            <a href="#experience" className="hidden hover:text-tinta md:inline">
              {c.nav.experience}
            </a>
            <a href="#contact" className="hover:text-tinta">
              {c.nav.contact}
            </a>
            <Link href={`/${other}`} hrefLang={other === "pt" ? "pt-BR" : "en"} className="rounded-full border border-nevoa px-3 py-1 hover:border-sinal hover:text-sinal">
              {c.switchLang}
            </Link>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-5">
        <section className="grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 font-display text-sm text-entregue">
              <span aria-hidden className="h-2 w-2 rounded-full bg-entregue" />
              {c.hero.available}
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.035em]">
              {c.hero.name}
            </h1>
            <p className="mt-6 max-w-xl font-display text-[clamp(1.25rem,2.4vw,1.6rem)] font-medium leading-snug tracking-tight">
              {c.hero.headline}
            </p>
            <p className="mt-5 max-w-xl text-muted">{c.hero.summary}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 font-display text-[0.95rem] font-medium">
              <a href={c.hero.cvHref} download className="rounded-lg bg-tinta px-5 py-3 text-papel transition-colors hover:bg-sinal">
                {c.hero.cv}
              </a>
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="underline decoration-nevoa decoration-2 underline-offset-4 hover:decoration-sinal">
                GitHub
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="underline decoration-nevoa decoration-2 underline-offset-4 hover:decoration-sinal">
                LinkedIn
              </a>
            </div>
          </div>
          <ChatDemo {...c.hero.chat} />
        </section>

        <Section id="projects" title={c.projects.title} subtitle={c.projects.subtitle}>
          <div className="grid gap-20">
            {c.projects.items.map((p) => (
              <ProjectCard key={p.name} project={p} repoLabel={c.projects.repoLabel} demoLabel={c.projects.demoLabel} />
            ))}
          </div>
        </Section>

        <Section id="work" title={c.work.title} subtitle={c.work.subtitle}>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {c.work.items.map((p) => (
              <article key={p.name} className="border-t-2 border-tinta pt-5">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-3">{p.what}</p>
                <h4 className="mt-5 font-display text-sm font-semibold">{c.work.roleLabel}</h4>
                <p className="mt-1 text-muted">{p.role}</p>
                <p className="mt-4 font-display text-sm text-muted">{p.stack.join(", ")}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="cases" title={c.cases.title} subtitle={c.cases.subtitle}>
          <div className="grid gap-16">
            {c.cases.items.map((cs) => (
              <article key={cs.title} className="grid gap-6 lg:grid-cols-[5fr_7fr] lg:gap-12">
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">{cs.title}</h3>
                  <p className="mt-3 text-muted">{cs.context}</p>
                  <p className="mt-4 font-display text-sm text-muted">{cs.tags.join(", ")}</p>
                </div>
                <ol className="relative grid gap-6 border-l border-nevoa pl-7">
                  {steps.map(({ key, dot }) => (
                    <li key={key} className="relative">
                      <span aria-hidden className={`absolute -left-[2.1rem] top-[0.55rem] h-3 w-3 rounded-full ${dot}`} />
                      <h4 className="font-display text-sm font-semibold">{c.cases.labels[key]}</h4>
                      <p className={key === "result" ? "mt-1 font-semibold" : "mt-1 text-muted"}>{cs[key]}</p>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </Section>

        <Section id="experience" title={c.experience.title}>
          <ol className="grid max-w-3xl gap-10 border-l border-nevoa pl-7">
            {c.experience.items.map((job, i) => (
              <li key={job.company} className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-[2.1rem] top-[0.45rem] h-3 w-3 rounded-full ${i === 0 ? "bg-sinal" : "border-2 border-nevoa bg-papel"}`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-display text-lg font-semibold">{job.role}</h3>
                  <span className="font-display text-sm text-muted">{job.period}</span>
                </div>
                <p className="font-display text-muted">{job.company}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-muted marker:text-nevoa">
                  {job.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="stack" title={c.stack.title}>
          <dl className="grid max-w-4xl gap-x-12 sm:grid-cols-2">
            {c.stack.groups.map(([k, v]) => (
              <div key={k} className="border-t border-nevoa py-4">
                <dt className="font-display font-semibold">{k}</dt>
                <dd className="mt-1 text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="contact" title={c.contact.title}>
          <p className="max-w-xl text-lg text-muted">{c.contact.text}</p>
          <a
            href={`mailto:${LINKS.email}`}
            className="mt-8 inline-block break-all font-display text-[clamp(1.4rem,4vw,2.5rem)] font-semibold tracking-tight underline decoration-sinal/40 decoration-[3px] underline-offset-[6px] hover:decoration-sinal"
          >
            {LINKS.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-display font-medium">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="underline decoration-nevoa decoration-2 underline-offset-4 hover:decoration-sinal">
              LinkedIn
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="underline decoration-nevoa decoration-2 underline-offset-4 hover:decoration-sinal">
              GitHub
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">{c.contact.location}</p>
        </Section>
      </main>

      <footer className="mt-8 border-t border-nevoa py-8 text-center font-display text-sm text-muted">
        © {new Date().getFullYear()} {c.hero.name}
      </footer>
    </>
  );
}
