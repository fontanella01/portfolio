"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { id: string; label: string };

// Fixed side navigation on large screens. The link of the section in view is
// highlighted while the visitor scrolls.
export function Sidebar({
  items,
  name,
  role,
  photo,
  available,
  switchHref,
  switchLabel,
  switchLang,
  links,
  navLabel,
}: {
  items: Item[];
  name: string;
  role: string;
  photo: string;
  available: string;
  switchHref: string;
  switchLabel: string;
  switchLang: string;
  links: { github: string; linkedin: string; email: string };
  navLabel: string;
}) {
  const [active, setActive] = useState<string>("intro");

  useEffect(() => {
    const sections = ["intro", ...items.map((i) => i.id)].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    // a section counts as "current" when it crosses the middle band of the screen
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-nevoa bg-surface px-6 py-8 font-display lg:flex">
      <a href="#top" className="group">
        <Image src={photo} alt="" width={64} height={64} className="size-16 rounded-2xl object-cover object-top" />
        <p className="mt-4 text-lg font-bold leading-tight tracking-tight group-hover:text-sinal">{name}</p>
        <p className="text-sm text-muted">{role}</p>
      </a>
      <p className="mt-3 inline-flex items-center gap-2 text-xs text-entregue">
        <span aria-hidden className="h-2 w-2 rounded-full bg-entregue" />
        {available}
      </p>

      <nav aria-label={navLabel} className="mt-10">
        <ol className="space-y-1">
          {items.map((item) => {
            const on = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] transition-colors ${
                    on ? "bg-sinal-soft font-semibold text-sinal" : "text-muted hover:bg-papel hover:text-tinta"
                  }`}
                >
                  <span aria-hidden className={`h-5 w-1 rounded-full transition-colors ${on ? "bg-sinal" : "bg-transparent"}`} />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mt-auto space-y-4 text-sm">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted">
          <a href={links.github} target="_blank" rel="noreferrer" className="hover:text-sinal">
            GitHub
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:text-sinal">
            LinkedIn
          </a>
          <a href={`mailto:${links.email}`} className="hover:text-sinal">
            E-mail
          </a>
        </div>
        <Link href={switchHref} hrefLang={switchLang} className="inline-block rounded-full border border-nevoa px-3 py-1 text-muted hover:border-sinal hover:text-sinal">
          {switchLabel}
        </Link>
      </div>
    </aside>
  );
}
