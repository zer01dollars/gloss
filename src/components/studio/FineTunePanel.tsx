"use client";

import type { GradeOverrides } from "@/lib/filters";
import { useGlossStore } from "@/store/glossStore";

const SLIDERS: {
  key: keyof GradeOverrides;
  label: string;
  min: number;
  max: number;
  step: number;
}[] = [
  { key: "brightness", label: "Brightness", min: -0.5, max: 0.5, step: 0.01 },
  { key: "contrast", label: "Contrast", min: -0.5, max: 0.5, step: 0.01 },
  { key: "saturation", label: "Saturation", min: -0.8, max: 0.8, step: 0.01 },
  { key: "warmth", label: "Warmth", min: -0.8, max: 0.8, step: 0.01 },
  { key: "vignette", label: "Vignette", min: -0.5, max: 0.5, step: 0.01 },
  { key: "grain", label: "Grain", min: -0.4, max: 0.5, step: 0.01 },
  { key: "sharpen", label: "Sharpen", min: -0.5, max: 0.5, step: 0.01 },
  { key: "fade", label: "Fade", min: -0.4, max: 0.5, step: 0.01 },
  { key: "glow", label: "Glow", min: -0.3, max: 0.5, step: 0.01 },
];

export function FineTunePanel() {
  const overrides = useGlossStore((s) => s.overrides);
  const setOverride = useGlossStore((s) => s.setOverride);
  const resetTweaks = useGlossStore((s) => s.resetTweaks);

  const hasTweaks = SLIDERS.some((s) => Math.abs(overrides[s.key]) > 0.001);

  return (
    <div className="space-y-3 border-t border-white/8 pt-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
          Fine-tune
        </p>
        <button
          type="button"
          onClick={resetTweaks}
          disabled={!hasTweaks}
          className="text-[10px] uppercase tracking-[0.18em] text-rose-200/70 transition hover:text-rose-100 disabled:cursor-default disabled:opacity-30"
        >
          Reset tweaks
        </button>
      </div>
      <p className="text-[11px] leading-relaxed text-white/35">
        Custom offsets on the active look. Selecting a preset resets these.
      </p>
      <div className="space-y-3.5">
        {SLIDERS.map(({ key, label, min, max, step }) => {
          const value = overrides[key];
          return (
            <label key={key} className="block space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/55">{label}</span>
                <span className="tabular-nums text-white/30">
                  {value > 0 ? "+" : ""}
                  {value.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => setOverride(key, Number(e.target.value))}
                className="gloss-range w-full"
                aria-label={label}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
