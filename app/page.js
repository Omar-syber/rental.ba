import Hero from "@/components/Hero";
import HeroPaperCut from "@/components/HeroPaperCut";
import Prologue from "@/components/Prologue";
import Differentiators from "@/components/Differentiators";
import StatsStrip from "@/components/StatsStrip";
import Listings from "@/components/Listings";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Neighborhood from "@/components/Neighborhood";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Rental.ba",
  description:
    "Rental.ba, agencija za nekretnine u Sarajevu od 1998. godine, posreduje pri prodaji, kupovini i iznajmljivanju stanova, kuća, poslovnih prostora i zemljišta.",
  url: "https://rental.ba",
  telephone: "+387 33 210 208",
  email: "info@rental.ba",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mehmeda Spahe 6",
    addressLocality: "Sarajevo",
    postalCode: "71000",
    addressCountry: "BA",
  },
  areaServed: "Sarajevo",
  sameAs: [
    "https://www.facebook.com/Rental.ba.nekretnine/",
    "https://www.instagram.com/rental.ba/",
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <Hero />
      <HeroPaperCut />
      <Prologue />
      <Differentiators />
      <StatsStrip />
      <Listings />
      <Process />
      <Testimonials />
      <Neighborhood />
      <Team />
      <Contact />
    </main>
  );
}
