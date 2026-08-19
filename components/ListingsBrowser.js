"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import TiltCard from "@/components/TiltCard";
import ParallaxImage from "@/components/ParallaxImage";
import ListingsMap from "@/components/ListingsMap";
import SaveButton from "@/components/SaveButton";
import { listings } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

gsap.registerPlugin(Flip);

const TYPES = ["All", ...Array.from(new Set(listings.map((l) => l.type)))];
const BED_OPTIONS = [0, 1, 2, 3];
const SORT_VALUES = ["featured", "price-asc", "price-desc", "on-sale"];

// "type" values (Modern/Loft/Farmhouse/...) stay plain English strings in
// lib/data.js since ListingsBrowser filters on them directly — this is a
// display-only lookup so Bosnian visitors still see translated chip labels
// without touching the underlying filter keys.
const TYPE_LABELS_BS = {
  Modern: "Moderna",
  Loft: "Loft",
  Farmhouse: "Seoska kuća",
  "Waterfront Villa": "Vila uz vodu",
  "Single-Story": "Prizemnica",
  Townhouse: "Gradska kuća",
};

export default function ListingsBrowser() {
  const { t, lang } = useLanguage();

  const typeLabel = (typeValue) => {
    if (typeValue === "All") return t("listingsBrowser.typeAll");
    return lang === "bs" ? TYPE_LABELS_BS[typeValue] || typeValue : typeValue;
  };

  const sortLabel = (value) => {
    const map = {
      featured: t("listingsBrowser.sortFeatured"),
      "price-asc": t("listingsBrowser.sortPriceAsc"),
      "price-desc": t("listingsBrowser.sortPriceDesc"),
      "on-sale": t("listingsBrowser.sortOnSale"),
    };
    return map[value];
  };

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [minBeds, setMinBeds] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const gridRef = useRef(null);
  const flipStateRef = useRef(null);

  // Captures where the current cards sit right before a filter/sort change
  // commits, so the effect below can animate the reflow (GSAP Flip) instead
  // of the grid just snapping to its new order — this page's own signature
  // moment, matching DESIGN.md's "one per page" goal.
  const captureFlip = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = gridRef.current?.querySelectorAll(".market-card");
    if (reduceMotion || !cards || cards.length === 0) return;
    flipStateRef.current = Flip.getState(cards);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);
    const result = listings.filter((l) => {
      if (type !== "All" && l.type !== type) return false;
      if (l.beds < minBeds) return false;
      if (l.priceValue != null && (l.priceValue < min || l.priceValue > max)) return false;
      if (sort === "on-sale" && !l.onSale) return false;
      if (q && !l.name.toLowerCase().includes(q) && !l.address.toLowerCase().includes(q) && !l.neighborhood.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });

    if (sort === "price-asc") result.sort((a, b) => (a.priceValue ?? Infinity) - (b.priceValue ?? Infinity));
    else if (sort === "price-desc") result.sort((a, b) => (b.priceValue ?? -Infinity) - (a.priceValue ?? -Infinity));

    return result;
  }, [search, type, minBeds, minPrice, maxPrice, sort]);

  const resultKey = filtered.map((l) => l.id).join(",");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = gridRef.current?.querySelectorAll(".market-card");
    if (!cards || cards.length === 0) {
      flipStateRef.current = null;
      return;
    }
    if (reduceMotion) {
      gsap.set(cards, { opacity: 1, y: 0 });
      flipStateRef.current = null;
      return;
    }

    if (flipStateRef.current) {
      const state = flipStateRef.current;
      flipStateRef.current = null;
      Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        stagger: 0.03,
        absolute: true,
        onEnter: (els) =>
          gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, overwrite: true }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.3, overwrite: true }),
      });
      return;
    }

    gsap.fromTo(
      cards,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.05, overwrite: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultKey]);

  const clearFilters = () => {
    captureFlip();
    setSearch("");
    setType("All");
    setMinBeds(0);
    setMinPrice("");
    setMaxPrice("");
    setSort("featured");
  };

  const hasActiveFilters =
    search !== "" || type !== "All" || minBeds !== 0 || minPrice !== "" || maxPrice !== "" || sort !== "featured";

  return (
    <div className="market">
      <div className="market__head">
        <Reveal as="div">
          <p className="market__eyebrow">{t("listingsBrowser.eyebrow")}</p>
          <MaskedReveal as="h1" className="market__title" text={t("listingsBrowser.title")} />
          <p className="market__sub">
            {t("listingsBrowser.subtitle").replace("{count}", listings.length)}
          </p>
        </Reveal>
      </div>

      <Reveal as="div" className="market__filters" delay={80}>
        <div className="market__search">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
            <path d="M20 20 L16.4 16.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder={t("listingsBrowser.searchPlaceholder")}
            value={search}
            onChange={(e) => {
              captureFlip();
              setSearch(e.target.value);
            }}
            aria-label={t("listingsBrowser.searchAriaLabel")}
          />
        </div>

        <div className="market__chips" role="group" aria-label={t("listingsBrowser.filterByTypeAriaLabel")}>
          {TYPES.map((typeOption) => (
            <button
              key={typeOption}
              type="button"
              aria-pressed={type === typeOption}
              className={`market__chip${type === typeOption ? " is-active" : ""}`}
              onClick={() => {
                captureFlip();
                setType(typeOption);
              }}
            >
              {typeLabel(typeOption)}
            </button>
          ))}
        </div>

        <div className="market__selects">
          <label className="market__select">
            <span>{t("listingsBrowser.bedsLabel")}</span>
            <select
              value={minBeds}
              onChange={(e) => {
                captureFlip();
                setMinBeds(Number(e.target.value));
              }}
            >
              {BED_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b === 0 ? t("listingsBrowser.bedsAny") : `${b}+`}
                </option>
              ))}
            </select>
          </label>
          <div className="market__price-range">
            <span>{t("listingsBrowser.priceLabel")}</span>
            <div className="market__price-inputs">
              <input
                type="number"
                inputMode="numeric"
                min="0"
                step="10000"
                placeholder={t("listingsBrowser.pricePlaceholderMin")}
                value={minPrice}
                onChange={(e) => {
                  captureFlip();
                  setMinPrice(e.target.value);
                }}
                aria-label={t("listingsBrowser.minPriceAriaLabel")}
              />
              <span className="market__price-sep">&ndash;</span>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                step="10000"
                placeholder={t("listingsBrowser.pricePlaceholderMax")}
                value={maxPrice}
                onChange={(e) => {
                  captureFlip();
                  setMaxPrice(e.target.value);
                }}
                aria-label={t("listingsBrowser.maxPriceAriaLabel")}
              />
            </div>
          </div>
          <label className="market__select">
            <span>{t("listingsBrowser.sortLabel")}</span>
            <select
              value={sort}
              onChange={(e) => {
                captureFlip();
                setSort(e.target.value);
              }}
            >
              {SORT_VALUES.map((v) => (
                <option key={v} value={v}>
                  {sortLabel(v)}
                </option>
              ))}
            </select>
          </label>
          {hasActiveFilters && (
            <button type="button" className="market__clear" onClick={clearFilters}>
              {t("listingsBrowser.clearFilters")}
            </button>
          )}
        </div>
      </Reveal>

      <div className="market__count-row">
        <div className="market__count">
          {(filtered.length === 1
            ? t("listingsBrowser.resultsCountSingular")
            : t("listingsBrowser.resultsCountPlural")
          ).replace("{count}", filtered.length)}
        </div>
        <div className="market__view-toggle" role="group" aria-label={t("listingsBrowser.switchViewAriaLabel")}>
          <button
            type="button"
            aria-pressed={view === "grid"}
            className={`market__view-btn${view === "grid" ? " is-active" : ""}`}
            onClick={() => setView("grid")}
          >
            {t("listingsBrowser.viewGrid")}
          </button>
          <button
            type="button"
            aria-pressed={view === "map"}
            className={`market__view-btn${view === "map" ? " is-active" : ""}`}
            onClick={() => setView("map")}
          >
            {t("listingsBrowser.viewMap")}
          </button>
        </div>
      </div>

      {view === "map" ? (
        <ListingsMap listings={filtered} />
      ) : filtered.length > 0 ? (
        <div className="market__grid" ref={gridRef}>
          {filtered.map((l) => (
            <TransitionLink href={`/listings/${l.slug}`} className="market-card" key={l.id} data-cursor="View">
              <TiltCard as="div" className="market-card__tilt" strength={5}>
                <div className="market-card__media">
                  <ParallaxImage src={l.image} alt={localize(l.alt, lang)} sizes="(max-width: 700px) 100vw, 33vw" strength={10} />
                  {l.tag && <span className="market-card__tag">{localize(l.tag, lang)}</span>}
                  <SaveButton id={l.id} className="market-card__save" />
                </div>
                <div className="market-card__body">
                  <div className="market-card__top">
                    <h3>{l.name}</h3>
                    <span className="market-card__price">
                      {l.onSale && <span className="market-card__price-was">{l.originalPrice}</span>}
                      {l.priceValue == null ? t("common.priceOnRequest") : l.price}
                    </span>
                  </div>
                  <p className="market-card__addr">{l.address}</p>
                  <ul className="market-card__specs">
                    <li>{l.beds} {t("listingsSection.bed")}</li>
                    <li>{l.baths} {t("listingsSection.bath")}</li>
                    <li>{l.sqft} m²</li>
                  </ul>
                </div>
              </TiltCard>
            </TransitionLink>
          ))}
        </div>
      ) : (
        <div className="market__empty">
          <p>{t("listingsBrowser.emptyState")}</p>
          <button type="button" className="text-link" onClick={clearFilters}>
            {t("listingsBrowser.clearFiltersArrow")}
          </button>
        </div>
      )}
    </div>
  );
}
