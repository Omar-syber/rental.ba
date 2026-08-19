"use client";

import { useEffect, useRef, useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import BarField from "@/components/BarField";
import Roll from "@/components/Roll";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const { t } = useLanguage();

  useEffect(() => {
    const measure = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setSize({ w: rect.width, h: rect.height });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <footer className="footer">
      <div className="footer__wordmark" ref={ref}>
        {size.w > 0 && (
          <BarField
            mode="text"
            text="RENTAL.BA"
            width={size.w}
            height={size.h}
            barGap={3}
            barWidth={2}
            color="var(--accent-soft)"
            anchor="center"
          />
        )}
      </div>

      <div className="footer__grid">
        <div className="footer__col">
          <span className="footer__label">{t("footer.office")}</span>
          <p>Mehmeda Spahe 6, 71000 Sarajevo</p>
        </div>
        <div className="footer__col">
          <span className="footer__label">{t("footer.explore")}</span>
          <TransitionLink href="/listings"><Roll>{t("nav.listings")}</Roll></TransitionLink>
          <TransitionLink href="/about"><Roll>{t("nav.ourStory")}</Roll></TransitionLink>
          <TransitionLink href="/sell"><Roll>{t("nav.sellYourHome")}</Roll></TransitionLink>
          <TransitionLink href="/market-notes"><Roll>{t("nav.marketNotes")}</Roll></TransitionLink>
          <TransitionLink href="/calculator"><Roll>{t("nav.mortgageCalculator")}</Roll></TransitionLink>
          <TransitionLink href="/faq"><Roll>{t("nav.faq")}</Roll></TransitionLink>
          <TransitionLink href="/appointments"><Roll>{t("footer.agentAppointments")}</Roll></TransitionLink>
        </div>
        <div className="footer__col">
          <span className="footer__label">{t("footer.social")}</span>
          <a href="https://www.instagram.com/rental.ba/" target="_blank" rel="noopener noreferrer"><Roll>{t("footer.instagram")}</Roll></a>
          <a href="https://www.facebook.com/Rental.ba.nekretnine/" target="_blank" rel="noopener noreferrer"><Roll>{t("footer.facebook")}</Roll></a>
        </div>
      </div>

      <div className="footer__contact">
        <a href="tel:+38733210208">
          <Roll>+387 33 210 208</Roll>
        </a>
        <a href="mailto:info@rental.ba">
          <Roll>info@rental.ba</Roll>
        </a>
      </div>

      <div className="footer__bottom">
        <span>{t("footer.copyright")}</span>
        <div className="footer__legal">
          <TransitionLink href="/privacy">{t("footer.privacy")}</TransitionLink>
          <TransitionLink href="/terms">{t("footer.terms")}</TransitionLink>
          <TransitionLink href="/fair-housing">{t("footer.fairHousing")}</TransitionLink>
        </div>
      </div>
    </footer>
  );
}
