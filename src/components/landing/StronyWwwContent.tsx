"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import CapabilityIntro from "@/src/components/landing/CapabilityIntro";
import CalloutItem from "@/src/components/landing/CalloutItem";
import Contact from "@/src/components/landing/Contact";
import StatementHeadline from "@/src/components/landing/StatementHeadline";
import MobileCalloutPairs from "@/src/components/landing/MobileCalloutPairs";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";

type Callout = {
  title: string;
  desc: string;
};

type Screen = {
  logo: Callout;
  left: Callout;
  right: Callout;
};

const staticRight: Callout = {
  title: "Menu nawigacji",
  desc: "Prowadzi użytkownika do kluczowych podstron bez zbędnego szukania.",
};

const screens: Screen[] = [
  {
    logo: {
      title: "Logo / marka",
      desc: "Buduje rozpoznawalność i profesjonalny wizerunek od pierwszej sekundy.",
    },
    left: {
      title: "Nagłówek",
      desc: "Pierwsze spojrzenie klienta. Informuje czym się zajmujesz i co oferujesz.",
    },
    right: {
      title: "Przycisk CTA",
      desc: "Jasne wezwanie do działania. Kluczowy element napędzający pierwszy kontakt.",
    },
  },
  {
    logo: {
      title: "Nawigacja",
      desc: "Zostaje na widoku przez cały czas przeglądania witryny.",
    },
    left: {
      title: "Oferta",
      desc: "Informacje o ofercie zaraz pod główną częścią strony.",
    },
    right: {
      title: "Podział usług / produktów",
      desc: "Ułatwia szybkie zrozumienie, co dokładnie sprzedajesz.",
    },
  },
  {
    logo: {
      title: "Spójność marki",
      desc: "Ten sam styl w każdym miejscu na stronie pokazuje profesjonalizm.",
    },
    left: {
      title: "Portfolio",
      desc: "Pokazując konkretne efekty dotychczasowej pracy budując zaufanie potencjalnych klientów.",
    },
    right: {
      title: "Miniatury projektów",
      desc: "Wizualna zachęta do kliknięcia i poznania szczegółów realizacji.",
    },
  },
  {
    logo: {
      title: "Dopracowane szczegóły",
      desc: "Tekst, przyciski i kolory. Wszystko według jendego stylu.",
    },
    left: {
      title: "Wezwanie do kontaktu",
      desc: "Prosty sposób na kontakt klienta z Tobą.",
    },
    right: {
      title: "Formularz / CTA",
      desc: "Ułatwia zrobienie pierwszego kroku bez szukania po stronie.",
    },
  },
  {
    logo: {
      title: "Stopka firmowa",
      desc: "Zawiera wszystkie najważniejsze informacje o firmie i ułatwia kontakt.",
    },
    left: {
      title: "Dane kontaktowe",
      desc: "Adres, telefon i e-mail dostępne bez wracania do góry.",
    },
    right: {
      title: "Mapka Google",
      desc: "Ułatwia klientom znalezienie dokładnej lokalizacji firmy bez opuszczania strony.",
    },
  },
];

function MockNavbar() {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between border-b border-line bg-cream px-6 sm:px-8">
      <span className="font-display text-sm font-bold text-ink">
        Studio<span className="text-ember">.</span>
      </span>
      <div className="flex items-center gap-4">
        <span className="hidden font-mono text-[10px] text-ink-soft sm:inline">Oferta</span>
        <span className="hidden font-mono text-[10px] text-ink-soft sm:inline">Realizacje</span>
        <span className="rounded-md bg-ink px-3 py-1.5 font-mono text-[9px] text-cream">
          Kontakt
        </span>
      </div>
    </div>
  );
}

function ScreenHero() {
  return (
    <div className="grid h-full grid-cols-2 items-center gap-4 px-6 sm:px-8">
      <div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-ember">
          Agencja kreatywna
        </span>
        <h3 className="mt-2 font-display text-lg font-bold leading-tight text-ink sm:text-2xl">
          Projektujemy strony, które sprzedają.
        </h3>
        <p className="mt-2 hidden text-[10px] leading-relaxed text-ink-soft sm:block">
          Łączymy design, kod i strategię w jeden spójny produkt.
        </p>
        <span className="mt-3 inline-block rounded-md bg-ember px-3 py-1.5 font-mono text-[9px] text-bone">
          Zobacz ofertę →
        </span>
      </div>
      <div className="aspect-square rounded-xl bg-linear-to-br from-ember/20 via-cream-dim to-paper" />
    </div>
  );
}

function ScreenServices() {
  const services = ["Design", "Rozwój", "Wsparcie"];
  return (
    <div className="flex h-full flex-col justify-center gap-4 px-6 sm:px-8">
      <span className="font-display text-base font-bold text-ink sm:text-xl">
        Nasze usługi
      </span>
      <div className="grid grid-cols-3 gap-3">
        {services.map((service) => (
          <div key={service} className="rounded-lg border border-line bg-paper p-3">
            <div className="h-4 w-4 rounded bg-ember/30" />
            <p className="mt-2 font-mono text-[9px] font-bold uppercase tracking-wide text-ink">
              {service}
            </p>
            <p className="mt-1 hidden text-[8px] leading-relaxed text-ink-soft sm:block">
              Krótki opis oferty.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenPortfolio() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 px-6 sm:px-8">
      <span className="font-display text-base font-bold text-ink sm:text-xl">
        Wybrane realizacje
      </span>
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <div className="aspect-4/3 rounded-lg bg-linear-to-br from-ember/15 via-cream-dim to-paper" />
            <p className="mt-1.5 font-mono text-[8px] text-stone">Projekt 0{i + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenContact() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center sm:px-8">
      <span className="font-display text-lg font-bold text-ink sm:text-2xl">
        Porozmawiajmy
      </span>
      <span className="inline-block rounded-md bg-ember px-4 py-2 font-mono text-[9px] text-bone">
        Napisz do nas →
      </span>
    </div>
  );
}

function ScreenFooterMap() {
  return (
    <div className="flex h-full flex-col border-t border-line bg-paper">
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-4 px-6 py-4 sm:px-8">
        <div className="flex h-full flex-col justify-center gap-1.5">
          <span className="font-display text-sm font-bold text-ink">
            Studio<span className="text-ember">.</span>
          </span>
          <p className="font-mono text-[8px] text-ink-soft">ul. Przykładowa 12, 00-001 Warszawa</p>
          <p className="font-mono text-[8px] text-ink-soft">+48 500 100 200</p>
          <p className="font-mono text-[8px] text-ink-soft">kontakt@studio.pl</p>
          <p className="mt-1 font-mono text-[8px] text-stone">Pn–Pt: 9:00–17:00</p>
        </div>
        <div className="relative h-full overflow-hidden rounded-lg border border-line bg-cream-dim">
          <div className="bg-grid bg-size-[44px_44px] bg-fixed pointer-events-none absolute inset-0 opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="h-5 w-5 fill-ember text-ember" />
          </div>
          <span className="absolute bottom-1.5 left-1.5 rounded bg-paper px-1.5 py-0.5 font-mono text-[6px] text-stone">
            Mapa Google
          </span>
        </div>
      </div>
      <div className="flex h-8 shrink-0 items-center justify-center border-t border-line bg-paper">
        <span className="font-mono text-[8px] text-stone">© Studio 2026 — wszelkie prawa zastrzeżone</span>
      </div>
    </div>
  );
}

const screenComponents = [
  ScreenHero,
  ScreenServices,
  ScreenPortfolio,
  ScreenContact,
  ScreenFooterMap,
];

export default function StronyWwwContent() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const progress = useMotionValue(0);
  const [activeScreen, setActiveScreen] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.on("change", (p) => {
      const idx = Math.min(
        screens.length - 1,
        Math.max(0, Math.round(p * (screens.length - 1))),
      );
      setActiveScreen(idx);
    });
    return unsubscribe;
  }, [progress]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const getNavHeight = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(
        "--header-height",
      );
      const parsed = parseFloat(raw);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const calc = () => {
      const rect = el.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || 0;
      const start = rect.top + scrollTop - getNavHeight();
      const end = start + el.offsetHeight - window.innerHeight;
      return { start, end };
    };

    let bounds = calc();

    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      const p = (y - bounds.start) / (bounds.end - bounds.start);
      progress.set(Math.max(0, Math.min(1, p)));
    };

    const measure = () => {
      if (viewportRef.current) setScreenHeight(viewportRef.current.clientHeight);
    };

    const onResize = () => {
      bounds = calc();
      measure();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [progress]);

  const translateY = useTransform(
    progress,
    (p) => -(p * (screens.length - 1) * screenHeight),
  );

  return (
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />
      {/* (01) intro */}
      <CapabilityIntro
        slug="strony-www"
        eyebrow="Strony"
        word="WWW"
        note="szybko i nowocześnie"
        highlight="Projektujemy i wdrażamy nowoczesne, szybkie i bezpieczne strony www."
        description="Projektujemy i wdrażamy nowoczesne, szybkie i bezpieczne strony www. Dbamy o to, żeby strona dobrze wyglądała na każdym ekranie, ładowała się błyskawicznie i prowadziła odwiedzających prosto do kontaktu z Tobą. Możemy też zaopiekować się już istniejącymi stronami."
      />

      {/* (02) demo */}
      <section className="relative border-t border-line bg-cream-dim bg-paper-grain bg-size-[256px_256px] bg-fixed py-20 md:py-28">
        <div className="bg-grid bg-size-[44px_44px] bg-fixed pointer-events-none absolute inset-0 opacity-10" />

        <div className="relative mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <StatementHeadline
              note="przewiń ↓"
              lines={[
                { parts: ["Zobacz co"] },
                { indent: 1, parts: ["powinna mieć"] },
                { parts: [{ brush: "dobra" }, " strona"] },
                { indent: 2, parts: [{ accent: "www." }] },
              ]}
            />
          </motion.div>

          {/* desktop: scroll-synced mac window with side callouts */}
          <div ref={trackRef} className="relative mt-12 md:mt-16" style={{ height: "520vh" }}>
            <div className="sticky top-[var(--header-height,96px)] flex h-[calc(100vh-var(--header-height,96px))] items-center">
              <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-[190px_minmax(0,1fr)_190px] md:gap-4 lg:grid-cols-[240px_minmax(0,1fr)_240px] lg:gap-6">
                {/* left column */}
                <div className="hidden flex-col gap-12 md:flex">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`logo-${activeScreen}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CalloutItem callout={screens[activeScreen].logo} side="left" />
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScreen}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CalloutItem callout={screens[activeScreen].left} side="left" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* mac window mockup */}
                <div className="mx-auto w-full max-w-[min(58vw,960px)] max-md:max-w-none">
                  <div
                    className="relative overflow-hidden rounded-2xl border border-line bg-paper shadow-xl"
                    style={{ aspectRatio: "16 / 10" }}
                  >
                    {/* na mobile cała zawartość okna jest renderowana jak na szerszym ekranie i pomniejszana (scale 0.6),
                        żeby elementy strony były proporcjonalnie mniejsze; transform nie wpływa na pomiar clientHeight */}
                    <div className="absolute left-0 top-0 h-full w-full origin-top-left max-md:h-[166.667%] max-md:w-[166.667%] max-md:scale-[0.6]">
                      {/* titlebar */}
                      <div className="absolute inset-x-0 top-0 z-10 flex h-11 items-center gap-3 border-b border-line bg-paper px-4">
                        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-cream px-3 py-1 font-mono text-[10px] text-stone">
                          twojafirma.pl
                        </div>
                      </div>

                      {/* fixed mini navbar */}
                      <div className="absolute inset-x-0 top-11 z-10">
                        <MockNavbar />
                      </div>

                      {/* clipped scrolling viewport */}
                      <div
                        ref={viewportRef}
                        className="absolute inset-x-0 bottom-0 overflow-hidden bg-cream"
                        style={{ top: "5.5rem" }}
                      >
                        <motion.div style={{ y: translateY }} className="absolute inset-x-0 top-0">
                          {screenComponents.map((ScreenComponent, index) => (
                            <div
                              key={index}
                              style={{ height: screenHeight ? `${screenHeight}px` : "100%" }}
                            >
                              <ScreenComponent />
                            </div>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* right column */}
                <div className="hidden flex-col gap-12 md:flex">
                  <CalloutItem callout={staticRight} side="right" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScreen}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CalloutItem callout={screens[activeScreen].right} side="right" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* mobile: hasła parami pod urządzeniem */}
                <MobileCalloutPairs
                  progress={progress}
                  callouts={[staticRight, ...screens.flatMap((s) => [s.logo, s.left, s.right])]}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      <Contact compact />
      <Footer />
    </main>
  );
}
