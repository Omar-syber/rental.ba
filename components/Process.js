"use client";

import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import { process as processSteps } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

export default function Process() {
  const { t, lang } = useLanguage();
  return (
    <section className="process" id="process">
      <Reveal as="div" className="section-head">
        <MaskedReveal as="h2" text={t("process.heading")} />
        <span className="section-head__hint">{t("process.hint")}</span>
      </Reveal>
      <div className="process__row">
        {processSteps.map((s, i) => (
          <Reveal as="div" className="process__step" key={s.num} delay={i * 80}>
            <span className="process__num">{s.num}</span>
            <h3>{localize(s.title, lang)}</h3>
            <p>{localize(s.body, lang)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
