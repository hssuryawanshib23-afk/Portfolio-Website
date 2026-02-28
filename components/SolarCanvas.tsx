"use client";

import { useRef, useEffect } from "react";
import type { SpringValue } from "@react-spring/web";

// ─── Config ──────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 196;

function frameSrc(n: number) {
  return `/frames/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;
}

interface SolarCanvasProps {
  /** Spring value for scroll progress (0..1) — read via .get(), no re-renders */
  sp: SpringValue<number>;
  frames: HTMLImageElement[];
}

export default function SolarCanvas({ sp, frames }: SolarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const framesRef = useRef(frames);
  const rafRef = useRef<number>(0);
  const lastIdxRef = useRef(-1);

  // Keep frames ref in sync without restarting the RAF loop
  useEffect(() => { framesRef.current = frames; }, [frames]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Cap DPR at 1.5 for performance (imperceptible quality difference)
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      lastIdxRef.current = -1; // force redraw after resize
    };

    resize();
    window.addEventListener("resize", resize);

    // ── RAF draw loop ────────────────────────────────────────────────────────
    const draw = () => {
      const { w, h } = sizeRef.current;
      const imgs = framesRef.current;

      if (!w || !h || !imgs.length) {
        if (!imgs.length) {
          ctx.fillStyle = "#050505";
          ctx.fillRect(0, 0, w || window.innerWidth, h || window.innerHeight);
        }
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // Read spring value directly — no setState, no re-render
      const progress = sp.get();
      const idx = Math.min(imgs.length - 1, Math.round(progress * (imgs.length - 1)));

      // Skip draw if same frame as last time
      if (idx === lastIdxRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const img = imgs[idx];
      if (!img?.complete || img.naturalWidth === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // ── "Cover" fit ────────────────────────────────────────────────────────
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(w / iw, h / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
      lastIdxRef.current = idx;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [sp]); // sp ref is stable

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full"
    />
  );
}

// ─── Frame Pre-loader ─────────────────────────────────────────────────────────

export type LoadProgress = {
  loaded: number;
  total: number;
};

export function preloadFrames(
  onProgress: (p: LoadProgress) => void
): Promise<HTMLImageElement[]> {
  const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
  let loaded = 0;

  return new Promise((resolve) => {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = i + 1;
      img.src = frameSrc(frameNum);
      img.decoding = "async";
      images[i] = img;

      const onLoad = () => {
        loaded++;
        onProgress({ loaded, total: TOTAL_FRAMES });
        if (loaded === TOTAL_FRAMES) resolve(images);
      };
      img.addEventListener("load", onLoad, { once: true });
      img.addEventListener("error", onLoad, { once: true });
    }
  });
}

export { TOTAL_FRAMES };
