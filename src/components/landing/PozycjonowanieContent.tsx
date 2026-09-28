"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import Contact from "@/src/components/landing/Contact";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";

type Callout = {
  title: string;
  desc: string;
};

type Stage = {
  logo: Callout;
  left: Callout;
  right: Callout;
};

const staticRight: Callout = {
  title: "Wyniki wyszukiwania",
  desc: "Widoczność w TOP wynikach Google oznacza realny, bezpłatny ruch na stronie.",
};

const stages: Stage[] = [
  {
    logo: {
      title: "Słowo kluczowe",
      desc: "Dobrze dobrana fraza to fundament całej strategii SEO.",
    },
    left: {
      title: "Audyt SEO",
      desc: "Sprawdzamy stan strony i identyfikujemy obszary do poprawy.",
    },
    right: {
      title: "Pozycja: 5",
      desc: "Start — strona jest widoczna, ale ginie wśród konkurencji.",
    },
  },
  {
    logo: {
      title: "Meta dane",
      desc: "Tytuły i opisy stron wpływają na klikalność w wynikach.",
    },
    left: {
      title: "Optymalizacja treści",
      desc: "Dopasowujemy treść strony do intencji wyszukiwania użytkowników.",
    },
    right: {
      title: "Pozycja: 4",
      desc: "Pierwsze zmiany zaczynają przynosić efekty.",
    },
  },
  {
    logo: {
      title: "Szybkość strony",
      desc: "Techniczne SEO wpływa bezpośrednio na ranking w Google.",
    },
    left: {
      title: "Optymalizacja techniczna",
      desc: "Poprawiamy szybkość ładowania i strukturę kodu strony.",
    },
    right: {
      title: "Pozycja: 3",
      desc: "Strona wchodzi na pierwszą stronę wyników.",
    },
  },
  {
    logo: {
      title: "Linkowanie",
      desc: "Wartościowe odnośniki budują autorytet domeny w oczach Google.",
    },
    left: {
      title: "Link building",
      desc: "Zdobywamy wartościowe linki z wiarygodnych źródeł.",
    },
    right: {
      title: "Pozycja: 2",
      desc: "Coraz bliżej szczytu wyników wyszukiwania.",
    },
  },
  {
    logo: {
      title: "Autorytet domeny",
      desc: "Regularna praca nad SEO buduje trwałą przewagę nad konkurencją.",
    },
    left: {
      title: "Monitoring i utrzymanie",
      desc: "Śledzimy wyniki i stale doskonalimy strategię.",
    },
    right: {
      title: "Pozycja: 1",
      desc: "Twoja strona jest pierwszym wynikiem wyszukiwania.",
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

function MockSearchBar() {
  return (
    <div className="flex h-14 shrink-0 items-center border-b border-line bg-cream px-6 sm:px-8">
      <div className="flex w-full items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5">
        <Search className="h-3 w-3 shrink-0 text-stone" />
        <span className="truncate font-mono text-[9px] text-ink">
          projektowanie stron internetowych warszawa
        </span>
      </div>
    </div>
  );
}

type ResultData = {
  title: string;
  url: string;
  snippet: string;
};

const competitors: ResultData[] = [
  {
    title: "WebKreacja — projektowanie stron www",
    url: "webkreacja.pl",
    snippet: "Tworzymy strony internetowe dla małych i średnich firm w całej Polsce.",
  },
  {
    title: "Agencja Interactive — strony i marketing",
    url: "interactive-agencja.pl",
    snippet: "Kompleksowe usługi: projektowanie, wdrożenie i promocja stron www.",
  },
  {
    title: "StronyPro — ranking najlepszych firm 2026",
    url: "strony-ranking.pl",
    snippet: "Porównanie ofert i cenników firm tworzących strony internetowe.",
  },
  {
    title: "DevStudio — nowoczesne strony internetowe",
    url: "devstudio.pl",
    snippet: "Projektujemy szybkie i responsywne strony dopasowane do Twojej marki.",
  },
];

const yourSite: ResultData = {
  title: "AbstractArt — projektowanie stron internetowych",
  url: "abstractart.pl",
  snippet: "Projektujemy nowoczesne strony internetowe, które realnie sprzedają. Zobacz ofertę →",
};

function ResultRow({
  result,
  height,
  highlighted,
}: {
  result: ResultData;
  height: number;
  highlighted?: boolean;
}) {
  return (
    <div style={{ height: `${height}px` }} className="flex flex-col justify-center">
      <div
        className={`px-2 py-1 ${
          highlighted ? "rounded-lg border border-ember/30 bg-ember/5" : ""
        }`}
      >
        <div className="flex items-center gap-1.5">
          {highlighted && (
            <span className="rounded bg-ember px-1 py-0.5 font-mono text-[6px] font-bold uppercase text-cream">
              Ty
            </span>
          )}
          <p className="truncate font-mono text-[7px] text-stone">{result.url}</p>
        </div>
        <p
          className={`truncate font-display text-[10px] font-bold leading-tight ${
            highlighted ? "text-ember" : "text-[#1a0dab]"
          }`}
        >
          {result.title}
        </p>
        <p className="mt-0.5 line-clamp-1 font-mono text-[7px] leading-snug text-ink-soft">
          {result.snippet}
        </p>
      </div>
    </div>
  );
}

const ROW_HEIGHT = 52;

export default function PozycjonowanieContent() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progress = useMotionValue(0);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.on("change", (p) => {
      const idx = Math.min(
        stages.length - 1,
        Math.max(0, Math.round(p * (stages.length - 1))),
      );
      setActiveStage(idx);
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

    const onResize = () => {
      bounds = calc();
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

  // competitors shift down by exactly one row as your site climbs past them
  const shiftY = useTransform(progress, (p) => p * ROW_HEIGHT);
  const comp0Y = useTransform(shiftY, (s) => 0 * ROW_HEIGHT + s);
  const comp1Y = useTransform(shiftY, (s) => 1 * ROW_HEIGHT + s);
  const comp2Y = useTransform(shiftY, (s) => 2 * ROW_HEIGHT + s);
  const comp3Y = useTransform(shiftY, (s) => 3 * ROW_HEIGHT + s);
  const competitorYs = [comp0Y, comp1Y, comp2Y, comp3Y];
  // your site climbs from the bottom (rank 5) to the very top (rank 1)
  const yourSiteY = useTransform(progress, (p) => (1 - p) * 4 * ROW_HEIGHT);

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
              SEO i <span className="text-ember font-accent italic tracking-wide normal-case">pozycjonowanie</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              Optymalizujemy strony internetowe pod kątem pozycjonowania w internecie.
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
              Zakres: audyt, modyfikacja kodu, linkbuilding. Pierwsze efekty: 2-3 miesiące.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft md:text-right">
              Efekt: wzrost ruchu organicznego i wyższa pozycja w wynikach wyszukiwania.
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
              Przewiń, żeby zobaczyć, jak rośnie pozycja w Google.
            </p>
          </motion.div>

          {/* desktop: scroll-synced search results with side callouts */}
          <div ref={trackRef} className="relative mt-16 hidden md:block" style={{ height: "400vh" }}>
            <div className="sticky top-[var(--header-height,96px)] flex h-[calc(100vh-var(--header-height,96px))] items-center">
              <div className="grid w-full grid-cols-[180px_minmax(0,1fr)_180px] items-center gap-4 lg:grid-cols-[200px_minmax(0,1fr)_200px] lg:gap-6">
                {/* left column */}
                <div className="flex flex-col gap-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`logo-${activeStage}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CalloutItem callout={stages[activeStage].logo} side="left" />
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CalloutItem callout={stages[activeStage].left} side="left" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* google search results mockup — taller aspect below lg where the grid columns
                    leave less width, so all 5 result rows stay visible; reverts to the wider
                    16:10 frame once there's enough room (lg+) */}
                <div className="mx-auto w-full max-w-[min(58vw,960px)]">
                  <div className="relative aspect-[5/6] max-h-[560px] overflow-hidden rounded-2xl border border-line bg-paper shadow-xl xl:aspect-16/10">

                    {/* titlebar */}
                    <div className="absolute inset-x-0 top-0 z-10 flex h-11 items-center gap-3 border-b border-line bg-paper px-4">
                      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                      <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                      <div className="mx-auto flex items-center gap-1.5 rounded-md bg-cream px-3 py-1 font-mono text-[10px] text-stone">
                        google.com/search
                      </div>
                    </div>

                    {/* fixed search bar */}
                    <div className="absolute inset-x-0 top-11 z-10">
                      <MockSearchBar />
                    </div>

                    {/* results area — always fully visible, rows animate position */}
                    <div
                      className="absolute inset-x-0 bottom-0 overflow-hidden bg-cream px-4 py-3 sm:px-6"
                      style={{ top: "6.25rem" }}
                    >
                      <p className="mb-1 font-mono text-[7px] text-stone">
                        Około 1 230 000 wyników (0,38 sek.)
                      </p>
                      <div className="relative" style={{ height: `${5 * ROW_HEIGHT}px` }}>
                        {competitors.map((result, index) => (
                          <motion.div
                            key={result.url}
                            style={{ y: competitorYs[index] }}
                            className="absolute inset-x-0 top-0"
                          >
                            <ResultRow result={result} height={ROW_HEIGHT} />
                          </motion.div>
                        ))}
                        <motion.div
                          style={{ y: yourSiteY }}
                          className="absolute inset-x-0 top-0"
                        >
                          <ResultRow result={yourSite} height={ROW_HEIGHT} highlighted />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* right column */}
                <div className="flex flex-col gap-12">
                  <CalloutItem callout={staticRight} side="right" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CalloutItem callout={stages[activeStage].right} side="right" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* mobile: static preview + stacked list */}
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
                  google.com/search
                </div>
              </div>
              <div className="absolute inset-x-0 top-9 z-10 flex h-11 items-center border-b border-line bg-cream px-3">
                <div className="flex w-full items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1">
                  <Search className="h-2.5 w-2.5 shrink-0 text-stone" />
                  <span className="truncate font-mono text-[7px] text-ink">
                    projektowanie stron internetowych warszawa
                  </span>
                </div>
              </div>
              <div
                className="absolute inset-x-0 bottom-0 overflow-hidden bg-cream px-3 py-2"
                style={{ top: "5rem" }}
              >
                {[...competitors, yourSite].map((result, index) => (
                  <ResultRow
                    key={result.url}
                    result={result}
                    height={38}
                    highlighted={index === competitors.length}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {[staticRight, ...stages.flatMap((s) => [s.logo, s.left, s.right])].map(
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
