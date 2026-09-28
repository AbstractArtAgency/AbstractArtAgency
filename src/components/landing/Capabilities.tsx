"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { capabilities } from "@/src/lib/capabilities";

export default function Capabilities() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="capabilities" className="relative overflow-hidden bg-cream py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative w-full px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
              Sprawdź, co możemy dla <span className="text-ember font-accent italic tracking-wide">Ciebie</span> zrobić<span className="text-ember">!</span>
            </h2>
          </div>
          <a
            href="/contact"
            className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-lg bg-ink px-6 py-3 font-mono text-sm text-cream"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="relative z-10">Umów rozmowę →</span>
          </a>
        </motion.div>

        <div
          className="border-t border-line"
          onMouseLeave={() => setOpenIndex(-1)}
        >
          {capabilities.map((capability, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border-b border-line"
              >
                <button
                  type="button"
                  onMouseEnter={() => setOpenIndex(index)}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="group flex w-full items-center gap-6 px-4 py-6 text-left md:gap-10 md:px-8 md:py-8"
                >
                  <span
                    className="select-none font-display text-[3.2rem] font-bold leading-none text-transparent transition-all duration-300 sm:text-[4.5rem] md:text-[6rem]"
                    style={{
                      WebkitTextStroke: isOpen
                        ? "1.5px #DE1F1A"
                        : "1.5px rgba(26,26,26,0.18)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3
                    className={`min-w-0 flex-1 font-display text-xl font-bold uppercase tracking-tight transition-colors duration-300 sm:text-2xl md:text-3xl ${
                      isOpen ? "text-ink" : "text-stone group-hover:text-ink-soft"
                    }`}
                  >
                    {capability.title}
                  </h3>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "border-ember bg-ember text-cream"
                        : "border-line text-stone group-hover:border-ember/40 group-hover:text-ink"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ clipPath: "inset(0 0 0 100%)" }}
                        animate={{ clipPath: "inset(0 0 0 0%)" }}
                        exit={{ clipPath: "inset(0 0 0 100%)" }}
                        transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
                        className="relative left-1/2 w-screen -translate-x-1/2"
                        style={{ backgroundColor: "#de1f1a" }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ duration: 0.35, delay: 0.15 }}
                          className="mx-auto max-w-7xl px-6 py-8 md:px-12 md:py-10"
                        >
                          <p className="max-w-xl text-sm leading-relaxed text-cream/90 md:text-2xl font-medium">
                            {capability.desc}
                          </p>
                          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
                            {capability.meta.map((line) => {
                              const [label, value] = line.split(": ");
                              return (
                                <div key={line}>
                                  <p className="font-mono italic font-bold text-[10px] uppercase tracking-[0.2em] text-cream/55">
                                    {label}
                                  </p>
                                  <p className="mt-1.5 font-display text-base font-black leading-snug text-cream md:text-lg">
                                    {value}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                          <a
                            href={`/capabilities/${capability.slug}`}
                            className="group/link relative mt-16 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cream"
                          >
                            Zobacz szczegóły →
                            <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-cream transition-all duration-300 group-hover/link:w-full" />
                          </a>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
