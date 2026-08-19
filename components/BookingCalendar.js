"use client";

import { useMemo, useState } from "react";
import { useBookings } from "@/lib/BookingsContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Underlying slot values stay fixed English AM/PM strings — they're the key
// used for booking storage/collision checks (isTaken) — while the display
// label is swapped to 24-hour time for Bosnian via timeLabel() below.
const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];
const TIME_SLOTS_24H = ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30"];
const DAY_COUNT = 14;

// Some Chrome/ICU builds report "bs-BA" as a supported Intl locale but ship
// incomplete data for it — toLocaleDateString silently falls back to English
// weekday names and produces garbage like "M08" for the month. Bosnian
// abbreviations are hardcoded here instead of trusting Intl for that locale.
const WEEKDAYS_BS = ["ned", "pon", "uto", "sri", "čet", "pet", "sub"];
const MONTHS_BS = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];

function buildDays(lang) {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < DAY_COUNT; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push({
      iso: d.toISOString().slice(0, 10),
      weekday: lang === "bs" ? WEEKDAYS_BS[d.getDay()] : d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: d.getDate(),
      month: lang === "bs" ? MONTHS_BS[d.getMonth()] : d.toLocaleDateString("en-US", { month: "short" }),
      label: i === 0 ? "today" : i === 1 ? "tomorrow" : null,
    });
  }
  return days;
}

export default function BookingCalendar({ listing }) {
  const { t, lang } = useLanguage();
  const { bookings, addBooking } = useBookings();
  const days = useMemo(() => buildDays(lang), [lang]);

  const timeLabel = (slot) => {
    if (lang !== "bs") return slot;
    const idx = TIME_SLOTS.indexOf(slot);
    return idx >= 0 ? TIME_SLOTS_24H[idx] : slot;
  };

  const [dayIdx, setDayIdx] = useState(0);
  const [time, setTime] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  const activeDay = days[dayIdx];

  const isTaken = (iso, slotValue) =>
    bookings.some((b) => b.listingId === listing.id && b.date === iso && b.time === slotValue);

  const selectDay = (i) => {
    setDayIdx(i);
    setTime(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!time) {
      setError(t("listingDetail.pickTimeFirst"));
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      setError(t("listingDetail.nameEmailRequired"));
      return;
    }
    if (isTaken(activeDay.iso, time)) {
      setError(t("listingDetail.slotTaken"));
      return;
    }
    setError("");
    const record = addBooking({
      listingId: listing.id,
      listingName: listing.name,
      listingAddress: listing.address,
      date: activeDay.iso,
      dateLabel: `${activeDay.weekday}, ${activeDay.month} ${activeDay.dayNum}`,
      time,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });
    setConfirmed(record);
  };

  const bookAnother = () => {
    setConfirmed(null);
    setTime(null);
    setForm({ name: "", email: "", phone: "" });
  };

  if (confirmed) {
    return (
      <div className="booking booking--confirmed" role="status" aria-live="polite">
        <div className="booking__confirm">
          <span className="booking__confirm-icon">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
              <path d="M4 13 L9.5 18.5 L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="booking__confirm-eyebrow">{t("listingDetail.appointmentRequested")}</p>
          <h3>{t("listingDetail.bookedFor").replace("{date}", confirmed.dateLabel)}</h3>
          <p className="booking__confirm-time">{timeLabel(confirmed.time)}</p>
          <p className="booking__confirm-sub">
            {listing.name} &middot; {listing.address}
            <br />
            {t("listingDetail.confirmationSentTo").replace("{email}", confirmed.email)}
          </p>
          <button type="button" className="btn btn--sm" onClick={bookAnother}>
            {t("listingDetail.bookAnotherTime")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking">
      <p className="booking__eyebrow">{t("listingDetail.bookAppointmentEyebrow")}</p>
      <h3 className="booking__title">{t("listingDetail.visitTitle").replace("{name}", listing.name)}</h3>

      <div className="booking__days" role="group" aria-label={t("listingDetail.chooseDayAriaLabel")}>
        {days.map((d, i) => (
          <button
            type="button"
            key={d.iso}
            aria-pressed={i === dayIdx}
            className={`booking__day${i === dayIdx ? " is-active" : ""}`}
            onClick={() => selectDay(i)}
          >
            <span className="booking__day-label">{d.label ? t(`listingDetail.${d.label}`) : d.weekday}</span>
            <span className="booking__day-num">{d.dayNum}</span>
            <span className="booking__day-month">{d.month}</span>
          </button>
        ))}
      </div>

      <div className="booking__times" role="group" aria-label={t("listingDetail.chooseTimeAriaLabel")}>
        {TIME_SLOTS.map((slot) => {
          const taken = isTaken(activeDay.iso, slot);
          return (
            <button
              type="button"
              key={slot}
              disabled={taken}
              aria-pressed={slot === time}
              className={`booking__time${slot === time ? " is-active" : ""}${taken ? " is-taken" : ""}`}
              onClick={() => setTime(slot)}
            >
              {timeLabel(slot)}
              {taken && <span className="booking__time-taken">{t("listingDetail.bookedTag")}</span>}
            </button>
          );
        })}
      </div>

      <form className="booking__form" onSubmit={handleSubmit}>
        <div className="booking__fields">
          <label className="booking__field">
            <span>{t("listingDetail.nameLabel")}</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder={t("listingDetail.namePlaceholder")}
            />
          </label>
          <label className="booking__field">
            <span>{t("listingDetail.emailLabel")}</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder={t("listingDetail.emailPlaceholder")}
            />
          </label>
          <label className="booking__field">
            <span>{t("listingDetail.phoneOptionalLabel")}</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="+387 61 234 567"
            />
          </label>
        </div>

        {error && (
          <p className="booking__error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn booking__submit">
          {t("listingDetail.confirmButtonPrefix")} {activeDay.weekday}, {activeDay.month} {activeDay.dayNum}
          {time ? ` ${t("listingDetail.atTimeSuffix").replace("{time}", timeLabel(time))}` : ""}
        </button>
      </form>
    </div>
  );
}
