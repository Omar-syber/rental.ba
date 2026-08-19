"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CHAPTERS = [
  {
    key: "chapter1",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&q=80",
  },
  {
    key: "chapter2",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
  },
  {
    key: "chapter3",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
  },
  {
    key: "chapter4",
    image: "/hero-sequence/frame-0096.jpg",
  },
];

export default function StoryScroll() {
  const { t } = useLanguage();
  const wrapRef = useRef(null);
  const slideRefs = useRef([]);
  const dotRefs = useRef([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const segment = 1 / (CHAPTERS.length - 1);

      const applyProgress = (progress) => {
        CHAPTERS.forEach((_, i) => {
          const center = i * segment;
          const dist = Math.abs(progress - center);
          const opacity = Math.max(0, 1 - dist / segment);
          gsap.set(slideRefs.current[i], { opacity });
          if (dotRefs.current[i]) {
            gsap.set(dotRefs.current[i], { backgroundColor: opacity > 0.5 ? "var(--accent)" : "var(--line)" });
          }
        });
      };

      applyProgress(0);

      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => applyProgress(self.progress),
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="story" ref={wrapRef}>
      <div className="story__pin">
        {CHAPTERS.map((c, i) => (
          <div className="story__slide" key={c.key} ref={(el) => (slideRefs.current[i] = el)}>
            <div className="story__bg">
              <Image src={c.image} alt="" fill sizes="100vw" priority={i === 0} style={{ objectFit: "cover" }} />
              <div className="story__scrim" />
            </div>
            <div className="story__chapter">
              <span className="story__year">{t(`about.chapters.${c.key}.year`)}</span>
              <h2>{t(`about.chapters.${c.key}.title`)}</h2>
              <p>{t(`about.chapters.${c.key}.body`)}</p>
            </div>
          </div>
        ))}

        <div className="story__dots" aria-hidden="true">
          {CHAPTERS.map((c, i) => (
            <span className="story__dot" key={c.key} ref={(el) => (dotRefs.current[i] = el)} />
          ))}
        </div>
      </div>
    </section>
  );
}
