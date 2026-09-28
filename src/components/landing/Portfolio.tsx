"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type PortfolioItem =
  | {
      type: "intro" | "outro";
      title: string;
      subtitle: string;
    }
  | {
      type: "project";
      title: string;
      url: string;
    };

const projects: PortfolioItem[] = [
  {
    type: "project",
    title: "Jacob Przyciasa Portfolio",
    url: "https://jacobprzyciasa.com/",
  },
  {
    type: "project",
    title: "RN Serwis Elektroniki",
    url: "https://www.rnserwiselektroniki.pl/",
  },
  {
    type: "project",
    title: "Time2run",
    url: "https://www.time2run.pl/",
  },
];

const isTextSlide = (
  item: PortfolioItem,
): item is Extract<PortfolioItem, { type: "intro" | "outro" }> =>
  item.type === "intro" || item.type === "outro";

export default function Portfolio() {
  const targetRef = useRef<HTMLElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLDivElement | null>(null);

  const items: PortfolioItem[] = [
    {
      type: "intro",
      title: "Zobacz nasze realizacje",
      subtitle:
        "Odkryj, jak pomagamy markom osiągać sukces w internecie.",
    },
    ...projects,
    {
      type: "outro",
      title: "Myślisz, że możemy Ci pomóc?",
      subtitle: "Napisz do nas, a na pewno wymyślimy coś ciekawego!",
    },
  ];
  const count = items.length;

  const progress = useMotionValue(0);
  const [translateXEnd, setTranslateXEnd] = useState("0px");

  useEffect(() => {
    const el = targetRef.current;
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
      const start = rect.top + scrollTop - getNavHeight() + 100;
      const span = window.innerHeight * (count + 0.8); // horizontal travel + final expand hold
      const end = start + span;
      return { start, end };
    };

    const updateTranslateXEnd = () => {
      const stripEl = stripRef.current;
      const itemEl = firstItemRef.current;
      if (!stripEl || !itemEl) return;

      // Mierzymy REALNĄ szerokość elementu i gap z DOM-u,
      // zamiast zakładać window.innerWidth (które zawiera scrollbar
      // i nie odpowiada faktycznej szerokości elementu z w-full).
      const computedGap = parseFloat(
        getComputedStyle(stripEl).columnGap ||
          getComputedStyle(stripEl).gap ||
          "0",
      ) || 0;
      const itemWidth = itemEl.getBoundingClientRect().width;

      const target = -((count - 1) * itemWidth + (count - 1) * computedGap);
      setTranslateXEnd(`${target}px`);
    };

    let bounds = calc();

    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      const p = (y - bounds.start) / (bounds.end - bounds.start);
      progress.set(Math.max(0, Math.min(1, p)));
    };

    const onResize = () => {
      bounds = calc();
      updateTranslateXEnd();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [count, progress]);

  // Combined scale: full -> small -> small -> full
  const scale = useTransform(progress, [0, 0.12, 0.82, 0.94], [1, 0.7, 0.7, 1]);
  const frameOpacity = useTransform(
    progress,
    [0, 0.12, 0.88, 0.98],
    [0, 1, 1, 0],
  );
  const translateX = useTransform(
    progress,
    [0.12, 0.78],
    ["0px", translateXEnd],
  );

  return (
    <section
      id="work"
      ref={targetRef}
      className="relative h-[740vh] bg-transparent"
    >
      <div className="sticky top-[var(--header-height,96px)] z-10 h-[calc(100vh-var(--header-height,96px))]">
        <div className="flex h-full items-center justify-center">
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <motion.div
              style={{ scale }}
              className="relative w-screen h-[calc(100vh-var(--header-height,96px))] flex items-center justify-center"
            >
              {/* sliding horizontal strip of panels */}
              <div className="absolute inset-0 ">
                <motion.div
                  ref={stripRef}
                  style={{ x: translateX }}
                  className="flex gap-20 h-full will-change-transform"
                >
                  {items.map((it, idx) => (
                    <div
                      key={idx}
                      ref={idx === 0 ? firstItemRef : undefined}
                      className="relative flex-shrink-0 w-full h-full flex items-center justify-center rounded-2xl"
                    >
                      {/* content */}
                      {isTextSlide(it) ? (
                        <div className="relative inset-0 h-full p-8 flex items-center justify-center">
                          <div className="text-center max-w-xl">
                            <h3 className="mt-4 font-display text-4xl font-bold text-ink">
                              {it.title}
                            </h3>
                            <p className="mt-3 text-ink-soft">{it.subtitle}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 rounded-2xl overflow-hidden bg-paper">
                          <a
                            href={it.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Otwórz ${it.title}`}
                            className="absolute inset-0 z-10"
                          />
                          <iframe
                            src={it.url}
                            title={it.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                          />
                        </div>
                      )}

                      {/* frame border (fades in) — na KAŻDYM elemencie, jak okno macOS */}
                      <motion.div
                        style={{ opacity: frameOpacity }}
                        className="pointer-events-none absolute inset-0 flex items-center justify-center w-full"
                      >
                        <div className="w-full h-full rounded-2xl border-2 border-ink/10">
                          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-line shadow-lg">
                            {/* titlebar */}
                            <div className="absolute top-0 left-0 right-0 flex items-center gap-3 px-4 py-3 bg-paper border-b border-line">
                              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                              <div className="mx-auto flex items-center gap-1.5 rounded-md bg-cream px-3 py-1 font-mono text-[10px] text-stone">
                                {it.type === "project"
                                  ? it.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
                                  : "abstractart.pl"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* spacer after to allow expansion and normal scroll */}
      <div className="h-screen bg-transparent" />
    </section>
  );
}
