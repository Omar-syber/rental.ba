// Plain utility, deliberately NOT "use client" — lib/i18n/LanguageContext.js
// is a client module, so anything imported from it becomes an opaque client
// reference when pulled into a Server Component (e.g. generateMetadata/JSON-LD
// in app/**/page.js). Server code must import localize() from here directly;
// client components can keep importing it from LanguageContext.js, which
// re-exports this same function.
export function localize(field, lang) {
  if (field && typeof field === "object" && !Array.isArray(field)) {
    return field[lang] ?? field.en ?? "";
  }
  return field;
}
