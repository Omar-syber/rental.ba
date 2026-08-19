"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const SavedListingsContext = createContext(null);

export function SavedListingsProvider({ children }) {
  const [savedIds, setSavedIds] = useState([]);

  const toggleSave = useCallback((id) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const isSaved = useCallback((id) => savedIds.includes(id), [savedIds]);

  const value = useMemo(() => ({ savedIds, toggleSave, isSaved }), [savedIds, toggleSave, isSaved]);

  return <SavedListingsContext.Provider value={value}>{children}</SavedListingsContext.Provider>;
}

export function useSavedListings() {
  const ctx = useContext(SavedListingsContext);
  if (!ctx) throw new Error("useSavedListings must be used within SavedListingsProvider");
  return ctx;
}
