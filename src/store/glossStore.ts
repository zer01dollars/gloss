"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GradeOverrides, PresetId } from "@/lib/filters";
import { ZERO_OVERRIDES } from "@/lib/filters";

interface GlossState {
  imageUrl: string | null;
  fileName: string | null;
  naturalWidth: number;
  naturalHeight: number;
  presetId: PresetId;
  overrides: GradeOverrides;
  /** Beautify strength 0..1; 0 = off. Default mild. */
  beautify: number;
  compare: number; // 0 = full after, 1 = full before
  setImage: (url: string, fileName: string, w: number, h: number) => void;
  clearImage: () => void;
  setPreset: (id: PresetId) => void;
  setOverride: <K extends keyof GradeOverrides>(
    key: K,
    value: GradeOverrides[K]
  ) => void;
  resetTweaks: () => void;
  setBeautify: (v: number) => void;
  setCompare: (v: number) => void;
  proUnlocked: boolean;
  unlockPro: () => void;
}

export const useGlossStore = create<GlossState>()(
  persist(
    (set) => ({
      imageUrl: null,
      fileName: null,
      naturalWidth: 0,
      naturalHeight: 0,
      presetId: "soft-glam",
      overrides: { ...ZERO_OVERRIDES },
      beautify: 0.35,
      compare: 0.5,
      setImage: (url, fileName, w, h) =>
        set({
          imageUrl: url,
          fileName,
          naturalWidth: w,
          naturalHeight: h,
          compare: 0.5,
        }),
      clearImage: () =>
        set({
          imageUrl: null,
          fileName: null,
          naturalWidth: 0,
          naturalHeight: 0,
        }),
      setPreset: (id) =>
        set({
          presetId: id,
          overrides: { ...ZERO_OVERRIDES },
        }),
      setOverride: (key, value) =>
        set((s) => ({
          overrides: { ...s.overrides, [key]: value },
        })),
      resetTweaks: () => set({ overrides: { ...ZERO_OVERRIDES } }),
      setBeautify: (v) => set({ beautify: Math.min(1, Math.max(0, v)) }),
      setCompare: (v) => set({ compare: Math.min(1, Math.max(0, v)) }),
      proUnlocked: false,
      unlockPro: () => set({ proUnlocked: true }),
    }),
    {
      name: "gloss-pro-v2",
      partialize: (s) => ({
        proUnlocked: s.proUnlocked,
        presetId: s.presetId,
        overrides: s.overrides,
        beautify: s.beautify,
      }),
    }
  )
);
