"use client";

import { useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ListingsMap({ listings }) {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="listings-map">
      <svg className="listings-map__bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-2,35 C20,25 35,45 55,38 C75,30 85,50 102,42" className="listings-map__road" />
        <path d="M-2,68 C25,60 40,78 62,70 C80,64 90,80 102,74" className="listings-map__road" />
        <path d="M22,-2 C18,25 30,40 26,65 C22,85 30,95 28,102" className="listings-map__road" />
        <path d="M68,-2 C72,20 60,35 66,60 C72,82 64,92 68,102" className="listings-map__road" />
        <circle cx="45" cy="52" r="15" className="listings-map__block" />
        <circle cx="76" cy="76" r="11" className="listings-map__block" />
        <circle cx="20" cy="28" r="9" className="listings-map__block" />
        <circle cx="72" cy="18" r="8" className="listings-map__block" />
        <circle cx="30" cy="70" r="9" className="listings-map__block" />
      </svg>

      {listings.map((l) => (
        <TransitionLink
          key={l.id}
          href={`/listings/${l.slug}`}
          className={`listings-map__pin${activeId === l.id ? " is-active" : ""}`}
          style={{ left: `${l.mapPosition.x}%`, top: `${l.mapPosition.y}%` }}
          onMouseEnter={() => setActiveId(l.id)}
          onMouseLeave={() => setActiveId((id) => (id === l.id ? null : id))}
          data-cursor="View"
        >
          <span className="listings-map__tag">
            <strong>{l.price}</strong>
            <span>{l.name}</span>
          </span>
          <span className="listings-map__dot" />
        </TransitionLink>
      ))}

      {listings.length === 0 && <p className="listings-map__empty">{t("listingsBrowser.emptyState")}</p>}
    </div>
  );
}
