# Architect Zero — Local Setup Guide

## You need this running in E:\architectZero in VS Code

---

## STEP 1 — Open terminal in VS Code
Press `Ctrl + `` ` (backtick) to open the integrated terminal.
Make sure it shows `E:\architectZero>` as the prompt.

---

## STEP 2 — Scaffold the Astro project
Run this **one command**:

```bash
npm create astro@latest . -- --template minimal --install --no-git --typescript strict
```

When prompted:
- "Where should we create your new project?" → hit Enter (uses current folder `.`)
- "How would you like to start your new project?" → select **Empty**
- "Install dependencies?" → **Yes**
- "Do you plan to write TypeScript?" → **Yes** → **Strict**
- "Initialize a new git repository?" → **No** (we'll do this later)

---

## STEP 3 — Install additional dependencies
```bash
npm install @astrojs/react @astrojs/tailwind @astrojs/mdx tailwindcss react react-dom nanostores @nanostores/react vite-plugin-pwa
npm install --save-dev @types/react @types/react-dom
```

---

## STEP 4 — Copy all project files
Copy all the files from the architect-zero folder into `E:\architectZero`.

The structure should look like:
```
E:\architectZero\
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── public\
│   └── manifest.json
└── src\
    ├── styles\
    │   └── global.css
    ├── content\
    │   ├── config.ts
    │   └── lessons\
    │       └── d1\
    │           └── d1-t1-1-loop-basics.md
    ├── lib\
    │   ├── domains.ts
    │   └── store.ts
    ├── layouts\
    │   └── BaseLayout.astro
    ├── components\
    │   └── AppHeader.astro
    └── pages\
        ├── index.astro
        └── learn\
            ├── index.astro
            └── [domain]\
                └── [lesson].astro
```

---

## STEP 5 — Create placeholder icons
Astro needs these files to exist. Create them:

```bash
mkdir -p public\icons
```

Then create two simple placeholder PNG files in `public\icons\`:
- `icon-192.png` (192×192px)
- `icon-512.png` (512×512px)

You can use any image for now — we'll replace with the real Architect Zero icon later.

---

## STEP 6 — Start the dev server
```bash
npm run dev
```

You should see:
```
  🚀 astro  v4.x.x ready in XXXms

  ┃ Local    http://localhost:4321/
  ┃ Network  http://192.168.x.x:4321/
```

Open `http://localhost:4321` in your browser.

---

## STEP 7 — View on your phone (same WiFi)
The Network URL (e.g. `http://192.168.1.5:4321`) works on your phone
while it's connected to the same WiFi as your laptop.

Open that URL in Safari (iPhone) or Chrome (Android) to see it on your phone immediately.

---

## What you should see
- The Architect Zero home screen with all 7 domains listed
- Tap any domain to go to the lessons page
- The one lesson we've written (D1 T1.1 — The Agentic Loop) is fully readable
- XP bar at the top updates as you complete lessons
- All navigation tabs work

---

## Next steps (we build these together)
After you confirm the site is running:
1. We write all 21 D1 lessons (the 27% domain — highest priority)
2. Then D2, D3, D4, D5, D6 in sequence
3. Then quiz questions and flashcards
4. Then teach-back mode as a React component
5. Then Netlify deploy for PWA on your phone

---

## Troubleshooting

**"Cannot find module" errors:**
```bash
npm install
npm run dev
```

**TypeScript errors on content collection:**
```bash
npm run sync
```
This regenerates the `.astro` type definitions.

**Port already in use:**
```bash
npm run dev -- --port 4322
```

**Tailwind styles not applying:**
Make sure `src/styles/global.css` is imported in `BaseLayout.astro`.
