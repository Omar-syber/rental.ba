"use client";

import { useSavedListings } from "@/lib/SavedListingsContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SaveButton({ id, className }) {
  const { isSaved, toggleSave } = useSavedListings();
  const { t } = useLanguage();
  const saved = isSaved(id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(id);
  };

  return (
    <button
      type="button"
      className={`save-btn${saved ? " is-saved" : ""}${className ? " " + className : ""}`}
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? t("common.removeFromSaved") : t("common.saveThisHome")}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path
          d="M12 20.5 C12 20.5 3.5 15.4 3.5 9.4 C3.5 6.4 5.9 4.2 8.7 4.2 C10.3 4.2 11.4 4.9 12 5.9 C12.6 4.9 13.7 4.2 15.3 4.2 C18.1 4.2 20.5 6.4 20.5 9.4 C20.5 15.4 12 20.5 12 20.5 Z"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
