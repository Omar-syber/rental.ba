"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DUR } from "@/lib/motion";

/**
 * Masked line reveal (DESIGN.md §4.1): wraps text in an overflow-hidden
 * mask and slides it up from below on scroll-enter (or immediately, for
 * above-the-fold headlines that should animate once the loader clears).
 */
export default function MaskedReveal({ text, as: Tag = "h2", className, trigger = "scroll", delay = 0 }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Clear any tween/set left by a previous run of this effect (e.g. the
    // dev-mode StrictMode double-invoke, or a prior text value) before
    // establishing new state — otherwise a stale in-flight tween can keep
    // animating toward a target computed against the old element height.
    gsap.killTweensOf(inner);

    if (reduceMotion) {
      gsap.set(inner, { y: 0 });
      return;
    }

    // Pixel offset computed fresh from the element's *current* height,
    // rather than GSAP's yPercent (which can resolve against a stale
    // cached size if this effect re-runs after the text/line-count changes
    // — e.g. a language toggle re-wrapping a heading to a different number
    // of lines). Seeds the CSS starting state (see Hero.js's title reveal
    // for why this seed step is required at all).
    const offset = inner.getBoundingClientRect().height * 1.1;
    gsap.set(inner, { y: offset });

    const tweenVars = { y: 0, duration: DUR.slow, ease: EASE.out, delay };

    if (trigger === "immediate") {
      const t = requestAnimationFrame(() => gsap.to(inner, tweenVars));
      return () => cancelAnimationFrame(t);
    }

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        ...tweenVars,
        scrollTrigger: { trigger: wrapRef.current, start: "top 88%", once: true },
      });
    });
    return () => ctx.revert();
    // `text` is intentionally a dep: if it changes after the initial reveal
    // (e.g. a language toggle swaps the string, which can also change the
    // box's line count/height), gsap.set's yPercent:110 above was computed
    // against the *old* height — without re-running, the element can be
    // left mid-transform at a stale pixel offset instead of fully revealed.
  }, [trigger, delay, text]);

  return (
    <Tag className={`mask-line${className ? " " + className : ""}`} ref={wrapRef}>
      <span className="mask-line__inner" ref={innerRef}>
        {text}
      </span>
    </Tag>
  );
}
