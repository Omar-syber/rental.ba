"use client";

import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import ValuationForm from "@/components/ValuationForm";
import Process from "@/components/Process";
import Differentiators from "@/components/Differentiators";
import { columnTestimonials } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

const sellerQuotes = columnTestimonials.filter((entry) => entry.role.en.startsWith("Seller")).slice(0, 3);

export default function SellPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="sell">
      <Reveal as="div" className="sell__head">
        <p className="sell__eyebrow">{t("sell.eyebrow")}</p>
        <MaskedReveal as="h1" className="sell__title" text={t("sell.title")} trigger="immediate" />
        <p className="sell__sub">{t("sell.sub")}</p>
      </Reveal>

      <ValuationForm />

      <Process />
      <Differentiators />

      {sellerQuotes.length > 0 && (
        <Reveal as="section" className="sell-quotes">
          <div className="section-head">
            <h2>{t("sell.quotesHeading")}</h2>
          </div>
          <div className="sell-quotes__grid">
            {sellerQuotes.map((quote) => (
              <blockquote className="sell-quote" key={quote.name}>
                <p>&ldquo;{localize(quote.text, lang)}&rdquo;</p>
                <cite>
                  {quote.name} <span>{localize(quote.role, lang)}</span>
                </cite>
              </blockquote>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
