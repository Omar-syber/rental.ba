"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BarField from "@/components/BarField";
import { EASE, DUR } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SESSION_KEY = "tf-loaded";

// Matches the src Hero.js uses for its static <Image> (hero-sequence's
// resting frame) so the loader curtain doesn't clear before that exact
// asset is cached.
const HERO_IMAGE = "/hero-sequence/frame-0096.jpg";

function preloadHeroImage() {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = HERO_IMAGE;
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Screen readers don't see the curtain wipe resolve, so announce it
// explicitly via a visually-hidden live region (DESIGN.md §7).
function announceLoaded(text) {
  const el = document.createElement("div");
  el.setAttribute("role", "status");
  el.setAttribute("aria-live", "polite");
  el.style.cssText =
    "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;";
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

export default function Loader({ onDone }) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);
  const loaderRef = useRef(null);
  const targetRef = useRef(0);
  const rafRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const measure = () =>
      setSize({ w: Math.min(window.innerWidth * 0.86, 1100), h: Math.min(window.innerHeight * 0.28, 260) });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    // Returning visitor within this session (e.g. a mid-pitch refresh): skip
    // the ceremony entirely rather than replaying it. DESIGN.md §4.4.
    if (sessionStorage.getItem(SESSION_KEY)) {
      setProgress(100);
      setGone(true);
      onDone?.();
      setTimeout(() => announceLoaded(t("loader.loaded")), 0);
      return;
    }

    document.documentElement.style.overflow = "hidden";
    let cancelled = false;

    const tick = () => {
      setProgress((p) => {
        const next = p + (targetRef.current - p) * 0.15 + 0.35;
        return next > targetRef.current ? targetRef.current : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    targetRef.current = 92;
    rafRef.current = requestAnimationFrame(tick);

    const ready = Promise.race([
      Promise.all([preloadHeroImage(), document.fonts ? document.fonts.ready : Promise.resolve(), wait(1400)]),
      wait(6000), // safety cap: never trap the visitor behind a stalled asset
    ]);

    ready.then(() => {
      if (cancelled) return;
      cancelAnimationFrame(rafRef.current);
      targetRef.current = 100;
      setProgress(100);
      sessionStorage.setItem(SESSION_KEY, "1");

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setTimeout(() => {
        document.documentElement.style.overflow = "";
        onDone?.();
        announceLoaded(t("loader.loaded"));
        if (reduceMotion || !loaderRef.current) {
          setGone(true);
          return;
        }
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: DUR.epic,
          ease: EASE.inOut,
          onComplete: () => setGone(true),
        });
      }, 250);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="loader"
      ref={loaderRef}
      aria-hidden="true"
      // Inline (not just the .loader class) so the curtain is a proper
      // full-screen overlay from the very first paint, even if the
      // external stylesheet hasn't finished loading yet — otherwise this
      // div briefly renders as a normal in-flow block, letting the real
      // page flash through before it snaps into position.
      style={{ position: "fixed", inset: 0, zIndex: 300, background: "#170f1a" }}
    >
      <div className="loader__stage">
        {size.w > 0 && (
          <BarField
            mode="text"
            text="CAPITAL"
            width={size.w}
            height={size.h}
            barGap={5}
            barWidth={3}
            color="var(--accent)"
            anchor="bottom"
            progress={progress / 100}
          />
        )}
        <div className="loader__meta">
          <span>Rental.ba</span>
          <span className="loader__count">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
