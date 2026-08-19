"use client";

import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import Roll from "@/components/Roll";
import TiltCard from "@/components/TiltCard";
import ParallaxImage from "@/components/ParallaxImage";
import { listings } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

export default function AgentDetail({ agent }) {
  const { lang, t } = useLanguage();
  const represented = listings.filter((l) => l.agentSlug === agent.slug);

  return (
    <div className="agent">
      <div className="agent__crumb">
        <TransitionLink href="/#team" className="text-link">
          <Roll>{t("teamDetail.backToTeam")}</Roll>
        </TransitionLink>
      </div>

      <Reveal as="div" className="agent__head">
        <div className="agent__portrait">
          <ParallaxImage
            src={agent.image}
            alt={t("teamDetail.portraitAlt").replace("{name}", agent.name)}
            sizes="240px"
            strength={8}
          />
        </div>
        <div className="agent__head-copy">
          <p className="agent__eyebrow">{localize(agent.role, lang)}</p>
          <MaskedReveal as="h1" className="agent__title" text={agent.name} trigger="immediate" />
          <ul className="agent__specialties" aria-label={t("teamDetail.specialties")}>
            {agent.specialties.map((s) => (
              <li key={s.en}>{localize(s, lang)}</li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="agent__body">
        <div className="agent__main">
          <Reveal as="div" className="agent__bio" delay={60}>
            <h2>{t("teamDetail.about").replace("{name}", agent.name.split(" ")[0])}</h2>
            <p>{localize(agent.bio, lang)}</p>
          </Reveal>

          {represented.length > 0 && (
            <Reveal as="div" className="agent__listings" delay={100}>
              <h2>{t("teamDetail.represents")}</h2>
              <div className="agent__listings-grid">
                {represented.map((l) => (
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
            </Reveal>
          )}
        </div>

        <Reveal as="aside" className="agent__side" delay={60}>
          <div className="agent-contact">
            <p className="agent-contact__eyebrow">{t("teamDetail.getInTouch")}</p>
            <a className="agent-contact__row" href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}>
              <span>{t("contact.phone")}</span>
              {agent.phone}
            </a>
            <a className="agent-contact__row" href={`mailto:${agent.email}`}>
              <span>{t("contact.email")}</span>
              {agent.email}
            </a>
            <TransitionLink href="/#contact" className="btn btn--block agent-contact__cta">
              {t("teamDetail.bookConsultation")}
            </TransitionLink>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
