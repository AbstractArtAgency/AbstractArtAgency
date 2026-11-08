import type { Metadata } from "next";
import ContactSplit from "@/src/components/landing/ContactSplit";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";

export const metadata: Metadata = {
  title: "Kontakt AbstractArt",
  description: "Napisz kilka słów o swoim biznesie i celach — odezwiemy się w ciągu 24 godzin z pierwszymi pomysłami.",
};

export default function ContactPage() {
  return (
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />
      <ContactSplit />
      <Footer />
    </main>
  );
}
