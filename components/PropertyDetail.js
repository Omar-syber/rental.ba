"use client";

import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import Roll from "@/components/Roll";
import PropertyCarousel from "@/components/PropertyCarousel";
import BookingCalendar from "@/components/BookingCalendar";
import SaveButton from "@/components/SaveButton";
import { listings, neighborhoods } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

export default function PropertyDetail({ listing }) {
  const { t, lang } = useLanguage();
  const more = listings.filter((l) => l.id !== listing.id).slice(0, 3);
  const hood = neighborhoods.find((n) => n.name === listing.neighborhood);

  return (
    <div className="property">
      <div className="property__crumb">
        <TransitionLink href="/listings" className="text-link">
          <Roll>&larr; {t("listingDetail.backToListings")}</Roll>
        </TransitionLink>
      </div>

      <Reveal as="div" className="property__head">
        <div className="property__eyebrow-row">
          <p className="property__eyebrow">
            {hood ? (
              <TransitionLink href={`/neighborhoods/${hood.slug}`} data-cursor-preview={hood.image}>
                {listing.neighborhood}
              </TransitionLink>
            ) : (
              listing.neighborhood
            )}{" "}
            &middot; {listing.type}
            {listing.tag && <span className="property__tag">{localize(listing.tag, lang)}</span>}
          </p>
          <SaveButton id={listing.id} className="property__save" />
        </div>
        <MaskedReveal as="h1" className="property__title" text={listing.name} trigger="immediate" />
        <div className="property__head-row">
          <p className="property__addr">{listing.address}</p>
          <p className="property__price">
            {listing.onSale && <span className="property__price-was">{listing.originalPrice}</span>}
            {listing.priceValue == null ? t("common.priceOnRequest") : listing.price}
          </p>
        </div>
      </Reveal>

      <Reveal as="div" delay={80}>
        <PropertyCarousel images={listing.images} name={listing.name} />
      </Reveal>

      <div className="property__body">
        <div className="property__main">
          <Reveal as="ul" className="property__facts">
            <li>
              <span>{listing.beds}</span>{t("propertyFacts.beds")}
            </li>
            <li>
              <span>{listing.baths}</span>{t("propertyFacts.baths")}
            </li>
            <li>
              <span>{listing.sqft}</span>{t("propertyFacts.sqft")}
            </li>
            {listing.yearBuilt && (
              <li>
                <span>{listing.yearBuilt}</span>{t("listingDetail.yearBuilt")}
              </li>
            )}
          </Reveal>

          <Reveal as="div" className="property__desc" delay={60}>
            <h2>{t("listingDetail.aboutHeading")}</h2>
            <p>{localize(listing.description, lang)}</p>
          </Reveal>

          <Reveal as="div" className="property__amenities" delay={100}>
            <h2>{t("listingDetail.amenitiesHeading")}</h2>
            <ul>
              {listing.amenities.map((a) => (
                <li key={a.en}>{localize(a, lang)}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal as="aside" className="property__side" delay={60}>
          <BookingCalendar listing={listing} />
        </Reveal>
      </div>

      {more.length > 0 && (
        <Reveal as="div" className="property__more">
          <h2>{t("listingDetail.otherAddressesHeading")}</h2>
          <div className="property__more-grid">
            {more.map((l) => (
              <TransitionLink href={`/listings/${l.slug}`} className="property__more-card" key={l.id}>
                <span className="property__more-name">{l.name}</span>
                <span className="property__more-price">{l.priceValue == null ? t("common.priceOnRequest") : l.price}</span>
              </TransitionLink>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
