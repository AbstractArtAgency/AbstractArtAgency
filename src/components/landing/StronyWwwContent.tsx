"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import Contact from "@/src/components/landing/Contact";
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
      title: "Nagłówek H1",
      desc: "W kilka sekund komunikuje, czym się zajmujesz i dla kogo pracujesz.",
    },
    right: {
      title: "Przycisk CTA",
      desc: "Jasne wezwanie do działania — kluczowy element napędzający konwersję.",
    },
  },
  {
    logo: {
      title: "Logo w nawigacji",
      desc: "Zostaje na widoku przez cały czas przeglądania oferty.",
    },
    left: {
      title: "Sekcja usług",
      desc: "Pokazuje ofertę w przejrzystej, skanowalnej formie.",
    },
    right: {
      title: "Karty usług",
      desc: "Ułatwiają szybkie zrozumienie, co dokładnie oferujesz.",
    },
  },
  {
    logo: {
      title: "Spójność marki",
      desc: "Ten sam styl loga w każdej realizacji buduje zaufanie i rozpoznawalność.",
    },
    left: {
      title: "Portfolio",
      desc: "Buduje wiarygodność, pokazując konkretne efekty dotychczasowej pracy.",
    },
    right: {
      title: "Miniatury projektów",
      desc: "Zachęcają do kliknięcia i poznania szczegółów realizacji.",
    },
  },
  {
    logo: {
      title: "Marka do końca",
      desc: "Widoczna aż po finalne wezwanie do kontaktu.",
    },
    left: {
      title: "Wezwanie do kontaktu",
      desc: "Domyka podróż użytkownika jasnym, następnym krokiem.",
    },
    right: {
      title: "Formularz / CTA",
      desc: "Ułatwia zrobienie pierwszego kroku bez opuszczania strony.",
    },
  },
  {
    logo: {
      title: "Stopka firmowa",
      desc: "Uspokaja i porządkuje — dane kontaktowe zawsze w zasięgu ręki.",
    },
    left: {
      title: "Dane kontaktowe",
      desc: "Adres, telefon i e-mail dostępne bez przewijania do góry.",
    },
    right: {
      title: "Mapka Google",
      desc: "Ułatwia klientom namierzenie lokalizacji firmy bez wychodzenia ze strony.",
    },
  },
];

function CalloutItem({ callout, side }: { callout: Callout; side: "left" | "right" }) {
  return (
    <div className={`flex items-start gap-2.5 ${side === "right" ? "flex-row-reverse text-right" : ""}`}>
      <div className={`flex shrink-0 items-center gap-1 pt-1 ${side === "right" ? "flex-row-reverse" : ""}`}>
        <div className="h-px w-4 bg-ember/50" />
        {side === "left" ? (
          <ArrowLeft className="h-3.5 w-3.5 text-ember" />
        ) : (
          <ArrowRight className="h-3.5 w-3.5 text-ember" />
        )}
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ember">
          {callout.title}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
          {callout.desc}
        </p>
      </div>
    </div>
  );
}

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
        <span className="mt-3 inline-block rounded-md bg-ember px-3 py-1.5 font-mono text-[9px] text-cream">
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
      <span className="inline-block rounded-md bg-ember px-4 py-2 font-mono text-[9px] text-cream">
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
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
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
    <main className="min-h-screen bg-cream">
      <Navbar />
      {/* (01) intro */}
      <section className="relative bg-cream pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="max-w-3xl font-display text-3xl font-bold uppercase leading-[1.15] text-ink sm:text-5xl md:text-6xl">
              Strony <span className="text-ember font-accent italic tracking-wide normal-case">WWW</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              Projektujemy i wdrażamy nowoczesne i szybkie strony www, oraz obsługujemy już istniejące.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Zakres: projekt, kod, wdrożenie (opcjonalnie utrzymanie). Czas realizacji: 2-4 tygodni.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft md:text-right">
              Efekt: gotowa strona internetowa dla Twojej firmy, zaprojektowana pod konwersję.
            </p>
            <span className="shrink-0 font-mono text-sm text-stone">(01)</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
          >
            <a
              href="/contact"
              className="group relative overflow-hidden rounded-lg bg-ink px-8 py-4 font-mono text-sm text-cream"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10">Umów rozmowę →</span>
            </a>
            <a
              href="/#capabilities"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-line bg-paper px-8 py-4 font-mono text-sm text-ink transition-colors duration-500 hover:border-ember"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-cream">
                Wszystkie możliwości
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* (02) demo */}
      <section className="relative border-t border-line bg-cream-dim py-20 md:py-28">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-10" />

        <div className="relative mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="flex shrink-0 items-center gap-3">
              <span className="font-mono text-sm text-stone">(02)</span>
              <span className="font-mono text-xs uppercase tracking-widest text-stone">
                Jak projektujemy
              </span>
            </div>

            <p className="max-w-xl font-display text-2xl font-bold leading-snug text-ink sm:text-4xl md:text-5xl">
              Przewiń, żeby zobaczyć, jak powstaje strona.
            </p>
          </motion.div>

          {/* desktop: scroll-synced mac window with side callouts */}
          <div ref={trackRef} className="relative mt-16 hidden md:block" style={{ height: "520vh" }}>
            <div className="sticky top-[var(--header-height,96px)] flex h-[calc(100vh-var(--header-height,96px))] items-center">
              <div className="grid w-full grid-cols-[180px_minmax(0,1fr)_180px] items-center gap-4 lg:grid-cols-[200px_minmax(0,1fr)_200px] lg:gap-6">
                {/* left column */}
                <div className="flex flex-col gap-12">
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
                <div className="mx-auto w-full max-w-[min(58vw,960px)]">
                  <div
                    className="relative overflow-hidden rounded-2xl border border-line bg-paper shadow-xl"
                    style={{ aspectRatio: "16 / 10" }}
                  >
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

                {/* right column */}
                <div className="flex flex-col gap-12">
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
              </div>
            </div>
          </div>

          {/* mobile: static window + stacked list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-12 md:hidden"
          >
            <div
              className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-paper shadow-xl"
              style={{ aspectRatio: "16 / 10" }}
            >
              <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 border-b border-line bg-paper px-3 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div className="mx-auto rounded-md bg-cream px-2.5 py-1 font-mono text-[9px] text-stone">
                  twojafirma.pl
                </div>
              </div>
              <div className="absolute inset-0 top-9 flex flex-col bg-cream px-4 py-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-bold text-ink">
                    Studio<span className="text-ember">.</span>
                  </span>
                  <span className="rounded-md bg-ink px-2 py-1 font-mono text-[8px] text-cream">
                    Kontakt
                  </span>
                </div>
                <div className="mt-auto">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-ember">
                    Agencja kreatywna
                  </span>
                  <h3 className="mt-1.5 font-display text-sm font-bold leading-tight text-ink">
                    Projektujemy strony, które sprzedają.
                  </h3>
                  <span className="mt-2 inline-block rounded-md bg-ember px-2.5 py-1 font-mono text-[8px] text-cream">
                    Zobacz ofertę →
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {[staticRight, ...screens.flatMap((s) => [s.logo, s.left, s.right])].map(
                (callout, index) => (
                  <div key={`${callout.title}-${index}`} className="flex items-start gap-3">
                    <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-ember" />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-ember">
                        {callout.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {callout.desc}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Contact compact />
      <Footer />
    </main>
  );
}
