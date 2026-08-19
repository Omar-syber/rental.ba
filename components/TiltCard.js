"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TiltCard({ children, className, as: Tag = "div", strength = 7, ...rest }) {
  const ref = useRef(null);
  const quick = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;

    quick.current = {
      x: gsap.quickTo(el, "rotateY", { duration: 0.4, ease: "power3.out" }),
      y: gsap.quickTo(el, "rotateX", { duration: 0.4, ease: "power3.out" }),
      lift: gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" }),
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      quick.current.x(px * strength * 2);
      quick.current.y(py * -strength * 2);
      quick.current.lift(-4);
    };
    const onLeave = () => {
      quick.current.x(0);
      quick.current.y(0);
      quick.current.lift(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <Tag ref={ref} className={`tilt-card${className ? " " + className : ""}`} {...rest}>
      {children}
    </Tag>
  );
}
