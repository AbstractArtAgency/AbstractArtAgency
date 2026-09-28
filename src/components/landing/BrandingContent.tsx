"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  title: "Księga znaku",
  desc: "Kompletny dokument z zasadami marki, z którego korzysta cały zespół i partnerzy.",
};

const stages: Stage[] = [
  {
    logo: {
      title: "Logotyp",
      desc: "Podstawowy znak marki w kilku wariantach: pełnym, na ciemnym tle i jako sam symbol.",
    },
    left: {
      title: "Warianty znaku",
      desc: "Elastyczny system loga działa w każdym kontekście — od strony www po social media.",
    },
    right: {
      title: "Strefa ochronna",
      desc: "Minimalny odstęp wokół logo chroni jego czytelność i spójność.",
    },
  },
  {
    logo: {
      title: "Paleta kolorów",
      desc: "Spójna kolorystyka buduje natychmiastowe rozpoznanie marki.",
    },
    left: {
      title: "Kolor główny i dodatkowe",
      desc: "Każdy kolor ma jasno określone zastosowanie i proporcje użycia.",
    },
    right: {
      title: "Kody kolorów",
      desc: "HEX, RGB i CMYK — gotowe do użycia w każdym medium.",
    },
  },
  {
    logo: {
      title: "Typografia",
      desc: "Dobór fontów decyduje o charakterze i czytelności komunikacji marki.",
    },
    left: {
      title: "Krój podstawowy i akcentowy",
      desc: "Jeden font do treści, drugi do wyróżnień i nagłówków.",
    },
    right: {
      title: "Hierarchia tekstu",
      desc: "Jasne zasady wielkości i wag fontów porządkują każdy dokument.",
    },
  },
  {
    logo: {
      title: "Zastosowania",
      desc: "Księga znaku pokazuje markę w praktyce — na wizytówce, stronie i materiałach firmowych.",
    },
    left: {
      title: "Materiały firmowe",
      desc: "Wizytówki, papier firmowy i stopki e-mail w jednym spójnym stylu.",
    },
    right: {
      title: "Gotowy system",
      desc: "Kompletna księga znaku, z której korzysta cały Twój zespół.",
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

const palette = [
  { hex: "#DE1F1A", border: false },
  { hex: "#1A1A1A", border: false },
  { hex: "#8A8A8A", border: false },
  { hex: "#FFFFFF", border: true },
];

function SectionLogo() {
  return (
    <div className="w-full">
      <p className="font-mono text-[7px] uppercase tracking-widest text-ember">01 — Logotyp</p>
      <div className="mt-1.5 grid grid-cols-3 gap-1.5">
        <div className="flex h-10 items-center justify-center rounded border border-line bg-cream-dim">
          <span className="font-display text-xs font-bold text-ink">
            AbstractArt<span className="text-ember">.</span>
          </span>
        </div>
        <div className="flex h-10 items-center justify-center rounded bg-ink">
          <span className="font-display text-base font-bold text-cream">A</span>
        </div>
        <div className="flex h-10 items-center justify-center rounded bg-ink">
          <span className="font-display text-[10px] font-bold text-cream">
            AA<span className="text-ember">.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function SectionColors() {
  return (
    <div className="w-full">
      <p className="font-mono text-[7px] uppercase tracking-widest text-ember">02 — Paleta kolorów</p>
      <div className="mt-1.5 grid grid-cols-4 gap-1.5">
        {palette.map((color) => (
          <div key={color.hex} className="flex flex-col items-center gap-0.5">
            <div
              className={`h-8 w-full rounded ${color.border ? "border border-line" : ""}`}
              style={{ backgroundColor: color.hex }}
            />
            <span className="font-mono text-[5px] text-stone">{color.hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTypography() {
  return (
    <div className="w-full">
      <p className="font-mono text-[7px] uppercase tracking-widest text-ember">03 — Typografia</p>
      <div className="mt-1.5 grid grid-cols-3 gap-1.5">
        <div className="flex flex-col items-center justify-center gap-0.5 rounded border border-line py-1.5">
          <span className="font-display text-base font-bold text-ink">Aa</span>
          <p className="font-mono text-[5px] text-stone">Space Grotesk</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-0.5 rounded border border-line py-1.5">
          <span className="font-accent text-base italic text-ember">Aa</span>
          <p className="font-mono text-[5px] text-stone">Instrument Serif</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-0.5 rounded border border-line py-1.5">
          <span className="font-mono text-sm text-ink">Aa</span>
          <p className="font-mono text-[5px] text-stone">JetBrains Mono</p>
        </div>
      </div>
    </div>
  );
}

function SectionApplications() {
  return (
    <div className="w-full">
      <p className="font-mono text-[7px] uppercase tracking-widest text-ember">04 — Zastosowania</p>
      <div className="mt-1.5 grid grid-cols-2 gap-1.5">
        <div className="flex h-12 flex-col justify-center rounded border border-line bg-linear-to-br from-ink to-ink/90 p-2">
          <span className="font-display text-[8px] font-bold text-cream">
            AbstractArt<span className="text-ember">.</span>
          </span>
          <p className="mt-0.5 font-mono text-[5px] leading-snug text-cream/60">
            Projektowanie stron i marketing
          </p>
        </div>
        <div className="flex h-12 flex-col justify-between rounded border border-line bg-cream-dim p-2">
          <span className="font-display text-[8px] font-bold text-ink">
            AbstractArt<span className="text-ember">.</span>
          </span>
          <p className="font-mono text-[5px] leading-snug text-stone">
            ul. Przykładowa 12
            <br />
            00-001 Warszawa
          </p>
        </div>
      </div>
    </div>
  );
}

const sectionComponents = [SectionLogo, SectionColors, SectionTypography, SectionApplications];

export default function BrandingContent() {
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

  // each section reveals once and stays visible — the book fills in as you scroll
  const section0Opacity = useTransform(progress, [0, 0.05], [0, 1]);
  const section1Opacity = useTransform(progress, [0.25, 0.35], [0, 1]);
  const section2Opacity = useTransform(progress, [0.5, 0.6], [0, 1]);
  const section3Opacity = useTransform(progress, [0.75, 0.85], [0, 1]);
  const sectionOpacities = [section0Opacity, section1Opacity, section2Opacity, section3Opacity];

  const section0Y = useTransform(progress, [0, 0.05], [10, 0]);
  const section1Y = useTransform(progress, [0.25, 0.35], [10, 0]);
  const section2Y = useTransform(progress, [0.5, 0.6], [10, 0]);
  const section3Y = useTransform(progress, [0.75, 0.85], [10, 0]);
  const sectionYs = [section0Y, section1Y, section2Y, section3Y];

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
              <span className="text-ember font-accent italic tracking-wide normal-case">Branding</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              Projektujemy identyfikację wizualną, która buduje zaufanie i odzwierciedla twoje cele.
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
              Zakres: logo, system wizualny, UI. Czas realizacji: 2-4 tygodni.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft md:text-right">
              Efekt: spójna identyfikacja Twojej marki, zebrana w jednej księdze znaku.
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
              Przewiń, żeby zobaczyć, jak powstaje księga znaku.
            </p>
          </motion.div>

          {/* desktop: scroll-synced brand book with side callouts */}
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

                {/* PDF brand book mockup */}
                <div className="mx-auto w-full max-w-[min(50vw,520px)]">
                  <div
                    className="relative overflow-hidden rounded-2xl border border-line bg-paper shadow-xl"
                    style={{ aspectRatio: "4 / 5" }}
                  >
                    {/* titlebar */}
                    <div className="absolute inset-x-0 top-0 z-10 flex h-11 items-center gap-3 border-b border-line bg-paper px-4">
                      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                      <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                      <div className="mx-auto flex items-center gap-1.5 rounded-md bg-cream px-3 py-1 font-mono text-[10px] text-stone">
                        księga-znaku.pdf
                      </div>
                    </div>

                    {/* document page — sections accumulate as you scroll */}
                    <div
                      className="absolute inset-x-0 bottom-0 flex flex-col bg-paper px-6 py-4"
                      style={{ top: "2.75rem" }}
                    >
                      <div className="shrink-0 border-b border-line pb-1.5">
                        <p className="font-accent text-lg italic text-ink">Księga znaku</p>
                        <p className="font-mono text-[7px] text-stone">AbstractArt — wytyczne marki</p>
                      </div>

                      <div className="mt-2 flex flex-1 flex-col justify-between">
                        {sectionComponents.map((SectionComponent, index) => (
                          <motion.div
                            key={index}
                            style={{ opacity: sectionOpacities[index], y: sectionYs[index] }}
                          >
                            <SectionComponent />
                          </motion.div>
                        ))}
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

          {/* mobile: static preview (fully revealed) + stacked list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-12 md:hidden"
          >
            <div
              className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-paper shadow-xl"
              style={{ aspectRatio: "4 / 5" }}
            >
              <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 border-b border-line bg-paper px-3 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div className="mx-auto rounded-md bg-cream px-2.5 py-1 font-mono text-[9px] text-stone">
                  księga-znaku.pdf
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 top-9 flex flex-col bg-paper px-4 py-3">
                <div className="shrink-0 border-b border-line pb-1.5">
                  <p className="font-accent text-base italic text-ink">Księga znaku</p>
                  <p className="font-mono text-[6px] text-stone">AbstractArt — wytyczne marki</p>
                </div>
                <div className="mt-2 flex flex-1 flex-col justify-between">
                  <SectionLogo />
                  <SectionColors />
                  <SectionTypography />
                  <SectionApplications />
                </div>
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
