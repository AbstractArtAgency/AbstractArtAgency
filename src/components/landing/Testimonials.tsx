"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    initials: "MK",
    name: "Marta Kowalska",
    role: "Właścicielka, Glow Studio",
    quote:
      "Dzięki nowej stronie i kampaniom Ads liczba zapytań wzrosła już w ciągu dwóch miesięcy. Współpraca była prosta i przejrzysta na każdym etapie.",
  },
  {
    initials: "PN",
    name: "Piotr Nowak",
    role: "CEO, NovaTech",
    quote:
      "Zespół AbstractArt zaprojektował dla nas markę od zera — od logo po stronę internetową. Efekt przeszedł nasze oczekiwania.",
  },
  {
    initials: "AW",
    name: "Aleksandra Wiśniewska",
    role: "Marketing Manager, BudPro",
    quote:
      "Pozycjonowanie zaczęło przynosić realny ruch już po trzech miesiącach. Widzimy to bezpośrednio w liczbie zapytań ofertowych.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-cream py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
            Co mówią nasi <span className="text-ember font-accent italic tracking-wide">klienci</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            Nie musisz wierzyć nam na słowo - zobacz, co mówią osoby, z którymi mieliśmy okazję współpracować.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-between border border-line bg-paper p-8"
            >
              <div>
                <div className="flex gap-1 text-ember">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-ember" />
                  ))}
                </div>
                <p className="mt-5 text-base leading-relaxed text-ink-soft">
                  „{testimonial.quote}”
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-ember/10 font-mono text-sm font-bold text-ember">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-ink">
                    {testimonial.name}
                  </p>
                  <p className="font-mono text-xs text-stone">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
