"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkle } from "lucide-react";
import ParticleBackground from "./ParticleBackground";


const breadcrumbItems = [
  "STRONY WWW",
  "SEO",
  "KAMPANIE ADS",
  "BRANDING",
  "E-COMMERCE",
  "SOCIAL MEDIA",
];

const creditItems = [
  "STRONY WWW",
  "KAMPANIE ADS",
  "BRANDING",
  "SOCIAL MEDIA",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream min-h-screen flex items-center py-32"
    >
      <ParticleBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/10 via-transparent to-cream" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.25em]"
        >
          <div>
            <span className="block font-bold text-ink">AbstractArt.pl</span>
          </div>
          <div className="text-right">
            <span className="block font-bold text-ink">10+ marek</span>
          </div>
        </motion.div>

        <div className="mt-14 text-center sm:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[12vw] font-black uppercase leading-[0.92] tracking-tight text-ink sm:text-7xl lg:text-8xl"
          >
            Tworzymy marki
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-ember font-accent italic text-[12vw] font-normal uppercase leading-[0.92] tracking-tight sm:gap-5 sm:text-7xl lg:text-9xl"
          >
            Niemożliwe
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[12vw] font-black uppercase leading-[0.92] tracking-tight text-ink sm:text-7xl lg:text-8xl"
          >
            do zignorowania.
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mx-auto mt-8 flex w-fit items-center justify-center border border-line px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft"
          >
            <p>WWW · Ads · Social media</p>
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-mono text-xs uppercase tracking-[0.15em] text-ink-soft sm:gap-x-6"
          >
            {creditItems.map((item, i) => (
              <span key={item} className="flex items-center gap-x-4 sm:gap-x-6">
                {item}
                {i < creditItems.length - 1 && (
                  <span className="text-ember">—</span>
                )}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mx-auto mt-16 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            Pozwól się znaleźć tysiącom użytkowników, którzy szukają tego, co oferujesz. Niech Twoja marka stanie się nie do przeoczenia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="/realisations"
              className="group relative overflow-hidden rounded-lg bg-ink px-8 py-4 font-mono text-sm text-cream transition-transform duration-300"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10">Zobacz realizacje →</span>
            </a>
            <a
              href="/contact"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-line bg-paper px-8 py-4 font-mono text-sm text-ink transition-colors duration-500 hover:border-ember"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-cream">
                Umów rozmowę
              </span>
            </a>
          </motion.div>

          
        </div>
      </div>
    </section>
  );
}
