"use client";

import { useCallback, useRef, useState } from "react";
import { useGlossStore } from "@/store/glossStore";

export function UploadZone() {
  const setImage = useGlossStore((s) => s.setImage);
  const clearImage = useGlossStore((s) => s.clearImage);
  const imageUrl = useGlossStore((s) => s.imageUrl);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File | null | undefined) => {
      setError(null);
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setError("Please drop a photo (JPG, PNG, WEBP).");
        return;
      }
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const prev = useGlossStore.getState().imageUrl;
        if (prev) URL.revokeObjectURL(prev);
        setImage(url, file.name, img.naturalWidth, img.naturalHeight);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        setError("Couldn’t read that image.");
      };
      img.src = url;
    },
    [setImage]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  if (imageUrl) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn-ghost !py-2 !px-4 text-xs"
        >
          Replace photo
        </button>
        <button
          type="button"
          onClick={() => {
            const prev = useGlossStore.getState().imageUrl;
            if (prev) URL.revokeObjectURL(prev);
            clearImage();
          }}
          className="text-xs text-white/40 hover:text-white/70"
        >
          Clear
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`group cursor-pointer rounded-3xl border border-dashed p-10 text-center transition md:p-14 ${
          dragOver
            ? "border-rose-300/50 bg-rose-400/10"
            : "border-white/15 bg-white/[0.03] hover:border-amber-200/35 hover:bg-white/[0.05]"
        }`}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-300/25 to-amber-200/20 ring-1 ring-white/10">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="text-amber-100/90"
            aria-hidden
          >
            <path
              d="M12 16V4m0 0L8 8m4-4 4 4M4 20h16"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="mt-5 font-serif text-2xl text-white">Drop your selfie</p>
        <p className="mt-2 text-sm text-white/45">
          or tap to upload · JPG, PNG, WEBP
        </p>
        <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-white/25">
          Stays on your device
        </p>
      </div>
      {error && <p className="mt-3 text-center text-sm text-rose-300/80">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
