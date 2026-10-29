"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Previews } from "@/content";

// Plays a short scene in a loop while it is on screen. Before that (and for
// people who prefer reduced motion) it shows the last step, so the scene still
// makes sense as a still picture.
function useScene(steps: number, stepMs = 1300, holdMs = 2600) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(steps - 1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let current = 0;
    const tick = () => {
      setStep(current);
      const last = current === steps - 1;
      current = last ? 0 : current + 1;
      timer = setTimeout(tick, last ? holdMs : stepMs);
    };
    const io = new IntersectionObserver(([entry]) => {
      clearTimeout(timer);
      if (entry.isIntersecting) {
        current = 0;
        tick();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [steps, stepMs, holdMs]);

  return { ref, step };
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto flex h-[24rem] w-full max-w-sm flex-col overflow-hidden rounded-[1.75rem] border border-nevoa bg-surface shadow-[0_24px_60px_-30px_rgb(19_35_58/0.45)]">
      {children}
    </div>
  );
}

const Dots = () => (
  <span className="chat-typing-live flex w-fit gap-1 rounded-2xl rounded-bl-md bg-bubble-in px-3 py-2.5 shadow-sm">
    <span className="h-1.5 w-1.5 rounded-full bg-muted" />
    <span className="h-1.5 w-1.5 rounded-full bg-muted" />
    <span className="h-1.5 w-1.5 rounded-full bg-muted" />
  </span>
);

export function RelayPreview({ t, label }: { t: Previews["relay"]; label: string }) {
  const { ref, step } = useScene(7);
  const bubble = (from: "in" | "out", text: string, extra = "") => (
    <p className={`step-in max-w-[80%] rounded-2xl px-3 py-2 text-[0.85rem] ${from === "in" ? "self-end rounded-br-md bg-bubble-out" : "self-start rounded-bl-md bg-bubble-in shadow-sm"} ${extra}`}>
      {text}
    </p>
  );
  return (
    <div ref={ref}>
      <Frame label={label}>
        <div className="flex items-center gap-2 border-b border-nevoa px-4 py-3 font-display">
          <span aria-hidden className="grid size-8 place-items-center rounded-full bg-sinal-soft text-sm font-bold text-sinal">
            {t.business.charAt(0)}
          </span>
          <span className="text-sm font-semibold">{t.business}</span>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 bg-papel/60 p-4 font-display">
          {step >= 0 && bubble("in", t.customer1)}
          {step === 1 && <Dots />}
          {step >= 2 && bubble("out", t.ai1)}
          {step >= 3 && bubble("in", t.customer2)}
          {step >= 4 && (
            <p className="step-in self-center rounded-full bg-amber-100 px-3 py-1 text-[0.72rem] font-semibold text-amber-900">{t.handoff}</p>
          )}
          {step === 5 && <Dots />}
          {step >= 6 && bubble("out", t.agent, "ring-1 ring-entregue/40")}
        </div>
      </Frame>
    </div>
  );
}

export function HelpDeskPreview({ t, label }: { t: Previews["helpdesk"]; label: string }) {
  const { ref, step } = useScene(5, 1400);
  const status = step >= 4 ? t.resolved : step >= 2 ? t.progress : t.open;
  const statusStyle = step >= 4 ? "bg-emerald-100 text-emerald-800" : step >= 2 ? "bg-amber-100 text-amber-900" : "bg-sky-100 text-sky-800";
  const clock = ["3h 59m", "3h 12m", "2h 40m", "2h 05m"][Math.min(step, 3)];
  return (
    <div ref={ref}>
      <Frame label={label}>
        <div className="flex-1 space-y-4 p-5 font-display">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span key={status} className={`step-in rounded-full px-2.5 py-0.5 font-semibold ${statusStyle}`}>
              {status}
            </span>
            <span className="inline-flex items-center gap-1 text-red-700">
              <span aria-hidden className="h-2 w-2 rounded-full bg-red-600" />
              {t.urgent}
            </span>
            <span key={clock + step} className={`step-in ml-auto font-semibold ${step >= 4 ? "text-entregue" : "text-amber-700"}`}>
              {step >= 4 ? t.onTime : `${t.due} ${clock}`}
            </span>
          </div>
          <p className="text-lg font-semibold leading-tight">{t.ticket}</p>
          <div className="h-2 overflow-hidden rounded-full bg-nevoa/60">
            <div className="h-full rounded-full bg-sinal transition-[width] duration-700" style={{ width: `${[12, 30, 55, 75, 100][step]}%` }} />
          </div>
          {step >= 1 && (
            <p className="step-in flex items-center gap-2 text-sm text-muted">
              <span aria-hidden className="grid size-7 place-items-center rounded-full bg-sinal text-xs font-bold text-white">
                A
              </span>
              {t.assigned}
            </p>
          )}
          {step >= 3 && <p className="step-in rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">{t.note}</p>}
        </div>
        {/* the rest of the queue, so the ticket reads as one among many */}
        <ul className="divide-y divide-nevoa border-t border-nevoa font-display text-sm">
          {t.queue.map((q, i) => (
            <li key={q} className="flex items-center gap-2 px-5 py-2.5 text-muted">
              <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              <span className="truncate">{q}</span>
              <span className="ml-auto shrink-0 text-xs">{t.high}</span>
              <span aria-hidden className={`grid size-6 shrink-0 place-items-center rounded-full text-[0.65rem] font-bold text-white ${i ? "bg-muted" : "bg-entregue"}`}>{i ? "–" : "B"}</span>
            </li>
          ))}
        </ul>
      </Frame>
    </div>
  );
}

export function StorePreview({ t, label }: { t: Previews["store"]; label: string }) {
  const { ref, step } = useScene(5, 1300);
  return (
    <div ref={ref}>
      <Frame label={label}>
        <div className="flex items-center justify-between border-b border-nevoa px-4 py-3 font-display text-sm">
          <span className="font-semibold">Qualidade Única</span>
          <span className="inline-flex items-center gap-1.5 text-muted">
            {t.cart}
            <span key={step >= 1 ? 1 : 0} className={`step-in grid size-5 place-items-center rounded-full text-[0.7rem] font-bold text-white ${step >= 1 ? "bg-[#d85a30]" : "bg-nevoa"}`}>
              {step >= 1 ? 1 : 0}
            </span>
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-4 p-5 font-display">
          {step <= 1 && (
            <div className="step-in flex items-center gap-4">
              <div aria-hidden className="grid size-20 shrink-0 place-items-center rounded-xl bg-[#faece7] text-3xl">💡</div>
              <div className="min-w-0">
                <p className="font-semibold leading-tight">{t.product}</p>
                <p className="mt-1 font-bold text-[#993c1d]">{t.price}</p>
                <span className={`mt-2 inline-block rounded-lg px-3 py-1.5 text-sm font-semibold text-white transition-transform ${step === 1 ? "scale-95 bg-[#993c1d]" : "bg-[#d85a30]"}`}>{t.buy}</span>
              </div>
            </div>
          )}
          {(step === 2 || step === 3) && (
            <div className="step-in flex flex-col items-center gap-3 text-center">
              <p className="font-semibold">{t.pix}</p>
              {/* a stand-in for the Pix QR code */}
              <div aria-hidden className="grid size-28 grid-cols-7 gap-0.5 rounded-lg border border-nevoa bg-white p-2">
                {Array.from({ length: 49 }, (_, i) => (
                  <span key={i} className={(i * 37 + (i % 5) * 11) % 3 === 0 || [0, 1, 7, 8, 5, 6, 12, 13, 35, 36, 42, 43].includes(i) ? "bg-tinta" : ""} />
                ))}
              </div>
              <p className="text-sm text-muted">{step === 3 ? `${t.waiting}…` : t.price}</p>
            </div>
          )}
          {step === 4 && (
            <div className="step-in flex flex-col items-center gap-2 text-center">
              <span aria-hidden className="grid size-14 place-items-center rounded-full bg-entregue text-2xl text-white">
                ✓
              </span>
              <p className="text-lg font-semibold">{t.approved}</p>
              <p className="text-sm text-muted">{t.order}</p>
            </div>
          )}
        </div>
      </Frame>
    </div>
  );
}
