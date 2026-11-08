"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
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

type Stage = {
  logo: Callout;
  left: Callout;
  right: Callout;
};

const staticRight: Callout = {
  title: "Wyniki wyszukiwania",
  desc: "Widoczność na górze wyników wyszukiwania. Klienci znajdują Cię zawsze, kiedy Cię potrzebują.",
};

const stages: Stage[] = [
  {
    logo: {
      title: "Słowa kluczowe",
      desc: "Dobrze dobrane frazy to fundament całej strategii SEO.",
    },
    left: {
      title: "Audyt",
      desc: "Sprawdzamy stan strony i identyfikujemy obszary do poprawy. Czasami wystarczy tylko modyfikacja kodu.",
    },
    right: {
      title: "Rozwiązania",
      desc: "Analizujemy dostępne rozwiązania i przystępujemy do działania.",
    },
  },
  {
    logo: {
      title: "Meta dane",
      desc: "Tytuły i opisy stron wpływają na pozycję w wynikach.",
    },
    left: {
      title: "Optymalizacja treści",
      desc: "Dopasowujemy treść strony do intencji wyszukiwania użytkowników.",
    },
    right: {
      title: "Efekty",
      desc: "Już małe zmiany moga przynieść zauważalne efekty.",
    },
  },
  {
    logo: {
      title: "Szybkość strony",
      desc: "Poprawa prędkości strony wpływa bezpośrednio na jej ranking w wyszukiwarkach.",
    },
    left: {
      title: "Optymalizacja techniczna",
      desc: "Poprawiamy strukturę kodu, który sprzyja indeksowaniu.",
    },
    right: {
      title: "Wzrost",
      desc: "Monitorujemy ruch i kontrolujemy osiągnięcie rezultatu.",
    },
  },
  {
    logo: {
      title: "Linkowanie",
      desc: "Wartościowe odnośniki budują autorytet domeny w oczach wyszukiwarek.",
    },
    left: {
      title: "Sitemap",
      desc: "Wdrażamy plik sitemap.xml, który pozytywnie wpływa na analizę strony przez wyszukiwarki.",
    },
    right: {
      title: "Artykuły",
      desc: "Proponujemy dodawanie wpisów związanych z twoją działalnością generujących ruch.",
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
      title: "Osiągnięcie celu",
      desc: "Twoja strona jest pierwszym organicznym wynikiem wyszukiwania.",
    },
  },
];

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
            <span className="rounded bg-ember px-1 py-0.5 font-mono text-[6px] font-bold uppercase text-bone">
              Ty
            </span>
          )}
          <p className="truncate font-mono text-[7px] text-stone">{result.url}</p>
        </div>
        <p
          className={`truncate font-display text-[10px] font-bold leading-tight ${
            highlighted ? "text-ember" : "text-[#8ab4f8]"
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
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />

      {/* (01) intro */}
      <CapabilityIntro
        slug="pozycjonowanie"
        eyebrow="SEO i"
        word="Pozycjonowanie"
        note="wyżej w wyszukiwaniach ↑"
        highlight="Zawsze wtedy, kiedy szukają tego co oferujesz, znajdą cię na pierwszym miejscu."
        description="Optymalizujemy strony internetowe tak, żeby klienci znajdowali Cię na organicznie pierwszym miejscu w wyszukiwarkach. Zawsze wtedy, kiedy szukają tego co oferujesz, znajdą cię na pierwszym miejscu. Zaczynamy od audytu, poprawiamy kod, treści i szybkość strony, a potem systematycznie analizujemy jej widoczność."
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
                { parts: ["Zobacz jak"] },
                { indent: 1, parts: ["wygląda ", { brush: "dobra" }] },
                { parts: ["optymalizacja"] },
                { indent: 2, parts: [{ accent: "strony." }] },
              ]}
            />
          </motion.div>

          {/* desktop: scroll-synced search results with side callouts */}
          <div ref={trackRef} className="relative mt-12 md:mt-16" style={{ height: "400vh" }}>
            <div className="sticky top-[var(--header-height,96px)] flex h-[calc(100vh-var(--header-height,96px))] items-center">
              <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-[190px_minmax(0,1fr)_190px] md:gap-4 lg:grid-cols-[240px_minmax(0,1fr)_240px] lg:gap-6">
                {/* left column */}
                <div className="hidden flex-col gap-12 md:flex">
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
                <div className="mx-auto w-full max-w-[min(58vw,960px)] max-md:max-w-none">
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
                <div className="hidden flex-col gap-12 md:flex">
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

                {/* mobile: hasła parami pod urządzeniem */}
                <MobileCalloutPairs
                  progress={progress}
                  callouts={[staticRight, ...stages.flatMap((s) => [s.logo, s.left, s.right])]}
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
