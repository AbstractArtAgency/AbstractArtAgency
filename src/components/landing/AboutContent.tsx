"use client";

import { useState } from "react";
import Image from "next/image";
import { brandImage, media, slugify } from "@/src/lib/media";
import { AnimatePresence, motion } from "framer-motion";
import Contact from "@/src/components/landing/Contact";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";
import Button from "@/src/components/ui/Button";
import { ArrowUpRight } from "./Brand";

const ease = [0.16, 1, 0.3, 1] as const;

const team = [
  {
    initials: "JP",
    name: "Jakub Przyciasa",
    role: "Founder & Marketing Lead",
    rotate: -3,
    background: brandImage("gradient-red"),
  },
  {
    initials: "DŚ",
    name: "Dawid Ślusarczyk",
    role: "Head of Design",
    rotate: 2,
    background: brandImage("gradient-orange"),
  },
  {
    initials: "JW",
    name: "Jan Walicki",
    role: "Lead Developer",
    rotate: -2,
    background: brandImage("gradient-wine"),
  },
  {
    initials: "JT",
    name: "Julia Tenerle",
    role: "Social Media & Content Manager",
    rotate: 3,
    background: brandImage("gradient-red"),
  },
];

/** Karta osoby w stylu kart realizacji: gradient marki, rola u góry, inicjały i imię na dole. */
function TeamCard({ member }: { member: (typeof team)[number] }) {
  // zdjęcie z Vercel Blob: team/<imie-nazwisko>.jpg, np. team/jan-walicki.jpg
  const photo = media(`team/${slugify(member.name)}`);
  return (
    <div className="relative isolate aspect-4/5 w-full overflow-hidden rounded-[18px] bg-[#3A0A06] text-bone shadow-[0_30px_60px_rgba(14,9,7,0.3)]">
      <Image src={photo ?? member.background} alt={photo ? member.name : ""} fill sizes="(min-width: 1024px) 288px, 240px" className="-z-1 object-cover" />
      {photo && <div className="pointer-events-none absolute inset-0 -z-1 bg-linear-to-t from-coal/60 via-transparent to-transparent" />}
      <div className="pointer-events-none absolute inset-0 -z-1 bg-noise opacity-20 mix-blend-overlay" />
      <div className="flex h-full flex-col justify-between p-4 sm:p-5">
        <div className="flex justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.12em] sm:text-[10px]">
        </div>
        <div className="flex flex-col gap-2">
          {!photo && (
            <span aria-hidden="true" className="font-display text-6xl font-extrabold font-stretch-112% leading-none tracking-[-0.04em] text-bone/30">
              {member.initials}
            </span>
          )}
          <p className="m-0 text-xl font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em]">
            {member.name}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Środek koła hovera = punkt wejścia/wyjścia kursora, liczony względem imienia (jak w <TextLink>). */
function setFillOrigin(event: React.PointerEvent<HTMLElement>) {
  const label = event.currentTarget.querySelector<HTMLElement>("[data-text-link-label]");
  if (!label) return;
  const rect = label.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  // kursor może wejść w wiersz daleko od imienia — promień sięga najdalszego rogu napisu
  const r = Math.max(
    Math.hypot(x, y),
    Math.hypot(rect.width - x, y),
    Math.hypot(x, rect.height - y),
    Math.hypot(rect.width - x, rect.height - y),
  );
  const style = event.currentTarget.style;
  style.setProperty("--tl-x", `${x}px`);
  style.setProperty("--tl-y", `${y}px`);
  style.setProperty("--tl-r", `${Math.ceil(r)}px`);
}

/**
 * Zespół jako lista: (01) Imię … (Rola). Aktywna osoba jest wyraźna, pozostałe przygaszone;
 * nad listą „unosi się” jej karta (desktop) — na mobile karta stoi nad listą.
 */
function TeamList() {
  const [active, setActive] = useState(0);
  const member = team[active];

  const card = (
    <AnimatePresence initial={false}>
      <motion.div
        key={member.name}
        initial={{ opacity: 0, y: -12, scale: 0.96, rotate: member.rotate - 2 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: member.rotate }}
        exit={{ opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.15, ease } }}
        transition={{ duration: 0.3, ease }}
        className="absolute inset-0"
      >
        <TeamCard member={member} />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="relative">
      {/* mobile: karta nad listą */}
      <div className="relative mx-auto mb-10 aspect-4/5 w-52 md:hidden">{card}</div>

      <ul className="m-0 list-none border-t border-ink/15 p-0">
        {team.map((person, index) => {
          const isActive = index === active;
          return (
            <li key={person.name} className="border-b border-ink/15">
              <button
                type="button"
                aria-pressed={isActive}
                data-text-link=""
                onPointerEnter={setFillOrigin}
                onPointerLeave={setFillOrigin}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`grid w-full grid-cols-1 items-baseline gap-x-4 gap-y-1 py-4 text-left transition-colors duration-300 sm:grid-cols-[minmax(0,1fr)_auto] md:gap-x-6 md:py-5 ${
                  isActive ? "text-ink" : "text-ink/30 hover:text-ink/60"
                }`}
              >
                <span className="min-w-0 truncate font-display text-2xl font-extrabold font-stretch-110% uppercase leading-none tracking-[-0.02em] sm:text-4xl md:text-5xl">
                  {/* hover jak w linkach tekstowych: czerwień rozlewa się kołem od kursora (.text-link-fill w globals.css) */}
                  <span data-text-link-label="" className="relative inline-block">
                    {person.name}
                    <span aria-hidden="true" className="text-link-fill pointer-events-none absolute inset-0 text-ember">
                      {person.name}
                    </span>
                  </span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] sm:text-[11px]">
                  ( <span className={isActive ? "underline underline-offset-4" : ""}>{person.role}</span> )
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* desktop: karta unosząca się nad środkiem listy */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden aspect-4/5 w-56 -translate-x-1/2 -translate-y-1/2 md:block lg:w-64">
        {card}
      </div>
    </div>
  );
}

export default function AboutContent() {
  return (
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />

      {/* hero: zespół */}
      <section className="bg-glow-top bg-size-[auto,256px_256px] bg-fixed relative bg-cream pt-[calc(var(--header-height,96px)+3rem)] pb-20 md:pt-[calc(var(--header-height,96px)+4.5rem)] md:pb-28">
        <div className="bg-grid bg-size-[44px_44px] bg-fixed pointer-events-none absolute inset-0 opacity-10" />

        <div className="relative mx-auto w-full max-w-6xl px-6">
          {/* wyśrodkowany nagłówek */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="m-0 text-center font-display text-[1.4rem] font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em] text-ink [overflow-wrap:anywhere] sm:text-5xl md:text-6xl"
          >
            Multidyscyplinarni kreatywni
            <br />
            <span className="bg-ember px-[0.06em] text-bone [box-decoration-break:clone]">profesjonaliści.</span>
          </motion.h1>

          <div className="mt-14 md:mt-20">
            <TeamList />
          </div>

          {/* notka o zespole */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-5 text-center md:mt-20"
          >
            <span aria-hidden="true" className="h-[3px] w-10 bg-ember" />
            <p className="m-0 font-display text-lg font-bold uppercase leading-[1.2] tracking-[-0.01em] text-ink sm:text-2xl">
              Nasz zespół tworzą freelancerzy. Do
              każdego projektu dobieramy ludzi, których umiejętności najlepiej pasują do potrzeb danego zlecenia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* (03) kariera */}
      <section className="relative border-t border-line bg-cream py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col items-start gap-8 rounded-[18px] bg-ink p-8 text-cream md:flex-row md:items-end md:justify-between md:p-12"
          >
            <div className="flex max-w-2xl flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60">Kariera</span>
              <h2 className="m-0 font-display text-3xl font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">
                Masz coś do{" "}
                <span className="bg-ember px-[0.06em] text-bone [box-decoration-break:clone]">zaoferowania?</span>
              </h2>
              <p className="m-0 max-w-md text-[15px] leading-snug text-cream/75">
                Szukamy ludzi, którzy chcą tworzyć rzeczy, niecodzienne i niepowtarzalne. Dołącz do naszego zespołu.
              </p>
            </div>
            <Button href="/careers" variant="primary" className="shrink-0">
              Dołącz do nas
              <ArrowUpRight />
            </Button>
          </motion.div>
        </div>
      </section>

      <Contact compact />
      <Footer />
    </main>
  );
}
