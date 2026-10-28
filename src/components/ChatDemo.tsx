import type { ChatLine } from "@/content";

type Props = { contact: string; status: string; lines: ChatLine[]; caption: string };

// Cada mensagem entra em sequência; antes de cada resposta da IA aparece o "digitando".
const START = 0.5;
const STEP = 0.9;
const TYPING = 1.1;

function schedule(lines: ChatLine[]) {
  let t = START;
  return lines.map((line) => {
    const typingAt = line.from === "out" ? t : null;
    if (line.from === "out") t += TYPING;
    const at = t;
    t += STEP;
    return { line, at, typingAt };
  });
}

export function ChatDemo({ contact, status, lines, caption }: Props) {
  return (
    <figure className="w-full max-w-md justify-self-center lg:justify-self-end">
      <div className="overflow-hidden rounded-3xl border border-nevoa bg-surface shadow-[0_24px_60px_-30px_rgb(19_35_58/0.45)]">
        <div className="flex items-center gap-3 border-b border-nevoa px-5 py-3.5">
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-sinal-soft font-display text-sm font-semibold text-sinal">
            {contact.charAt(0)}
          </span>
          <div className="leading-tight">
            <p className="font-display text-[0.95rem] font-semibold">{contact}</p>
            <p className="flex items-center gap-1.5 font-display text-xs text-entregue">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-entregue" />
              {status}
            </p>
          </div>
        </div>

        <ol className="flex min-h-[23rem] flex-col gap-2.5 px-4 py-5 font-display text-[0.92rem] leading-snug">
          {schedule(lines).map(({ line, at, typingAt }, i) => (
            <li key={i} className="contents">
              {typingAt !== null && (
                <span
                  aria-hidden
                  className="chat-typing flex w-fit gap-1 self-end rounded-2xl rounded-br-md bg-bubble-out px-3.5 py-3"
                  style={{ "--d": `${typingAt}s`, "--t": `${TYPING}s` } as React.CSSProperties}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-entregue" />
                  <span className="h-1.5 w-1.5 rounded-full bg-entregue" />
                  <span className="h-1.5 w-1.5 rounded-full bg-entregue" />
                </span>
              )}
              <Bubble line={line} at={at} />
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-3 px-2 text-center text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

function Bubble({ line, at }: { line: ChatLine; at: number }) {
  const style = { "--d": `${at}s`, "--r": `${at + 0.8}s` } as React.CSSProperties;

  if (line.from === "event") {
    return (
      <p style={style} className="chat-item my-1 flex items-center gap-2 self-center text-xs text-sinal">
        <span aria-hidden className="h-px w-5 bg-sinal/40" />
        {line.text}
        <span aria-hidden className="h-px w-5 bg-sinal/40" />
      </p>
    );
  }

  const out = line.from === "out";
  return (
    <p
      style={style}
      className={`chat-item max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
        out ? "self-end rounded-br-md bg-bubble-out" : "self-start rounded-bl-md bg-bubble-in shadow-sm"
      }`}
    >
      {line.text}
      <span className="ml-2 inline-flex translate-y-0.5 items-center gap-1 text-[0.7rem] text-muted">
        {line.time}
        {out && (
          <span className="chat-ticks" aria-hidden>
            ✓✓
          </span>
        )}
      </span>
    </p>
  );
}
