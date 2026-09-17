# Gloss

**Make any selfie look expensive.**

Premium in-browser selfie color grading — Soft Glam, Club Flash, Golden Hour, Film, Clean. Upload → preset → before/after → export PNG. Pure Next.js + canvas 2D. No 3D, no accounts required for the demo.

Made By Zer01  
Artificially Intelligent, Digitally Enhanced

## Run locally

```bash
npm install
npm run dev -p 3001
```

Open [http://localhost:3001](http://localhost:3001).

```bash
npm run build
npm start -- -p 3001
```

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4
- Zustand (Pro unlock + preset persistence)
- Canvas 2D pixel pipeline (brightness, contrast, saturation, warmth, vignette, grain, sharpen, soft glow)

## Features

- Landing page (dark / luxury)
- Studio: drag-drop upload, preset chips, live canvas preview, before/after slider, PNG export
- Free exports include a Gloss watermark and max edge 1280px
- **Unlock Pro (demo)** — `localStorage` via Zustand persist — removes watermark + HD (up to 4096px)

## License

Private — Zer01
