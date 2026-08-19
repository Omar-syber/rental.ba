"use client";

import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import Roll from "@/components/Roll";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="notfound">
      <Reveal as="div" className="notfound__inner">
        <p className="notfound__eyebrow">{t("notFound.eyebrow")}</p>
        <MaskedReveal as="h1" className="notfound__title" text={t("notFound.title")} trigger="immediate" />
        <p className="notfound__sub">{t("notFound.body")}</p>
        <div className="notfound__ctas">
          <TransitionLink href="/listings" className="btn">
            <Roll>{t("notFound.browseListings")}</Roll>
          </TransitionLink>
          <TransitionLink href="/" className="btn btn--ghost">
            <Roll>{t("notFound.backHome")}</Roll>
          </TransitionLink>
        </div>
      </Reveal>
    </div>
  );
}
