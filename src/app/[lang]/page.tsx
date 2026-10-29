import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { CONTENT, LINKS, isLang } from "@/content";
import { SITE_URL } from "@/site";
import { ChatExplorer } from "@/components/ChatExplorer";
import { Inbox, type Convo } from "@/components/Inbox";
import { HelpDeskPreview, RelayPreview, StorePreview } from "@/components/Previews";
import { SystemMap } from "@/components/SystemMap";

type Params = Promise<{ lang: string }>;

const PHOTO = "/vinicius.jpg";

// Avatar tints, one per kind of conversation (they match the pane backgrounds).
const TINT = { purple: "#c9c1ff", green: "#a9dcc8", mustard: "#f6dc93", ink: "#cdd6e3", pink: "#ffbfcd", sky: "#b9dafc" };

// Old section links (#projects, #stories…) still land on a conversation.
const ALIASES = { top: "intro", projects: "p-relay", stories: "story-1", work: "path" };

function Photo() {
  return <Image src={PHOTO} alt="" width={44} height={44} className="size-11 shrink-0 rounded-full object-cover object-top" />;
}

function Letter({ text, tint }: { text: string; tint: string }) {
  return (
    <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full font-display text-lg font-bold text-[#13233a]" style={{ background: tint }}>
      {text}
    </span>
  );
}

// A message from me. Long texts read in the serif, like a letter inside the chat.
function Bubble({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[88%] self-start rounded-2xl rounded-tl-md bg-bubble-in px-4 py-3 shadow-sm">{children}</div>;
}

// Something sent along with the messages: a preview, a card, a set of screens.
function Attachment({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`self-start rounded-2xl bg-white/80 p-3 shadow-sm ${className}`}>{children}</div>;
}

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

  // QR code for the business card, drawn at build time as inline SVG
  const qr = await QRCode.toString(LINKS.linkedin, { type: "svg", margin: 0, color: { dark: "#13233a", light: "#0000" } });

  const primary = "rounded-full bg-sinal px-4 py-2 text-white transition-colors hover:bg-tinta";
  const secondary = "rounded-full border border-tinta/20 bg-white px-4 py-2 transition-colors hover:border-sinal hover:text-sinal";

  const profile = (
    <div>
      <Image src={PHOTO} alt={c.hero.photoAlt} width={192} height={192} priority className="size-24 rounded-3xl object-cover object-top shadow-[0_14px_30px_-14px_rgb(19_35_58/0.55)]" />
      <h1 className="mt-6 font-display text-[clamp(2.9rem,7.5vw,5.4rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">{c.hero.name}</h1>
      <p className="mt-4 inline-block -rotate-1 rounded-lg bg-[#f6dc93] px-3 py-1 font-display text-xl font-bold text-[#13233a]">{c.hero.role}</p>
      <p className="mt-3 font-display text-sm text-muted">
        {c.contact.location}
        <span className="ml-3 inline-flex items-center gap-1.5 text-entregue">
          <span aria-hidden className="h-2 w-2 rounded-full bg-entregue" />
          {c.hero.available}
        </span>
      </p>
      <p className="mt-5 max-w-xl text-lg">{c.hero.intro}</p>
      <div className="mt-6 flex flex-wrap gap-2 font-display text-[0.95rem] font-medium">
        <a href={c.hero.cvHref} download className="rounded-full bg-tinta px-5 py-2.5 text-papel transition-colors hover:bg-sinal">
          {c.hero.cv}
        </a>
        <a href={LINKS.github} target="_blank" rel="noreferrer" className={secondary}>
          GitHub
        </a>
        <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className={secondary}>
          LinkedIn
        </a>
      </div>
    </div>
  );

  const projects: Convo[] = c.projects.items.map((p) => ({
    id: `p-${p.id}`,
    name: p.tab,
    preview: p.summary,
    avatar: <Letter text={p.tab[0]} tint={TINT.mustard} />,
    group: c.projects.title,
    subtitle: p.stack.slice(0, 4).join(", "),
    tone: "tone-mustard",
    actions: (
      <>
        {p.demo && (
          <a href={p.demo} target="_blank" rel="noreferrer" className={primary}>
            {c.projects.demoLabel}
          </a>
        )}
        <a href={p.repo} target="_blank" rel="noreferrer" className={secondary}>
          {c.projects.repoLabel}
        </a>
      </>
    ),
    body: (
      <>
        <Bubble>
          <p className="font-display text-lg font-semibold leading-snug">{p.name}</p>
          <p className="mt-1">{p.summary}</p>
        </Bubble>
        <Attachment className="w-full max-w-md">
          {p.id === "relay" ? (
            <RelayPreview t={c.previews.relay} label={p.name} />
          ) : p.id === "helpdesk" ? (
            <HelpDeskPreview t={c.previews.helpdesk} label={p.name} />
          ) : (
            <StorePreview t={c.previews.store} label={p.name} />
          )}
        </Attachment>
        <Bubble>
          <ul className="list-disc space-y-1 pl-5 marker:text-sinal">
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </Bubble>
        <Attachment>
          <ul aria-label={c.inbox.screens} className="grid grid-cols-3 gap-2">
            {p.images.map((img) => (
              <li key={img.src}>
                <a href={img.src} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl ring-1 ring-nevoa transition-shadow hover:ring-2 hover:ring-sinal">
                  <Image src={img.src} alt={img.alt} width={360} height={225} className="aspect-[16/10] w-full object-cover object-top" />
                </a>
              </li>
            ))}
          </ul>
        </Attachment>
        <Bubble>
          <ul className="list-disc space-y-1 pl-5 marker:text-sinal">
            {p.more.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="mt-2 font-display text-sm text-muted">{p.stack.join(", ")}</p>
        </Bubble>
      </>
    ),
  }));

  const stories: Convo[] = c.stories.items.map((st, i) => ({
    id: `story-${i + 1}`,
    name: st.title,
    preview: st.teaser,
    avatar: <Letter text={String(i + 1)} tint={TINT.pink} />,
    group: c.stories.title,
    subtitle: st.tags.join(", "),
    tone: "tone-pink",
    body: (
      <>
        <Bubble>
          <p className="font-display text-lg font-semibold leading-snug">{st.teaser}</p>
        </Bubble>
        <Attachment className="w-full max-w-lg">
          <dl className="grid grid-cols-2 gap-2 font-display">
            {[st.before, st.after].map((side, k) => (
              <div key={side.label} className={`rounded-xl p-3 ${k ? "bg-[#dff3ea]" : "bg-[#fff0f3]"}`}>
                <dt className="text-sm text-muted">{side.label}</dt>
                <dd className={`mt-0.5 leading-snug ${k ? "font-semibold text-[#0f7a5f]" : ""}`}>{side.value}</dd>
              </div>
            ))}
          </dl>
        </Attachment>
        {st.story.map((text) => (
          <Bubble key={text.slice(0, 40)}>{text}</Bubble>
        ))}
      </>
    ),
  }));

  const convos: Convo[] = [
    {
      id: "intro",
      name: c.chat.labels.me,
      preview: c.chat.intro[0],
      avatar: <Photo />,
      subtitle: c.hero.available,
      tone: "tone-purple",
      ownScroll: true,
      body: <ChatExplorer script={c.chat} top={profile} />,
    },
    {
      id: "map",
      name: c.nav.map,
      preview: c.map.subtitle,
      avatar: <Letter text={c.nav.map[0]} tint={TINT.green} />,
      subtitle: Object.values(c.map.nodes)
        .map((n) => n.label)
        .join(", "),
      tone: "tone-green",
      wide: true,
      body: (
        <>
          <Bubble>{c.map.subtitle}</Bubble>
          <div className="mt-2 w-full">
            <SystemMap nodes={c.map.nodes} hint={c.map.hint} didLabel={c.map.didLabel} />
          </div>
        </>
      ),
    },
    {
      id: "path",
      name: c.nav.path,
      preview: `${c.experience.items[0].role}, ${c.experience.items[0].company}`,
      avatar: <Letter text={c.nav.path[0]} tint={TINT.sky} />,
      subtitle: c.trajectory.subtitle,
      tone: "tone-sky",
      body: (
        <>
          <Bubble>{c.trajectory.subtitle}</Bubble>
          {c.experience.items.map((job, i) => (
            <div key={job.company} className="contents">
              <p className="mt-4 self-center rounded-full bg-white/70 px-3 py-1 font-display text-sm text-muted">{job.period}</p>
              <Bubble>
                <p className="font-display text-lg font-semibold leading-snug">{job.role}</p>
                <p className="font-display text-muted">{job.company}</p>
                <p className="mt-2">{job.summary}</p>
              </Bubble>
              {i === 0 && (
                <Attachment className="w-full">
                  <p className="px-1 pb-2 font-display text-sm font-semibold">{c.trajectory.productsLabel}</p>
                  <dl className="grid gap-2 sm:grid-cols-2">
                    {c.work.items.map((p) => (
                      <div key={p.name} className="rounded-xl bg-[#f3f5f9] p-3">
                        <dt className="font-display font-semibold">{p.name}</dt>
                        <dd className="mt-0.5 text-[0.95rem]">{p.what}</dd>
                        <dd className="mt-1 text-[0.95rem] text-muted">{p.role}</dd>
                      </div>
                    ))}
                  </dl>
                </Attachment>
              )}
            </div>
          ))}
        </>
      ),
    },
    ...projects,
    ...stories,
    {
      id: "contact",
      name: c.closing.title,
      group: c.nav.contact,
      preview: c.closing.text,
      avatar: <Photo />,
      subtitle: c.contact.location,
      tone: "tone-ink",
      actions: (
        <>
          <a href={`mailto:${LINKS.email}`} className={primary}>
            {c.closing.email}
          </a>
          <a href={c.hero.cvHref} download className={secondary}>
            {c.closing.cvLabel}
          </a>
        </>
      ),
      body: (
        <>
          <Bubble>{c.closing.text}</Bubble>
          <div className="tone-card mt-2 w-full max-w-lg self-start rounded-[1.75rem] bg-surface p-6 shadow-[10px_10px_0_#f6dc93] sm:p-7">
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0">
                <Image src={PHOTO} alt="" width={72} height={72} className="size-16 rounded-2xl object-cover object-top" />
                <p className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight">{c.hero.name}</p>
                <p className="font-display font-semibold text-[#4c3bff]">{c.hero.role}</p>
                <p className="mt-1 text-sm text-muted">{c.contact.location}</p>
              </div>
              <figure className="shrink-0 text-center">
                <div className="size-24 rounded-xl bg-white p-2 ring-1 ring-nevoa sm:size-28" dangerouslySetInnerHTML={{ __html: qr }} />
                <figcaption className="mt-2 max-w-[7rem] font-display text-[0.7rem] leading-tight text-muted">{c.closing.qr}</figcaption>
              </figure>
            </div>
            <ul className="mt-5 space-y-1.5 border-t border-dashed border-nevoa pt-4 font-display text-[0.95rem]">
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
        </>
      ),
    },
  ];

  // each conversation offers the following one, so the list can be read in order
  convos.forEach((cv, i) => {
    const nxt = convos[i + 1];
    if (nxt && !cv.ownScroll) cv.next = [{ id: nxt.id, label: `${c.inbox.next}: ${nxt.name}` }];
  });

  const listTop = (
    <div className="flex items-center justify-between gap-3 px-5 pb-2 pt-5">
      <p className="font-display text-2xl font-bold tracking-tight">{c.inbox.title}</p>
      <Link href={`/${other}`} hrefLang={other === "pt" ? "pt-BR" : "en"} className="rounded-full border border-nevoa px-3 py-1 font-display text-sm text-muted hover:border-sinal hover:text-sinal">
        {c.switchLang}
      </Link>
    </div>
  );

  const listBottom = (
    <div className="flex gap-4 border-t border-nevoa px-5 py-3 font-display text-sm text-muted">
      <a href={LINKS.github} target="_blank" rel="noreferrer" className="hover:text-sinal">
        GitHub
      </a>
      <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-sinal">
        LinkedIn
      </a>
      <a href={`mailto:${LINKS.email}`} className="hover:text-sinal">
        E-mail
      </a>
    </div>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-20 focus:rounded focus:bg-surface focus:px-3 focus:py-2">
        {lang === "pt" ? "Pular para o conteúdo" : "Skip to content"}
      </a>
      <Inbox convos={convos} aliases={ALIASES} listTitle={c.inbox.title} backLabel={c.inbox.back} listTop={listTop} listBottom={listBottom} />
    </>
  );
}
