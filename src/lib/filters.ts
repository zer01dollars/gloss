/** Gloss color-grade presets + canvas pixel pipeline */

export type PresetId = "soft-glam" | "club-flash" | "golden-hour" | "film" | "clean";

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
}

export interface Preset {
  id: PresetId;
  label: string;
  blurb: string;
  params: GradeParams;
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

/** Midtone glow for Soft Glam — call after applyGrade when preset is soft-glam */
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
