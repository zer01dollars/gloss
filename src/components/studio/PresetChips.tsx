"use client";

import { PRESETS } from "@/lib/filters";
import { useGlossStore } from "@/store/glossStore";

export function PresetChips() {
  const presetId = useGlossStore((s) => s.presetId);
  const setPreset = useGlossStore((s) => s.setPreset);
  const active = PRESETS.find((p) => p.id === presetId);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
          Look
        </p>
        <p className="truncate text-right text-[11px] text-white/40">
          {active?.blurb}
        </p>
      </div>
      {/* Chips scroll in place so Beautify + Fine-tune stay on-screen */}
      <div className="max-h-32 overflow-y-auto overscroll-contain pr-0.5 [-webkit-overflow-scrolling:touch] sm:max-h-36">
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => {
            const on = p.id === presetId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPreset(p.id)}
                title={p.blurb}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
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
    </div>
  );
}
