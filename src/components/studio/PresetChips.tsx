"use client";

import { PRESETS } from "@/lib/filters";
import { useGlossStore } from "@/store/glossStore";

export function PresetChips() {
  const presetId = useGlossStore((s) => s.presetId);
  const setPreset = useGlossStore((s) => s.setPreset);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
          Look
        </p>
        <p className="hidden text-xs text-white/40 sm:block">
          {PRESETS.find((p) => p.id === presetId)?.blurb}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => {
          const active = p.id === presetId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPreset(p.id)}
              className={`rounded-full px-3.5 py-2 text-xs font-medium transition ${
                active
                  ? "bg-gradient-to-r from-rose-200 via-amber-100 to-rose-200 text-[#1a1010] shadow-lg shadow-rose-900/30"
                  : "border border-white/12 bg-white/[0.04] text-white/70 hover:border-white/25 hover:text-white"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-white/40 sm:hidden">
        {PRESETS.find((p) => p.id === presetId)?.blurb}
      </p>
    </div>
  );
}
