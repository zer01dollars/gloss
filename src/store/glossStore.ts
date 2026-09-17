"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PresetId } from "@/lib/filters";

interface GlossState {
  imageUrl: string | null;
  fileName: string | null;
  naturalWidth: number;
  naturalHeight: number;
  presetId: PresetId;
  compare: number; // 0 = full after, 1 = full before (slider position from left = after %)
  setImage: (url: string, fileName: string, w: number, h: number) => void;
  clearImage: () => void;
  setPreset: (id: PresetId) => void;
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
      setPreset: (id) => set({ presetId: id }),
      setCompare: (v) => set({ compare: Math.min(1, Math.max(0, v)) }),
      proUnlocked: false,
      unlockPro: () => set({ proUnlocked: true }),
    }),
    {
      name: "gloss-pro-v1",
      partialize: (s) => ({
        proUnlocked: s.proUnlocked,
        presetId: s.presetId,
      }),
    }
  )
);
