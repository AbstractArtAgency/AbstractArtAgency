"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { LogoMark } from "./Brand";

const steps = [
  {
    num: "01",
    title: "Odkrycie",
    desc: "Poznajemy Twój biznes, cele, konkurencję i grupę docelową. Na tej podstawie przygotowujemy najlepszą strategie działań marketingowych.",
  },
  {
    num: "02",
    title: "Strategia i plan",
    desc: "Ustalamy zakres, kanały i harmonogram prac. Tworzymy plan, który konsultujemy z Tobą i przystępujemy do realizacji.",
  },
  {
    num: "03",
    title: "Wdrożenie",
    desc: "Projektujemy, nagrywamy, kodujemy i uruchamiamy. Na kadym etapie pozostajemy otwarci na Twoje sugestie i poprawki.",
  },
  {
    num: "04",
    title: "Wzrost i optymalizacja",
    desc: "Mierzymy wyniki, analizujemy je i optymalizujemy strategie tak, aby rezultat był na najwyższym poziomie.",
  },
] as const;

export default function Process() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollYProgress = useMotionValue(0);
  // motion value (not a plain ref) so the x-offset transforms below react to it
  // immediately on mount/resize, instead of only on the next scroll event
  const isDesktop = useMotionValue(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateIsDesktop = () => {
      isDesktop.set(mediaQuery.matches ? 1 : 0);
    };
    updateIsDesktop();
    mediaQuery.addEventListener("change", updateIsDesktop);
    return () => mediaQuery.removeEventListener("change", updateIsDesktop);
  }, [isDesktop]);

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
      scrollYProgress.set(Math.max(0, Math.min(1, p)));
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
  }, [scrollYProgress]);

  const step0 = useTransform(scrollYProgress, [0, 0.22], [0.2, 1]);
  const step1 = useTransform(scrollYProgress, [0.22, 0.47], [0.2, 1]);
  const step2 = useTransform(scrollYProgress, [0.47, 0.72], [0.2, 1]);
  const step3 = useTransform(scrollYProgress, [0.72, 0.97], [0.2, 1]);
  const stepOpacities = [step0, step1, step2, step3];

  const step0X = useTransform(scrollYProgress, [0, 0.22], [-24, 0]);
  const step1Progress = useTransform(scrollYProgress, [0.22, 0.47], [0, 1]);
  const step1X = useTransform(
    [step1Progress, isDesktop],
    ([t, desktop]: number[]) => (desktop ? 24 : -24) * (1 - t),
  );
  const step2X = useTransform(scrollYProgress, [0.47, 0.72], [-24, 0]);
  const step3Progress = useTransform(scrollYProgress, [0.72, 0.97], [0, 1]);
  const step3X = useTransform(
    [step3Progress, isDesktop],
    ([t, desktop]: number[]) => (desktop ? 24 : -24) * (1 - t),
  );
  const stepXs = [step0X, step1X, step2X, step3X];

  return (
    <section id="process" className="relative border-t border-line bg-cream text-ink">
      <div className="relative mx-auto flex max-w-[1328px] flex-wrap items-end justify-between gap-6 px-gutter pt-20 pb-10 md:gap-8 md:pt-28 md:pb-16 min-[1440px]:px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-[18px]"
        >
          <h2 className="m-0 font-display text-4xl font-extrabold font-stretch-112% uppercase leading-[0.92] tracking-display sm:text-5xl lg:text-7xl">
            Od pomysłu do <span className="bg-ember px-[0.06em] text-bone [box-decoration-break:clone]">wyniku</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex max-w-[420px] flex-col items-start gap-6"
        >

          <p className="m-0 text-[17px] leading-[1.55] text-bone/72">
            Wiemy, że każdy projekt jest wyjątkowy. Nasze działanie przebiega jednak zawsze według sprawdzonego procesu, który pozwala nam osiągać najlepsze rezultaty.
          </p>
        </motion.div>
      </div>

      <div ref={trackRef} className="relative" style={{ height: "400vh" }}>
        <div className="sticky top-[var(--header-height,96px)] flex h-[calc(100svh-var(--header-height,96px))] items-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1328px] px-gutter min-[1440px]:px-0">
            <div className="relative pl-14 md:pl-0">
              <div className="absolute left-[13px] top-2 bottom-2 w-px -translate-x-1/2 bg-line md:left-1/2">
                <motion.div
                  className="w-full origin-top bg-ember"
                  style={{ scaleY: scrollYProgress, height: "100%" }}
                />
              </div>

              <ol className="m-0 list-none space-y-6 p-0 sm:space-y-10 md:space-y-16">
                {steps.map((step, index) => {
                  const isRight = index % 2 === 1;

                  return (
                    <motion.li
                      key={step.num}
                      style={{ opacity: stepOpacities[index], x: stepXs[index] }}
                      className="relative md:grid md:grid-cols-[1fr_3rem_1fr] md:items-start md:gap-x-6 lg:gap-x-10"
                    >
                      <span className="absolute -left-14 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-bone/40 bg-cream font-mono text-[11px] text-bone md:static md:col-start-2 md:mx-auto md:h-10 md:w-10">
                        {step.num}
                      </span>

                      <div
                        className={
                          isRight
                            ? "md:col-start-3 md:text-left"
                            : "md:col-start-1 md:row-start-1 md:flex md:flex-col md:items-end md:text-right"
                        }
                      >
                        <span className="font-mono text-xs tracking-[0.1em] text-ember">
                          {step.num}
                        </span>
                        <h3 className="mt-2 text-xl font-extrabold font-stretch-110% uppercase leading-none tracking-[-0.015em] text-ink sm:mt-3 sm:text-2xl md:text-[36px]">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-[15px] leading-[1.55] text-bone/72 sm:mt-4 sm:text-base">
                          {step.desc}
                        </p>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
