"use client";

import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import DiagonalMarqueeCarousel from "@/components/ui/great-ui-diagonal-marquee-carousel";
import { neighborhoods } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

const INTERIOR_CARD_DEFS = [
  { id: "nebo-je-granica", url: "/property-photos/nebo-je-granica/nebo-je-granica-03.jpg", title: "Nebo je granica", key: "nebo-je-granica" },
  { id: "akademik", url: "/property-photos/akademik/akademik-02.jpg", title: "Akademik, Koševsko brdo", key: "akademik" },
  { id: "jazz-na-mejtasu", url: "/property-photos/jazz-na-mejtasu/jazz-na-mejtasu-02.jpg", title: "Jazz na Mejtašu", key: "jazz-na-mejtasu" },
  { id: "terezija-36", url: "/property-photos/terezija-36/terezija-36-02.jpg", title: "Terezija 36, Skenderija", key: "terezija-36" },
];

export default function Neighborhood() {
  const { t, lang } = useLanguage();

  const interiorCards = INTERIOR_CARD_DEFS.map((c) => ({
    id: c.id,
    url: c.url,
    title: c.title,
    description: t(`neighborhoodSection.interiorCards.${c.key}`),
  }));

  const neighborhoodCards = neighborhoods.map((n) => ({
    id: n.slug,
    url: n.image,
    title: localize(n.caption, lang),
    description: localize(n.tagline, lang),
    href: `/neighborhoods/${n.slug}`,
  }));

  const cards = [...neighborhoodCards, ...interiorCards];

  return (
    <section className="neighborhood" id="neighborhood">
      <Reveal as="div" className="section-head">
        <MaskedReveal as="h2" text={t("neighborhoodSection.heading")} />
        <span className="section-head__hint">{t("neighborhoodSection.hint")}</span>
      </Reveal>
      <DiagonalMarqueeCarousel cards={cards} />
    </section>
  );
}
