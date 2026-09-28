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
    <main className="min-h-screen bg-cream">
      <Navbar />
      <div className="pt-24">
        <ContactSplit />
      </div>
      <Footer />
    </main>
  );
}
