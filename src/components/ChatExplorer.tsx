"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ChatLink, ChatScript } from "@/content";

type NewEntry = { from: "me" | "visitor"; text: string } | { from: "links"; links: ChatLink[] };
type Entry = NewEntry & { id: number };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MAX_OPTIONS = 4;

// Questions on offer: what the last answer opened up comes first, so the
// conversation follows its thread; then the starting ones and anything unlocked
// earlier. Already asked questions drop out, and a few are shown at a time.
function available(script: ChatScript, asked: string[]) {
  const last = asked[asked.length - 1];
  const pool = [...(last ? (script.topics[last].next ?? []) : []), ...script.start, ...asked.flatMap((id) => script.topics[id].next ?? [])];
  return [...new Set(pool)].filter((id) => !asked.includes(id)).slice(0, MAX_OPTIONS);
}

// The presentation as a conversation: the visitor picks a question, I answer in
// short messages, and new questions open up from each answer. `top` is the
// profile shown above the first messages.
export function ChatExplorer({ script, top }: { script: ChatScript; top: ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [asked, setAsked] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const run = useRef(0); // bumps on restart, so an answer in progress stops writing

  useEffect(() => {
    // follow the conversation once it starts; before that the profile stays in view
    if (entries.length) scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [entries.length, typing]);

  const add = (e: NewEntry) => setEntries((list) => [...list, { ...e, id: nextId.current++ }]);

  const ask = async (id: string) => {
    if (typing) return;
    const topic = script.topics[id];
    const myRun = run.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAsked((a) => [...a, id]);
    add({ from: "visitor", text: topic.q });
    setTyping(true);
    for (const text of topic.a) {
      // a pause that grows with the message, like someone typing it
      if (!reduced) await wait(Math.min(1400, 450 + text.length * 9));
      if (run.current !== myRun) return;
      add({ from: "me", text });
    }
    if (topic.links?.length) add({ from: "links", links: topic.links });
    setTyping(false);
  };

  const restart = () => {
    run.current++;
    setEntries([]);
    setAsked([]);
    setTyping(false);
  };

  const options = available(script, asked);

  return (
    <>
      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
          {top}
          <ol aria-live="polite" aria-label={script.labels.pick} className="mt-8 flex flex-col gap-2.5 font-display text-[0.97rem] leading-snug">
            {script.intro.map((text, i) => (
              <li key={`intro-${i}`} style={{ "--d": `${0.5 + i * 0.7}s` } as React.CSSProperties} className="chat-item max-w-[85%] self-start rounded-2xl rounded-tl-md bg-bubble-in px-4 py-2.5 shadow-sm">
                {text}
              </li>
            ))}
            {entries.map((e) =>
              e.from === "links" ? (
                <li key={e.id} style={{ "--d": "0s" } as React.CSSProperties} className="chat-item flex flex-wrap gap-2 self-start">
                  {e.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="rounded-full border border-sinal/40 bg-sinal-soft px-3 py-1.5 text-[0.85rem] font-medium text-sinal hover:border-sinal"
                    >
                      {l.label}
                    </a>
                  ))}
                </li>
              ) : (
                <li
                  key={e.id}
                  style={{ "--d": "0s" } as React.CSSProperties}
                  className={`chat-item max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    e.from === "visitor" ? "self-end rounded-tr-md bg-bubble-out" : "self-start rounded-tl-md bg-bubble-in shadow-sm"
                  }`}
                >
                  {e.text}
                </li>
              ),
            )}
            {typing && (
              <li aria-label={script.labels.typing} className="chat-typing-live flex w-fit gap-1 self-start rounded-2xl rounded-tl-md bg-bubble-in px-4 py-3 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted" />
              </li>
            )}
          </ol>
        </div>
      </div>

      <footer className="border-t border-nevoa bg-white/55 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 font-display text-[0.85rem] font-medium">
          {options.length ? (
            options.map((id) => (
              <button
                key={id}
                onClick={() => ask(id)}
                disabled={typing}
                className="rounded-full border border-tinta/15 bg-white px-3.5 py-1.5 text-left transition-colors hover:border-sinal hover:text-sinal disabled:opacity-50"
              >
                {script.topics[id].q}
              </button>
            ))
          ) : (
            <p className="text-muted">{script.labels.done}</p>
          )}
          {asked.length > 0 && (
            <button onClick={restart} className="ml-auto text-muted underline decoration-nevoa underline-offset-4 hover:text-sinal">
              {script.labels.restart}
            </button>
          )}
        </div>
      </footer>
    </>
  );
}
