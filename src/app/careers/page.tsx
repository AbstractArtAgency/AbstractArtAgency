import type { Metadata } from "next";
import CareersContent from "@/src/components/landing/CareersContent";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";

export const metadata: Metadata = {
  title: "Dołącz do nas AbstractArt",
  description: "Szukasz nowych wyzwań? Wyślij krótkie zgłoszenie, a odezwiemy się do Ciebie.",
};

export default function CareersPage() {
  return (
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />

      <CareersContent />

      <Footer />
    </main>
  );
}
