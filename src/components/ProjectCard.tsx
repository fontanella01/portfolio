import Image from "next/image";
import type { CONTENT } from "@/content";

type Project = (typeof CONTENT)["pt"]["projects"]["items"][number];

export function ProjectCard({ project, repoLabel, demoLabel }: { project: Project; repoLabel: string; demoLabel: string }) {
  const [cover, ...rest] = project.images;
  return (
    <article className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
      <div className="grid gap-3">
        <Image
          src={cover.src}
          alt={cover.alt}
          width={1200}
          height={750}
          sizes="(min-width: 1024px) 640px, 100vw"
          className="w-full rounded-xl border border-nevoa bg-surface object-cover object-top"
        />
        <div className="grid grid-cols-2 gap-3">
          {rest.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={600}
              height={375}
              sizes="(min-width: 1024px) 320px, 50vw"
              className="aspect-[16/10] w-full rounded-lg border border-nevoa bg-surface object-cover object-top"
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-3 text-lg">{project.summary}</p>
        <ul className="mt-6 space-y-3 border-l-2 border-sinal/30 pl-5 text-[0.98rem] text-muted">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <p className="mt-6 font-display text-sm text-muted">{project.stack.join(", ")}</p>
        <div className="mt-7 flex flex-wrap gap-3 font-display text-sm font-medium">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-tinta px-4 py-2.5 text-papel transition-colors hover:bg-sinal"
          >
            {repoLabel}
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-tinta/25 px-4 py-2.5 transition-colors hover:border-sinal hover:text-sinal"
            >
              {demoLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
