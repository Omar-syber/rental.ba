"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a silhouette (text glyph or a procedural shape) as a field of
 * vertical bars: for each sampled column, find the ink's vertical extent
 * and draw one bar spanning it. Columns with no ink stay empty, which is
 * what produces the perforated / woven look.
 */
export default function BarField({
  mode = "text",
  text,
  fontWeight = 800,
  fontSizeRatio = 0.72,
  drawShape,
  width,
  height,
  barGap = 5,
  barWidth = 2,
  color = "#9e5180",
  anchor = "center",
  progress = 1,
  className,
}) {
  const canvasRef = useRef(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    if (!width || !height) return;
    let cancelled = false;

    const render = async () => {
      if (document.fonts?.ready) {
        try {
          await document.fonts.ready;
        } catch {
          // ignore font-loading race, draw with fallback metrics
        }
      }
      if (cancelled) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const off = document.createElement("canvas");
      off.width = width * dpr;
      off.height = height * dpr;
      const offCtx = off.getContext("2d");
      offCtx.scale(dpr, dpr);

      if (mode === "text" && text) {
        const fontStack =
          getComputedStyle(document.body).getPropertyValue("--font-display").trim() ||
          "sans-serif";
        offCtx.fillStyle = "#000";
        offCtx.textBaseline = "middle";
        offCtx.textAlign = "center";
        let size = height * fontSizeRatio;
        offCtx.font = `${fontWeight} ${size}px ${fontStack}`;
        let w = offCtx.measureText(text).width;
        const maxW = width * 0.94;
        if (w > maxW) {
          size = size * (maxW / w);
          offCtx.font = `${fontWeight} ${size}px ${fontStack}`;
        }
        offCtx.fillText(text, width / 2, height / 2 + size * 0.04);
      } else if (mode === "shape" && drawShape) {
        drawShape(offCtx, width, height);
      }

      const data = offCtx.getImageData(0, 0, width * dpr, height * dpr).data;
      const rowStride = width * dpr * 4;

      const bars = [];
      for (let x = 0; x < width; x += barGap) {
        const px = Math.floor(x * dpr);
        let minY = -1;
        let maxY = -1;
        for (let y = 0; y < height * dpr; y++) {
          const alpha = data[y * rowStride + px * 4 + 3];
          if (alpha > 60) {
            if (minY === -1) minY = y;
            maxY = y;
          }
        }
        if (minY !== -1) {
          bars.push({ x, minY: minY / dpr, maxY: maxY / dpr });
        }
      }

      if (cancelled) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      ctx.fillStyle = color;

      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        const p = progressRef.current;
        for (const bar of bars) {
          const full = bar.maxY - bar.minY;
          const h = full * p;
          let top;
          if (anchor === "bottom") top = bar.maxY - h;
          else if (anchor === "top") top = bar.minY;
          else top = bar.minY + (full - h) / 2;
          ctx.fillRect(bar.x, top, barWidth, Math.max(h, 0.6));
        }
      };

      canvas.__redraw = draw;
      draw();
    };

    render();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, text, width, height, barGap, barWidth, color, anchor, drawShape]);

  useEffect(() => {
    canvasRef.current?.__redraw?.();
  }, [progress]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
