import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTENT, LINKS, isLang } from "@/content";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";

type Params = Promise<{ lang: string }>;

export default async function Home({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = CONTENT[lang];
  const other = lang === "pt" ? "en" : "pt";

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 text-sm">
          <a href="#top" className="font-semibold">
            Vinícius F. Kleis
          </a>
          <div className="flex items-center gap-4 text-muted">
            <a href="#projects" className="hidden hover:text-foreground sm:inline">
              {c.nav.projects}
            </a>
            <a href="#cases" className="hidden hover:text-foreground sm:inline">
              {c.nav.cases}
            </a>
            <a href="#experience" className="hidden hover:text-foreground sm:inline">
              {c.nav.experience}
            </a>
            <a href="#contact" className="hover:text-foreground">
              {c.nav.contact}
            </a>
            <Link href={`/${other}`} className="rounded-full border border-border px-3 py-1 hover:text-foreground">
              {c.switchLang}
            </Link>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-4">
        <section className="py-20 sm:py-28">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {c.hero.available}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{c.hero.greeting}</h1>
          <p className="mt-2 text-2xl text-muted sm:text-3xl">{c.hero.role}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{c.hero.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={c.hero.cvHref}
              className="rounded-lg bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90"
              download
            >
              {c.hero.cv}
            </a>
            <a href={LINKS.github} className="rounded-lg border border-border px-5 py-2.5 hover:bg-surface" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={LINKS.linkedin} className="rounded-lg border border-border px-5 py-2.5 hover:bg-surface" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </section>

        <Section id="projects" title={c.projects.title} subtitle={c.projects.subtitle}>
          <div className="grid gap-8">
            {c.projects.items.map((p) => (
              <ProjectCard key={p.name} project={p} repoLabel={c.projects.repoLabel} demoLabel={c.projects.demoLabel} />
            ))}
            <p className="rounded-xl border border-dashed border-border p-5 text-muted">{c.projects.soon}</p>
          </div>
        </Section>

        <Section id="cases" title={c.cases.title} subtitle={c.cases.subtitle}>
          <div className="grid gap-6 md:grid-cols-3">
            {c.cases.items.map((cs) => (
              <article key={cs.title} className="flex flex-col rounded-xl border border-border bg-surface p-5">
                <h3 className="text-lg font-semibold">{cs.title}</h3>
                <p className="mt-2 text-sm text-muted">{cs.context}</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="font-medium">{c.cases.labels.problem}</dt>
                    <dd className="text-muted">{cs.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">{c.cases.labels.solution}</dt>
                    <dd className="text-muted">{cs.solution}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">{c.cases.labels.result}</dt>
                    <dd className="text-muted">{cs.result}</dd>
                  </div>
                </dl>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {cs.tags.map((t) => (
                    <li key={t} className="rounded bg-accent-soft px-2 py-0.5 text-xs text-accent">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="experience" title={c.experience.title}>
          <ol className="space-y-8 border-l border-border pl-6">
            {c.experience.items.map((job) => (
              <li key={job.company} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">
                    {job.role} <span className="font-normal text-muted">· {job.company}</span>
                  </h3>
                  <span className="text-sm text-muted">{job.period}</span>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                  {job.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="stack" title={c.stack.title}>
          <dl className="grid gap-4 sm:grid-cols-2">
            {c.stack.groups.map(([k, v]) => (
              <div key={k} className="rounded-xl border border-border bg-surface p-4">
                <dt className="text-sm font-medium">{k}</dt>
                <dd className="mt-1 text-sm text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="contact" title={c.contact.title}>
          <p className="text-lg text-muted">{c.contact.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${LINKS.email}`} className="rounded-lg bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90">
              {LINKS.email}
            </a>
            <a href={LINKS.linkedin} className="rounded-lg border border-border px-5 py-2.5 hover:bg-surface" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">{c.contact.location}</p>
        </Section>
      </main>

      <footer className="mt-16 border-t border-border py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} Vinícius Fontanella Kleis
      </footer>
    </>
  );
}
