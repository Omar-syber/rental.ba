"use client";

import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Structural metadata only (which sections exist, how many paragraphs each
// has) — no visible copy lives here. The actual heading/paragraph strings
// come from the dictionary via t("legal.<page>.sections.<key>...").
const LEGAL_SECTIONS = {
  privacy: [
    { key: "whatWeCollect", paragraphCount: 2 },
    { key: "howWeUseIt", paragraphCount: 1 },
    { key: "cookies", paragraphCount: 1 },
    { key: "yourRights", paragraphCount: 1 },
  ],
  terms: [
    { key: "usingThisSite", paragraphCount: 1 },
    { key: "listingAccuracy", paragraphCount: 1 },
    { key: "bookingAShowing", paragraphCount: 1 },
    { key: "limitationOfLiability", paragraphCount: 1 },
    { key: "governingLaw", paragraphCount: 1 },
  ],
  fairHousing: [
    { key: "ourCommitment", paragraphCount: 1 },
    { key: "howThisShowsUp", paragraphCount: 1 },
    { key: "reportingAConcern", paragraphCount: 1 },
  ],
};

export default function LegalPage({ page }) {
  const { t } = useLanguage();
  const sectionConfig = LEGAL_SECTIONS[page] || [];

  const eyebrow = t("legal.eyebrow");
  const title = t(`legal.${page}.title`);
  const updated = t("legal.updatedDate");

  const sections = sectionConfig.map(({ key, paragraphCount }) => ({
    heading: t(`legal.${page}.sections.${key}.heading`),
    paragraphs: Array.from({ length: paragraphCount }, (_, j) =>
      t(`legal.${page}.sections.${key}.paragraphs.p${j + 1}`)
    ),
  }));

  return (
    <div className="legal">
      <Reveal as="div" className="legal__head">
        <p className="legal__eyebrow">{eyebrow}</p>
        <MaskedReveal as="h1" className="legal__title" text={title} trigger="immediate" />
        <p className="legal__updated">
          {t("legal.lastUpdated")} {updated}
        </p>
      </Reveal>
      <div className="legal__body">
        {sections.map((s, i) => (
          <Reveal as="section" className="legal__section" key={sectionConfig[i].key} delay={(i % 6) * 40}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
