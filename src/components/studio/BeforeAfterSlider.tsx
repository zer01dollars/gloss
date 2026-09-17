"use client";

import { useGlossStore } from "@/store/glossStore";

export function BeforeAfterSlider() {
  const compare = useGlossStore((s) => s.compare);
  const setCompare = useGlossStore((s) => s.setCompare);

  return (
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
      />
    </div>
  );
}
