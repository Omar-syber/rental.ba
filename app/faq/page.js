import FAQAccordion from "@/components/FAQAccordion";
import { faqs } from "@/lib/data";

export const metadata = {
  title: "Česta pitanja — Rental.ba",
  description: "Odgovori na ono što nas kupci i prodavci najčešće pitaju.",
};

export default function FAQPage() {
  return <FAQAccordion faqs={faqs} />;
}
