"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticButton({ children, className, href, strength = 0.4, ...rest }) {
  const ref = useRef(null);
  const quick = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;

    quick.current = {
      x: gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" }),
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      quick.current.x((e.clientX - r.left - r.width / 2) * strength);
      quick.current.y((e.clientY - r.top - r.height / 2) * strength);
    };
    const onLeave = () => {
      quick.current.x(0);
      quick.current.y(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <a ref={ref} href={href} className={`magnetic-btn${className ? " " + className : ""}`} {...rest}>
      {children}
    </a>
  );
}
