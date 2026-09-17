/** Gloss color-grade presets + canvas pixel pipeline */

export type PresetId =
  | "soft-glam"
  | "club-flash"
  | "golden-hour"
  | "film"
  | "clean"
  | "midnight"
  | "peach-fizz"
  | "noir"
  | "ice"
  | "vintage-fade"
  | "neon-pop"
  | "warm-portrait"
  | "bw-soft"
  | "bleach-bypass"
  | "cyber-pink"
  | "toxic-green"
  | "redroom"
  | "chrome"
  | "high-key-blowout"
  | "deep-freeze"
  | "glitch-heat"
  | "rose-quartz"
  | "honey-glass"
  | "velvet-matte"
  | "silk-daylight"
  | "champagne"
  | "lavender-haze"
  | "porcelain"
  | "sunset-blush"
  | "editorial-cool"
  | "cocoa-glow"
  | "misty-morning"
  | "ultraviolet"
  | "acid-wash"
  | "blood-moon"
  | "static-snow"
  | "plasma"
  | "void-black"
  | "laser-lime"
  | "hot-magenta"
  | "crushed-teal"
  | "infrared-wash";

export interface GradeParams {
  brightness: number; // -1..1 additive (scaled)
  contrast: number; // 0..2 (1 = neutral)
  saturation: number; // 0..2 (1 = neutral)
  warmth: number; // -1 cool .. 1 warm
  vignette: number; // 0..1
  grain: number; // 0..1
  sharpen: number; // 0..1
  shadows: number; // -1..1 lift/crush shadows
  highlights: number; // -1..1 compress/boost highlights
  rose: number; // 0..1 blush/magenta lift for glam
  fade: number; // 0..1 lift blacks / matte fade
  glow: number; // 0..1 soft midtone glow intensity
}

/** Fine-tune deltas layered on a preset (0 = no change). */
export type GradeOverrides = {
  brightness: number;
  contrast: number;
  saturation: number;
  warmth: number;
  vignette: number;
  grain: number;
  sharpen: number;
  fade: number;
  glow: number;
};

export const ZERO_OVERRIDES: GradeOverrides = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  warmth: 0,
  vignette: 0,
  grain: 0,
  sharpen: 0,
  fade: 0,
  glow: 0,
};

export interface Preset {
  id: PresetId;
  label: string;
  blurb: string;
  params: GradeParams;
}

function clamp(n: number, lo: number, hi: number): number {
  return n < lo ? lo : n > hi ? hi : n;
}

/** Merge preset base + custom overrides into effective grade params. */
export function effectiveGrade(
  base: GradeParams,
  overrides: GradeOverrides = ZERO_OVERRIDES
): GradeParams {
  return {
    brightness: clamp(base.brightness + overrides.brightness, -1, 1),
    contrast: clamp(base.contrast + overrides.contrast, 0.2, 2.5),
    saturation: clamp(base.saturation + overrides.saturation, 0, 2.5),
    warmth: clamp(base.warmth + overrides.warmth, -1, 1),
    vignette: clamp(base.vignette + overrides.vignette, 0, 1),
    grain: clamp(base.grain + overrides.grain, 0, 1),
    sharpen: clamp(base.sharpen + overrides.sharpen, 0, 1),
    shadows: base.shadows,
    highlights: base.highlights,
    rose: base.rose,
    fade: clamp(base.fade + overrides.fade, 0, 1),
    glow: clamp(base.glow + overrides.glow, 0, 1),
  };
}

export const PRESETS: Preset[] = [
  {
    id: "soft-glam",
    label: "Soft Glam",
    blurb: "Lifted skin · rose glow · soft focus sheen",
    params: {
      brightness: 0.08,
      contrast: 1.08,
      saturation: 1.12,
      warmth: 0.18,
      vignette: 0.28,
      grain: 0.06,
      sharpen: 0.35,
      shadows: 0.12,
      highlights: -0.08,
      rose: 0.14,
      fade: 0.04,
      glow: 0.22,
    },
  },
  {
    id: "club-flash",
    label: "Club Flash",
    blurb: "Hard flash · cool shadows · punchy contrast",
    params: {
      brightness: 0.04,
      contrast: 1.28,
      saturation: 1.05,
      warmth: -0.12,
      vignette: 0.42,
      grain: 0.12,
      sharpen: 0.55,
      shadows: -0.1,
      highlights: 0.15,
      rose: 0.04,
      fade: 0,
      glow: 0,
    },
  },
  {
    id: "golden-hour",
    label: "Golden Hour",
    blurb: "Honey light · warm skin · dreamy haze",
    params: {
      brightness: 0.1,
      contrast: 1.05,
      saturation: 1.18,
      warmth: 0.42,
      vignette: 0.22,
      grain: 0.08,
      sharpen: 0.2,
      shadows: 0.18,
      highlights: -0.05,
      rose: 0.08,
      fade: 0.06,
      glow: 0.1,
    },
  },
  {
    id: "film",
    label: "Film",
    blurb: "Analog grain · faded blacks · soft teal",
    params: {
      brightness: 0.02,
      contrast: 0.92,
      saturation: 0.88,
      warmth: 0.08,
      vignette: 0.35,
      grain: 0.28,
      sharpen: 0.12,
      shadows: 0.22,
      highlights: -0.12,
      rose: 0.02,
      fade: 0.22,
      glow: 0,
    },
  },
  {
    id: "clean",
    label: "Clean",
    blurb: "Crisp · bright · editorial clarity",
    params: {
      brightness: 0.06,
      contrast: 1.14,
      saturation: 1.02,
      warmth: 0.04,
      vignette: 0.12,
      grain: 0.02,
      sharpen: 0.5,
      shadows: 0.06,
      highlights: 0.02,
      rose: 0.02,
      fade: 0,
      glow: 0,
    },
  },
  {
    id: "midnight",
    label: "Midnight",
    blurb: "Ink shadows · cool blue · late-night mood",
    params: {
      brightness: -0.06,
      contrast: 1.22,
      saturation: 0.92,
      warmth: -0.38,
      vignette: 0.55,
      grain: 0.1,
      sharpen: 0.3,
      shadows: -0.18,
      highlights: 0.08,
      rose: 0.02,
      fade: 0.04,
      glow: 0.04,
    },
  },
  {
    id: "peach-fizz",
    label: "Peach Fizz",
    blurb: "Peachy skin · sparkling lift · soft fizz grain",
    params: {
      brightness: 0.12,
      contrast: 1.02,
      saturation: 1.2,
      warmth: 0.32,
      vignette: 0.18,
      grain: 0.14,
      sharpen: 0.22,
      shadows: 0.16,
      highlights: -0.04,
      rose: 0.18,
      fade: 0.08,
      glow: 0.14,
    },
  },
  {
    id: "noir",
    label: "Noir",
    blurb: "Deep blacks · hard light · cinematic drama",
    params: {
      brightness: -0.04,
      contrast: 1.45,
      saturation: 0.35,
      warmth: -0.05,
      vignette: 0.58,
      grain: 0.18,
      sharpen: 0.48,
      shadows: -0.28,
      highlights: 0.2,
      rose: 0,
      fade: 0.02,
      glow: 0,
    },
  },
  {
    id: "ice",
    label: "Ice",
    blurb: "Frosted cool · crisp edges · glassy clarity",
    params: {
      brightness: 0.08,
      contrast: 1.16,
      saturation: 0.95,
      warmth: -0.45,
      vignette: 0.2,
      grain: 0.04,
      sharpen: 0.62,
      shadows: 0.08,
      highlights: 0.1,
      rose: 0,
      fade: 0.02,
      glow: 0.06,
    },
  },
  {
    id: "vintage-fade",
    label: "Vintage Fade",
    blurb: "Matte blacks · warm wash · old-print grain",
    params: {
      brightness: 0.04,
      contrast: 0.86,
      saturation: 0.78,
      warmth: 0.28,
      vignette: 0.4,
      grain: 0.32,
      sharpen: 0.08,
      shadows: 0.28,
      highlights: -0.16,
      rose: 0.06,
      fade: 0.42,
      glow: 0.02,
    },
  },
  {
    id: "neon-pop",
    label: "Neon Pop",
    blurb: "Electric color · cool shadows · nightlife punch",
    params: {
      brightness: 0.05,
      contrast: 1.32,
      saturation: 1.45,
      warmth: -0.22,
      vignette: 0.38,
      grain: 0.08,
      sharpen: 0.45,
      shadows: -0.06,
      highlights: 0.18,
      rose: 0.1,
      fade: 0,
      glow: 0.12,
    },
  },
  {
    id: "warm-portrait",
    label: "Warm Portrait",
    blurb: "Flattering warmth · soft skin · gentle vignette",
    params: {
      brightness: 0.09,
      contrast: 1.06,
      saturation: 1.08,
      warmth: 0.36,
      vignette: 0.32,
      grain: 0.05,
      sharpen: 0.28,
      shadows: 0.14,
      highlights: -0.1,
      rose: 0.1,
      fade: 0.05,
      glow: 0.16,
    },
  },
  {
    id: "bw-soft",
    label: "B&W Soft",
    blurb: "Gentle mono · creamy midtones · quiet grain",
    params: {
      brightness: 0.05,
      contrast: 1.05,
      saturation: 0.02,
      warmth: 0.02,
      vignette: 0.3,
      grain: 0.16,
      sharpen: 0.25,
      shadows: 0.15,
      highlights: -0.06,
      rose: 0,
      fade: 0.12,
      glow: 0.08,
    },
  },
  {
    id: "bleach-bypass",
    label: "Bleach Bypass",
    blurb: "Extreme · harsh contrast · crushed desat · silver skip",
    params: {
      brightness: -0.04,
      contrast: 1.55,
      saturation: 0.42,
      warmth: -0.15,
      vignette: 0.52,
      grain: 0.32,
      sharpen: 0.62,
      shadows: -0.35,
      highlights: 0.28,
      rose: 0,
      fade: 0.02,
      glow: 0,
    },
  },
  {
    id: "cyber-pink",
    label: "Cyber Pink",
    blurb: "Extreme · magenta/cyan split · hyperpop sat",
    params: {
      brightness: 0.06,
      contrast: 1.42,
      saturation: 1.75,
      warmth: -0.28,
      vignette: 0.48,
      grain: 0.14,
      sharpen: 0.5,
      shadows: -0.12,
      highlights: 0.22,
      rose: 0.42,
      fade: 0,
      glow: 0.28,
    },
  },
  {
    id: "toxic-green",
    label: "Toxic Green",
    blurb: "Extreme · sickly green cast · heavy vignette",
    params: {
      brightness: -0.04,
      contrast: 1.4,
      saturation: 1.48,
      warmth: 0.22,
      vignette: 0.7,
      grain: 0.26,
      sharpen: 0.38,
      shadows: -0.22,
      highlights: 0.08,
      rose: 0,
      fade: 0.1,
      glow: 0.12,
    },
  },
  {
    id: "redroom",
    label: "Redroom",
    blurb: "Extreme · deep red wash · darkroom heat",
    params: {
      brightness: -0.12,
      contrast: 1.48,
      saturation: 1.28,
      warmth: 0.85,
      vignette: 0.72,
      grain: 0.28,
      sharpen: 0.35,
      shadows: -0.32,
      highlights: -0.08,
      rose: 0.55,
      fade: 0.04,
      glow: 0.16,
    },
  },
  {
    id: "chrome",
    label: "Chrome",
    blurb: "Extreme · metallic cool · razor contrast",
    params: {
      brightness: 0.1,
      contrast: 1.62,
      saturation: 0.55,
      warmth: -0.62,
      vignette: 0.45,
      grain: 0.08,
      sharpen: 0.78,
      shadows: -0.22,
      highlights: 0.35,
      rose: 0,
      fade: 0,
      glow: 0.08,
    },
  },
  {
    id: "high-key-blowout",
    label: "High Key Blowout",
    blurb: "Extreme · solarized lift · blown highlights",
    params: {
      brightness: 0.42,
      contrast: 1.45,
      saturation: 1.15,
      warmth: 0.12,
      vignette: 0.15,
      grain: 0.06,
      sharpen: 0.3,
      shadows: 0.35,
      highlights: 0.55,
      rose: 0.06,
      fade: 0.08,
      glow: 0.38,
    },
  },
  {
    id: "deep-freeze",
    label: "Deep Freeze",
    blurb: "Extreme · arctic blue · high-contrast frost",
    params: {
      brightness: -0.08,
      contrast: 1.52,
      saturation: 0.88,
      warmth: -0.88,
      vignette: 0.58,
      grain: 0.18,
      sharpen: 0.55,
      shadows: -0.28,
      highlights: 0.2,
      rose: 0,
      fade: 0.02,
      glow: 0.05,
    },
  },
  {
    id: "glitch-heat",
    label: "Glitch Heat",
    blurb: "Extreme · warm crush · heavy grain · glow",
    params: {
      brightness: 0.08,
      contrast: 1.48,
      saturation: 1.55,
      warmth: 0.78,
      vignette: 0.55,
      grain: 0.5,
      sharpen: 0.42,
      shadows: -0.18,
      highlights: 0.25,
      rose: 0.22,
      fade: 0.05,
      glow: 0.35,
    },
  },
  {
    id: "rose-quartz",
    label: "Rose Quartz",
    blurb: "Soft rose · polished skin · quiet glow",
    params: {
      brightness: 0.1,
      contrast: 1.06,
      saturation: 1.14,
      warmth: 0.16,
      vignette: 0.24,
      grain: 0.05,
      sharpen: 0.28,
      shadows: 0.14,
      highlights: -0.08,
      rose: 0.22,
      fade: 0.06,
      glow: 0.2,
    },
  },
  {
    id: "honey-glass",
    label: "Honey Glass",
    blurb: "Amber light · glassy skin · sweet warmth",
    params: {
      brightness: 0.11,
      contrast: 1.1,
      saturation: 1.16,
      warmth: 0.48,
      vignette: 0.26,
      grain: 0.06,
      sharpen: 0.24,
      shadows: 0.16,
      highlights: -0.04,
      rose: 0.08,
      fade: 0.05,
      glow: 0.18,
    },
  },
  {
    id: "velvet-matte",
    label: "Velvet Matte",
    blurb: "Matte blacks · soft glam · hush fade",
    params: {
      brightness: 0.04,
      contrast: 0.96,
      saturation: 1.05,
      warmth: 0.14,
      vignette: 0.34,
      grain: 0.1,
      sharpen: 0.2,
      shadows: 0.2,
      highlights: -0.12,
      rose: 0.12,
      fade: 0.28,
      glow: 0.1,
    },
  },
  {
    id: "silk-daylight",
    label: "Silk Daylight",
    blurb: "Bright airy · silk skin · open shadows",
    params: {
      brightness: 0.14,
      contrast: 1.08,
      saturation: 1.04,
      warmth: 0.1,
      vignette: 0.1,
      grain: 0.03,
      sharpen: 0.4,
      shadows: 0.22,
      highlights: 0.06,
      rose: 0.04,
      fade: 0.02,
      glow: 0.08,
    },
  },
  {
    id: "champagne",
    label: "Champagne",
    blurb: "Gold sparkle · flattering lift · soft sheen",
    params: {
      brightness: 0.12,
      contrast: 1.12,
      saturation: 1.18,
      warmth: 0.38,
      vignette: 0.28,
      grain: 0.07,
      sharpen: 0.32,
      shadows: 0.12,
      highlights: 0.08,
      rose: 0.1,
      fade: 0.04,
      glow: 0.24,
    },
  },
  {
    id: "lavender-haze",
    label: "Lavender Haze",
    blurb: "Cool lilac · dreamy midtones · soft veil",
    params: {
      brightness: 0.08,
      contrast: 1.04,
      saturation: 1.1,
      warmth: -0.22,
      vignette: 0.3,
      grain: 0.08,
      sharpen: 0.22,
      shadows: 0.18,
      highlights: -0.06,
      rose: 0.2,
      fade: 0.1,
      glow: 0.16,
    },
  },
  {
    id: "porcelain",
    label: "Porcelain",
    blurb: "Fair cool · porcelain skin · crisp clarity",
    params: {
      brightness: 0.12,
      contrast: 1.14,
      saturation: 0.92,
      warmth: -0.18,
      vignette: 0.18,
      grain: 0.04,
      sharpen: 0.48,
      shadows: 0.16,
      highlights: 0.1,
      rose: 0.06,
      fade: 0.02,
      glow: 0.1,
    },
  },
  {
    id: "sunset-blush",
    label: "Sunset Blush",
    blurb: "Warm horizon · flushed cheeks · golden haze",
    params: {
      brightness: 0.09,
      contrast: 1.1,
      saturation: 1.22,
      warmth: 0.52,
      vignette: 0.32,
      grain: 0.09,
      sharpen: 0.26,
      shadows: 0.1,
      highlights: -0.02,
      rose: 0.2,
      fade: 0.06,
      glow: 0.18,
    },
  },
  {
    id: "editorial-cool",
    label: "Editorial Cool",
    blurb: "Magazine cool · sharp edges · muted chic",
    params: {
      brightness: 0.03,
      contrast: 1.2,
      saturation: 0.9,
      warmth: -0.28,
      vignette: 0.28,
      grain: 0.06,
      sharpen: 0.58,
      shadows: -0.06,
      highlights: 0.12,
      rose: 0.02,
      fade: 0.04,
      glow: 0.02,
    },
  },
  {
    id: "cocoa-glow",
    label: "Cocoa Glow",
    blurb: "Deep warm · rich midtones · soft radiance",
    params: {
      brightness: 0.06,
      contrast: 1.12,
      saturation: 1.15,
      warmth: 0.44,
      vignette: 0.36,
      grain: 0.08,
      sharpen: 0.3,
      shadows: 0.18,
      highlights: -0.1,
      rose: 0.08,
      fade: 0.05,
      glow: 0.2,
    },
  },
  {
    id: "misty-morning",
    label: "Misty Morning",
    blurb: "Foggy lift · soft contrast · quiet pastel",
    params: {
      brightness: 0.1,
      contrast: 0.88,
      saturation: 0.95,
      warmth: 0.08,
      vignette: 0.2,
      grain: 0.12,
      sharpen: 0.15,
      shadows: 0.28,
      highlights: -0.14,
      rose: 0.05,
      fade: 0.24,
      glow: 0.12,
    },
  },
  {
    id: "ultraviolet",
    label: "Ultraviolet",
    blurb: "Extreme · violet cast · nightclub voltage",
    params: {
      brightness: -0.02,
      contrast: 1.44,
      saturation: 1.58,
      warmth: -0.48,
      vignette: 0.6,
      grain: 0.16,
      sharpen: 0.48,
      shadows: -0.16,
      highlights: 0.18,
      rose: 0.38,
      fade: 0,
      glow: 0.22,
    },
  },
  {
    id: "acid-wash",
    label: "Acid Wash",
    blurb: "Extreme · sickly yellow-green · crushed punch",
    params: {
      brightness: 0.05,
      contrast: 1.5,
      saturation: 1.62,
      warmth: 0.55,
      vignette: 0.5,
      grain: 0.3,
      sharpen: 0.45,
      shadows: -0.2,
      highlights: 0.22,
      rose: 0,
      fade: 0.04,
      glow: 0.08,
    },
  },
  {
    id: "blood-moon",
    label: "Blood Moon",
    blurb: "Extreme · crimson night · horror-adjacent",
    params: {
      brightness: -0.16,
      contrast: 1.58,
      saturation: 1.35,
      warmth: 0.72,
      vignette: 0.75,
      grain: 0.35,
      sharpen: 0.4,
      shadows: -0.4,
      highlights: 0.05,
      rose: 0.48,
      fade: 0.02,
      glow: 0.12,
    },
  },
  {
    id: "static-snow",
    label: "Static Snow",
    blurb: "Extreme · heavy grain · near-mono frost",
    params: {
      brightness: 0.08,
      contrast: 1.4,
      saturation: 0.12,
      warmth: -0.2,
      vignette: 0.4,
      grain: 0.5,
      sharpen: 0.35,
      shadows: -0.1,
      highlights: 0.2,
      rose: 0,
      fade: 0.08,
      glow: 0.04,
    },
  },
  {
    id: "plasma",
    label: "Plasma",
    blurb: "Extreme · electric sat · glowing midtones",
    params: {
      brightness: 0.1,
      contrast: 1.46,
      saturation: 1.8,
      warmth: -0.15,
      vignette: 0.42,
      grain: 0.12,
      sharpen: 0.52,
      shadows: -0.08,
      highlights: 0.28,
      rose: 0.18,
      fade: 0,
      glow: 0.4,
    },
  },
  {
    id: "void-black",
    label: "Void Black",
    blurb: "Extreme · crushed blacks · ink vignette",
    params: {
      brightness: -0.18,
      contrast: 1.65,
      saturation: 0.75,
      warmth: -0.35,
      vignette: 0.82,
      grain: 0.2,
      sharpen: 0.5,
      shadows: -0.45,
      highlights: 0.15,
      rose: 0,
      fade: 0,
      glow: 0,
    },
  },
  {
    id: "laser-lime",
    label: "Laser Lime",
    blurb: "Extreme · neon lime punch · party flash",
    params: {
      brightness: 0.08,
      contrast: 1.42,
      saturation: 1.7,
      warmth: 0.35,
      vignette: 0.48,
      grain: 0.15,
      sharpen: 0.55,
      shadows: -0.1,
      highlights: 0.25,
      rose: 0.04,
      fade: 0,
      glow: 0.2,
    },
  },
  {
    id: "hot-magenta",
    label: "Hot Magenta",
    blurb: "Extreme · blazing rose · hyperpop blush",
    params: {
      brightness: 0.07,
      contrast: 1.4,
      saturation: 1.72,
      warmth: 0.2,
      vignette: 0.5,
      grain: 0.18,
      sharpen: 0.45,
      shadows: -0.08,
      highlights: 0.2,
      rose: 0.6,
      fade: 0,
      glow: 0.3,
    },
  },
  {
    id: "crushed-teal",
    label: "Crushed Teal",
    blurb: "Extreme · teal crush · cinematic contrast",
    params: {
      brightness: -0.05,
      contrast: 1.5,
      saturation: 1.25,
      warmth: -0.7,
      vignette: 0.55,
      grain: 0.22,
      sharpen: 0.48,
      shadows: -0.3,
      highlights: 0.18,
      rose: 0.05,
      fade: 0.03,
      glow: 0.06,
    },
  },
  {
    id: "infrared-wash",
    label: "Infrared Wash",
    blurb: "Extreme · false-color heat · surreal glow",
    params: {
      brightness: 0.12,
      contrast: 1.45,
      saturation: 1.5,
      warmth: 0.7,
      vignette: 0.45,
      grain: 0.24,
      sharpen: 0.38,
      shadows: 0.1,
      highlights: 0.3,
      rose: 0.35,
      fade: 0.06,
      glow: 0.32,
    },
  },
];

export function getPreset(id: PresetId): Preset {
  return PRESETS.find((p) => p.id === id) ?? PRESETS[0];
}

function clamp255(n: number): number {
  return n < 0 ? 0 : n > 255 ? 255 : n;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Apply grade to ImageData in place (or return new). */
export function applyGrade(
  source: ImageData,
  params: GradeParams,
  out?: ImageData
): ImageData {
  const { width, height, data: src } = source;
  const dest = out ?? new ImageData(width, height);
  const dst = dest.data;
  const rand = mulberry32(width * 73856093 + height * 19349663);

  const brightness = params.brightness * 40;
  const contrast = params.contrast;
  const sat = params.saturation;
  const warmth = params.warmth;
  const rose = params.rose;
  const shadows = params.shadows;
  const highlights = params.highlights;
  const vignetteStrength = params.vignette;
  const grainAmt = params.grain * 28;
  const fade = params.fade;
  const cx = width * 0.5;
  const cy = height * 0.5;
  const maxDist = Math.sqrt(cx * cx + cy * cy);

  // First pass: color grade (copy to dest)
  for (let i = 0; i < src.length; i += 4) {
    let r = src[i];
    let g = src[i + 1];
    let b = src[i + 2];
    const a = src[i + 3];

    // Brightness
    r += brightness;
    g += brightness;
    b += brightness;

    // Contrast around midgray
    r = (r - 128) * contrast + 128;
    g = (g - 128) * contrast + 128;
    b = (b - 128) * contrast + 128;

    // Warmth (push R/B)
    r += warmth * 22;
    b -= warmth * 18;
    g += warmth * 4;

    // Rose / blush glam
    r += rose * 18;
    b += rose * 10;
    g -= rose * 4;

    // Saturation
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    r = gray + (r - gray) * sat;
    g = gray + (g - gray) * sat;
    b = gray + (b - gray) * sat;

    // Shadow / highlight tone curve (simple luminance remap)
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let lift = 0;
    if (lum < 128) {
      lift = shadows * (1 - lum / 128) * 35;
    } else {
      lift = highlights * ((lum - 128) / 127) * 30;
    }
    r += lift;
    g += lift;
    b += lift;

    // Matte / vintage fade — lift blacks toward a soft floor
    if (fade > 0.001) {
      const blackLift = fade * 32;
      const compress = 1 - fade * 0.18;
      r = r * compress + blackLift;
      g = g * compress + blackLift;
      b = b * compress + blackLift;
    }

    const px = (i / 4) % width;
    const py = Math.floor(i / 4 / width);
    const dx = (px - cx) / maxDist;
    const dy = (py - cy) / maxDist;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const vig = 1 - vignetteStrength * Math.pow(dist, 1.6) * 0.85;
    r *= vig;
    g *= vig;
    b *= vig;

    if (grainAmt > 0) {
      const n = (rand() - 0.5) * grainAmt;
      r += n;
      g += n;
      b += n;
    }

    dst[i] = clamp255(r);
    dst[i + 1] = clamp255(g);
    dst[i + 2] = clamp255(b);
    dst[i + 3] = a;
  }

  // Sharpen via unsharp mask (3x3) if needed
  if (params.sharpen > 0.01) {
    const amount = params.sharpen * 0.65;
    const temp = new Uint8ClampedArray(dst);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = (y * width + x) * 4;
        for (let c = 0; c < 3; c++) {
          const center = temp[i + c];
          const blur =
            (temp[((y - 1) * width + (x - 1)) * 4 + c] +
              temp[((y - 1) * width + x) * 4 + c] +
              temp[((y - 1) * width + (x + 1)) * 4 + c] +
              temp[(y * width + (x - 1)) * 4 + c] +
              center +
              temp[(y * width + (x + 1)) * 4 + c] +
              temp[((y + 1) * width + (x - 1)) * 4 + c] +
              temp[((y + 1) * width + x) * 4 + c] +
              temp[((y + 1) * width + (x + 1)) * 4 + c]) /
            9;
          dst[i + c] = clamp255(center + (center - blur) * amount);
        }
      }
    }
  }

  return dest;
}

/** Midtone glow — call after applyGrade when glow > 0 (or soft-glam base). */
export function applySoftGlow(data: ImageData, amount = 0.18): void {
  if (amount <= 0) return;
  const { width, height, data: d } = data;
  const copy = new Uint8ClampedArray(d);
  // Cheap box blur sample for glow add
  for (let y = 2; y < height - 2; y += 1) {
    for (let x = 2; x < width - 2; x += 1) {
      const i = (y * width + x) * 4;
      let r = 0,
        g = 0,
        b = 0,
        n = 0;
      for (let oy = -2; oy <= 2; oy++) {
        for (let ox = -2; ox <= 2; ox++) {
          const j = ((y + oy) * width + (x + ox)) * 4;
          r += copy[j];
          g += copy[j + 1];
          b += copy[j + 2];
          n++;
        }
      }
      r /= n;
      g /= n;
      b /= n;
      const lum = 0.2126 * copy[i] + 0.7152 * copy[i + 1] + 0.0722 * copy[i + 2];
      // Glow only midtones / lights
      const w = amount * Math.min(1, Math.max(0, (lum - 40) / 160));
      d[i] = clamp255(copy[i] * (1 - w * 0.35) + r * w * 1.15);
      d[i + 1] = clamp255(copy[i + 1] * (1 - w * 0.35) + g * w * 1.1);
      d[i + 2] = clamp255(copy[i + 2] * (1 - w * 0.35) + b * w * 1.05);
    }
  }
}

/** Grade + optional soft glow from effective params. */
export function applyGradeWithGlow(
  source: ImageData,
  params: GradeParams,
  out?: ImageData
): ImageData {
  const graded = applyGrade(source, params, out);
  if (params.glow > 0.01) {
    applySoftGlow(graded, params.glow);
  }
  return graded;
}

function skinLikeness(r: number, g: number, b: number): number {
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (lum < 42 || lum > 228) return 0;
  if (r < 70 || g < 35 || b < 18) return 0;
  // Warm-ish skin: R high vs B, G between
  if (r < b * 0.95) return 0;
  const warm = (r - b) / 255;
  const rgGap = Math.abs(r - g) / 255;
  let w = warm * 2.4 - rgGap * 0.6;
  // Prefer midtones
  w *= 1 - Math.min(1, Math.abs(lum - 135) / 115);
  return clamp(w, 0, 1);
}

/** Separable box blur into Float32 RGB buffers (radius in px). */
function boxBlurRgb(
  src: Uint8ClampedArray,
  width: number,
  height: number,
  radius: number
): Float32Array {
  const out = new Float32Array(width * height * 3);
  const tmp = new Float32Array(width * height * 3);
  const r = Math.max(1, Math.round(radius));

  // Horizontal
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let rs = 0,
        gs = 0,
        bs = 0,
        n = 0;
      const x0 = Math.max(0, x - r);
      const x1 = Math.min(width - 1, x + r);
      for (let xx = x0; xx <= x1; xx++) {
        const i = (y * width + xx) * 4;
        rs += src[i];
        gs += src[i + 1];
        bs += src[i + 2];
        n++;
      }
      const o = (y * width + x) * 3;
      tmp[o] = rs / n;
      tmp[o + 1] = gs / n;
      tmp[o + 2] = bs / n;
    }
  }

  // Vertical
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let rs = 0,
        gs = 0,
        bs = 0,
        n = 0;
      const y0 = Math.max(0, y - r);
      const y1 = Math.min(height - 1, y + r);
      for (let yy = y0; yy <= y1; yy++) {
        const o = (yy * width + x) * 3;
        rs += tmp[o];
        gs += tmp[o + 1];
        bs += tmp[o + 2];
        n++;
      }
      const o = (y * width + x) * 3;
      out[o] = rs / n;
      out[o + 1] = gs / n;
      out[o + 2] = bs / n;
    }
  }
  return out;
}

/**
 * Beautify pass (MVP, no face ML): edge-preserving midtone skin smooth,
 * soft glow, subtle rose, and cheap highlight brighten (teeth/eyes-ish).
 * strength 0..1
 */
export function applyBeautify(data: ImageData, strength: number): void {
  if (strength <= 0.01) return;
  const s = clamp(strength, 0, 1);
  const { width, height, data: d } = data;
  const copy = new Uint8ClampedArray(d);
  const radius = 1 + Math.round(s * 3.5);
  const blurred = boxBlurRgb(copy, width, height, radius);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const bi = (y * width + x) * 3;
      let r = copy[i];
      let g = copy[i + 1];
      let b = copy[i + 2];
      const br = blurred[bi];
      const bg = blurred[bi + 1];
      const bb = blurred[bi + 2];

      const skin = skinLikeness(r, g, b);
      const edge =
        (Math.abs(r - br) + Math.abs(g - bg) + Math.abs(b - bb)) / 3;
      const edgeW = clamp(edge / 28, 0, 1);
      const smoothMix = s * skin * (1 - edgeW) * 0.78;
      r = r * (1 - smoothMix) + br * smoothMix;
      g = g * (1 - smoothMix) + bg * smoothMix;
      b = b * (1 - smoothMix) + bb * smoothMix;

      // Subtle rose / flush on smoothed skin
      const roseAmt = s * skin * 0.1;
      r += roseAmt * 14;
      b += roseAmt * 6;
      g -= roseAmt * 2;

      // Cheap highlight brighten: bright + low-sat (teeth-ish) or bright cool (sclera-ish)
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const sat =
        Math.max(r, g, b) - Math.min(r, g, b);
      if (lum > 155 && sat < 42) {
        const t = s * clamp((lum - 155) / 70, 0, 1) * (1 - sat / 42) * 0.22;
        r += t * 18;
        g += t * 18;
        b += t * 20;
      } else if (lum > 120 && lum < 200 && b > r * 0.92 && sat < 55) {
        // mild cool mid-high lift (eye whites heuristic)
        const t = s * 0.08 * clamp((160 - Math.abs(lum - 160)) / 40, 0, 1);
        r += t * 10;
        g += t * 12;
        b += t * 16;
      }

      d[i] = clamp255(r);
      d[i + 1] = clamp255(g);
      d[i + 2] = clamp255(b);
    }
  }

  // Extra soft glow scaled by beautify
  if (s > 0.08) {
    applySoftGlow(data, s * 0.14);
  }
}

/** Full studio pipeline: grade → glow → beautify. */
export function applyFullGrade(
  source: ImageData,
  params: GradeParams,
  beautifyStrength = 0,
  out?: ImageData
): ImageData {
  const graded = applyGradeWithGlow(source, params, out);
  if (beautifyStrength > 0.01) {
    applyBeautify(graded, beautifyStrength);
  }
  return graded;
}

export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

export function drawImageToCanvas(
  img: HTMLImageElement,
  maxEdge: number
): { canvas: HTMLCanvasElement; width: number; height: number } {
  const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
  const width = Math.max(1, Math.round(img.naturalWidth * scale));
  const height = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d context unavailable");
  ctx.drawImage(img, 0, 0, width, height);
  return { canvas, width, height };
}
