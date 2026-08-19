"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BarField from "@/components/BarField";
import HeroSequence from "@/components/HeroSequence";
import MagneticButton from "@/components/MagneticButton";
import { STAGGER } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Same file as hero-sequence's resting frame (index length-1, drawn at
// scroll progress 0 — see HeroSequence.js's setProgress mapping) so the
// static <Image> and the canvas crossfade seamlessly instead of visibly
// swapping between two different photos on every homepage load.
const HERO_IMAGE = "/hero-sequence/frame-0096.jpg";

function drawSkyline(ctx, w, h) {
  const peakCount = 9;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(0, h);
  const base = h * 0.62;
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i <= peakCount; i++) {
    const x = (w / peakCount) * i;
    const peak = base - rand() * h * 0.4 - Math.sin(i * 1.3) * h * 0.08;
    ctx.lineTo(x, Math.max(peak, h * 0.08));
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();
}

export default function Hero() {
  const wrapRef = useRef(null);
  const frameRef = useRef(null);
  const backdropRef = useRef(null);
  const wordmarkRef = useRef(null);
  const contentRef = useRef(null);
  const sequenceRef = useRef(null);
  const [vp, setVp] = useState({ w: 0, h: 0 });
  const [titleRevealed, setTitleRevealed] = useState(false);
  const [sequenceReady, setSequenceReady] = useState(false);
  const [allowSequence, setAllowSequence] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // The frame sequence is a several-MB-per-visitor preload (every frame
    // loads before scrubbing can start). Narrow viewports and Save-Data /
    // slow connections get the static Ken Burns still instead — DESIGN.md
    // §6: "if it doesn't run well on mobile, it ships disabled, with a
    // static equivalent," not degraded.
    const conn = typeof navigator !== "undefined" && navigator.connection;
    if (conn && (conn.saveData || ["slow-2g", "2g"].includes(conn.effectiveType))) {
      setAllowSequence(false);
    }
  }, []);

  useEffect(() => {
    const measure = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Phase 1 (image sequence scrubs backward, text fixed) -> Phase 2 (card
  // shrinks to a centered ~50% card, text/wordmark fade, frame stays paused
  // on its last drawn frame) -> Phase 3 begins once native `position: sticky`
  // releases at the bottom of .hero and HeroPaperCut (the next section)
  // scrolls up over the tail of this timeline; see HeroPaperCut.js.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const seq = { p: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      tl.addLabel("phase1", 0)
        .to(
          seq,
          {
            p: 1,
            ease: "none",
            duration: 0.55,
            onUpdate: () => sequenceRef.current?.setProgress(seq.p),
          },
          "phase1"
        )
        .to(backdropRef.current, { opacity: 1, ease: "none", duration: 0.18 }, "phase1+=0.37")
        .addLabel("phase2", 0.55)
        .to(frameRef.current, { scale: 0.5, borderRadius: 28, ease: "none", duration: 0.45 }, "phase2")
        .to(contentRef.current, { y: -40, opacity: 0, ease: "none", duration: 0.3 }, "phase2")
        .to(wordmarkRef.current, { opacity: 0, ease: "none", duration: 0.3 }, "phase2");
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTitleRevealed(true);
      return;
    }
    // Reveal on Hero's own mount rather than coordinating through the
    // loader: the loader overlay (z-index 300, fixed, full-screen) already
    // covers the hero while it's up, so the title is fully settled by the
    // time the curtain clears, with far less cross-component wiring to get
    // wrong than a shared "loaded" event.
    //
    // Driven by plain React state + a CSS transition (see .hero__title in
    // globals.css) rather than a GSAP tween: this is the single most
    // important element on the page, so it can't depend on GSAP's
    // requestAnimationFrame-driven ticker actually being scheduled at this
    // exact moment during mount.
    const t = setTimeout(() => setTitleRevealed(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pin = wrapRef.current?.querySelector(".hero__pin");
    if (!canHover || reduceMotion || !pin) return;

    const quickContent = {
      x: gsap.quickTo(contentRef.current, "x", { duration: 0.8, ease: "power3.out" }),
      y: gsap.quickTo(contentRef.current, "y", { duration: 0.8, ease: "power3.out" }),
    };
    const quickWordmark = {
      x: gsap.quickTo(wordmarkRef.current, "x", { duration: 1.1, ease: "power3.out" }),
    };

    const onMove = (e) => {
      const r = pin.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      quickContent.x(px * -16);
      quickContent.y(py * -10);
      quickWordmark.x(px * 22);
    };
    pin.addEventListener("pointermove", onMove);
    return () => pin.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className="hero" ref={wrapRef} id="top">
      <div className="hero__pin">
        <div className="hero__backdrop" ref={backdropRef}>
          {vp.w > 0 && (
            <BarField
              mode="shape"
              drawShape={drawSkyline}
              width={vp.w}
              height={vp.h}
              barGap={6}
              barWidth={3}
              color="var(--accent-soft)"
              anchor="bottom"
            />
          )}
        </div>

        <div className="hero__frame" ref={frameRef}>
          <Image
            src={HERO_IMAGE}
            alt="Modern hillside residence with glass frontage and pool at golden hour"
            fill
            priority
            sizes="100vw"
            className="hero__kenburns"
            style={{ objectFit: "cover" }}
          />
          {allowSequence && vp.w >= 900 && (
            <div className={`hero__sequence${sequenceReady ? " is-loaded" : ""}`}>
              <HeroSequence ref={sequenceRef} onReady={setSequenceReady} className="hero__sequence-canvas" />
            </div>
          )}
          <div className="hero__scrim" />
        </div>

        <div className="hero__wordmark">
          <div className="hero__wordmark-inner" ref={wordmarkRef}>
            {vp.w > 0 && (
              <BarField
                mode="text"
                text="RENTAL.BA"
                width={Math.min(vp.w * 0.92, 1400)}
                height={Math.min(vp.h * 0.24, 220)}
                barGap={5}
                barWidth={3}
                color="var(--accent)"
                anchor="center"
              />
            )}
          </div>
        </div>

        <div className="hero__content" ref={contentRef}>
          <p className="hero__eyebrow">{t("hero.eyebrow")}</p>
          <h1 className={`hero__title${titleRevealed ? " is-revealed" : ""}`}>
            <span className="mask-line">
              <span className="mask-line__inner" style={{ transitionDelay: "0s" }}>
                {t("hero.titleLine1")}
              </span>
            </span>
            <span className="mask-line">
              <span className="mask-line__inner" style={{ transitionDelay: `${STAGGER.line}s` }}>
                <em>{t("hero.titleLine2")}</em>
              </span>
            </span>
          </h1>
          <p className="hero__sub">{t("hero.sub")}</p>
          <div className="hero__ctas">
            <MagneticButton href="#listings" className="btn">
              {t("hero.ctaListings")}
            </MagneticButton>
            <MagneticButton href="#contact" className="btn btn--ghost">
              {t("hero.ctaConsultation")}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
