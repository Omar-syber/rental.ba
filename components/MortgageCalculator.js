"use client";

import { useEffect, useRef, useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";
import MaskedReveal from "@/components/MaskedReveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function useAnimatedNumber(target, duration = 450) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef(null);
  const fromRef = useRef(target);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(target);
      fromRef.current = target;
      return;
    }
    cancelAnimationFrame(rafRef.current);
    const from = fromRef.current;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setDisplay(from + (target - from) * ease(p));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

// Manual thousands-separator formatting (not toLocaleString) so the server
// render and the client render always produce identical text — relying on
// the "bs-BA" locale risks a mismatch between Node's and the browser's ICU
// data, which trips a hydration error.
const fmt = (n) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} KM`;

export default function MortgageCalculator() {
  const { t } = useLanguage();
  const [price, setPrice] = useState(300000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(5.5);
  const [term, setTerm] = useState(30);
  const [taxRate, setTaxRate] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [hoa, setHoa] = useState(30);

  const downAmount = price * (downPct / 100);
  const principal = Math.max(0, price - downAmount);
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;
  const piMonthly =
    monthlyRate === 0
      ? principal / numPayments
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
  const taxMonthly = (price * (taxRate / 100)) / 12;
  const totalMonthly = piMonthly + taxMonthly + insurance + hoa;
  const totalInterest = piMonthly * numPayments - principal;

  const animatedTotal = useAnimatedNumber(totalMonthly);
  const animatedPI = useAnimatedNumber(piMonthly);

  return (
    <div className="calc">
      <Reveal as="div" className="calc__head">
        <p className="calc__eyebrow">{t("calculator.eyebrow")}</p>
        <MaskedReveal as="h1" className="calc__title" text={t("calculator.title")} trigger="immediate" />
        <p className="calc__sub">{t("calculator.sub")}</p>
      </Reveal>

      <div className="calc__body">
        <Reveal as="div" className="calc__inputs" delay={60}>
          <label className="calc__field">
            <div className="calc__field-top">
              <span>{t("calculator.homePrice")}</span>
              <strong>{fmt(price)}</strong>
            </div>
            <input
              type="range"
              min="50000"
              max="1000000"
              step="5000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </label>

          <label className="calc__field">
            <div className="calc__field-top">
              <span>{t("calculator.downPayment")}</span>
              <strong>
                {downPct}% &middot; {fmt(downAmount)}
              </strong>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
            />
          </label>

          <label className="calc__field">
            <div className="calc__field-top">
              <span>{t("calculator.interestRate")}</span>
              <strong>{rate.toFixed(2)}%</strong>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              step="0.05"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </label>

          <div className="calc__field">
            <div className="calc__field-top">
              <span>{t("calculator.loanTerm")}</span>
            </div>
            <div className="calc__term-options">
              {[15, 20, 30].map((y) => (
                <button
                  type="button"
                  key={y}
                  aria-pressed={term === y}
                  className={`calc__term-btn${term === y ? " is-active" : ""}`}
                  onClick={() => setTerm(y)}
                >
                  {y} {t("calculator.years")}
                </button>
              ))}
            </div>
          </div>

          <div className="calc__more">
            <label className="calc__small-field">
              <span>{t("calculator.propertyTax")}</span>
              <input type="number" step="0.05" min="0" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
            </label>
            <label className="calc__small-field">
              <span>{t("calculator.homeInsurance")}</span>
              <input type="number" step="5" min="0" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} />
            </label>
            <label className="calc__small-field">
              <span>{t("calculator.hoaDues")}</span>
              <input type="number" step="5" min="0" value={hoa} onChange={(e) => setHoa(Number(e.target.value))} />
            </label>
          </div>
        </Reveal>

        <Reveal as="aside" className="calc__results" delay={100}>
          <p className="calc__results-eyebrow">{t("calculator.estimatedMonthly")}</p>
          <p className="calc__results-total">
            {fmt(animatedTotal)}
            <span>{t("calculator.perMonth")}</span>
          </p>

          <div className="calc__breakdown">
            <div className="calc__breakdown-row">
              <span>{t("calculator.principalInterest")}</span>
              <strong>{fmt(animatedPI)}</strong>
            </div>
            <div className="calc__breakdown-row">
              <span>{t("calculator.propertyTaxRow")}</span>
              <strong>{fmt(taxMonthly)}</strong>
            </div>
            <div className="calc__breakdown-row">
              <span>{t("calculator.insurance")}</span>
              <strong>{fmt(insurance)}</strong>
            </div>
            <div className="calc__breakdown-row">
              <span>{t("calculator.hoa")}</span>
              <strong>{fmt(hoa)}</strong>
            </div>
          </div>

          <div className="calc__extra">
            <div>
              <span>{t("calculator.loanAmount")}</span>
              <strong>{fmt(principal)}</strong>
            </div>
            <div>
              <span>{t("calculator.totalInterest").replace("{term}", term)}</span>
              <strong>{fmt(totalInterest)}</strong>
            </div>
          </div>

          <TransitionLink href="/#contact" className="btn btn--block calc__cta">
            {t("calculator.talkToAgent")}
          </TransitionLink>
        </Reveal>
      </div>
    </div>
  );
}
