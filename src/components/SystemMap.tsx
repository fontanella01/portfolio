"use client";

import { useState } from "react";
import { NODE_IDS, type MapNode, type NodeId } from "@/content";

// Positions on a 1000 x 440 canvas, laid out the way a message travels:
// in from WhatsApp or a payment, through the webhook, to the queue, the AI,
// the database and finally the team's screen.
const POS: Record<NodeId, [number, number]> = {
  whatsapp: [110, 110],
  payments: [110, 330],
  webhook: [340, 220],
  queue: [590, 110],
  database: [590, 330],
  ai: [880, 110],
  panel: [880, 330],
};

const EDGES: { id: string; from: NodeId; to: NodeId; d?: string; dur: number }[] = [
  { id: "e1", from: "whatsapp", to: "webhook", dur: 2.4 },
  { id: "e2", from: "payments", to: "webhook", dur: 3.1 },
  { id: "e3", from: "webhook", to: "queue", dur: 2.2 },
  { id: "e4", from: "webhook", to: "database", dur: 2.8 },
  { id: "e5", from: "queue", to: "ai", dur: 2 },
  { id: "e6", from: "ai", to: "database", dur: 2.6 },
  { id: "e7", from: "database", to: "panel", dur: 2.3 },
  // the AI's reply going back to the customer, arching over the top
  { id: "e8", from: "ai", to: "whatsapp", d: "M880,110 C840,-20 150,-20 110,110", dur: 3.6 },
];

const path = (e: (typeof EDGES)[number]) => e.d ?? `M${POS[e.from][0]},${POS[e.from][1]} L${POS[e.to][0]},${POS[e.to][1]}`;

export function SystemMap({ nodes, hint, didLabel }: { nodes: Record<NodeId, MapNode>; hint: string; didLabel: string }) {
  const [selected, setSelected] = useState<NodeId>("ai");
  const node = nodes[selected];
  const touches = (e: (typeof EDGES)[number]) => e.from === selected || e.to === selected;

  const nodeButton = (id: NodeId, extra = "") => {
    const active = id === selected;
    return (
      <button
        key={id}
        type="button"
        aria-pressed={active}
        onClick={() => setSelected(id)}
        className={`rounded-2xl border px-4 py-3 text-left font-display leading-tight transition-colors ${
          active ? "border-sinal bg-sinal text-white shadow-[0_0_0_6px_rgb(76_59_255/0.25)]" : "border-band-line bg-white/80 text-band-text hover:border-sinal"
        } ${extra}`}
      >
        <span className="block text-[0.95rem] font-semibold">{nodes[id].label}</span>
        <span className={`block text-xs ${active ? "text-white/80" : "text-band-muted"}`}>{nodes[id].sub}</span>
      </button>
    );
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-center">
      {/* desktop: the diagram */}
      <div className="relative hidden aspect-[1000/440] md:block">
        <svg viewBox="0 0 1000 440" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          {EDGES.map((e) => (
            <g key={e.id}>
              <path id={e.id} d={path(e)} fill="none" stroke="var(--band-line)" strokeWidth={2} />
              <path
                d={path(e)}
                fill="none"
                className="map-flow"
                stroke={touches(e) ? "var(--sinal)" : "var(--band-muted)"}
                strokeOpacity={touches(e) ? 1 : 0.75}
                strokeWidth={touches(e) ? 3.5 : 2.5}
                strokeLinecap="round"
              />
              {/* a "message" travelling along the connection */}
              <circle r={touches(e) ? 6 : 4} className="map-packet" fill={touches(e) ? "var(--entregue)" : "var(--band-text)"} opacity={touches(e) ? 1 : 0.6}>
                <animateMotion dur={`${e.dur}s`} repeatCount="indefinite">
                  <mpath href={`#${e.id}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
        </svg>
        {NODE_IDS.map((id) => (
          <div key={id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${POS[id][0] / 10}%`, top: `${(POS[id][1] / 440) * 100}%` }}>
            {nodeButton(id, "w-[8.75rem]")}
          </div>
        ))}
      </div>

      {/* phones: the same pieces as a grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden">{NODE_IDS.map((id) => nodeButton(id))}</div>

      <article aria-live="polite" className="rounded-3xl border border-band-line bg-white/75 p-6 sm:p-7">
        <p className="font-display text-sm text-band-muted">{hint}</p>
        <h3 key={selected} className="step-in mt-2 font-display text-3xl font-bold tracking-tight">
          {node.label}
        </h3>
        <p key={`${selected}-w`} className="step-in mt-3 text-band-text">
          {node.what}
        </p>
        <h4 className="mt-5 font-display text-sm font-semibold text-entregue">{didLabel}</h4>
        <ul key={`${selected}-d`} className="step-in mt-2 space-y-2 text-band-muted">
          {node.did.map((d) => (
            <li key={d} className="flex gap-2">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-entregue" />
              {d}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {node.links.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              className="rounded-full border border-sinal/60 px-3.5 py-1.5 font-display text-sm font-medium text-band-text hover:bg-sinal hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
      </article>
    </div>
  );
}
