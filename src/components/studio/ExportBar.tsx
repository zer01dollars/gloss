"use client";

import { useState } from "react";
import {
  applyGrade,
  applySoftGlow,
  getPreset,
} from "@/lib/filters";
import { useGlossStore } from "@/store/glossStore";

const FREE_MAX = 1280;
const PRO_MAX = 4096;

export function ExportBar() {
  const imageUrl = useGlossStore((s) => s.imageUrl);
  const presetId = useGlossStore((s) => s.presetId);
  const proUnlocked = useGlossStore((s) => s.proUnlocked);
  const unlockPro = useGlossStore((s) => s.unlockPro);
  const [exporting, setExporting] = useState(false);

  const exportPng = async () => {
    if (!imageUrl || exporting) return;
    setExporting(true);
    try {
      const img = await loadImage(imageUrl);
      const maxEdge = proUnlocked ? PRO_MAX : FREE_MAX;
      const scale = Math.min(
        1,
        maxEdge / Math.max(img.naturalWidth, img.naturalHeight)
      );
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const src = ctx.getImageData(0, 0, w, h);
      const preset = getPreset(presetId);
      const graded = applyGrade(src, preset.params);
      if (presetId === "soft-glam") applySoftGlow(graded, 0.22);
      ctx.putImageData(graded, 0, 0);

      if (!proUnlocked) {
        ctx.font = `${Math.max(14, w * 0.028)}px Georgia, serif`;
        ctx.fillStyle = "rgba(255, 200, 180, 0.55)";
        ctx.textAlign = "right";
        ctx.fillText("Gloss · Free", w - 20, h - 20);
      }

      const a = document.createElement("a");
      a.download = `gloss-${presetId}${proUnlocked ? "" : "-free"}-${Date.now()}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    } finally {
      setExporting(false);
    }
  };

  if (!imageUrl) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={exportPng}
        disabled={exporting}
        className="btn-gold !px-4 !py-2.5 text-sm disabled:opacity-60"
      >
        {exporting ? "Exporting…" : "Export PNG"}
      </button>
      {!proUnlocked ? (
        <button
          type="button"
          onClick={unlockPro}
          className="rounded-full border border-rose-300/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-100 transition hover:bg-rose-500/20"
        >
          Unlock Pro (demo)
        </button>
      ) : (
        <span className="rounded-full bg-amber-300/15 px-3 py-1.5 text-[10px] uppercase tracking-widest text-amber-100">
          Pro · HD · no watermark
        </span>
      )}
      <span className="text-[10px] text-white/30">
        {proUnlocked ? "Full resolution" : `Free ≤ ${FREE_MAX}px + watermark`}
      </span>
    </div>
  );
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
