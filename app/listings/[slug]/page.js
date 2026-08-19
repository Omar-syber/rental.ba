import { notFound } from "next/navigation";
import { getListingBySlug, listings } from "@/lib/data";
import PropertyDetail from "@/components/PropertyDetail";
import { localize } from "@/lib/i18n/localize";

// Metadata is rendered server-side before the client-side language toggle
// can run, so it always uses the "en" side of each bilingual {en,bs} field.

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return {};
  const title = `${listing.name} — Rental.ba`;
  const description = `${listing.price} · ${listing.beds} bd · ${listing.baths} ba · ${listing.sqft} m². ${localize(listing.description, "en")}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: listing.image, width: 1200, height: 800, alt: localize(listing.alt, "en") }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [listing.image],
    },
  };
}

function listingJsonLd(listing) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.name,
    description: localize(listing.description, "en"),
    url: `https://rental.ba/listings/${listing.slug}`,
    image: listing.images,
    datePosted: "2026-01-01",
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address,
      addressLocality: listing.neighborhood,
    },
    ...(listing.priceValue != null && {
      offers: {
        "@type": "Offer",
        price: listing.priceValue,
        priceCurrency: "BAM",
        availability: "https://schema.org/InStock",
      },
    }),
    numberOfRooms: listing.beds,
    numberOfBathroomsTotal: listing.baths,
    floorSize: {
      "@type": "QuantitativeValue",
      value: listing.sqft,
      unitCode: "MTK",
    },
  };
}

export default async function PropertyPage({ params }) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd(listing)) }}
      />
      <PropertyDetail listing={listing} />
    </>
  );
}
