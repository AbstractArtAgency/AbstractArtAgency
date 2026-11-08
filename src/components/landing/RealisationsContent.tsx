"use client";

import { useState } from "react";
import Image from "next/image";
import { brandImage, media } from "@/src/lib/media";
import { AnimatePresence, motion } from "framer-motion";
import Contact from "@/src/components/landing/Contact";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";
import { capabilities } from "@/src/lib/capabilities";
import { featuredWork } from "@/src/lib/featured-work";
import type { Realisation } from "@/src/lib/realisations";
import RealisationIndex, { REALISATION_INDEX_ID } from "./RealisationIndex";
import TextLink from "@/src/components/ui/TextLink";
import Button from "@/src/components/ui/Button";
import { ArrowUpRight as BrandArrow } from "./Brand";

const ease = [0.16, 1, 0.3, 1] as const;

/** Przykładowa realizacja dla usługi pokazywana obok listy (dane: src/lib/featured-work.ts). */
function FeaturedWorkCard({ slug }: { slug: string }) {
  const work = featuredWork[slug];
  if (!work) return null;
  const portrait = work.orientation === "portrait";

  return (
    <div
      className={`relative isolate overflow-hidden rounded-[18px] bg-[#3A0A06] text-bone shadow-[0_30px_60px_rgba(14,9,7,0.35)] ${
        portrait ? "aspect-4/5 w-52 lg:w-64" : "aspect-16/10 w-72 lg:w-96"
      }`}
    >
      <Image
        src={work.image ?? work.fallback}
        alt={work.image ? `${work.client} — ${work.summary}` : ""}
        fill
        sizes={portrait ? "(min-width: 1024px) 256px, 208px" : "(min-width: 1024px) 384px, 288px"}
        className="-z-1 object-cover"
      />
      <div className="pointer-events-none absolute inset-0 -z-1 bg-noise opacity-20 mix-blend-overlay" />
      <div className="flex h-full flex-col justify-between p-4 lg:p-5">
        <div className="flex justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em]">
          <span>{work.category}</span>
          <span>{work.year}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="m-0 text-xl font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em] lg:text-2xl">
            {work.client}
          </h3>
          <p className="m-0 text-[12px] leading-snug text-bone/90 lg:text-[13px]">{work.summary}</p>
        </div>
      </div>
    </div>
  );
}

function HeroIntro() {
  return (
    <>
      <p className="m-0 max-w-[300px] text-sm leading-relaxed text-ink-soft">
        Nasze <span className="bg-ember px-1 text-bone [box-decoration-break:clone]">najlepsze</span> realizacje,
        które pomogły w osiągnieciu sukcesu w sieci.
      </p>
      <Button href="/start-project" variant="primary" size="sm">
        Rozpocznij projekt
        <BrandArrow />
      </Button>
    </>
  );
}

/** Wachlarz trzech kart realizacji w hero (obrazki z src/lib/featured-work.ts, do czasu ich dodania — gradienty). */
function HeroStack() {
  const cards = [
    { slug: "strony-www", rotate: -7, x: "-9%", y: "4%", delay: 0.2 },
    { slug: "branding", rotate: 6, x: "8%", y: "1%", delay: 0.3 },
    { slug: "social-media", rotate: -2, x: "0%", y: "0%", delay: 0.4 },
  ];

  return (
    <div className="relative mx-auto aspect-4/3 w-[min(72vw,360px)] md:w-[min(36vw,460px,calc((100svh-var(--header-height,96px)-22rem)*4/3))] md:min-w-64">
      {cards.map((card, index) => {
        const work = featuredWork[card.slug];
        if (!work) return null;
        return (
          <motion.div
            key={card.slug}
            initial={{ opacity: 0, y: 40, rotate: 0, x: "0%" }}
            animate={{ opacity: 1, y: card.y, rotate: card.rotate, x: card.x }}
            transition={{ delay: card.delay, duration: 0.9, ease }}
            className="absolute inset-0 overflow-hidden rounded-[18px] border-4 border-paper bg-[#3A0A06] shadow-[0_30px_60px_rgba(14,9,7,0.35)]"
            style={{ zIndex: index }}
          >
            <Image
              src={work.image ?? work.fallback}
              alt={work.image ? `${work.client} — ${work.summary}` : ""}
              fill
              sizes="(min-width: 768px) 460px, 72vw"
              preload={index === cards.length - 1}
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
            <div className="absolute inset-x-0 top-0 flex justify-between p-4 font-mono text-[10px] uppercase tracking-[0.12em] text-bone">
              <span>{work.category}</span>
              <span>{work.year}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function RealisationsContent({ realisations }: { realisations: Realisation[] }) {
  const [activeSlug, setActiveSlug] = useState(capabilities[0]?.slug ?? "");
  // usługa wybrana kliknięciem w liście (01) — filtruje realizacje w sekcji (02)
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);

  return (
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />

      {/* hero na całą wysokość okna: nagłówek u góry, wachlarz kart pośrodku, wielkie słowo przy dolnej krawędzi */}
      <section className="bg-glow-top bg-size-[auto,256px_256px] bg-fixed relative flex min-h-svh flex-col overflow-hidden bg-cream pt-[calc(var(--header-height,96px)+2rem)] pb-10">
        <div className="bg-grid bg-size-[44px_44px] bg-fixed pointer-events-none absolute inset-0 opacity-20" />

        <div className="@container pt-20 relative mx-auto flex w-full max-w-7xl grow flex-col px-gutter">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="m-0 shrink-0 text-center font-display text-2xl font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-display text-ink sm:text-4xl lg:text-5xl"
          >
            Nie robimy projektów
            <br />
            <span className="font-accent font-normal italic tracking-accent text-ember normal-case text-3xl sm:text-5xl lg:text-6lg">do szuflady.</span> Oto nasze najlepsze!
          </motion.p>

          {/* środek: tekst | karty | dowód — wypełnia całą wolną wysokość */}
          <div className="relative z-10 flex grow items-center py-8 md:py-6">
            <div className="grid w-full items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease }}
                className="hidden flex-col items-start gap-5 md:flex"
              >
                <HeroIntro />
              </motion.div>

              <HeroStack />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6, ease }}
                className="hidden flex-col items-end gap-3 text-right md:flex"
              >
                <div className="relative aspect-16/10 w-36 overflow-hidden rounded-xl shadow-lg lg:w-44">
                  <Image src={media("realisations-page/thumbnail") ?? brandImage("gradient-orange")} alt="" fill sizes="176px" className="object-cover" />
                  <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.12em] text-bone">
                    Kampanie
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[brandImage("gradient-red"), brandImage("gradient-wine"), brandImage("gradient-orange")].map((fallback, index) => media(`realisations-page/avatar-${index + 1}`) ?? fallback).map((src) => (
                      <span key={src} className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-cream">
                        <Image src={src} alt="" fill sizes="28px" className="object-cover" />
                      </span>
                    ))}
                  </div>
                  <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] text-cream">10+</span>
                </div>
                <p className="m-0 font-mono text-[10px] uppercase tracking-[0.14em] text-stone">Marek, które nam zaufały</p>
              </motion.div>
            </div>
          </div>

          {/* mobile: tekst i przycisk nad wielkim słowem */}
          <div className="relative z-10 flex flex-col items-center gap-5 pb-6 text-center md:hidden">
            <HeroIntro />
          </div>

          {/* wielkie słowo — rozmiar względem szerokości kontenera (cqw), więc zawsze mieści się w marginesach */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease }}
            className="pointer-events-none relative z-0 m-0 -mt-[4cqw] shrink-0 select-none whitespace-nowrap text-center font-display text-[13.5cqw] font-extrabold font-stretch-112% uppercase leading-[0.78] tracking-[-0.04em] text-ink"
          >
            Realizacje
          </motion.h1>
        </div>
      </section>

      <section className="relative border-t border-line bg-cream bg-paper-grain bg-size-[256px_256px] bg-fixed py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 border-b border-line pb-10 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Pomagamy markom rosnąć dzięki treściom i ukierunkowanej strategii dopasowanej do indywidualnych potrzeb.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft md:text-right">
              Zobacz nasze projekty, które mieliśmy okazję wykonać w ramach naszej agencji.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mt-10"
          >
            <ul className="font-display text-3xl font-bold uppercase leading-[1.15] text-ink sm:text-5xl md:text-6xl">
              {capabilities.map((capability) => (
                <li key={capability.slug}>
                  <TextLink
                    href={`#${REALISATION_INDEX_ID}`}
                    hoverClassName="text-ember"
                    className={`inline-block transition-colors duration-300 ${
                      selectedCapability === capability.slug ? "text-ember" : ""
                    }`}
                    aria-current={selectedCapability === capability.slug ? "true" : undefined}
                    onMouseEnter={() => setActiveSlug(capability.slug)}
                    onFocus={() => setActiveSlug(capability.slug)}
                    onClick={(event) => {
                      event.preventDefault();
                      // ponowne kliknięcie wybranej usługi pokazuje znowu wszystkie realizacje
                      setSelectedCapability((current) => (current === capability.slug ? null : capability.slug));
                      document.getElementById(REALISATION_INDEX_ID)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {capability.navLabel}
                  </TextLink>
                </li>
              ))}
            </ul>

            {/* przykładowa realizacja z zakresu, na który najechano — karty się przenikają, bez czekania na wyjście poprzedniej */}
            <div className="pointer-events-none absolute -right-4 top-1/2 hidden h-80 w-96 -translate-y-1/2 md:block lg:h-96 lg:w-[26rem]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeSlug}
                  className="absolute inset-0 flex items-center justify-end"
                  initial={{ opacity: 0, y: -10, scale: 0.97, rotate: (featuredWork[activeSlug]?.rotate ?? 0) - 2 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: featuredWork[activeSlug]?.rotate ?? 0 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.15, ease } }}
                  transition={{ duration: 0.25, ease }}
                >
                  <FeaturedWorkCard slug={activeSlug} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <RealisationIndex
        realisations={realisations}
        selected={selectedCapability}
      />


      <Contact compact />
      <Footer />
    </main>
  );
}
