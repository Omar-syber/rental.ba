"use client";

import { useMemo } from "react";
import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import { useBookings } from "@/lib/BookingsContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function timeToMinutes(t) {
  const [, h, m, period] = t.match(/(\d+):(\d+)\s?(AM|PM)/);
  let hours = Number(h) % 12;
  if (period === "PM") hours += 12;
  return hours * 60 + Number(m);
}

export default function AppointmentsView() {
  const { t } = useLanguage();
  const { bookings } = useBookings();

  const sorted = useMemo(
    () =>
      [...bookings].sort((a, b) => {
        if (a.date !== b.date) return a.date < b.date ? -1 : 1;
        return timeToMinutes(a.time) - timeToMinutes(b.time);
      }),
    [bookings]
  );

  const countLabel = (
    bookings.length === 1 ? t("appointments.countSubOne") : t("appointments.countSubOther")
  ).replace("{count}", bookings.length);

  return (
    <div className="agenda">
      <Reveal as="div" className="agenda__head">
        <p className="agenda__eyebrow">{t("appointments.eyebrow")}</p>
        <MaskedReveal as="h1" className="agenda__title" text={t("appointments.title")} trigger="immediate" />
        <p className="agenda__sub">{bookings.length === 0 ? t("appointments.emptySub") : countLabel}</p>
      </Reveal>

      {sorted.length === 0 ? (
        <Reveal as="div" className="agenda__empty" delay={80}>
          <p>{t("appointments.emptyBody")}</p>
          <TransitionLink href="/listings" className="text-link">
            {t("appointments.viewListings")} &rarr;
          </TransitionLink>
        </Reveal>
      ) : (
        <div className="agenda__list">
          {sorted.map((b, i) => (
            <Reveal as="div" className="agenda-card" key={b.id} delay={(i % 8) * 40}>
              <div className="agenda-card__date">
                <span className="agenda-card__weekday">{b.dateLabel.split(",")[0]}</span>
                <span className="agenda-card__daynum">{b.date.slice(-2)}</span>
                <span className="agenda-card__month">{b.dateLabel.split(" ")[1]}</span>
              </div>
              <div className="agenda-card__body">
                <div className="agenda-card__top">
                  <TransitionLink href={`/listings/${b.listingId}`} className="agenda-card__listing">
                    {b.listingName}
                  </TransitionLink>
                  <span className="agenda-card__time">{b.time}</span>
                </div>
                <p className="agenda-card__addr">{b.listingAddress}</p>
                <div className="agenda-card__client">
                  <span>{b.name}</span>
                  <span>{b.email}</span>
                  {b.phone && <span>{b.phone}</span>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
