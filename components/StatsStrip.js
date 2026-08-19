"use client";

import CountUp from "@/components/CountUp";
import { listings, neighborhoods } from "@/lib/data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function useStats(t) {
  return [
    { to: listings.length, decimals: 0, label: t("stats.activeListings") },
    { to: neighborhoods.length, decimals: 0, label: t("stats.neighborhoods") },
    { to: 1998, decimals: 0, label: t("stats.registeredSince") },
    { to: 100, decimals: 0, suffix: "%", label: t("stats.directContact") },
  ];
}

export default function StatsStrip() {
  const { t } = useLanguage();
  const STATS = useStats(t);
  return (
    <section className="stats">
      <div className="stats__row">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat__num">
              <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
            </span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
