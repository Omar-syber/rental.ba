"use client";

import { createContext, useContext, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR } from "@/lib/motion";

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const pendingRef = useRef(null);
  const busyRef = useRef(false);

  const navigate = useCallback(
    (href) => {
      if (busyRef.current || !overlayRef.current) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        router.push(href);
        return;
      }
      busyRef.current = true;
      pendingRef.current = href;

      let pushed = false;
      const doPush = () => {
        if (pushed) return;
        pushed = true;
        router.push(href);
      };

      gsap.set(overlayRef.current, { yPercent: 100, display: "block" });
      gsap.to(overlayRef.current, {
        yPercent: 0,
        duration: DUR.base,
        ease: EASE.inOut,
        onComplete: doPush,
      });
      window.setTimeout(doPush, DUR.base * 1000 + 600);
    },
    [router]
  );

  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = null;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const delay = 0.08;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      gsap.set(overlay, { display: "none" });
      busyRef.current = false;
    };

    // The new route's own components (Hero, HeroPaperCut, etc.) create their
    // ScrollTriggers as soon as they mount, which can be before images/fonts
    // have finished settling the page's final layout height — pushing every
    // trigger's start/end out of sync with the actual scroll position (blank
    // gaps, sections overlapping mid-animation). A route change via
    // router.push is a plain history.pushState, so it never fires the
    // "load"/"resize" events ScrollTrigger normally auto-refreshes on —
    // nothing else forces a recalculation, so we refresh here explicitly:
    // once after a couple of frames, and again after everything has had a
    // moment to finish loading, in case fonts/images settle later.
    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    const refreshAgain = window.setTimeout(() => ScrollTrigger.refresh(), 700);

    gsap.to(overlay, {
      yPercent: -100,
      duration: DUR.slow,
      ease: EASE.inOut,
      delay,
      onComplete: finish,
    });
    const t = window.setTimeout(finish, (DUR.slow + delay) * 1000 + 600);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(refreshAgain);
    };
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div className="page-transition" ref={overlayRef} aria-hidden="true" />
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within TransitionProvider");
  return ctx;
}
