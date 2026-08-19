"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ValuationForm() {
  const { t } = useLanguage();
  const [address, setAddress] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) return;
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setAddress("");
  };

  return (
    <Reveal as="div" className="valuation">
      {!sent ? (
        <form className="valuation__form" onSubmit={onSubmit}>
          <p className="valuation__eyebrow">{t("sell.valuation.eyebrow")}</p>
          <h2>{t("sell.valuation.heading")}</h2>
          <div className="valuation__row">
            <input
              type="text"
              placeholder={t("sell.valuation.addressPlaceholder")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button type="submit" className="btn">
              {t("sell.valuation.getEstimate")}
            </button>
          </div>
          <p className="valuation__note">{t("sell.valuation.note")}</p>
        </form>
      ) : (
        <div className="valuation__result">
          <p className="valuation__eyebrow">{t("sell.valuation.resultEyebrow")}</p>
          <h2>{address}</h2>
          <p className="valuation__note">{t("sell.valuation.resultNote")}</p>
          <div className="valuation__actions">
            <button type="button" className="text-link" onClick={reset}>
              {t("sell.valuation.tryAnother")}
            </button>
          </div>
        </div>
      )}
    </Reveal>
  );
}
