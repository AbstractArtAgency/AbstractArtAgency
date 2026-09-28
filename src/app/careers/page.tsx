import type { Metadata } from "next";
import CareerForm from "@/src/components/landing/CareerForm";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";

export const metadata: Metadata = {
  title: "Dołącz do nas AbstractArt",
  description: "Szukasz nowych wyzwań? Wyślij krótkie zgłoszenie, a odezwiemy się do Ciebie.",
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="relative overflow-hidden bg-cream pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative mx-auto w-full max-w-5xl px-6">
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-6xl lg:text-7xl">
            Masz coś ciekawego do <span className="text-ember font-accent italic tracking-wide">zaoferowania</span>?
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Nie prowadzimy sztywnej rekrutacji. W naszym zespole pracują również freelancerzy. Jeśli uważasz, że możesz pomóc w naszej pracy, napisz kilka
            słów o sobie. Odezwiemy się, jeśli tylko będziemy Cię potrzebować.
          </p>
        </div>
      </section>

      <section className="relative border-t border-line bg-cream py-16 md:py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <CareerForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
