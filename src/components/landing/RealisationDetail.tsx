import Image from "next/image";
import Contact from "@/src/components/landing/Contact";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";
import Button from "@/src/components/ui/Button";
import TextLink from "@/src/components/ui/TextLink";
import { getCapabilityBySlug } from "@/src/lib/capabilities";
import type { Realisation } from "@/src/lib/realisations";
import { isVideo, mediaList } from "@/src/lib/media";
import { ArrowUpRight } from "./Brand";

/** Podstrona pojedynczej realizacji. Treść case study dojdzie z Contentful. */
export default function RealisationDetail({ realisation }: { realisation: Realisation }) {
  const capability = getCapabilityBySlug(realisation.capability);
  const gallery = mediaList(`realisations/${realisation.slug}/gallery`);
  const meta = [
    { label: "Klient", value: realisation.client },
    { label: "Zakres", value: capability?.title ?? realisation.capability },
    { label: "Rok", value: realisation.year },
  ];

  return (
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />

      <section className="bg-glow-top bg-size-[auto,256px_256px] relative bg-cream pt-[calc(var(--header-height,96px)+3rem)] pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <TextLink
            href="/realisations"
            hoverClassName="text-ember"
            className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.12em] text-stone"
          >
            ← Wszystkie realizacje
          </TextLink>

          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
            <span className="rounded-full border border-ink/30 px-3 py-1 text-ink">{capability?.navLabel}</span>
            <span>{realisation.year}</span>
          </div>

          <h1 className="m-0 mt-6 max-w-4xl font-display text-4xl font-extrabold font-stretch-110% uppercase leading-[0.92] tracking-display text-ink sm:text-6xl md:text-7xl">
            {realisation.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">{realisation.summary}</p>

          <div className="relative mt-12 aspect-16/9 overflow-hidden rounded-[18px] bg-[#3A0A06] shadow-[0_30px_60px_rgba(14,9,7,0.25)]">
            <Image
              src={realisation.cover ?? realisation.fallback}
              alt={realisation.cover ? realisation.title : ""}
              fill
              preload
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
          </div>

          {/* galeria z Vercel Blob: realisations/<slug>/gallery/* (zdjęcia i filmy, kolejność wg nazwy pliku) */}
          {gallery.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {gallery.map((file, index) => (
                <div
                  key={file.pathname}
                  className={`relative overflow-hidden rounded-[18px] bg-[#3A0A06] ${
                    gallery.length % 2 === 1 && index === 0 ? "aspect-16/9 sm:col-span-2" : "aspect-4/3"
                  }`}
                >
                  {isVideo(file) ? (
                    <video src={file.url} controls playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <Image
                      src={file.url}
                      alt={`${realisation.title} — zdjęcie ${index + 1}`}
                      fill
                      sizes="(min-width: 1152px) 552px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <dl className="m-0 mt-12 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 gap-y-6">
            {meta.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2 border-t border-ink/30 pt-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">{label}</dt>
                <dd className="m-0 text-[17px] font-semibold leading-[1.4] text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row">
            {realisation.url && (
              <Button href={realisation.url} target="_blank" rel="noopener noreferrer" variant="ink">
                Zobacz na żywo
                <ArrowUpRight />
              </Button>
            )}
            <Button href="/start-project" variant="outline">
              Chcę podobny projekt
            </Button>
          </div>
        </div>
      </section>

      <Contact compact />
      <Footer />
    </main>
  );
}
