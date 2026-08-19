import ListingsBrowser from "@/components/ListingsBrowser";

export const metadata = {
  title: "Sve nekretnine — Rental.ba",
  description:
    "Sve nekretnine koje agencija Rental.ba trenutno zastupa — pretražive i filtrabilne po tipu, broju soba i cijeni.",
};

export default function ListingsPage() {
  return <ListingsBrowser />;
}
