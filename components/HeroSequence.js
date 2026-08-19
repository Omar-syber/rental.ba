"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

/**
 * Canvas player for the Phase 1 scroll-scrubbed walkthrough sequence
 * (Hero scroll spec, Phase 1). Preloads every frame referenced by
 * public/hero-sequence/manifest.json, then exposes an imperative
 * `setProgress(0..1)` so the caller can drive it straight from a
 * ScrollTrigger onUpdate callback without routing every scroll tick
 * through React state (matches BarField's imperative canvas pattern).
 *
 * Until a real video has been run through
 * `npm run hero:frames -- <path>`, manifest.json stays in its placeholder
 * state and this renders nothing — Hero.js falls back to the static
 * hero frame in that case.
 */
const HeroSequence = forwardRef(function HeroSequence(
  { manifestUrl = "/hero-sequence/manifest.json", className, onReady },
  ref
) {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const lastIndexRef = useRef(-1);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "placeholder"

  useEffect(() => {
    let cancelled = false;

    (async () => {
      let manifest;
      try {
        const res = await fetch(manifestUrl);
        manifest = await res.json();
      } catch {
        manifest = { placeholder: true };
      }
      if (cancelled) return;

      if (manifest.placeholder || !manifest.count) {
        setStatus("placeholder");
        onReady?.(false);
        return;
      }

      const dir = manifestUrl.slice(0, manifestUrl.lastIndexOf("/") + 1);
      const loaded = await Promise.all(
        Array.from({ length: manifest.count }, (_, i) => {
          const n = String(i + 1).padStart(4, "0");
          const src = dir + manifest.pattern.replace("%04d", n);
          return new Promise((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
          });
        })
      );
      if (cancelled) return;

      framesRef.current = loaded.filter(Boolean);
      if (framesRef.current.length === 0) {
        setStatus("placeholder");
        onReady?.(false);
        return;
      }
      setStatus("ready");
      onReady?.(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [manifestUrl, onReady]);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || frames.length === 0) return;
    const clampedIndex = Math.max(0, Math.min(frames.length - 1, index));
    const img = frames[clampedIndex];
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.width, ch / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    const c2d = canvas.getContext("2d");
    c2d.clearRect(0, 0, cw, ch);
    c2d.drawImage(img, dx, dy, dw, dh);
    lastIndexRef.current = clampedIndex;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || status !== "ready") return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      drawFrame(lastIndexRef.current === -1 ? framesRef.current.length - 1 : lastIndexRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useImperativeHandle(
    ref,
    () => ({
      // progress 0 -> last frame, progress 1 -> first frame: the sequence
      // plays backward as the visitor scrolls forward (Phase 1 spec).
      setProgress(p) {
        const frames = framesRef.current;
        if (frames.length === 0) return;
        const clamped = Math.max(0, Math.min(1, p));
        const index = Math.round((1 - clamped) * (frames.length - 1));
        if (index !== lastIndexRef.current) drawFrame(index);
      },
      get isReady() {
        return status === "ready";
      },
      get frameCount() {
        return framesRef.current.length;
      },
    }),
    [status]
  );

  if (status !== "ready") return null;
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
});

export default HeroSequence;
