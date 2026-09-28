"use client";

import { motion } from "framer-motion";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";
import StartProjectForm from "@/src/components/landing/StartProjectForm";

const steps = [
  {
    num: "01",
    title: "Wypełniasz formularz",
    desc: "Opisujesz swoją firmę, cele i budżet — zajmie Ci to mniej niż 2 minuty.",
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
    desc: "Ruszamy z realizacją — z regularnymi checkpointami na każdym etapie.",
  },
];

export default function StartProjectContent() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="relative overflow-hidden bg-cream pt-40 pb-8 md:pt-48">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />

        <div className="relative mx-auto flex h-70 w-full max-w-6xl items-center justify-center px-6 sm:h-85 md:h-100">
          <h1 className="pointer-events-none select-none whitespace-nowrap font-accent italic text-[20vw] font-black uppercase leading-none tracking-tight text-ember sm:text-[16vw] lg:text-[13vw]">
            Zacznijmy
          </h1>
        </div>

        <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 text-center font-mono text-[10px] uppercase tracking-widest text-stone md:text-xs">
          <span>Nowy klient</span>
          <span className="text-line">/</span>
          <span>Rozpocznij współpracę</span>
        </div>
      </section>

      <section className="relative border-t border-line bg-cream-dim py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <span className="font-mono text-sm text-stone">(01)</span>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
                Opowiedz nam o <span className="text-ember font-accent italic tracking-wide">projekcie</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft md:text-right">
              Kilka pytań, żadnych zbędnych formalności. Odzywamy się w ciągu 24 godzin.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <StartProjectForm />
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-line bg-cream-dim py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
          >
            <div className="flex shrink-0 items-center gap-3">
              <span className="font-mono text-sm text-stone">(02)</span>
              <span className="font-mono text-xs uppercase tracking-widest text-stone">
                Jak zaczynamy
              </span>
            </div>

            <p className="max-w-xl font-display text-2xl font-bold leading-snug text-ink sm:text-4xl md:text-5xl">
              Cztery kroki od pomysłu do startu projektu.
            </p>
          </motion.div>

          <div className="relative mt-16 pl-14">
            <div className="absolute left-[13px] top-2 bottom-2 w-px -translate-x-1/2 bg-line">
              <div className="h-full w-full origin-top bg-ember" />
            </div>

            <div className="space-y-10 md:space-y-14">
              {steps.map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative"
                >
                  <span className="absolute -left-14 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-ember bg-cream-dim font-mono text-[11px] text-ember">
                    {step.num}
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
