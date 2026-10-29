"use client";

import { useEffect, useState } from "react";
import type { CONTENT, Previews, ProjectId } from "@/content";
import { HelpDeskPreview, RelayPreview, StorePreview } from "./Previews";

type Project = (typeof CONTENT)["pt"]["projects"]["items"][number];
type Labels = { repoLabel: string; demoLabel: string; moreLabel: string };

// One project at a time, with a small animated scene of it working. Links like
// #p-helpdesk (from the chat or the map) open the matching tab.
export function ProjectTabs({ projects, labels, previews }: { projects: Project[]; labels: Labels; previews: Previews }) {
  const [active, setActive] = useState<ProjectId>(projects[0].id);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#p-", "") as ProjectId;
      if (projects.some((p) => p.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [projects]);

  const p = projects.find((x) => x.id === active)!;
  const preview =
    p.id === "relay" ? (
      <RelayPreview t={previews.relay} label={p.name} />
    ) : p.id === "helpdesk" ? (
      <HelpDeskPreview t={previews.helpdesk} label={p.name} />
    ) : (
      <StorePreview t={previews.store} label={p.name} />
    );

  return (
    <div>
      {/* targets for links from the chat and the map */}
      {projects.map((x) => (
        <span key={x.id} id={`p-${x.id}`} className="block scroll-mt-24" aria-hidden />
      ))}

      <div role="tablist" aria-label="Projects" className="inline-flex flex-wrap gap-1 rounded-2xl border border-nevoa bg-surface p-1.5 font-display">
        {projects.map((x) => (
          <button
            key={x.id}
            role="tab"
            id={`tab-${x.id}`}
            aria-selected={x.id === active}
            aria-controls="project-panel"
            onClick={() => setActive(x.id)}
            className={`rounded-xl px-5 py-2.5 text-[0.95rem] font-semibold transition-colors ${x.id === active ? "bg-tinta text-papel" : "text-muted hover:text-tinta"}`}
          >
            {x.tab}
          </button>
        ))}
      </div>

      <div id="project-panel" role="tabpanel" aria-labelledby={`tab-${p.id}`} key={p.id} className="step-in mt-10 grid items-center gap-12 lg:grid-cols-2">
        {preview}
        <div>
          <h3 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-tight tracking-tight">{p.name}</h3>
          <p className="mt-4 text-lg">{p.summary}</p>
          <ul className="mt-5 space-y-2 border-l-2 border-sinal/40 pl-5 text-muted">
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <details className="group mt-5">
            <summary className="cursor-pointer list-none font-display text-sm font-medium text-sinal hover:underline">
              <span className="inline-block transition-transform group-open:rotate-90" aria-hidden>
                ›
              </span>{" "}
              {labels.moreLabel}
            </summary>
            <ul className="mt-3 space-y-2 text-[0.98rem] text-muted">
              {p.more.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <p className="mt-3 font-display text-sm text-muted">{p.stack.join(", ")}</p>
          </details>
          <div className="mt-8 flex flex-wrap gap-3 font-display text-sm font-medium">
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noreferrer" className="rounded-lg bg-sinal px-5 py-3 text-white transition-colors hover:bg-tinta">
                {labels.demoLabel}
              </a>
            )}
            <a href={p.repo} target="_blank" rel="noreferrer" className="rounded-lg border border-tinta/25 px-5 py-3 transition-colors hover:border-sinal hover:text-sinal">
              {labels.repoLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
