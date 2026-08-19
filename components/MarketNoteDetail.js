"use client";

import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import Roll from "@/components/Roll";
import ParallaxImage from "@/components/ParallaxImage";
import { marketNotes, getTeamBySlug } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

const dateFmt = (iso, lang) =>
  new Date(iso + "T00:00:00").toLocaleDateString(lang === "bs" ? "bs-BA" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default function MarketNoteDetail({ note }) {
  const { lang, t } = useLanguage();
  const author = getTeamBySlug(note.authorSlug);
  const more = marketNotes.filter((n) => n.slug !== note.slug).slice(0, 3);

  return (
    <div className="note">
      <div className="note__crumb">
        <TransitionLink href="/market-notes" className="text-link">
          <Roll>{t("marketNotesPage.backToAll")}</Roll>
        </TransitionLink>
      </div>

      <Reveal as="div" className="note__head">
        <p className="note__eyebrow">
          {localize(note.category, lang)} &middot; {dateFmt(note.date, lang)}
        </p>
        <MaskedReveal as="h1" className="note__title" text={localize(note.title, lang)} trigger="immediate" />
        {author && (
          <TransitionLink href={`/team/${author.slug}`} className="note__author" data-cursor-preview={author.image}>
            <span>{t("marketNotesPage.byAuthor").replace("{name}", author.name)}</span>
            <span className="note__author-role">{localize(author.role, lang)}</span>
          </TransitionLink>
        )}
      </Reveal>

      <Reveal as="div" className="note__hero" delay={80}>
        <ParallaxImage src={note.image} alt={localize(note.title, lang)} sizes="100vw" strength={10} />
      </Reveal>

      <Reveal as="div" className="note__body" delay={60}>
        {note.body.map((p, i) => (
          <p key={i}>{localize(p, lang)}</p>
        ))}
      </Reveal>

      {more.length > 0 && (
        <Reveal as="div" className="note__more">
          <div className="section-head">
            <h2>{t("marketNotesPage.moreNotes")}</h2>
            <TransitionLink href="/market-notes" className="text-link">
              <Roll>{t("marketNotesPage.viewAll")}</Roll>
            </TransitionLink>
          </div>
          <div className="note__more-grid">
            {more.map((n) => (
              <TransitionLink href={`/market-notes/${n.slug}`} className="note__more-card" key={n.slug}>
                <span className="note__more-category">{localize(n.category, lang)}</span>
                <span className="note__more-title">{localize(n.title, lang)}</span>
              </TransitionLink>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
