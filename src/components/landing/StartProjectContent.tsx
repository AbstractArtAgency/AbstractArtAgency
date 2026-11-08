"use client";

import { motion } from "framer-motion";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";
import StartProjectForm from "@/src/components/landing/StartProjectForm";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    num: "01",
    title: "Wypełniasz formularz",
    desc: "Opisz swoją firmę, cele i budżet. To będzie nasza baza do startu.",
  },
  {
    num: "02",
    title: "Odzywamy się do Ciebie",
    desc: "W ciągu 24 godzin wracamy z pierwszymi pomysłami i pytaniami doprecyzowującymi.",
  },
  {
    num: "03",
    title: "Umawiamy się na rozmowę",
    desc: "Podczas rozmowy ustalamy zakres prac i wyceniamy projekt.",
  },
  {
    num: "04",
    title: "Rozpoczynamy pracę",
    desc: "Rozpoczynamy realizację z regularnymi checkpointami na każdym etapie.",
  },
];

/** Podstrona Rozpocznij projekt w stylu plakatu: wielkie słowo z notką, kroki jako ciemne kafle i formularz. */
export default function StartProjectContent() {
  return (
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />

      <section className="bg-glow-top bg-size-[auto,256px_256px] bg-fixed relative overflow-hidden bg-cream pt-[calc(var(--header-height,96px)+3rem)] pb-20 md:pb-28">
        <div className="@container mx-auto w-full max-w-6xl px-6">
          {/* nagłówek: mała linia + wielkie słowo + odręczna notka */}
          <h1 className="m-0 text-center">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="block font-display text-2xl font-extrabold font-stretch-110% uppercase leading-[1.05] tracking-display text-ink sm:text-4xl"
            >
              Rozpocznij{" "}
              <span className="bg-ember px-[0.06em] text-bone [box-decoration-break:clone]">swój projekt</span>
            </motion.span>
            <span className="relative mt-3 block">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.9, ease }}
                className="block whitespace-nowrap font-display text-[16cqw] font-extrabold font-stretch-112% uppercase leading-[0.82] tracking-[-0.04em] text-ink"
              >
                Zacznijmy
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease }}
            className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Nie zwlekaj! Napisz do nas jeśli masz jakieś pytania. Odzywamy się w ciągu 24 godzin.
          </motion.p>

          <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8">
            {/* jak zaczynamy — kroki jako ciemne kafle (na desktopie przyklejone podczas wypełniania) */}
            <div className="md:sticky md:top-[calc(var(--header-height,96px)+1.5rem)] md:self-start">
              <p className="m-0 mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-stone">
                Cztery kroki od pomysłu do startu
              </p>
              <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 md:grid-cols-1">
                {steps.map((step, index) => (
                  <motion.li
                    key={step.num}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease, delay: index * 0.08 }}
                    className="flex flex-col gap-4 rounded-[14px] bg-ink p-5 text-cream"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="m-0 font-display text-lg font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="m-0 text-[14px] leading-snug text-cream/70">{step.desc}</p>
                  </motion.li>
                ))}
              </ol>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
            >
              <StartProjectForm />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
