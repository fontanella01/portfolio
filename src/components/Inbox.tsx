"use client";

import { useEffect, useState, type ReactNode } from "react";

export type Convo = {
  id: string;
  name: string;
  preview: string;
  avatar: ReactNode;
  // heading shown in the list above the first conversation of a group
  group?: string;
  subtitle: string;
  actions?: ReactNode;
  tone: string;
  body: ReactNode;
  // the intro chat brings its own scrolling area and question bar
  ownScroll?: boolean;
  // the map needs more room than a column of messages
  wide?: boolean;
  next?: { id: string; label: string }[];
};

// The whole site as a messaging app: a list of conversations on the left and the
// open one on the right. Links like #p-relay (from the chat, the map or the list)
// open the matching conversation; old section links are mapped through `aliases`.
export function Inbox({
  convos,
  aliases,
  listTitle,
  backLabel,
  listTop,
  listBottom,
}: {
  convos: Convo[];
  aliases: Record<string, string>;
  listTitle: string;
  backLabel: string;
  listTop: ReactNode;
  listBottom: ReactNode;
}) {
  const [active, setActive] = useState(convos[0].id);
  // phones show one screen at a time; the site opens on the first conversation
  const [view, setView] = useState<"list" | "pane">("pane");

  useEffect(() => {
    const fromHash = () => {
      const raw = window.location.hash.slice(1);
      const id = aliases[raw] ?? raw;
      if (convos.some((c) => c.id === id)) {
        setActive(id);
        setView("pane");
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [convos, aliases]);

  return (
    <div className="flex h-dvh overflow-hidden">
      <aside
        aria-label={listTitle}
        className={`tone-card w-full shrink-0 flex-col border-r border-nevoa bg-surface lg:flex lg:w-[22rem] ${view === "list" ? "flex" : "hidden"}`}
      >
        {listTop}
        <nav className="min-h-0 flex-1 overflow-y-auto px-2 pb-4">
          <ul>
            {convos.map((c, i) => {
              const on = c.id === active;
              const newGroup = c.group && c.group !== convos[i - 1]?.group;
              return (
                <li key={c.id}>
                  {newGroup && <p className="px-3 pb-1 pt-5 font-display text-sm font-semibold text-muted">{c.group}</p>}
                  <a
                    href={`#${c.id}`}
                    aria-current={on ? "page" : undefined}
                    onClick={() => setView("pane")}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors ${on ? "bg-sinal-soft" : "hover:bg-papel"}`}
                  >
                    {c.avatar}
                    <span className="min-w-0 flex-1 font-display">
                      <span className={`block truncate font-semibold ${on ? "text-sinal" : ""}`}>{c.name}</span>
                      <span className="block truncate text-sm text-muted">{c.preview}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        {listBottom}
      </aside>

      <main id="content" className={`min-w-0 flex-1 flex-col lg:flex ${view === "pane" ? "flex" : "hidden"}`}>
        {convos.map((c) => (
          <section key={c.id} hidden={c.id !== active} aria-label={c.name} className={`pane ${c.tone} h-full flex-col [&:not([hidden])]:flex`}>
            <header className="flex items-center gap-3 border-b border-nevoa bg-white/55 px-3 py-2.5 backdrop-blur sm:px-5">
              <button
                onClick={() => setView("list")}
                className="-ml-1 grid size-10 shrink-0 place-items-center rounded-full hover:bg-white lg:hidden"
                aria-label={backLabel}
              >
                <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              {c.avatar}
              <div className="min-w-0 flex-1 font-display leading-tight">
                <h2 className="truncate font-semibold">{c.name}</h2>
                <p className="truncate text-sm text-muted">{c.subtitle}</p>
              </div>
              {c.actions && <div className="hidden shrink-0 gap-2 font-display text-sm font-medium sm:flex">{c.actions}</div>}
            </header>

            {c.ownScroll ? (
              <div className="flex min-h-0 flex-1 flex-col">{c.body}</div>
            ) : (
              <>
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <div key={active === c.id ? "on" : "off"} className={`step-in mx-auto flex min-h-full flex-col justify-center gap-3 px-4 py-8 sm:px-8 ${c.wide ? "max-w-6xl" : "max-w-3xl"}`}>
                    {c.body}
                  </div>
                </div>
                {(c.next?.length || c.actions) && (
                  <footer className={`border-t border-nevoa bg-white/55 px-4 py-3 backdrop-blur ${c.next?.length ? "" : "sm:hidden"}`}>
                    <div className={`mx-auto flex flex-wrap gap-2 font-display text-[0.85rem] font-medium ${c.wide ? "max-w-6xl" : "max-w-3xl"}`}>
                      {/* on phones the header has no room for the buttons, so they sit here */}
                      {c.actions && <div className="flex flex-wrap gap-2 sm:hidden">{c.actions}</div>}
                      {c.next?.map((n) => (
                        <a key={n.id} href={`#${n.id}`} className="rounded-full border border-tinta/15 bg-white px-3.5 py-1.5 transition-colors hover:border-sinal hover:text-sinal">
                          {n.label}
                        </a>
                      ))}
                    </div>
                  </footer>
                )}
              </>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
