"use client";

import { useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import TiltCard from "@/components/TiltCard";
import ParallaxImage from "@/components/ParallaxImage";
import SaveButton from "@/components/SaveButton";
import { useSavedListings } from "@/lib/SavedListingsContext";
import { listings } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

const COMPARE_ROWS = [
  { key: "price", labelKey: "propertyFacts.price", get: (l) => l.price },
  { key: "type", labelKey: "saved.compareRows.type", get: (l) => l.type },
  { key: "neighborhood", labelKey: "saved.compareRows.neighborhood", get: (l) => l.neighborhood },
  { key: "beds", labelKey: "propertyFacts.beds", get: (l) => l.beds },
  { key: "baths", labelKey: "propertyFacts.baths", get: (l) => l.baths },
  { key: "sqft", labelKey: "propertyFacts.sqft", get: (l) => l.sqft },
];

export default function SavedListingsView() {
  const { t, lang } = useLanguage();
  const { savedIds } = useSavedListings();
  const [compareIds, setCompareIds] = useState([]);
  const saved = listings.filter((l) => savedIds.includes(l.id));
  const compared = listings.filter((l) => compareIds.includes(l.id));

  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const countLabel = (
    saved.length === 1 ? t("saved.countSubOne") : t("saved.countSubOther")
  ).replace("{count}", saved.length);

  return (
    <div className="saved">
      <Reveal as="div" className="saved__head">
        <p className="saved__eyebrow">{t("saved.eyebrow")}</p>
        <MaskedReveal as="h1" className="saved__title" text={t("nav.savedHomes")} trigger="immediate" />
        <p className="saved__sub">{saved.length === 0 ? t("saved.emptySub") : countLabel}</p>
      </Reveal>

      {saved.length === 0 ? (
        <Reveal as="div" className="saved__empty" delay={80}>
          <p>{t("saved.emptyBody")}</p>
          <TransitionLink href="/listings" className="text-link">
            {t("saved.browseListings")} &rarr;
          </TransitionLink>
        </Reveal>
      ) : (
        <>
          <div className="market__grid saved__grid">
            {saved.map((l) => (
              <div className="market-card saved-card" key={l.id}>
                <TransitionLink href={`/listings/${l.slug}`} className="saved-card__link" data-cursor="View">
                  <TiltCard as="div" className="market-card__tilt" strength={5}>
                    <div className="market-card__media">
                      <ParallaxImage
                        src={l.image}
                        alt={localize(l.alt, lang)}
                        sizes="(max-width: 700px) 100vw, 33vw"
                        strength={10}
                      />
                      {l.tag && <span className="market-card__tag">{localize(l.tag, lang)}</span>}
                      <SaveButton id={l.id} className="market-card__save" />
                    </div>
                    <div className="market-card__body">
                      <div className="market-card__top">
                        <h3>{l.name}</h3>
                        <span className="market-card__price">
                          {l.onSale && <span className="market-card__price-was">{l.originalPrice}</span>}
                          {l.price}
                        </span>
                      </div>
                      <p className="market-card__addr">{l.address}</p>
                      <ul className="market-card__specs">
                        <li>
                          {l.beds} {t("listingsSection.bed")}
                        </li>
                        <li>
                          {l.baths} {t("listingsSection.bath")}
                        </li>
                        <li>{l.sqft} m²</li>
                      </ul>
                    </div>
                  </TiltCard>
                </TransitionLink>
                <button
                  type="button"
                  className={`saved-card__compare${compareIds.includes(l.id) ? " is-active" : ""}`}
                  onClick={() => toggleCompare(l.id)}
                  disabled={!compareIds.includes(l.id) && compareIds.length >= 3}
                >
                  {compareIds.includes(l.id) ? t("saved.comparingBtn") : t("saved.compareBtn")}
                </button>
              </div>
            ))}
          </div>

          {compared.length >= 2 && (
            <Reveal as="div" className="compare">
              <div className="section-head">
                <h2>{t("saved.compareHeading").replace("{count}", compared.length)}</h2>
                <button type="button" className="text-link" onClick={() => setCompareIds([])}>
                  {t("saved.clearComparison")}
                </button>
              </div>
              <div className="compare__table-wrap">
                <table className="compare__table">
                  <thead>
                    <tr>
                      <th></th>
                      {compared.map((l) => (
                        <th key={l.id}>
                          <TransitionLink href={`/listings/${l.slug}`}>{l.name}</TransitionLink>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_ROWS.map((row) => (
                      <tr key={row.key}>
                        <th scope="row">{t(row.labelKey)}</th>
                        {compared.map((l) => (
                          <td key={l.id}>{row.get(l)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          )}
        </>
      )}
    </div>
  );
}
