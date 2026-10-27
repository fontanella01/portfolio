# Portfolio — Vinícius Fontanella Kleis

Personal portfolio site in Portuguese (`/pt`) and English (`/en`): projects, case studies, experience and resume download.

**Stack:** Next.js 15 (App Router, static generation) · React 19 · TypeScript · Tailwind CSS 4

## Running locally

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (both languages are pre-rendered)
```

## Structure

```
src/
  content.ts            all site copy, in both languages
  app/[lang]/layout.tsx html lang, fonts and metadata per language
  app/[lang]/page.tsx   the page (hero, projects, case studies, experience, stack, contact)
  components/           ProjectCard and Section
public/
  projects/             screenshots of the projects
  cv/                   resume (PT and EN)
```

To change any text, edit `src/content.ts`; the page only handles layout.
