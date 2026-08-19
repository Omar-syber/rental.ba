"use client";

import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import TransitionLink from "@/components/TransitionLink";
import Roll from "@/components/Roll";
import StoryScroll from "@/components/StoryScroll";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="about">
      <Reveal as="div" className="about__head">
        <p className="about__eyebrow">{t("nav.ourStory")}</p>
        <MaskedReveal as="h1" className="about__title" text={t("about.title")} trigger="immediate" />
        <p className="about__sub">{t("about.sub")}</p>
      </Reveal>

      <StoryScroll />

      <Reveal as="div" className="about__cta">
        <h2>{t("about.ctaHeading")}</h2>
        <div className="about__cta-actions">
          <TransitionLink href="/#team" className="btn">
            <Roll>{t("about.meetTeam")}</Roll>
          </TransitionLink>
          <TransitionLink href="/listings" className="btn btn--ghost">
            <Roll>{t("about.browseListings")}</Roll>
          </TransitionLink>
        </div>
      </Reveal>
    </div>
  );
}
