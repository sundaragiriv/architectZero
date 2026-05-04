# Architect Zero — Project Memory

Static Astro app: a CCA (Claude Certified Architect) exam prep platform. The
content is original (114 lessons across 7 domains, plus quiz scenarios and
flashcards), and the `/academy` page is a launcher to the official Anthropic
Academy courses on Skilljar — no Anthropic content is mirrored locally.

## Stack & commands

- **Astro 4.15** static site, **Tailwind 3.4** (used sparingly), **MDX**, React 18
  for any future interactive islands, **vite-plugin-pwa** for offline.
- TypeScript strict.
- Build: `npm run build` (static, outputs to `dist/`). Dev: `npm run dev` (port 4321).
  After editing `src/content/config.ts` schema, run `npm run sync`.
- 128 pages built as of last commit. If the count drops without explanation,
  check `getStaticPaths()` in `src/pages/learn/[domain]/[lesson].astro`.

## What lives where

- `src/lib/domains.ts` — the seven CCA domains (D0–D6) with task statements,
  exam weights, lesson counts. **Single source of truth** for domain metadata.
- `src/lib/anthropicCourses.ts` — catalog for the `/academy` launcher page.
- `src/content/lessons/{d0..d6}/*.md` — lesson content. Each file's frontmatter
  must match the Zod schema in `src/content/config.ts`: `id, title, domain,
  taskRef?, order, xp, tag, duration, analogy, examTrap?, keyPoints[],
  antiPatterns?, tbChallenge?` plus the markdown body.
- `src/content/questions/`, `src/content/flashcards/` — typed data collections.
- `src/layouts/BaseLayout.astro` — global shell: sidebar (desktop), topbar +
  bottom nav (mobile), XP/level scripts. **All pages should wrap in this** —
  `/learn/index.astro` is the lone holdout still using `AppHeader.astro`.
- `src/components/CourseRail.astro` — the collapsible chapter sidebar used on
  both the domain landing and individual lesson pages.
- `src/styles/global.css` — design tokens, base reset, app shell, typography
  for `.prose-lesson`, plus `.course-shell` / `.course-shell-rail` utilities.

## Conventions worth keeping

- **Style approach:** BaseLayout + bare CSS in `<style>` blocks scoped to each
  Astro file. **Don't reach for Tailwind** for new pages — the codebase is
  almost entirely bare CSS, and mixing the two creates the same inconsistency
  problem `/learn/index.astro` already shows. Only `global.css` and the few
  remaining utility classes (`.text-electric`, `.font-display`, etc.) are
  expected to be referenced as classes.
- **Astro `<script>` does NOT interpolate frontmatter.** Pass values to scripts
  via hidden DOM elements with `data-*` attributes and read with
  `el.dataset.foo`. The lesson page uses `#lesson-meta-data` for this.
- **Progress is localStorage-only.** Keys: `az_completed` (string[] of lesson
  ids), `az_xp` (number), `az_streak`, `az_mastered`, `az_quiz_history`.
  No backend.
- **Lesson IDs follow `d{N}-t{N}-{N}-{slug}`** and the URL slug is the file's
  last path segment via `lesson.slug.split('/').pop()`.
- **Domain colors are the design accent** — `domain.color` is interpolated
  into inline styles for borders, fills, chips. Don't hardcode domain colors
  anywhere; always pull from `DOMAINS`.

## Architecture decisions made (so far)

- **Course shell** — both `/learn/[domain]` (landing) and `/learn/[domain]/[lesson]`
  use the same `CourseRail` component. On the lesson page it's a sticky
  left-rail; on the landing it's a centered table-of-contents. Mobile collapses
  the rail into a slide-in drawer triggered by a "Lesson X of N" pill at the
  top of the main pane. This is the LinkedIn-Learning model — committed to it
  on purpose. Earlier half-measures (separate inner `<aside>` per page) were
  removed.
- **Three-tab lesson UI** (`💡 Analogy → 📖 Concept → ⚙️ Technical`) is the
  step-pacing inside a lesson. Don't replace it with a single long page.
- **Typography:** `.prose-lesson` runs at **17px / 1.85** body, **27px** h2,
  **19px** h3, **14px** code/table. Lesson main pane is capped at **760px**.
  These were tuned to match LinkedIn Learning / Medium readability.
- **Resume CTA** on the domain landing is computed client-side from
  `az_completed` — first incomplete lesson, relabeled `Start → / Resume → /
  Review →`.
- **Academy launcher** (`/academy`) deep-links to `anthropic.skilljar.com` and
  `anthropic.com/ai-fluency`. **Never copy Anthropic course content** — we
  link, we don't mirror.

## Known issues / inconsistencies

- `src/pages/learn/index.astro` is the **only page using Tailwind utility
  classes + the old `AppHeader.astro` component**. It works but is stylistically
  out of step with the rest of the site. A future cleanup pass should rebuild
  it on `BaseLayout` with bare CSS, matching the new domain landing style.
- `src/components/AppHeader.astro` is only referenced by that one page; if/when
  `/learn/index.astro` is migrated, AppHeader can be deleted.
- `/teachback` is a placeholder ("coming soon") — no actual feature behind it.
  The button on the lesson page that linked to it was removed; only direct
  navigation hits the placeholder.
- `domainLessonCounts` is duplicated in three places (`/learn/index.astro`,
  `/learn/[domain]/index.astro`, `/index.astro`). If lesson counts shift,
  search for `domainLessonCounts` and update all three. The authoritative
  source is `DOMAINS[].lessonCount` in `src/lib/domains.ts` — these inline
  copies could be replaced with imports in a future cleanup.
- Build emits a Shiki "language gitignore → plaintext" fallback warning.
  Cosmetic; safe to ignore unless we actually want gitignore syntax highlighting.

## Recent session log (most recent first)

- **2026-05-03** — Added `/academy` launcher page with three official Anthropic
  courses (Claude 101, AI Fluency, Claude Code in Action). Each card deep-links
  to Skilljar / anthropic.com. Sidebar nav grew to 6 items.
- **2026-05-03** — Course shell rebuild: extracted `CourseRail` component,
  made the lesson page two-pane (sticky rail + content) with mobile drawer,
  rebuilt the domain landing as overview + Resume CTA + table-of-contents.
  Typography pass on `.prose-lesson` and lesson chips. Swept stale "108 lessons"
  and `d0:6` counts.
- **2026-05-03** — Created `/teachback` coming-soon placeholder so the route
  resolves; fixed homepage `<title>` that was leftover "Quiz — Architect Zero".
- **2026-05-03** — Code-review pass: confirmed nav links / lesson count / DOM
  dataset pattern were already correct; bumped `--muted` and `--subtle` to
  spec values; removed the dead `/teachback` button from the lesson page;
  fixed `d0:6 → d0:12` in the domain page progress script.

## When picking up a new session

1. Skim this file. Then `git log --oneline -10` for recent commits.
2. `npm run build` — if it doesn't pass at zero errors, fix that before doing
   anything else.
3. The two pages that should NOT be touched casually: `BaseLayout.astro`
   (everything depends on it) and `src/lib/domains.ts` (the lesson IDs in
   `taskStatements[].lessonIds` must match files in `src/content/lessons/`).
4. For UI work, start the dev server and use a browser — type-checks pass for
   broken layouts.
