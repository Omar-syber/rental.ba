"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries } from "@/lib/i18n/dictionaries";
export { localize } from "@/lib/i18n/localize";

const STORAGE_KEY = "tf-lang";
const LanguageContext = createContext(null);

function lookup(dict, path) {
  const value = path.split(".").reduce((node, key) => (node && typeof node === "object" ? node[key] : undefined), dict);
  return typeof value === "string" ? value : undefined;
}

export function LanguageProvider({ children }) {
  // Starts "bs" on both server and first client render (no cookie/header
  // negotiation) so hydration always matches; the stored preference is
  // applied a moment later in an effect, same pattern as the loader's
  // sessionStorage skip-path.
  const [lang, setLangState] = useState("bs");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "bs") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key) => lookup(dictionaries[lang], key) ?? lookup(dictionaries.en, key) ?? key,
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

