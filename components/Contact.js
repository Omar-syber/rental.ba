"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="contact" id="contact">
      <Reveal as="div" className="contact__info">
        <h2>{t("contact.heading")}</h2>
        <p>{t("contact.body")}</p>
        <dl className="contact__details">
          <div>
            <dt>{t("contact.office")}</dt>
            <dd>Mehmeda Spahe 6, 71000 Sarajevo</dd>
          </div>
          <div>
            <dt>{t("contact.phone")}</dt>
            <dd>+387 33 210 208</dd>
          </div>
          <div>
            <dt>{t("contact.email")}</dt>
            <dd>info@rental.ba</dd>
          </div>
          <div>
            <dt>{t("contact.hours")}</dt>
            <dd>{t("contact.hoursValue")}</dd>
          </div>
        </dl>
      </Reveal>

      <Reveal as="form" className={`contact__form${sent ? " is-sent" : ""}`} onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">{t("contact.fullName")}</label>
          <input type="text" id="name" name="name" required placeholder={t("contact.namePlaceholder")} />
        </div>
        <div className="field">
          <label htmlFor="email">{t("contact.email")}</label>
          <input type="email" id="email" name="email" required placeholder={t("contact.emailPlaceholder")} />
        </div>
        <div className="field">
          <label htmlFor="interest">{t("contact.lookingTo")}</label>
          <select id="interest" name="interest" defaultValue={t("contact.optionBuy")}>
            <option>{t("contact.optionBuy")}</option>
            <option>{t("contact.optionSell")}</option>
            <option>{t("contact.optionValuation")}</option>
            <option>{t("contact.optionOther")}</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="message">{t("contact.message")}</label>
          <textarea id="message" name="message" rows={4} placeholder={t("contact.messagePlaceholder")} />
        </div>
        <button type="submit" className="btn btn--block">
          {t("contact.send")}
        </button>
        <p className="contact__success" role="status">
          {t("contact.success")}
        </p>
      </Reveal>
    </section>
  );
}
