"use client";

import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import ParallaxImage from "@/components/ParallaxImage";
import MaskedReveal from "@/components/MaskedReveal";
import Roll from "@/components/Roll";
import SaveButton from "@/components/SaveButton";
import { listings } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

export default function Listings() {
  const { t, lang } = useLanguage();
  return (
    <section className="listings" id="listings">
      <Reveal as="div" className="section-head">
        <MaskedReveal as="h2" text={t("listingsSection.heading")} />
        <TransitionLink href="/listings" className="text-link">
          <Roll>{t("listingsSection.requestPortfolio")}</Roll>
        </TransitionLink>
      </Reveal>

      <div className="listing-grid">
        {listings.map((l, i) => (
          <Reveal as="div" className={`listing listing--${l.size}`} key={l.id} delay={(i % 6) * 40}>
            <TransitionLink href={`/listings/${l.slug}`} className="listing__link" data-cursor="View">
              <TiltCard as="article" className="listing__tilt" strength={5}>
                <div className="listing__media">
                  <ParallaxImage
                    src={l.image}
                    alt={localize(l.alt, lang)}
                    sizes="(max-width: 600px) 100vw, 50vw"
                    strength={10}
                  />
                  {l.tag && <span className="listing__tag">{localize(l.tag, lang)}</span>}
                  <SaveButton id={l.id} className="listing__save" />
                </div>
                <div className="listing__body">
                  <div className="listing__top">
                    <h3>{l.name}</h3>
                    <span className="listing__price">
                      {l.onSale && <span className="listing__price-was">{l.originalPrice}</span>}
                      {l.priceValue == null ? t("common.priceOnRequest") : l.price}
                    </span>
                  </div>
                  <p className="listing__addr">{l.address}</p>
                  <ul className="listing__specs">
                    <li>{l.beds} {t("listingsSection.bed")}</li>
                    <li>{l.baths} {t("listingsSection.bath")}</li>
                    <li>{l.sqft} m²</li>
                  </ul>
                </div>
              </TiltCard>
            </TransitionLink>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
