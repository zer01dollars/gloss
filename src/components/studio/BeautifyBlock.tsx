"use client";

type BeautifyBlockProps = {
  value: number;
  onChange: (v: number) => void;
  /** Slightly tighter padding for dense sidebars */
  compact?: boolean;
};

export function BeautifyBlock({
  value,
  onChange,
  compact = false,
}: BeautifyBlockProps) {
  const on = value > 0.01;

  return (
    <div
      className={`space-y-3 rounded-xl border border-rose-300/15 bg-rose-500/[0.06] ${
        compact ? "p-2.5" : "p-3"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-rose-100/70">
            Beautify
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-white/40">
            Skin smooth · soft glow · subtle brighten
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => onChange(on ? 0 : 0.35)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            on
              ? "bg-gradient-to-r from-rose-300 to-amber-200"
              : "bg-white/15"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
              on ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <label className="block space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/55">Strength</span>
          <span className="tabular-nums text-white/30">
            {Math.round(value * 100)}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="gloss-range w-full"
          aria-label="Beautify strength"
        />
      </label>
    </div>
  );
}
