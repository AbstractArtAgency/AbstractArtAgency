"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Search } from "lucide-react";
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
  url: string;
  logo: Callout;
  left: Callout;
  right: Callout;
};

const staticRight: Callout = {
  title: "Strategia płatnych reklam",
  desc: "Docierasz do precyzyjnie zdefiniowanej grupy klientów poprzez reklamy targetowane.",
};

const screens: Screen[] = [
  {
    url: "blog-marki.pl",
    logo: {
      title: "Sieć reklamowa (GDN)",
      desc: "Twoje reklamy displayowe pojawiają się na milionach stron w internecie.",
    },
    left: {
      title: "Baner reklamowy",
      desc: "Wizualna reklama przyciąga wzrok podczas czytania treści na innych blogach i portalach.",
    },
    right: {
      title: "Precyzyjne targetowanie",
      desc: "Trafiasz wyłącznie do osób zainteresowanych Twoją branżą, nie do przypadkowych czytelników.",
    },
  },
  {
    url: "youtube.com",
    logo: {
      title: "Reklama wideo",
      desc: "Format wideo buduje zaangażowanie lepiej niż statyczny baner.",
    },
    left: {
      title: "Reklama przed filmem",
      desc: "Twoja reklama może pojawiać sie przed filmami na YouTube.",
    },
    right: {
      title: "Płatność za obejrzenie",
      desc: "Płacisz tylko wtedy, gdy widz faktycznie obejrzy reklamę.",
    },
  },
  {
    url: "google.com/search",
    logo: {
      title: "Reklama w wyszukiwarce",
      desc: "Pojawiasz się dokładnie w momencie, gdy klient szuka Twoich usług.",
    },
    left: {
      title: "Wynik sponsorowany",
      desc: "Twoja oferta jest widoczna na samej górze wyników wyszukiwania jako wynik sponsorowany.",
    },
    right: {
      title: "Płatność za kliknięcie",
      desc: "Płacisz tylko za wejścia na Twoją stronę (model CPC).",
    },
  },
];

function AdTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`rounded bg-ink px-1 py-0.5 font-mono text-[5px] font-bold uppercase tracking-wide text-cream ${className}`}
    >
      Reklama
    </span>
  );
}

function ScreenBlog() {
  return (
    <div className="grid h-full grid-cols-3 gap-3 px-5 py-4 sm:px-7">
      <div className="col-span-2 flex flex-col gap-2">
        <span className="font-mono text-[8px] uppercase tracking-widest text-ember">Blog</span>
        <h3 className="font-display text-sm font-bold leading-tight text-ink sm:text-base">
          5 trendów w projektowaniu stron w 2026 roku
        </h3>
        <div className="mt-1 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-line" />
          <div className="h-1.5 w-full rounded-full bg-line" />
          <div className="h-1.5 w-4/5 rounded-full bg-line" />
        </div>

        <div className="relative mt-2 overflow-hidden rounded-lg border border-ember/30 bg-ember/5 px-2 py-2">
          <AdTag className="absolute right-1.5 top-1.5" />
          <p className="pr-10 font-mono text-[7px] font-bold text-ember">
            Twoja reklama mogłaby być tutaj
          </p>
          <p className="mt-0.5 font-mono text-[6px] leading-snug text-ink-soft">
            Docieraj do czytelników w momencie, gdy są najbardziej zaangażowani.
          </p>
        </div>

        <div className="mt-2 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-line" />
          <div className="h-1.5 w-3/5 rounded-full bg-line" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-ember/30 bg-linear-to-br from-ember/15 via-cream-dim to-paper">
        <AdTag className="absolute left-1.5 top-1.5" />
        <div className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center">
          <span className="font-display text-[9px] font-bold text-ember">AbstractArt</span>
          <span className="font-mono text-[6px] text-ink-soft">Zobacz ofertę →</span>
        </div>
      </div>
    </div>
  );
}

function ScreenYoutube() {
  return (
    <div className="flex h-full flex-col bg-cream">
      <div className="relative flex-1 bg-ink">
        <AdTag className="absolute left-2 top-2" />
        <span className="absolute right-2 top-2 rounded border border-cream/40 px-1.5 py-0.5 font-mono text-[6px] text-cream">
          Pomiń za 5s
        </span>
        <div className="flex h-full items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/15">
            <Play className="h-3.5 w-3.5 fill-cream text-cream" />
          </div>
        </div>
        <div className="absolute inset-x-2 bottom-2 h-0.5 rounded-full bg-cream/25">
          <div className="h-full w-1/3 rounded-full bg-ember" />
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="h-5 w-5 shrink-0 rounded-full bg-ember/30" />
        <div>
          <p className="font-mono text-[7px] font-bold text-ink">
            5 trendów w projektowaniu stron
          </p>
          <p className="font-mono text-[6px] text-stone">Kanał AbstractArt · 12 tys. wyświetleń</p>
        </div>
      </div>
    </div>
  );
}

function ScreenSearchAd() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 bg-cream px-5 py-4 sm:px-7">
      <div className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5">
        <Search className="h-3 w-3 shrink-0 text-stone" />
        <span className="font-mono text-[9px] text-ink">projektowanie stron internetowych</span>
      </div>

      <div className="rounded-lg border border-ember/30 bg-ember/5 px-2 py-2">
        <div className="flex items-center gap-1.5">
          <AdTag />
          <p className="font-mono text-[7px] text-stone">abstractart.pl</p>
        </div>
        <p className="font-display text-[10px] font-bold leading-tight text-[#8ab4f8]">
          AbstractArt — projektowanie stron internetowych
        </p>
        <p className="mt-0.5 font-mono text-[7px] leading-snug text-ink-soft">
          Projektujemy nowoczesne strony, które sprzedają. Bezpłatna wycena w 24h.
        </p>
        <div className="mt-1.5 flex gap-3">
          <span className="font-mono text-[6px] text-[#8ab4f8]">Cennik</span>
          <span className="font-mono text-[6px] text-[#8ab4f8]">Portfolio</span>
          <span className="font-mono text-[6px] text-[#8ab4f8]">Kontakt</span>
        </div>
      </div>

      <div className="opacity-50">
        <p className="font-mono text-[7px] text-stone">konkurencja.pl</p>
        <p className="font-display text-[9px] font-bold text-[#8ab4f8]">
          Inna firma — strony internetowe
        </p>
      </div>
    </div>
  );
}

const screenComponents = [ScreenBlog, ScreenYoutube, ScreenSearchAd];

export default function KampanieAdsContent() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progress = useMotionValue(0);
  const [activeScreen, setActiveScreen] = useState(0);

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

  // crossfade zones centered on the same thresholds that drive activeScreen (0.25 / 0.75)
  const screen0Opacity = useTransform(progress, [0, 0.2, 0.3], [1, 1, 0]);
  const screen1Opacity = useTransform(progress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0]);
  const screen2Opacity = useTransform(progress, [0.7, 0.8, 1], [0, 1, 1]);
  const screenOpacities = [screen0Opacity, screen1Opacity, screen2Opacity];

  return (
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />

      {/* (01) intro */}
      <CapabilityIntro
        slug="kampanie-ads"
        eyebrow="Kampanie"
        word="Ads"
        note="tam, gdzie Twoi klienci"
        highlight="żeby każda złotówka pracowała na wynik."
        description="Tworzymy płatne kampanie Ads, dzięki którym Twoja marka pojawia się dokładnie tam, gdzie są Twoi klienci. Kampanie wykonujemy w serwisach takich jak: Google, Facebook, Instagram, LinkedIn itd. Przygotowujemy plan, precyzyjnie dobieramy grupy docelowe, nagrywamy i tworzymy treści i na bieżąco optymalizujemy budżet, żeby każda złotówka pracowała na wynik."
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
                { parts: ["Jak działają"] },
                { indent: 1, parts: [{ brush: "płatne" }] },
                { parts: ["reklamy"] },
                { indent: 2, parts: [{ accent: "Ads?" }] },
              ]}
            />
          </motion.div>

          {/* desktop: scroll-synced ad placements with side callouts */}
          <div ref={trackRef} className="relative mt-12 md:mt-16" style={{ height: "320vh" }}>
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
                    {/* titlebar — url reflects the current ad placement */}
                    <div className="absolute inset-x-0 top-0 z-10 flex h-11 items-center gap-3 border-b border-line bg-paper px-4">
                      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                      <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                      <div className="mx-auto flex items-center gap-1.5 rounded-md bg-cream px-3 py-1 font-mono text-[10px] text-stone">
                        {screens[activeScreen].url}
                      </div>
                    </div>

                    {/* crossfading placements — one fades out as the next fades in */}
                    <div
                      className="absolute inset-x-0 bottom-0 overflow-hidden bg-cream"
                      style={{ top: "2.75rem" }}
                    >
                      {screenComponents.map((ScreenComponent, index) => (
                        <motion.div
                          key={index}
                          style={{ opacity: screenOpacities[index] }}
                          className="absolute inset-0"
                        >
                          <ScreenComponent />
                        </motion.div>
                      ))}
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
