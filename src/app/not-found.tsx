import Link from "next/link";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";
import ParticleBackground from "@/src/components/landing/ParticleBackground";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="relative flex h-screen items-center overflow-hidden bg-cream py-32">
        <ParticleBackground />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/10 via-transparent to-cream" />

        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">

          <h1 className="mt-6 text-[32vw] font-normal text-ember italic font-accent leading-none tracking-tight sm:text-[10rem] lg:text-[13rem]">
            Ups...
          </h1>

          <p className="mx-auto mt-12 max-w-md text-lg leading-relaxed text-ink-soft md:text-2xl">
            Nie przewidzieliśmy tej strony w naszym planie.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="group relative overflow-hidden rounded-lg bg-ink px-8 py-4 font-mono text-sm text-cream"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10">Wróć na stronę główną →</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
