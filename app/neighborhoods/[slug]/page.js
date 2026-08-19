import { notFound } from "next/navigation";
import { getNeighborhoodBySlug, neighborhoods } from "@/lib/data";
import NeighborhoodDetail from "@/components/NeighborhoodDetail";
import { localize } from "@/lib/i18n/localize";

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) return {};
  return {
    title: `${n.name} — Rental.ba`,
    description: localize(n.description, "en"),
  };
}

export default async function NeighborhoodPage({ params }) {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) notFound();
  return <NeighborhoodDetail neighborhood={n} />;
}
