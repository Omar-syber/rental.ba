"use client";

import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import Roll from "@/components/Roll";
import TiltCard from "@/components/TiltCard";
import ParallaxImage from "@/components/ParallaxImage";
import { listings } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

export default function NeighborhoodDetail({ neighborhood }) {
  const { lang, t } = useLanguage();
  const local = listings.filter((l) => l.neighborhood === neighborhood.name);

  return (
    <div className="hood">
      <div className="hood__crumb">
        <TransitionLink href="/#neighborhood" className="text-link">
          <Roll>{t("neighborhoodDetail.backToNeighborhoods")}</Roll>
        </TransitionLink>
      </div>

      <Reveal as="div" className="hood__head">
        <p className="hood__eyebrow">{t("neighborhoodDetail.eyebrow")}</p>
        <MaskedReveal as="h1" className="hood__title" text={neighborhood.name} trigger="immediate" />
        <p className="hood__tagline">{localize(neighborhood.tagline, lang)}</p>
      </Reveal>

      <Reveal as="div" className="hood__hero" delay={80}>
        <ParallaxImage src={neighborhood.image} alt={neighborhood.name} sizes="100vw" strength={12} />
      </Reveal>

      <div className="hood__body">
        <Reveal as="div" className="hood__desc" delay={60}>
          <h2>{t("neighborhoodDetail.theArea")}</h2>
          <p>{localize(neighborhood.description, lang)}</p>
        </Reveal>

        <Reveal as="div" className="hood__gallery" delay={100} aria-label={t("neighborhoodDetail.gallery")}>
          {neighborhood.gallery.map((src) => (
            <div className="hood__gallery-img" key={src}>
              <ParallaxImage
                src={src}
                alt={t("neighborhoodDetail.galleryImageAlt").replace("{name}", neighborhood.name)}
                sizes="(max-width: 700px) 100vw, 33vw"
                strength={8}
              />
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal as="div" className="hood__listings" delay={100}>
        <div className="section-head">
          <h2>
            {local.length > 0
              ? t("neighborhoodDetail.currentlyIn").replace("{name}", neighborhood.name)
              : t("neighborhoodDetail.nothingActiveIn").replace("{name}", neighborhood.name)}
          </h2>
          <TransitionLink href="/listings" className="text-link">
            <Roll>{t("neighborhoodDetail.browseAllListings")}</Roll>
          </TransitionLink>
        </div>
        {local.length > 0 && (
          <div className="agent__listings-grid hood__listings-grid">
            {local.map((l) => (
              <TransitionLink href={`/listings/${l.slug}`} className="market-card" key={l.id} data-cursor="View">
                <TiltCard as="div" className="market-card__tilt" strength={5}>
                  <div className="market-card__media">
                    <ParallaxImage src={l.image} alt={localize(l.alt, lang)} sizes="(max-width: 700px) 100vw, 33vw" strength={10} />
                    {l.tag && <span className="market-card__tag">{localize(l.tag, lang)}</span>}
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
                      <li>{l.beds} {t("listingsSection.bed")}</li>
                      <li>{l.baths} {t("listingsSection.bath")}</li>
                      <li>{l.sqft} m²</li>
                    </ul>
                  </div>
                </TiltCard>
              </TransitionLink>
            ))}
          </div>
        )}
      </Reveal>
    </div>
  );
}
