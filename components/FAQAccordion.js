"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);
  const { lang, t } = useLanguage();

  return (
    <div className="faq">
      <Reveal as="div" className="faq__head">
        <p className="faq__eyebrow">{t("faqPage.eyebrow")}</p>
        <MaskedReveal as="h1" className="faq__title" text={t("faqPage.title")} trigger="immediate" />
        <p className="faq__sub">{t("faqPage.sub")}</p>
      </Reveal>

      <div className="faq-list">
        {faqs.map((item, i) => {
          const open = i === openIndex;
          return (
            <Reveal as="div" className="faq-item" key={item.q.en} delay={(i % 8) * 40}>
              <button
                type="button"
                className={`faq-item__q${open ? " is-open" : ""}`}
                onClick={() => setOpenIndex(open ? -1 : i)}
                aria-expanded={open}
                aria-label={open ? t("faqPage.collapseAnswer") : t("faqPage.expandAnswer")}
              >
                <span>{localize(item.q, lang)}</span>
                <span className="faq-item__icon" aria-hidden="true">
                  {open ? "−" : "+"}
                </span>
              </button>
              <div className="faq-item__a" style={{ maxHeight: open ? "300px" : "0px" }}>
                <p>{localize(item.a, lang)}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
