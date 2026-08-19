"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function RevealText({ text, as: Tag = "p", className }) {
  const ref = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el) return;
    const wordEls = el.querySelectorAll(".reveal-word");

    if (reduceMotion) {
      wordEls.forEach((w) => w.classList.add("is-lit"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(wordEls, {
        opacity: 1,
        stagger: 0.028,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "bottom 55%",
          scrub: 0.4,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Tag className={`reveal-text${className ? " " + className : ""}`} ref={ref}>
      {words.map((w, i) => (
        <span className="reveal-word" key={i}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
