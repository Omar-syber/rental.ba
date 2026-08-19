"use client";

import RevealText from "@/components/RevealText";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Prologue() {
  const { t } = useLanguage();
  return (
    <section className="prologue">
      <div className="section-glow section-glow--b" aria-hidden="true" />
      <div className="prologue__inner">
        <RevealText as="p" className="prologue__text" text={t("prologue.text")} />
      </div>
    </section>
  );
}
