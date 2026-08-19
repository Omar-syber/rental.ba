"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { listings } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

const BIRDS = [
  { top: "18%", size: 34, duration: 16, delay: 0 },
  { top: "28%", size: 22, duration: 21, delay: 3.5 },
  { top: "12%", size: 26, duration: 19, delay: 8 },
  { top: "34%", size: 18, duration: 24, delay: 1.5 },
];

// Large photos flying diagonally right-to-left through the same locked
// backdrop as the mountains/houses/birds. Each card rotates DURING its
// flight (entryRotate -> exitRotate). top/width/height are plain viewport
// units (no yPercent centering), sized to always land inside the pinned
// 100dvh viewport regardless of position. Addresses match lib/data.js's
// listings exactly, so each card can show real price/beds/baths/sqft when
// flipped to its info face.
const PHOTOS = [
  { src: "/property-photos/nebo-je-granica/nebo-je-granica-05.jpg", address: "Hladivode, Donje Biosko", top: "10vh", width: "56vw", height: "54vh", fromY: "-2vh", toY: "3vh", fromRotate: -10, toRotate: 7 },
  { src: "/property-photos/akademik/akademik-04.jpg", address: "Muhameda Hadžijahića, Koševsko brdo", top: "22vh", width: "50vw", height: "50vh", fromY: "-3vh", toY: "2vh", fromRotate: -7, toRotate: 9 },
  { src: "/property-photos/jazz-na-mejtasu/jazz-na-mejtasu-05.jpg", address: "Nikole Kašikovića, Mejtaš", top: "14vh", width: "58vw", height: "56vh", fromY: "-2vh", toY: "4vh", fromRotate: -9, toRotate: 6 },
  { src: "/property-photos/terezija-36/terezija-36-03.jpg", address: "Terezija 36, Skenderija", top: "26vh", width: "50vw", height: "52vh", fromY: "-4vh", toY: "2vh", fromRotate: -8, toRotate: 8 },
  { src: "/city/rental-stock-02.jpg", address: "Sarajevo", top: "12vh", width: "54vw", height: "53vh", fromY: "-2vh", toY: "3vh", fromRotate: -10, toRotate: 7 },
  { src: "/city/rental-stock-06.jpg", address: "Sarajevo", top: "24vh", width: "51vw", height: "51vh", fromY: "-3vh", toY: "2vh", fromRotate: -7, toRotate: 9 },
].map((photo) => ({ ...photo, listing: listings.find((l) => l.address === photo.address) }));

// Cards travel from just off the right edge to just off the left edge
// (100vw is already fully clear of the viewport, no extra buffer wasted on
// invisible travel), starting each next card well before the previous one
// has fully exited — that overlap is what keeps the gap between them small
// instead of leaving empty paper in between.
const FLIGHT_DISTANCE = "100vw";
const SEGMENT_STAGGER = 0.55;
const SEGMENT_DURATION = 1.7;

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Bird({ size }) {
  return (
    <svg viewBox="0 0 40 20" width={size} height={size / 2} aria-hidden="true">
      <path
        d="M2,14 Q10,2 20,10 Q30,2 38,14"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Hand-cut-feeling mountain silhouette: vertices are deliberately uneven
// rather than a clean sine wave, so it reads as torn/cut paper rather than
// a plotted curve.
function MountainRange({ className, fill }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 320"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,320 L0,210 L95,120 L180,175 L255,70 L340,150 L430,40 L520,145 L610,85
           L705,180 L790,60 L880,165 L965,95 L1060,190 L1140,110 L1200,170 L1200,320 Z"
        fill={fill}
      />
    </svg>
  );
}

function HouseCutout({ className }) {
  return (
    <svg className={className} viewBox="0 0 130 110" aria-hidden="true">
      <path
        d="M14,108 L14,56 L4,58 L63,8 L124,56 L114,54 L114,108 Z"
        fill="var(--ink-soft)"
      />
      <rect x="52" y="70" width="22" height="38" fill="var(--paper)" />
      <rect x="26" y="66" width="16" height="16" fill="var(--paper)" />
      <rect x="88" y="66" width="16" height="16" fill="var(--paper)" />
      <rect x="58" y="20" width="10" height="18" fill="var(--ink-soft)" />
    </svg>
  );
}

/**
 * Phase 3 of the Hero scroll spec: the torn-paper scene revealed once the
 * shrunk hero card's `position: sticky` pin releases at the bottom of
 * .hero. Placed immediately after Hero in the DOM with a negative
 * margin-top so it overlaps the tail of Hero's scroll range — later DOM
 * order means this section paints over Hero's sticky content by default
 * (no z-index gymnastics needed), which is what produces the "hero card
 * slides behind the mountain cutout" masking illusion in .papercut__mask.
 *
 * The mountains/houses/birds/photos below that live inside
 * .papercut__gallery-wrap + .papercut__gallery-pin — a second, independent
 * sticky pin (same technique as Hero's own) that locks the screen while
 * the visitor scrolls through the photo flythrough, releasing once it's
 * done. It's a second pin *within this same section*, not a new page.
 *
 * Clicking any card opens its info inset in place — a smaller box nested
 * within the image's own bounds drops down top-to-bottom (clip-path, not
 * height, so nothing squishes), text fades in shortly after, and each
 * divider line extends left-to-right the same way Process.js's timeline
 * fill already does (scaleX from a left transform-origin). It all lives
 * on a wrapper *nested inside* the flying/rotating figure, so it stays
 * exactly within that card's own box and travels with it, rather than
 * opening a separate overlay elsewhere on screen.
 */
export default function HeroPaperCut() {
  const wrapRef = useRef(null);
  const galleryWrapRef = useRef(null);
  const farRef = useRef(null);
  const midRef = useRef(null);
  const photoRefs = useRef([]);
  const [open, setOpen] = useState(() => new Set());
  const { t, lang } = useLanguage();

  const toggleOpen = (i) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  useEffect(() => {
    if (open.size === 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(new Set());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open.size]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      photoRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { x: 0, y: 0, rotate: (PHOTOS[i].fromRotate + PHOTOS[i].toRotate) / 2 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const galleryTrigger = {
        trigger: galleryWrapRef.current,
        start: "top top",
        // Same fix as Hero.js: .papercut__gallery-pin is a 100dvh sticky
        // pin inside a much taller wrapper, so it releases one viewport
        // early relative to the wrapper's full height — matching the
        // trigger's end to the wrapper's *full* height let the fly-through
        // timeline keep counting up after the pin had already unstuck and
        // started scrolling away, which is what left the last photo(s)
        // scrolling off before their exit animation actually finished
        // (the empty gap before Prologue).
        end: () => `+=${galleryWrapRef.current.offsetHeight - window.innerHeight}`,
        scrub: 0.6,
      };

      gsap.to(farRef.current, { yPercent: -12, ease: "none", scrollTrigger: galleryTrigger });
      gsap.to(midRef.current, { yPercent: -6, ease: "none", scrollTrigger: galleryTrigger });

      const tl = gsap.timeline({ scrollTrigger: galleryTrigger });
      PHOTOS.forEach((photo, i) => {
        const el = photoRefs.current[i];
        if (!el) return;
        tl.fromTo(
          el,
          { x: FLIGHT_DISTANCE, y: photo.fromY, rotate: photo.fromRotate },
          { x: `-${FLIGHT_DISTANCE}`, y: photo.toY, rotate: photo.toRotate, ease: "none", duration: SEGMENT_DURATION },
          i * SEGMENT_STAGGER
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="papercut" ref={wrapRef}>
      <svg className="papercut__torn-top" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0,60 L0,22 L60,34 L130,10 L210,30 L290,6 L370,28 L455,14 L540,32
             L625,8 L710,26 L800,12 L885,30 L970,4 L1055,28 L1140,14 L1200,26 L1200,60 Z"
          fill="var(--paper)"
        />
      </svg>

      <div className="papercut__mask">
        <MountainRange className="papercut__mask-mountain" fill="var(--paper-deep)" />
      </div>

      <div className="papercut__gallery-wrap" ref={galleryWrapRef}>
        <div className="papercut__gallery-pin">
          <div className="papercut__layer papercut__layer--far" ref={farRef}>
            <MountainRange className="papercut__mountain papercut__mountain--far" fill="var(--paper-card)" />
          </div>

          <div className="papercut__layer papercut__layer--mid" ref={midRef}>
            <HouseCutout className="papercut__house papercut__house--a" />
            <HouseCutout className="papercut__house papercut__house--b" />
            <HouseCutout className="papercut__house papercut__house--c" />
          </div>

          <div className="papercut__birds">
            {BIRDS.map((b, i) => (
              <span
                key={i}
                className="papercut__bird"
                style={{
                  top: b.top,
                  animationDuration: `${b.duration}s`,
                  animationDelay: `${b.delay}s`,
                }}
              >
                <Bird size={b.size} />
              </span>
            ))}
          </div>

          {PHOTOS.map((photo, i) => {
            const isOpen = open.has(i);
            return (
              <figure
                key={photo.src}
                ref={(el) => (photoRefs.current[i] = el)}
                className="papercut__photo"
                style={{ top: photo.top, width: photo.width, height: photo.height }}
              >
                <div
                  className="papercut__photo-stage"
                  role="button"
                  tabIndex={0}
                  aria-pressed={isOpen}
                  aria-label={`${isOpen ? "Hide" : "Show"} details for ${photo.address}`}
                  onClick={() => toggleOpen(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleOpen(i);
                    }
                  }}
                >
                  <img src={photo.src} alt={photo.address} />
                  <figcaption className="papercut__photo-caption">{photo.address}</figcaption>

                  <div className={`papercut__photo-drop${isOpen ? " is-open" : ""}`}>
                    <div className="papercut__photo-info">
                      {photo.listing?.tag && (
                        <span className="papercut__photo-info-tag">{localize(photo.listing.tag, lang)}</span>
                      )}
                      <h3>{photo.listing?.name ?? photo.address}</h3>
                      <p className="papercut__photo-info-address">{photo.address}</p>
                      <span className="papercut__photo-info-line" aria-hidden="true" />
                      {photo.listing && (
                        <dl className="papercut__photo-info-facts">
                          <div>
                            <dt>{t("propertyFacts.price")}</dt>
                            <dd>{photo.listing.price}</dd>
                          </div>
                          <div>
                            <dt>{t("propertyFacts.beds")}</dt>
                            <dd>{photo.listing.beds}</dd>
                          </div>
                          <div>
                            <dt>{t("propertyFacts.baths")}</dt>
                            <dd>{photo.listing.baths}</dd>
                          </div>
                          <div>
                            <dt>{t("propertyFacts.sqft")}</dt>
                            <dd>{photo.listing.sqft}</dd>
                          </div>
                        </dl>
                      )}
                    </div>
                  </div>

                  <span className="papercut__photo-plus" aria-hidden="true">
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                  </span>
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
