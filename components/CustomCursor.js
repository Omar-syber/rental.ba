"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [kind, setKind] = useState("idle"); // "idle" | "hover" | "label"
  const [label, setLabel] = useState("");
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const dotWrapRef = useRef(null);
  const ringWrapRef = useRef(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-ready");
    return () => document.documentElement.classList.remove("cursor-ready");
  }, []);

  useEffect(() => {
    if (!enabled || !dotWrapRef.current || !ringWrapRef.current) return;

    const dotQuick = {
      x: gsap.quickTo(dotWrapRef.current, "x", { duration: 0.15, ease: "power3.out" }),
      y: gsap.quickTo(dotWrapRef.current, "y", { duration: 0.15, ease: "power3.out" }),
    };
    const ringQuick = {
      x: gsap.quickTo(ringWrapRef.current, "x", { duration: 0.45, ease: "power3.out" }),
      y: gsap.quickTo(ringWrapRef.current, "y", { duration: 0.45, ease: "power3.out" }),
    };

    const onMove = (e) => {
      dotQuick.x(e.clientX);
      dotQuick.y(e.clientY);
      ringQuick.x(e.clientX);
      ringQuick.y(e.clientY);
    };

    const onOver = (e) => {
      const previewEl = e.target.closest?.("[data-cursor-preview]");
      if (previewEl) {
        setPreviewSrc(previewEl.getAttribute("data-cursor-preview"));
        setPreviewVisible(true);
      } else {
        setPreviewVisible(false);
      }

      const labeled = e.target.closest?.("[data-cursor]");
      const interactive = e.target.closest?.("a, button, input, select, textarea, [role='button']");

      // A plain interactive element nested inside a labeled container (e.g.
      // the prev/next arrow buttons inside the draggable carousel stage)
      // shows its own hover state instead of inheriting the container's
      // label — otherwise the arrows would show a "Drag" cursor.
      const nestedInsideLabel = interactive && labeled && interactive !== labeled && labeled.contains(interactive);
      if (labeled && !nestedInsideLabel) {
        setKind("label");
        setLabel(labeled.getAttribute("data-cursor"));
        return;
      }
      setKind(interactive ? "hover" : "idle");
    };

    const onDown = () => document.documentElement.classList.add("cursor-is-down");
    const onUp = () => document.documentElement.classList.remove("cursor-is-down");
    const onLeaveDoc = () => document.documentElement.classList.add("cursor-is-hidden");
    const onEnterDoc = () => document.documentElement.classList.remove("cursor-is-hidden");

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);
    document.documentElement.addEventListener("mouseenter", onEnterDoc);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
      document.documentElement.removeEventListener("mouseenter", onEnterDoc);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor__dot-wrap" ref={dotWrapRef}>
        <div className={`cursor__dot cursor__dot--${kind}`} />
      </div>
      <div className="cursor__ring-wrap" ref={ringWrapRef}>
        <div className={`cursor__ring cursor__ring--${kind}`}>
          <span className="cursor__label">{label}</span>
        </div>
        {previewSrc && (
          <div className={`cursor__preview${previewVisible ? " is-visible" : ""}`}>
            <img src={previewSrc} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
