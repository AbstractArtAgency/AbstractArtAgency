import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";
import ParticleBackground from "@/src/components/landing/ParticleBackground";
import Button from "@/src/components/ui/Button";

export default function NotFound() {
  return (
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />

      <section className="relative flex h-screen items-center overflow-hidden bg-cream bg-paper-grain bg-size-[256px_256px] bg-fixed py-32">
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
            <Button href="/" variant="ink">
              Wróć na stronę główną →
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
