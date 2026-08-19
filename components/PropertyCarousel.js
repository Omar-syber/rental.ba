"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PropertyCarousel({ images, name }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const dragRef = useRef(null);

  const go = (next) => setIndex(next);
  const prev = () => go((index - 1 + images.length) % images.length);
  const next = () => go((index + 1) % images.length);

  useEffect(() => {
    const onKey = (e) => {
      // Don't hijack arrow keys while the visitor is typing elsewhere on
      // the page (e.g. the booking form below the carousel).
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target.isContentEditable) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const onPointerDown = (e) => {
    dragRef.current = { startX: e.clientX, dx: 0 };
  };
  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    dragRef.current.dx = e.clientX - dragRef.current.startX;
  };
  const onPointerUp = () => {
    if (!dragRef.current) return;
    const { dx } = dragRef.current;
    if (dx > 60) prev();
    else if (dx < -60) next();
    dragRef.current = null;
  };

  return (
    <div className="carousel">
      <div
        className="carousel__stage"
        data-cursor="Drag"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {images.map((src, i) => (
          <div key={src + i} className={`carousel__slide${i === index ? " is-active" : ""}`}>
            <Image
              src={src}
              alt={t("listingDetail.photoAlt")
                .replace("{name}", name)
                .replace("{current}", i + 1)
                .replace("{total}", images.length)}
              fill
              sizes="(max-width: 900px) 100vw, 70vw"
              style={{ objectFit: "cover" }}
              priority={i === 0}
              draggable={false}
            />
          </div>
        ))}

        <button type="button" className="carousel__arrow carousel__arrow--prev" onClick={prev} aria-label={t("listingDetail.prevPhoto")}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M15 4 L7 12 L15 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="carousel__arrow carousel__arrow--next" onClick={next} aria-label={t("listingDetail.nextPhoto")}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M9 4 L17 12 L9 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span className="carousel__count">{index + 1} / {images.length}</span>
      </div>

      <div className="carousel__thumbs" role="tablist" aria-label={t("listingDetail.photosAriaLabel").replace("{name}", name)}>
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`carousel__thumb${i === index ? " is-active" : ""}`}
            onClick={() => go(i)}
          >
            <Image src={src} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
          </button>
        ))}
      </div>
    </div>
  );
}
