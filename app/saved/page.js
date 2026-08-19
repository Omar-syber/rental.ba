import SavedListingsView from "@/components/SavedListingsView";

export const metadata = {
  title: "Sačuvane nekretnine — Rental.ba",
  description: "Nekretnine koje ste sačuvali u ovoj sesiji, spremne za poređenje.",
};

export default function SavedPage() {
  return <SavedListingsView />;
}
