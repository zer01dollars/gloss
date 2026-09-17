"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGlossStore } from "@/store/glossStore";
import { UploadZone } from "./UploadZone";
import { PresetChips } from "./PresetChips";
import { FineTunePanel } from "./FineTunePanel";
import { PreviewCanvas } from "./PreviewCanvas";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { ExportBar } from "./ExportBar";

export function StudioApp() {
  const imageUrl = useGlossStore((s) => s.imageUrl);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08060a] text-[#f8f0ea]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-15%] h-[55vh] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,180,160,0.18),transparent_60%)]" />
        <div className="absolute bottom-0 right-[-5%] h-[40vh] w-[45vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(232,196,124,0.1),transparent_65%)]" />
      </div>

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl tracking-tight">Gloss</span>
          <span className="hidden text-[10px] uppercase tracking-[0.28em] text-white/30 sm:inline">
            Studio
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs text-white/40 transition hover:text-white/70"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 pb-16 sm:px-6">
        <div>
          <h1 className="font-serif text-3xl text-white sm:text-4xl">
            Make it expensive
          </h1>
          <p className="mt-2 max-w-lg text-sm text-white/45">
            Upload a selfie, pick a look, fine-tune, beautify, export PNG. All
            processing stays in your browser.
          </p>
        </div>

        {!imageUrl ? (
          <UploadZone />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              <PreviewCanvas canvasRef={canvasRef} />
              <BeforeAfterSlider />
            </div>
            <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
              <div className="glass-panel max-h-[min(78vh,720px)] space-y-5 overflow-y-auto overscroll-contain rounded-2xl p-4">
                <PresetChips />
                <FineTunePanel />
                <ExportBar />
                <UploadZone />
              </div>
              <p className="text-center text-[10px] uppercase tracking-[0.28em] text-white/25">
                Made By Zer01
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
