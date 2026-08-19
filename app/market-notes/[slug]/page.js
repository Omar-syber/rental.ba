import { notFound } from "next/navigation";
import { getMarketNoteBySlug, marketNotes } from "@/lib/data";
import MarketNoteDetail from "@/components/MarketNoteDetail";
import { localize } from "@/lib/i18n/localize";

export function generateStaticParams() {
  return marketNotes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const note = getMarketNoteBySlug(slug);
  if (!note) return {};
  // Metadata is rendered server-side before the client-side language toggle
  // can apply, so it's intentionally always English (same as every other
  // page's <metadata> export in this app).
  return {
    title: `${localize(note.title, "en")} — Rental.ba`,
    description: localize(note.excerpt, "en"),
  };
}

export default async function MarketNotePage({ params }) {
  const { slug } = await params;
  const note = getMarketNoteBySlug(slug);
  if (!note) notFound();
  return <MarketNoteDetail note={note} />;
}
