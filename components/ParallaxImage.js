"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ParallaxImage({ src, alt, sizes, strength = 12, className }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !wrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [strength]);

  return (
    <div className={`parallax-img${className ? " " + className : ""}`} ref={wrapRef}>
      <div className="parallax-img__inner skewable" ref={imgRef}>
        <Image src={src} alt={alt} fill sizes={sizes} draggable={false} style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
}
