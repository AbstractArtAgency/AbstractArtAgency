"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/src/lib/capabilities";
import CareerForm from "./CareerForm";

const ease = [0.16, 1, 0.3, 1] as const;

const tiles = [
  { label: "Forma współpracy", value: "Freelance / projekty" },
  { label: "Lokalizacja", value: "Zdalnie / cała Polska" },
  { label: "Obszary", value: capabilities.map((item) => item.navLabel).join(" · ") },
];

/** Podstrona Kariera w stylu plakatu: wielkie słowo z notką, ciemne kafle i formularz zgłoszenia. */
export default function CareersContent() {
  return (
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
            Masz coś ciekawego do{" "}
            <span className="bg-ember px-[0.06em] text-bone [box-decoration-break:clone]">zaoferowania</span>?
          </motion.span>
          <span className="relative mt-3 block">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease }}
              className="block whitespace-nowrap font-display text-[19cqw] font-extrabold font-stretch-112% uppercase leading-[0.82] tracking-[-0.04em] text-ink"
            >
              Kariera
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease }}
          className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-ink-soft md:text-lg"
        >
          Nie prowadzimy sztywnej rekrutacji. W naszym zespole pracują również freelancerzy. Jeśli uważasz, że możesz
          pomóc w naszej pracy, napisz kilka słów o sobie. Odezwiemy się, jeśli tylko będziemy Cię potrzebować.
        </motion.p>

        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8">
          {/* ciemne kafle */}
          <div className="grid grid-cols-1 content-start gap-3 sm:grid-cols-2 md:grid-cols-1">
            {tiles.map((tile, index) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: index * 0.08 }}
                className={`flex min-h-32 flex-col justify-between gap-6 rounded-[14px] bg-ink p-5 text-cream ${
                  index === tiles.length - 1 ? "sm:col-span-2 md:col-span-1" : ""
                }`}
              >
                <p className="m-0 text-xl font-semibold leading-snug">{tile.value}</p>
                <p className="m-0 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/60">{tile.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <CareerForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
