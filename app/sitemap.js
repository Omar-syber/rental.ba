import { listings, team, neighborhoods, marketNotes } from "@/lib/data";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/listings",
    "/saved",
    "/appointments",
    "/sell",
    "/calculator",
    "/market-notes",
    "/faq",
    "/about",
    "/privacy",
    "/terms",
    "/fair-housing",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const listingRoutes = listings.map((l) => ({
    url: `${BASE_URL}/listings/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const teamRoutes = team.map((t) => ({
    url: `${BASE_URL}/team/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const neighborhoodRoutes = neighborhoods.map((n) => ({
    url: `${BASE_URL}/neighborhoods/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const noteRoutes = marketNotes.map((n) => ({
    url: `${BASE_URL}/market-notes/${n.slug}`,
    lastModified: n.date,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...listingRoutes, ...teamRoutes, ...neighborhoodRoutes, ...noteRoutes];
}
