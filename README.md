# Gloss

**Make any selfie look expensive.**

Gloss is an in-browser beauty color grader for selfies and portraits. Upload a photo, pick a look (Soft Glam by default), Fine-tune sliders, run Beautify, compare before/after, and export a PNG — all on a canvas pipeline in your browser. No app install, no account required for the local demo.

**Made By Zer01**  
**Artificially Intelligent, Digitally Enhanced**

---

## Requirements

- **Node.js 20+**
- **npm** (comes with Node)

Check your version:

```bash
node -v   # should print v20.x or newer
npm -v
```

---

## Clone, install, run

```bash
git clone https://github.com/zer01dollars/gloss.git
cd gloss
npm install
npm run dev -- -p 3001
```

Then open:

| Page | URL |
|------|-----|
| Landing | [http://localhost:3001](http://localhost:3001) |
| **Live demo** | [http://localhost:3001/demo](http://localhost:3001/demo) |
| Studio | [http://localhost:3001/studio](http://localhost:3001/studio) |

Production-style build:

```bash
npm run build
npm start -- -p 3001
```

---

## How to use

1. **Upload** — drop a clear selfie in Studio (or open `/demo` to try a bundled sample).
2. **Pick a look** — Soft Glam, Club Flash, Golden Hour, Film, and more.
3. **Fine-tune** — brightness, contrast, warmth, vignette, grain, glow, etc.
4. **Beautify** — optional skin-smooth / soft-glow pass (slider).
5. **Before / after** — drag the compare slider.
6. **Export** — download a PNG.

**Pro demo unlock** — in Studio, use **Unlock Pro (demo)**. It stores a flag in `localStorage` (via Zustand) and removes the watermark + raises the export max edge for the session.

---

## Troubleshooting

**Port 3001 already in use**

```bash
# pick another port
npm run dev -- -p 3002
```

Or stop whatever is bound to 3001, then retry.

**Stale / weird UI after pulling**

```bash
rm -rf .next
npm run dev -- -p 3001
```

**Wrong Node version**

Gloss expects **Node 20+**. Upgrade with your usual tool (`nvm`, `fnm`, official installer), then:

```bash
node -v
rm -rf node_modules .next
npm install
npm run dev -- -p 3001
```

---

## Demo sample credit

The live demo at `/demo` uses a bundled portrait:

- **File:** [`public/demo/sample.jpg`](public/demo/sample.jpg)
- **Source:** [Woman portrait.jpg](https://commons.wikimedia.org/wiki/File:Woman_portrait.jpg) on Wikimedia Commons  
- **Author:** Ph.prikhodko  
- **License:** [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

---

## Stack

- Next.js 15 (App Router) + TypeScript  
- Tailwind CSS 4  
- Zustand (Pro unlock + preset / tweak persistence)  
- Canvas 2D pixel pipeline (`applyFullGrade` — grade, glow, Beautify)

## Features

- Dark luxury landing page  
- `/demo` — marketing demo that **actually grades** a sample portrait in-browser  
- `/studio` — upload, 13 looks, Fine-tune, Beautify, before/after, PNG export  
- Free exports: Gloss watermark + max edge ~1280px  
- Pro demo unlock: watermark-free HD (up to 4096px)

## License

Private — Zer01
