import { Bricolage_Grotesque, Cormorant_Garamond, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./tailwind.css";
import SmoothScroll from "@/components/SmoothScroll";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BookingsProvider } from "@/lib/BookingsContext";
import { SavedListingsProvider } from "@/lib/SavedListingsContext";
import { TransitionProvider } from "@/lib/TransitionContext";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_TITLE = "Rental.ba — Agencija za nekretnine Sarajevo";
const SITE_DESCRIPTION =
  "Rental.ba, agencija za nekretnine u Sarajevu od 1998. godine, posreduje pri prodaji, kupovini i iznajmljivanju stanova, kuća, poslovnih prostora i zemljišta.";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/hero-sequence/frame-0096.jpg", width: 1280, height: 720, alt: "Nekretnina u ponudi agencije Rental.ba" }],
    type: "website",
    locale: "bs_BA",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/hero-sequence/frame-0096.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bs"
      className={`dark ${display.variable} ${editorial.variable} ${body.variable} ${mono.variable}`}
      style={{ backgroundColor: "#170f1a" }}
    >
      {/* Inline (not from globals.css) so the very first paint is already
          dark, before any external stylesheet has had a chance to load —
          otherwise a slow CSS load can show a flash of unstyled content
          underneath the loader curtain on first paint. */}
      <body suppressHydrationWarning style={{ backgroundColor: "#170f1a" }}>
        <GrainOverlay />
        <CustomCursor />
        <LanguageProvider>
          <TransitionProvider>
            <BookingsProvider>
              <SavedListingsProvider>
                <SmoothScroll>
                  <Nav />
                  {children}
                  <Footer />
                </SmoothScroll>
              </SavedListingsProvider>
            </BookingsProvider>
          </TransitionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
