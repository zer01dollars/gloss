"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PRESETS,
  applyFullGrade,
  getPreset,
  type PresetId,
} from "@/lib/filters";
import { BeautifyBlock } from "@/components/studio/BeautifyBlock";

const SAMPLE_SRC = "/demo/sample.jpg";
const PREVIEW_MAX = 1100;

/** Featured looks on the marketing demo (others live in Studio). */
const DEMO_LOOKS: PresetId[] = [
  "soft-glam",
  "golden-hour",
  "club-flash",
  "peach-fizz",
  "warm-portrait",
  "film",
  "ice",
  "noir",
];

export function DemoApp() {
  const viewRef = useRef<HTMLCanvasElement>(null);
  const beforeRef = useRef<HTMLCanvasElement | null>(null);
  const afterRef = useRef<HTMLCanvasElement | null>(null);
  const dims = useRef({ w: 0, h: 0 });

  const [presetId, setPresetId] = useState<PresetId>("soft-glam");
  const [beautify, setBeautify] = useState(0.4);
  const [compare, setCompare] = useState(0.48);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gradeTick, setGradeTick] = useState(0);

  const active = useMemo(() => getPreset(presetId), [presetId]);

  const composite = useCallback(() => {
    const view = viewRef.current;
    const before = beforeRef.current;
    const after = afterRef.current;
    if (!view || !before || !after) return;
    const { w, h } = dims.current;
    view.width = w;
    view.height = h;
    const ctx = view.getContext("2d");
    if (!ctx) return;

    const split = Math.round((1 - compare) * w);
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(before, 0, 0);
    if (split > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, split, h);
      ctx.clip();
      ctx.drawImage(after, 0, 0);
      ctx.restore();
    }
    if (split > 0 && split < w) {
      ctx.fillStyle = "rgba(255, 230, 200, 0.85)";
      ctx.fillRect(split - 1, 0, 2, h);
      ctx.beginPath();
      ctx.arc(split, h / 2, 10, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(248, 228, 212, 0.95)";
      ctx.fill();
      ctx.strokeStyle = "rgba(26, 16, 12, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [compare]);

  // Load sample + initial Soft Glam grade
  useEffect(() => {
    let cancelled = false;
    setBusy(true);
    setError(null);
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      try {
        const scale = Math.min(
          1,
          PREVIEW_MAX / Math.max(img.naturalWidth, img.naturalHeight)
        );
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));
        dims.current = { w, h };

        const before = document.createElement("canvas");
        before.width = w;
        before.height = h;
        const bctx = before.getContext("2d", { willReadFrequently: true });
        if (!bctx) throw new Error("Canvas unavailable");
        bctx.drawImage(img, 0, 0, w, h);
        beforeRef.current = before;

        const src = bctx.getImageData(0, 0, w, h);
        const params = getPreset("soft-glam").params;
        const graded = applyFullGrade(src, params, 0.4);
        const after = document.createElement("canvas");
        after.width = w;
        after.height = h;
        const actx = after.getContext("2d");
        if (!actx) throw new Error("Canvas unavailable");
        actx.putImageData(graded, 0, 0);
        afterRef.current = after;

        if (viewRef.current) {
          viewRef.current.width = w;
          viewRef.current.height = h;
        }
        setReady(true);
        setBusy(false);
        setGradeTick((t) => t + 1);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to grade sample");
        setBusy(false);
      }
    };
    img.onerror = () => {
      if (!cancelled) {
        setError("Could not load demo sample image.");
        setBusy(false);
      }
    };
    img.src = SAMPLE_SRC;
    return () => {
      cancelled = true;
    };
  }, []);

  // Re-grade when look or beautify changes
  useEffect(() => {
    if (!beforeRef.current || !ready) return;
    const before = beforeRef.current;
    const w = before.width;
    const h = before.height;
    const bctx = before.getContext("2d", { willReadFrequently: true });
    if (!bctx) return;
    setBusy(true);
    const handle = requestAnimationFrame(() => {
      const src = bctx.getImageData(0, 0, w, h);
      const params = getPreset(presetId).params;
      const graded = applyFullGrade(src, params, beautify);
      const after = document.createElement("canvas");
      after.width = w;
      after.height = h;
      const actx = after.getContext("2d");
      if (!actx) {
        setBusy(false);
        return;
      }
      actx.putImageData(graded, 0, 0);
      afterRef.current = after;
      setGradeTick((t) => t + 1);
      setBusy(false);
    });
    return () => cancelAnimationFrame(handle);
  }, [presetId, beautify, ready]);

  // Composite before/after + divider
  useEffect(() => {
    if (!ready) return;
    composite();
  }, [ready, compare, gradeTick, composite]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08060a] text-[#f8f0ea]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-12%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,180,160,0.2),transparent_60%)]" />
        <div className="absolute bottom-0 right-[-8%] h-[45vh] w-[50vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(232,196,124,0.12),transparent_65%)]" />
      </div>

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl tracking-tight sm:text-3xl">
            Gloss
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.28em] text-white/30 sm:inline">
            Demo
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="text-xs text-white/40 transition hover:text-white/70"
          >
            Home
          </Link>
          <Link href="/studio" className="btn-gold !px-4 !py-2 text-xs">
            Open Studio
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-8 max-w-2xl space-y-3 pt-2 sm:pt-6">
          <p className="text-[11px] uppercase tracking-[0.35em] text-rose-200/55">
            Live in-browser demo
          </p>
          <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Soft Glam, on a real portrait.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
            Same canvas pipeline as Studio — grade, glow, and Beautify run in
            your browser. Flip looks below, drag the before/after slider, then
            try your own selfie in Studio.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] lg:items-start">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl shadow-rose-950/40">
              {busy && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 text-xs uppercase tracking-[0.25em] text-white/65 backdrop-blur-[2px]">
                  Grading…
                </div>
              )}
              {error && (
                <div className="flex min-h-[280px] items-center justify-center p-8 text-center text-sm text-rose-200/80">
                  {error}
                </div>
              )}
              <canvas
                ref={viewRef}
                className={`block h-auto w-full max-h-[72vh] object-contain ${
                  error ? "hidden" : ""
                }`}
                aria-label="Before and after Gloss grade"
              />
              {!error && (
                <>
                  <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur">
                    After ← → Before
                  </div>
                  <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/45">
                    <span className="rounded-full bg-black/40 px-2 py-1 backdrop-blur">
                      {active.label}
                    </span>
                    <span className="rounded-full bg-black/40 px-2 py-1 backdrop-blur">
                      Sample portrait
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase tracking-[0.22em] text-white/35">
                <span>After</span>
                <span>Before</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={compare}
                onChange={(e) => setCompare(Number(e.target.value))}
                className="gloss-range w-full"
                aria-label="Before and after"
                disabled={!ready}
              />
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-6">
            <div className="glass-panel space-y-5 rounded-2xl p-5">
              <BeautifyBlock value={beautify} onChange={setBeautify} />

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                  Try a look
                </p>
                <p className="mt-2 text-sm text-white/45">{active.blurb}</p>
              </div>
              <div className="max-h-40 overflow-y-auto overscroll-contain pr-0.5">
                <div className="flex flex-wrap gap-2">
                  {DEMO_LOOKS.map((id) => {
                    const p = getPreset(id);
                    const on = id === presetId;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPresetId(id)}
                        title={p.blurb}
                        className={`rounded-full px-3.5 py-2 text-xs font-medium transition ${
                          on
                            ? "bg-gradient-to-r from-rose-200 via-amber-100 to-rose-200 text-[#1a1010] shadow-lg shadow-rose-900/30"
                            : "border border-white/12 bg-white/[0.04] text-white/70 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-white/8 pt-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                  Next
                </p>
                <p className="mt-2 text-sm text-white/45">
                  Upload your own selfie, fine-tune, Beautify, and export PNG.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link href="/studio" className="btn-gold w-full">
                    Try in Studio
                  </Link>
                  <Link href="/studio" className="btn-ghost w-full">
                    Gloss my selfie
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-xs leading-relaxed text-white/40">
              <p>
                Sample:{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Woman_portrait.jpg"
                  className="text-rose-200/60 underline-offset-2 hover:text-rose-200/90 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Woman portrait.jpg
                </a>{" "}
                by Ph.prikhodko —{" "}
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/"
                  className="text-rose-200/60 underline-offset-2 hover:text-rose-200/90 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  CC BY-SA 4.0
                </a>
                .
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-white/25">
                Made By Zer01
              </p>
            </div>
          </aside>
        </div>

        <section className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-rose-600/20 to-amber-500/10 px-6 py-12 text-center sm:px-10">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">
            Ready for your selfie?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/50">
            Studio has all {PRESETS.length} looks, Fine-tune sliders, Beautify,
            and PNG export — plus a one-click Pro demo unlock.
          </p>
          <Link href="/studio" className="btn-gold mt-7 inline-flex">
            Enter Gloss Studio
          </Link>
        </section>
      </main>

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
