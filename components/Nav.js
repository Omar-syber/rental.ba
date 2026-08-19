"use client";

import { useEffect, useRef, useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import gsap from "gsap";
import Roll from "@/components/Roll";
import { useSavedListings } from "@/lib/SavedListingsContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function useLinks(t) {
  return [
    { href: "/listings", label: t("nav.listings") },
    { href: "/#testimonials", label: t("nav.testimonials") },
    { href: "/#neighborhood", label: t("nav.neighborhood") },
    { href: "/#team", label: t("nav.team") },
    { href: "/#contact", label: t("nav.contact") },
    { href: "/about", label: t("nav.ourStory") },
    { href: "/sell", label: t("nav.sellYourHome") },
    { href: "/market-notes", label: t("nav.marketNotes") },
    { href: "/calculator", label: t("nav.mortgageCalculator") },
    { href: "/faq", label: t("nav.faq") },
  ];
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef(null);
  const sentinelRef = useRef(null);
  const { savedIds } = useSavedListings();
  const { lang, setLang, t } = useLanguage();
  const LINKS = useLinks(t);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "1px";
    sentinel.style.height = "1px";
    sentinel.style.width = "1px";
    document.body.prepend(sentinel);
    sentinelRef.current = sentinel;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;
    const links = overlayRef.current.querySelectorAll(".menu-overlay__link");
    if (open) {
      document.documentElement.style.overflow = "hidden";
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        links,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, delay: 0.1, ease: "power3.out" }
      );
    } else {
      document.documentElement.style.overflow = "";
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
      });
    }
  }, [open]);

  const closeAnd = () => setOpen(false);

  return (
    <>
      <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <TransitionLink href="/" className="nav__brand" onClick={closeAnd}>
            <svg width="22" height="20" viewBox="0 0 32 32" aria-hidden="true">
              <rect x="3" y="16" width="6" height="13" rx="0.5" fill="currentColor" />
              <rect x="13" y="6" width="6" height="23" rx="0.5" fill="currentColor" />
              <rect x="23" y="11" width="6" height="18" rx="0.5" fill="currentColor" />
            </svg>
            <span>
              rental<em>.ba</em>
            </span>
          </TransitionLink>
          <nav className="nav__links" aria-label={t("nav.primaryNav")}>
            {LINKS.slice(0, 4).map((l) => (
              <TransitionLink key={l.href} href={l.href}>
                <Roll>{l.label}</Roll>
              </TransitionLink>
            ))}
          </nav>
          <TransitionLink href="/saved" className="nav__saved" aria-label={`${t("nav.savedHomes")} (${savedIds.length})`}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M12 20.5 C12 20.5 3.5 15.4 3.5 9.4 C3.5 6.4 5.9 4.2 8.7 4.2 C10.3 4.2 11.4 4.9 12 5.9 C12.6 4.9 13.7 4.2 15.3 4.2 C18.1 4.2 20.5 6.4 20.5 9.4 C20.5 15.4 12 20.5 12 20.5 Z"
                fill={savedIds.length > 0 ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            {savedIds.length > 0 && <span className="nav__saved-count">{savedIds.length}</span>}
          </TransitionLink>
          <TransitionLink href="/#contact" className="btn btn--sm nav__cta">
            {t("nav.bookConsultation")}
          </TransitionLink>
          <button
            type="button"
            className="nav__lang"
            aria-label="Switch language"
            onClick={() => setLang(lang === "en" ? "bs" : "en")}
          >
            <span className={lang === "en" ? "is-active" : ""}>EN</span>
            <span className={lang === "bs" ? "is-active" : ""}>BS</span>
          </button>
          <button
            className="nav__toggle"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="menu-overlay" ref={overlayRef} role="dialog" aria-modal="true" aria-hidden={!open}>
        <nav className="menu-overlay__links" aria-label={t("nav.fullMenu")}>
          {LINKS.map((l) => (
            <TransitionLink key={l.href} href={l.href} className="menu-overlay__link" onClick={closeAnd}>
              {l.label}
            </TransitionLink>
          ))}
        </nav>
        <div className="menu-overlay__meta">
          <div>
            <span>{t("nav.phone")}</span>
            <a href="tel:+38733210208">+387 33 210 208</a>
          </div>
          <div>
            <span>{t("nav.email")}</span>
            <a href="mailto:info@rental.ba">info@rental.ba</a>
          </div>
        </div>
      </div>
    </>
  );
}
