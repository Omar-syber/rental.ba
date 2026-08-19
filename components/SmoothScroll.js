"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Loader from "@/components/Loader";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  // Loader is a child of this component, so its mount effect (which can
  // call onDone synchronously, e.g. on a returning-visitor skip) fires
  // *before* this component's own effect below (React runs child effects
  // before parent effects). Tracking that here means Lenis knows not to
  // pause itself at all if the "done" signal already arrived first.
  const loaderDoneRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    // Starts paused — Lenis drives scroll through its own wheel/touch
    // handling and a transform, so the loader's `overflow: hidden` on
    // <html> alone doesn't stop it. Loader calls onDone below once it's
    // actually safe to scroll (unless that already happened, see above).
    if (!loaderDoneRef.current) {
      lenis.stop();
    }
    lenisRef.current = lenis;

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      // Scroll-velocity skew (DESIGN.md §4.5): ties every parallax image on
      // the page to how fast the visitor is scrolling right now.
      const skew = gsap.utils.clamp(-7, 7, (e.velocity || 0) * 0.35);
      gsap.to(".skewable", { skewY: skew, duration: 0.6, ease: "power3.out", overwrite: true });
    });

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    window.__lenis = lenisRef.current;
  });

  const handleLoaderDone = useCallback(() => {
    loaderDoneRef.current = true;
    lenisRef.current?.start();
  }, []);

  return (
    <>
      <Loader onDone={handleLoaderDone} />
      {children}
    </>
  );
}
