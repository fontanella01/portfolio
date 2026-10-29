import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTENT, LINKS, isLang } from "@/content";
import { SITE_URL } from "@/site";
import { ChatExplorer } from "@/components/ChatExplorer";
import { ProjectTabs } from "@/components/ProjectTabs";
import { SystemMap } from "@/components/SystemMap";
import { Section } from "@/components/Section";

type Params = Promise<{ lang: string }>;

const PHOTO = "/vinicius.jpg";

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
    image: `${SITE_URL}${PHOTO}`,
    email: `mailto:${LINKS.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Joinville", addressRegion: "SC", addressCountry: "BR" },
    sameAs: [LINKS.github, LINKS.linkedin],
  };

  const link = "underline decoration-nevoa decoration-2 underline-offset-4 hover:decoration-sinal";

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
            {(
              [
                ["#map", c.nav.map],
                ["#projects", c.nav.projects],
                ["#path", c.nav.path],
                ["#stories", c.nav.stories],
              ] as const
            ).map(([href, label]) => (
              <a key={href} href={href} className="hidden hover:text-tinta md:inline">
                {label}
              </a>
            ))}
            <a href="#contact" className="hover:text-tinta">
              {c.nav.contact}
            </a>
            <Link href={`/${other}`} hrefLang={other === "pt" ? "pt-BR" : "en"} className="rounded-full border border-nevoa px-3 py-1 hover:border-sinal hover:text-sinal">
              {c.switchLang}
            </Link>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Image
              src={PHOTO}
              alt={c.hero.photoAlt}
              width={160}
              height={160}
              priority
              className="size-28 rounded-[2rem] border-4 border-surface object-cover object-top shadow-[0_12px_30px_-12px_rgb(19_35_58/0.5)] sm:size-32"
            />
            <p className="mt-6 inline-flex items-center gap-2 font-display text-sm text-entregue">
              <span aria-hidden className="h-2 w-2 rounded-full bg-entregue" />
              {c.hero.available}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-bold leading-[0.95] tracking-[-0.035em]">{c.hero.name}</h1>
            <p className="mt-3 font-display text-xl font-medium text-sinal">{c.hero.role}</p>
            <p className="mt-5 max-w-lg text-lg">{c.hero.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-display text-[0.95rem] font-medium">
              <a href={c.hero.cvHref} download className="rounded-lg bg-tinta px-5 py-3 text-papel transition-colors hover:bg-sinal">
                {c.hero.cv}
              </a>
              <a href={LINKS.github} target="_blank" rel="noreferrer" className={link}>
                GitHub
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className={link}>
                LinkedIn
              </a>
            </div>
          </div>
          <ChatExplorer script={c.chat} photo={PHOTO} name={c.chat.labels.me} />
        </section>

        <Section id="map" title={c.map.title} subtitle={c.map.subtitle} tone="dark">
          <SystemMap nodes={c.map.nodes} hint={c.map.hint} didLabel={c.map.didLabel} />
        </Section>

        <Section id="projects" title={c.projects.title} subtitle={c.projects.subtitle} divider={false}>
          <ProjectTabs projects={c.projects.items} labels={c.projects} previews={c.previews} />
        </Section>

        <Section id="path" title={c.trajectory.title} subtitle={c.trajectory.subtitle}>
          <ol className="grid max-w-4xl gap-10 border-l-2 border-nevoa pl-8">
            {c.experience.items.map((job, i) => (
              <li key={job.company} className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-[2.55rem] top-2 h-4 w-4 rounded-full ${i === 0 ? "bg-sinal ring-4 ring-sinal-soft" : "border-2 border-nevoa bg-papel"}`}
                />
                <p className="font-display text-sm text-muted">{job.period}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">
                  {job.role} <span className="font-normal text-muted">· {job.company}</span>
                </h3>
                <p className="mt-2 max-w-2xl text-muted">{job.summary}</p>
                {i === 0 && (
                  <div className="mt-6">
                    <p className="font-display text-sm font-semibold">{c.trajectory.productsLabel}</p>
                    <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                      {c.work.items.map((p) => (
                        <div key={p.name} className="rounded-2xl border border-nevoa bg-surface p-4">
                          <dt className="font-display font-semibold">{p.name}</dt>
                          <dd className="mt-1 text-[0.95rem]">{p.what}</dd>
                          <dd className="mt-1 text-[0.95rem] text-muted">{p.role}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="stories" title={c.stories.title} subtitle={c.stories.subtitle} tone="dark">
          <div className="grid gap-4 lg:grid-cols-3 lg:items-start">
            {c.stories.items.map((s) => (
              <details key={s.title} className="group rounded-3xl border border-band-line bg-white/[0.04] p-6 open:bg-white/[0.07] lg:open:col-span-3">
                <summary className="cursor-pointer list-none">
                  <span className="flex items-start justify-between gap-4">
                    <span>
                      <span className="block font-display text-2xl font-semibold leading-tight tracking-tight">{s.title}</span>
                      <span className="mt-2 block text-band-muted">{s.teaser}</span>
                    </span>
                    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-band-line font-display text-xl text-entregue transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                  <span className="sr-only">{c.stories.readLabel}</span>
                </summary>
                <div className="mt-5 max-w-3xl space-y-3 border-t border-band-line pt-5">
                  {s.story.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                  <p className="font-display text-sm text-band-muted">{s.tags.join(", ")}</p>
                </div>
              </details>
            ))}
          </div>
        </Section>

        {/* the page ends the way it started: as a conversation */}
        <section id="contact" aria-label={c.contact.title} className="mx-auto max-w-6xl scroll-mt-16 px-5 py-20 sm:py-28">
          <div className="flex max-w-2xl flex-col gap-3">
            <Image src={PHOTO} alt="" width={56} height={56} className="size-14 rounded-full object-cover object-top" />
            {c.closing.lines.map((line, i) => (
              <p
                key={line}
                className={`w-fit rounded-3xl rounded-tl-md bg-surface px-5 py-3.5 shadow-sm ${i === 0 ? "font-display text-[clamp(1.5rem,3.5vw,2.4rem)] font-bold leading-tight tracking-tight" : "text-lg"}`}
              >
                {line}
              </p>
            ))}
            <div className="mt-4 flex flex-wrap gap-3 font-display font-medium">
              <a href={`mailto:${LINKS.email}`} className="rounded-full bg-sinal px-5 py-3 text-white transition-colors hover:bg-tinta">
                {c.closing.email}
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-tinta/25 px-5 py-3 hover:border-sinal hover:text-sinal">
                LinkedIn
              </a>
              <a href={c.hero.cvHref} download className="rounded-full border border-tinta/25 px-5 py-3 hover:border-sinal hover:text-sinal">
                {c.closing.cvLabel}
              </a>
            </div>
            <p className="mt-3 font-display text-sm text-muted">
              {LINKS.email} · {c.contact.location}
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-8 border-t border-nevoa py-8 text-center font-display text-sm text-muted">
        © {new Date().getFullYear()} {c.hero.name}
      </footer>
    </>
  );
}
