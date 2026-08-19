"use client";

import { useEffect, useRef } from "react";

// DESIGN.md §4.10: real film flicker, not a static noise texture. Six
// precomputed feTurbulence variants (different seeds) swapped at ~8fps,
// which reads as flicker without animating a live SVG filter every frame.
const SEEDS = [2, 7, 13, 21, 34, 55];

function noiseUrl(seed) {
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='${seed}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
}

export default function GrainOverlay() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % SEEDS.length;
      el.style.backgroundImage = noiseUrl(SEEDS[i]);
    }, 125); // ~8fps

    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      className="grain-overlay"
      aria-hidden="true"
      style={{ backgroundImage: noiseUrl(SEEDS[0]) }}
    />
  );
}
