import Image from "next/image";
import type { CONTENT } from "@/content";

type Project = (typeof CONTENT)["pt"]["projects"]["items"][number];

export function ProjectCard({ project, repoLabel, demoLabel }: { project: Project; repoLabel: string; demoLabel: string }) {
  const [cover, ...rest] = project.images;
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="grid gap-px bg-border md:grid-cols-[2fr_1fr]">
        <Image src={cover.src} alt={cover.alt} width={1200} height={750} className="h-full w-full bg-surface object-cover object-top" />
        <div className="hidden gap-px md:grid">
          {rest.map((img) => (
            <Image key={img.src} src={img.src} alt={img.alt} width={600} height={375} className="h-full w-full bg-surface object-cover object-top" />
          ))}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <p className="mt-2 text-muted">{project.summary}</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s} className="rounded bg-accent-soft px-2 py-0.5 text-xs text-accent">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-3 text-sm">
          <a href={project.repo} target="_blank" rel="noreferrer" className="rounded-lg border border-border px-4 py-2 hover:bg-background">
            {repoLabel} ↗
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="rounded-lg bg-accent px-4 py-2 font-medium text-white hover:opacity-90">
              {demoLabel} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
