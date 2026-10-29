import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTENT, LINKS, isLang } from "@/content";
import { SITE_URL } from "@/site";
import { ChatExplorer } from "@/components/ChatExplorer";
import { ProjectTabs } from "@/components/ProjectTabs";
import { SystemMap } from "@/components/SystemMap";
import { Sidebar } from "@/components/Sidebar";
import QRCode from "qrcode";
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

  // QR code for the business card, drawn at build time as inline SVG
  const qr = await QRCode.toString(LINKS.linkedin, { type: "svg", margin: 0, color: { dark: "#13233a", light: "#0000" } });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />

      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-20 focus:rounded focus:bg-surface focus:px-3 focus:py-2">
        {lang === "pt" ? "Pular para o conteúdo" : "Skip to content"}
      </a>

      <header className="sticky top-0 z-10 border-b border-nevoa/70 bg-papel/85 backdrop-blur lg:hidden">
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

      <Sidebar
        items={[
          { id: "map", label: c.nav.map },
          { id: "projects", label: c.nav.projects },
          { id: "path", label: c.nav.path },
          { id: "stories", label: c.nav.stories },
          { id: "contact", label: c.nav.contact },
        ]}
        name={c.hero.name}
        role={c.hero.role}
        photo={PHOTO}
        available={c.hero.available}
        switchHref={`/${other}`}
        switchLabel={c.switchLang}
        switchLang={other === "pt" ? "pt-BR" : "en"}
        links={LINKS}
        navLabel={lang === "pt" ? "Seções" : "Sections"}
      />

      <div className="lg:pl-64">
      <main id="top">
        <section id="intro" className="tone-purple relative overflow-hidden">
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Image
              src={PHOTO}
              alt={c.hero.photoAlt}
              width={160}
              height={160}
              priority
              className="size-28 rotate-[-4deg] rounded-[2rem] border-4 border-white object-cover lg:hidden object-top shadow-[0_12px_30px_-12px_rgb(19_35_58/0.5)] sm:size-32"
            />
            <p className="mt-6 inline-flex items-center gap-2 font-display text-sm text-entregue lg:hidden">
              <span aria-hidden className="h-2 w-2 rounded-full bg-entregue" />
              {c.hero.available}
            </p>
            <h1 className="mt-3 font-display lg:mt-0 text-[clamp(3rem,8vw,6.2rem)] font-extrabold leading-[0.88] tracking-[-0.045em]">{c.hero.name}</h1>
            <p className="mt-4 inline-block -rotate-1 rounded-lg bg-[#f6dc93] px-3 py-1 font-display text-xl font-bold text-[#13233a]">{c.hero.role}</p>
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
          </div>
        </section>

        <Section id="map" title={c.map.title} subtitle={c.map.subtitle} tone="green">
          <SystemMap nodes={c.map.nodes} hint={c.map.hint} didLabel={c.map.didLabel} />
        </Section>

        <Section id="projects" title={c.projects.title} subtitle={c.projects.subtitle} tone="mustard">
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
                  {job.role}
                  <span className="block text-xl font-normal text-muted">{job.company}</span>
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

        <Section id="stories" title={c.stories.title} subtitle={c.stories.subtitle} tone="pink">
          <div className="max-w-4xl divide-y divide-[rgb(19_35_58/0.14)] border-y border-[rgb(19_35_58/0.14)]">
            {c.stories.items.map((st) => (
              <article key={st.title} className="grid gap-x-10 gap-y-4 py-9 md:grid-cols-[1fr_1.1fr]">
                <div>
                  <h3 className="font-display text-2xl font-bold leading-tight tracking-tight">{st.title}</h3>
                  <p className="mt-2 text-muted">{st.teaser}</p>
                </div>
                <dl className="grid grid-cols-2 gap-4 font-display">
                  {[st.before, st.after].map((side, i) => (
                    <div key={side.label} className={`rounded-2xl p-4 ${i ? "bg-white" : "bg-white/45"}`}>
                      <dt className="text-sm text-muted">{side.label}</dt>
                      <dd className={`mt-1 leading-snug ${i ? "font-semibold text-[#0f7a5f]" : ""}`}>{side.value}</dd>
                    </div>
                  ))}
                </dl>
                <details className="group md:col-start-2">
                  <summary className="cursor-pointer list-none font-display text-sm font-bold text-sinal hover:underline">
                    <span className="inline-block transition-transform group-open:rotate-90" aria-hidden>
                      ›
                    </span>{" "}
                    {c.stories.readLabel}
                  </summary>
                  <div className="mt-3 space-y-3 text-[0.98rem]">
                    {st.story.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                    <p className="font-display text-sm text-muted">{st.tags.join(", ")}</p>
                  </div>
                </details>
              </article>
            ))}
          </div>
        </Section>

        {/* the page ends with a business card */}
        <section id="contact" aria-labelledby="contact-title" className="tone-ink relative scroll-mt-16 overflow-hidden">
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:py-28 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 id="contact-title" className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                {c.closing.title}
              </h2>
              <p className="mt-5 max-w-md text-lg text-muted">{c.closing.text}</p>
              <div className="mt-8 flex flex-wrap gap-3 font-display font-semibold">
                <a href={`mailto:${LINKS.email}`} className="rounded-full bg-sinal px-6 py-3 text-white transition-transform hover:-translate-y-0.5">
                  {c.closing.email}
                </a>
                <a href={c.hero.cvHref} download className="rounded-full border-2 border-tinta/20 px-6 py-3 hover:border-sinal hover:text-sinal">
                  {c.closing.cvLabel}
                </a>
              </div>
            </div>

            <div className="tone-card relative mx-auto w-full max-w-lg rotate-[-2.5deg] rounded-[1.75rem] bg-surface p-7 shadow-[12px_12px_0_#f6dc93] transition-transform hover:rotate-0 sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <Image src={PHOTO} alt="" width={72} height={72} className="size-16 rounded-2xl object-cover object-top" />
                  <p className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight">{c.hero.name}</p>
                  <p className="font-display font-semibold text-[#4c3bff]">{c.hero.role}</p>
                  <p className="mt-1 text-sm text-muted">{c.contact.location}</p>
                </div>
                <figure className="shrink-0 text-center">
                  <div className="size-28 rounded-xl bg-white p-2 ring-1 ring-nevoa sm:size-32" dangerouslySetInnerHTML={{ __html: qr }} />
                  <figcaption className="mt-2 max-w-[8rem] font-display text-[0.7rem] leading-tight text-muted">{c.closing.qr}</figcaption>
                </figure>
              </div>
              <ul className="mt-6 space-y-1.5 border-t border-dashed border-nevoa pt-5 font-display text-[0.95rem]">
                <li>
                  <a href={`mailto:${LINKS.email}`} className="break-all hover:text-[#4c3bff]">
                    {LINKS.email}
                  </a>
                </li>
                <li>
                  <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#4c3bff]">
                    linkedin.com/in/vinicius-fontanella
                  </a>
                </li>
                <li>
                  <a href={LINKS.github} target="_blank" rel="noreferrer" className="hover:text-[#4c3bff]">
                    github.com/fontanella01
                  </a>
                </li>
                <li className="text-muted">{c.closing.site}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="tone-ink border-t border-nevoa py-8 text-center font-display text-sm text-muted">
        © {new Date().getFullYear()} {c.hero.name}
      </footer>
      </div>
    </>
  );
}
