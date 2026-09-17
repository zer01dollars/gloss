import Link from "next/link";

const LOOKS = [
  { name: "Soft Glam", vibe: "Rose lift · soft glow · expensive skin" },
  { name: "Club Flash", vibe: "Hard light · cool punch · nightlife" },
  { name: "Golden Hour", vibe: "Honey warmth · dreamy haze" },
  { name: "Film", vibe: "Analog grain · faded blacks" },
  { name: "Clean", vibe: "Editorial crisp · bright clarity" },
];

const STEPS = [
  { n: "01", t: "Upload", d: "Drop one clear selfie." },
  { n: "02", t: "Gloss", d: "Tap a preset. Watch it transform." },
  { n: "03", t: "Compare", d: "Slide before / after." },
  { n: "04", t: "Export", d: "Download a PNG. Done." },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08060a] text-[#f8f0ea]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[70vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,180,160,0.2),transparent_60%)]" />
        <div className="absolute bottom-0 right-[-10%] h-[50vh] w-[50vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(232,196,124,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiMwODA2MGEiLz48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMC4zNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-40" />
      </div>

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-3xl tracking-tight">Gloss</span>
          <span className="hidden text-[10px] uppercase tracking-[0.28em] text-white/35 sm:inline">
            by Zer01
          </span>
        </div>
        <nav className="flex items-center gap-3">
          <a href="#looks" className="hidden text-xs text-white/50 hover:text-white/80 sm:inline">
            Looks
          </a>
          <a href="#pricing" className="hidden text-xs text-white/50 hover:text-white/80 sm:inline">
            Pricing
          </a>
          <Link href="/studio" className="btn-gold !py-2.5 !px-5 text-xs">
            Open Studio
          </Link>
        </nav>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-20">
        <div className="mb-5 space-y-1">
          <p className="text-[11px] uppercase tracking-[0.35em] text-rose-200/55">
            Made By Zer01
          </p>
          <p className="text-[11px] uppercase tracking-[0.35em] text-amber-200/50">
            Artificially Intelligent, Digitally Enhanced
          </p>
        </div>
        <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-white md:text-7xl">
          Make any selfie
          <br />
          <span className="bg-gradient-to-r from-rose-200 via-amber-100 to-rose-200 bg-clip-text text-transparent">
            look expensive.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
          Gloss is a one-tap beauty grade for your photos — Soft Glam by default,
          Club Flash when you want drama. Pure canvas magic. No app install.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/studio" className="btn-gold">
            Gloss my selfie
          </Link>
          <a href="#how" className="btn-ghost">
            How it works
          </a>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-1 shadow-2xl shadow-rose-950/40">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.35rem] bg-[#0c0a0e]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_45%,rgba(244,180,160,0.28),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(232,196,124,0.15),transparent_50%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
              <div className="flex w-full max-w-md items-center gap-3">
                <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#3a2a28] to-[#1a1214] p-4">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                    Before
                  </div>
                  <div className="mt-3 h-24 rounded-xl bg-gradient-to-br from-[#6b5348] to-[#3a2a24] opacity-70 md:h-32" />
                </div>
                <div className="text-white/30">→</div>
                <div className="flex-1 overflow-hidden rounded-2xl border border-rose-200/25 bg-gradient-to-b from-[#5a3a38] to-[#2a1818] p-4 shadow-lg shadow-rose-900/40">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-rose-200/50">
                    Soft Glam
                  </div>
                  <div className="mt-3 h-24 rounded-xl bg-gradient-to-br from-[#c4a090] via-[#e8c4b0] to-[#8b5a4a] opacity-95 md:h-32" />
                </div>
              </div>
              <p className="mt-8 font-serif text-2xl text-white/85 md:text-3xl">
                Soft Glam · default
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
                Upload · Grade · Export
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="relative z-10 border-t border-white/5 bg-black/20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-rose-200/50">Process</p>
          <h2 className="mt-3 font-serif text-4xl text-white md:text-5xl">How it works</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="glass-panel rounded-2xl p-5">
                <div className="text-xs text-amber-200/60">{s.n}</div>
                <div className="mt-3 font-serif text-2xl text-white">{s.t}</div>
                <p className="mt-2 text-sm text-white/45">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="looks" className="relative z-10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-200/50">Looks</p>
          <h2 className="mt-3 font-serif text-4xl text-white md:text-5xl">Five premium grades</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LOOKS.map((l) => (
              <div
                key={l.name}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition hover:border-rose-300/25 hover:bg-white/[0.05]"
              >
                <h3 className="font-serif text-2xl text-white">{l.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{l.vibe}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative z-10 border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-rose-200/50">Pricing</p>
          <h2 className="mt-3 font-serif text-4xl text-white md:text-5xl">Simple plans</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="glass-panel rounded-3xl p-8">
              <div className="text-xs uppercase tracking-[0.25em] text-white/40">Free</div>
              <div className="mt-4 font-serif text-5xl text-white">$0</div>
              <ul className="mt-6 space-y-2 text-sm text-white/50">
                <li>· All five looks</li>
                <li>· Before / after slider</li>
                <li>· PNG export with Gloss watermark</li>
              </ul>
              <Link href="/studio" className="btn-ghost mt-8 w-full">
                Start free
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-amber-300/10 via-rose-500/10 to-transparent p-8">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-rose-300/20 blur-2xl" />
              <div className="text-xs uppercase tracking-[0.25em] text-amber-100/70">Pro</div>
              <div className="mt-4 font-serif text-5xl text-white">
                $8<span className="text-lg text-white/40">/mo</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-white/60">
                <li>· Everything in Free</li>
                <li>· Watermark-free HD exports</li>
                <li>· Full resolution download</li>
              </ul>
              <Link href="/studio" className="btn-gold mt-8 w-full">
                Try Pro in Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-rose-600/20 to-amber-500/10 px-8 py-14 text-center">
          <h2 className="font-serif text-4xl text-white md:text-5xl">
            Your selfie, but richer.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/50">
            Open the studio. Soft Glam is waiting. No account for the demo.
          </p>
          <Link href="/studio" className="btn-gold mt-8 inline-flex">
            Enter Gloss Studio
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 px-6 py-8 text-center">
        <p className="font-serif text-xl text-white/80">Gloss</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white/30">
          Made By Zer01
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/25">
          Artificially Intelligent, Digitally Enhanced
        </p>
      </footer>
    </div>
  );
}
