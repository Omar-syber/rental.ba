"use client";

import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import { differentiators } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

export default function Differentiators() {
  const { t, lang } = useLanguage();
  return (
    <section className="differentiators" id="differentiators">
      <Reveal as="div" className="section-head">
        <MaskedReveal as="h2" text={t("differentiators.eyebrow")} />
        <span className="section-head__hint">{t("differentiators.hint")}</span>
      </Reveal>
      <div className="differentiators__grid">
        {differentiators.map((d, i) => (
          <Reveal as="article" className="differentiator" key={d.title.en} delay={i * 60}>
            <span className="differentiator__num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{localize(d.title, lang)}</h3>
            <p>{localize(d.body, lang)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
