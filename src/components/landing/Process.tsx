"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Odkrycie",
    desc: "Poznajemy Twój biznes, cele, konkurencję i grupę docelową, zanim przystąpimy do planowania rozwiązania.",
  },
  {
    num: "02",
    title: "Strategia i plan",
    desc: "Ustalamy zakres, kanały i harmonogram działań dopasowane do Twojego biznesu.",
  },
  {
    num: "03",
    title: "Wdrożenie",
    desc: "Projektujemy, nagrywamy, kodujemy i uruchamiamy. Na kadym etapie pozostajemy otwarci na Twoje sugestie.",
  },
  {
    num: "04",
    title: "Wzrost i optymalizacja",
    desc: "Mierzymy wyniki, optymalizujemy i skalujemy tak, aby rezultat był na najwyższym poziomie.",
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
    <section id="process" className="relative bg-cream-dim">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(222,31,26,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
            Od pomysłu do <span className="text-ember font-accent italic tracking-wide">wyniku</span>
          </h2>
        </motion.div>
        <motion.p
            initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
            className="mt-3 max-w-1/2 text-lg leading-relaxed text-ink-soft md:text-lg"
          >
            Każdy projekt jest inny, ale nasze działanie przebiega zawsze według sprawdzonego procesu, który pozwala nam osiągać najlepsze rezultaty.
          </motion.p>
      </div>

      <div ref={trackRef} className="relative" style={{ height: "400vh" }}>
        <div className="sticky top-[var(--header-height,96px)] flex h-[calc(100vh-var(--header-height,96px))] items-center overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="relative pl-14 md:pl-0">
              <div className="absolute left-[13px] top-2 bottom-2 w-px -translate-x-1/2 bg-line md:left-1/2">
                <motion.div
                  className="w-full origin-top bg-ember"
                  style={{ scaleY: scrollYProgress, height: "100%" }}
                />
              </div>

              <div className="space-y-10 md:space-y-16">
                {steps.map((step, index) => {
                  const isRight = index % 2 === 1;

                  return (
                    <motion.div
                      key={step.num}
                      style={{ opacity: stepOpacities[index], x: stepXs[index] }}
                      className="relative md:grid md:grid-cols-[1fr_3rem_1fr] md:items-start md:gap-x-6 lg:gap-x-10"
                    >
                      <span className="absolute -left-14 top-0 rounded-full flex h-7 w-7 items-center justify-center border border-ember bg-cream-dim font-mono text-[11px] text-ember md:static md:col-start-2 md:mx-auto md:h-9 md:w-9">
                        {step.num}
                      </span>

                      {isRight ? (
                        <div className="md:col-start-3 md:text-left">
                          <h3 className="font-display text-2xl font-bold text-ink md:text-4xl">
                            {step.title}
                          </h3>
                          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
                            {step.desc}
                          </p>
                        </div>
                      ) : (
                        <div className="md:col-start-1 md:flex md:flex-col md:items-end md:text-right">
                          <h3 className="font-display text-2xl font-bold text-ink md:text-4xl">
                            {step.title}
                          </h3>
                          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
                            {step.desc}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
