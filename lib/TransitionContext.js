"use client";

import { createContext, useContext, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { EASE, DUR } from "@/lib/motion";

const TransitionContext = createContext(null);

// TEMP diagnostic logger — prints elapsed-ms-since-navigate-start plus the
// overlay's actual current yPercent, so we can see the real animated value
// over time instead of guessing from a video. Remove once the bug is found.
function diag(label, overlay, startTime) {
  const t = startTime != null ? (performance.now() - startTime).toFixed(0) + "ms" : "";
  const yp = overlay ? gsap.getProperty(overlay, "yPercent") : "?";
  // eslint-disable-next-line no-console
  console.log(`[DIAG] ${label} t=${t} yPercent=${yp}`);
}

export function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const pendingRef = useRef(null);
  const busyRef = useRef(false);
  const startRef = useRef(null);

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
      startRef.current = performance.now();
      diag("navigate:called", overlayRef.current, startRef.current);

      let pushed = false;
      const doPush = () => {
        if (pushed) return;
        pushed = true;
        diag("router.push", overlayRef.current, startRef.current);
        router.push(href);
      };

      gsap.set(overlayRef.current, { yPercent: 100, display: "block" });
      diag("after gsap.set", overlayRef.current, startRef.current);
      gsap.to(overlayRef.current, {
        yPercent: 0,
        duration: DUR.base,
        ease: EASE.inOut,
        onStart: () => diag("cover:onStart", overlayRef.current, startRef.current),
        onUpdate: function () {
          diag("cover:onUpdate progress=" + this.progress().toFixed(2), overlayRef.current, startRef.current);
        },
        onComplete: () => {
          diag("cover:onComplete", overlayRef.current, startRef.current);
          doPush();
        },
      });
      window.setTimeout(() => {
        diag("SAFETY-NET fired", overlayRef.current, startRef.current);
        doPush();
      }, DUR.base * 1000 + 600);
    },
    [router]
  );

  useEffect(() => {
    diag("pathname-effect path=" + pathname, overlayRef.current, startRef.current);
    if (!pendingRef.current) return;
    pendingRef.current = null;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const delay = 0.08;

    let done = false;
    const finish = (why) => {
      if (done) return;
      done = true;
      diag("reveal:finish (" + why + ")", overlay, startRef.current);
      gsap.set(overlay, { display: "none" });
      busyRef.current = false;
    };

    gsap.to(overlay, {
      yPercent: -100,
      duration: DUR.slow,
      ease: EASE.inOut,
      delay,
      onStart: () => diag("reveal:onStart", overlay, startRef.current),
      onUpdate: function () {
        diag("reveal:onUpdate progress=" + this.progress().toFixed(2), overlay, startRef.current);
      },
      onComplete: () => finish("onComplete"),
    });
    const t = window.setTimeout(() => finish("safety-net"), (DUR.slow + delay) * 1000 + 600);
    return () => window.clearTimeout(t);
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
