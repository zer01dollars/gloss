"use client";

import { useEffect, useRef, useState } from "react";
import { applyGrade, applySoftGlow, getPreset } from "@/lib/filters";
import { useGlossStore } from "@/store/glossStore";

const PREVIEW_MAX = 1200;

export function PreviewCanvas({
  canvasRef,
}: {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}) {
  const imageUrl = useGlossStore((s) => s.imageUrl);
  const presetId = useGlossStore((s) => s.presetId);
  const compare = useGlossStore((s) => s.compare);
  const viewRef = useRef<HTMLCanvasElement>(null);
  const beforeCanvas = useRef<HTMLCanvasElement | null>(null);
  const afterCanvas = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const dims = useRef({ w: 0, h: 0 });

  useEffect(() => {
    if (!imageUrl) {
      beforeCanvas.current = null;
      afterCanvas.current = null;
      setReady(false);
      return;
    }
    let cancelled = false;
    setBusy(true);
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
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
      if (!bctx) return;
      bctx.drawImage(img, 0, 0, w, h);
      beforeCanvas.current = before;

      const src = bctx.getImageData(0, 0, w, h);
      const preset = getPreset(useGlossStore.getState().presetId);
      const graded = applyGrade(src, preset.params);
      if (useGlossStore.getState().presetId === "soft-glam") {
        applySoftGlow(graded, 0.22);
      }
      const after = document.createElement("canvas");
      after.width = w;
      after.height = h;
      const actx = after.getContext("2d");
      if (!actx) return;
      actx.putImageData(graded, 0, 0);
      afterCanvas.current = after;

      const view = viewRef.current;
      if (view) {
        view.width = w;
        view.height = h;
        canvasRef.current = view;
      }
      setReady(true);
      setBusy(false);
    };
    img.onerror = () => setBusy(false);
    img.src = imageUrl;
    return () => {
      cancelled = true;
    };
  }, [imageUrl, canvasRef]);

  // Re-grade when preset changes (source already loaded)
  useEffect(() => {
    if (!beforeCanvas.current || !ready) return;
    const before = beforeCanvas.current;
    const w = before.width;
    const h = before.height;
    const bctx = before.getContext("2d", { willReadFrequently: true });
    if (!bctx) return;
    const src = bctx.getImageData(0, 0, w, h);
    const preset = getPreset(presetId);
    const graded = applyGrade(src, preset.params);
    if (presetId === "soft-glam") applySoftGlow(graded, 0.22);
    const after = document.createElement("canvas");
    after.width = w;
    after.height = h;
    const actx = after.getContext("2d");
    if (!actx) return;
    actx.putImageData(graded, 0, 0);
    afterCanvas.current = after;
  }, [presetId, ready]);

  // Composite before/after + divider
  useEffect(() => {
    const view = viewRef.current;
    const before = beforeCanvas.current;
    const after = afterCanvas.current;
    if (!view || !before || !after || !ready) return;
    const { w, h } = dims.current;
    view.width = w;
    view.height = h;
    const ctx = view.getContext("2d");
    if (!ctx) return;

    // compare: 0 = full after, 1 = full before
    // left = after, right = before
    const split = Math.round((1 - compare) * w);

    ctx.clearRect(0, 0, w, h);
    // Full before as base
    ctx.drawImage(before, 0, 0);
    // After clipped to left portion
    if (split > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, split, h);
      ctx.clip();
      ctx.drawImage(after, 0, 0);
      ctx.restore();
    }
    // Divider
    if (split > 0 && split < w) {
      ctx.fillStyle = "rgba(255, 230, 200, 0.85)";
      ctx.fillRect(split - 1, 0, 2, h);
      // Handle knob
      ctx.beginPath();
      ctx.arc(split, h / 2, 10, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(248, 228, 212, 0.95)";
      ctx.fill();
      ctx.strokeStyle = "rgba(26, 16, 12, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [compare, presetId, ready, imageUrl]);

  if (!imageUrl) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl shadow-rose-950/40">
      {busy && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 text-xs uppercase tracking-[0.25em] text-white/60">
          Loading…
        </div>
      )}
      <canvas
        ref={viewRef}
        className="block h-auto w-full max-h-[70vh] object-contain"
      />
      <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur">
        After ← → Before
      </div>
    </div>
  );
}
