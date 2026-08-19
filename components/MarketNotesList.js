"use client";

import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import ParallaxImage from "@/components/ParallaxImage";
import TiltCard from "@/components/TiltCard";
import { marketNotes, getTeamBySlug } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

const dateFmt = (iso, lang) =>
  new Date(iso + "T00:00:00").toLocaleDateString(lang === "bs" ? "bs-BA" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default function MarketNotesList() {
  const { lang, t } = useLanguage();

  return (
    <div className="notes">
      <Reveal as="div" className="notes__head">
        <p className="notes__eyebrow">{t("marketNotesPage.eyebrow")}</p>
        <MaskedReveal as="h1" className="notes__title" text={t("marketNotesPage.title")} trigger="immediate" />
        <p className="notes__sub">{t("marketNotesPage.sub")}</p>
      </Reveal>

      <div className="notes__grid">
        {marketNotes.map((n, i) => {
          const author = getTeamBySlug(n.authorSlug);
          return (
            <Reveal as="div" key={n.slug} delay={(i % 6) * 50}>
              <TransitionLink href={`/market-notes/${n.slug}`} className="note-card" data-cursor="Read">
                <TiltCard as="div" className="note-card__tilt" strength={4}>
                  <div className="note-card__media">
                    <ParallaxImage src={n.image} alt={localize(n.title, lang)} sizes="(max-width: 700px) 100vw, 33vw" strength={8} />
                    <span className="note-card__category">{localize(n.category, lang)}</span>
                  </div>
                  <div className="note-card__body">
                    <h3>{localize(n.title, lang)}</h3>
                    <p>{localize(n.excerpt, lang)}</p>
                    <div className="note-card__meta">
                      <span>{author?.name}</span>
                      <span>{dateFmt(n.date, lang)}</span>
                    </div>
                  </div>
                </TiltCard>
              </TransitionLink>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
