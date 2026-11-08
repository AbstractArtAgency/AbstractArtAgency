"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Asterisk, GlobeRings, SparkLine } from "./Brand";
import Button from "@/src/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

const display = "font-display font-extrabold font-stretch-112% uppercase leading-none tracking-display";
const lineSize = "text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // tło prawie stoi w miejscu: 100% = całkowicie przypięte, 85% = przewija się tylko o 15% tego co treść
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "85%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduceMotion ? 1 : 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#160604] px-gutter pt-[108px] pb-10 text-bone after:pointer-events-none after:absolute after:inset-0 after:z-0 after:bg-noise after:opacity-16 after:mix-blend-overlay"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-1 bg-hero bg-cover bg-center will-change-transform"
      />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-2 grid grid-cols-2 gap-4 pt-[18px] sm:grid-cols-3 font-mono text-xs uppercase leading-[1.6] tracking-[0.08em] text-bone/72"
      >
        <div>AbstractArtAgency.pl</div>
        <div className="hidden sm:block sm:text-center">
          Agencja marketingowa
        </div>
        <div className="text-right">10+ marek</div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-2 mx-auto flex w-full max-w-5xl grow flex-col items-center justify-center gap-10 py-14 text-center"
      >
        <div className="m-0 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease }}
            className={`${display} ${lineSize}`}
          >
            Tworzymy marki
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className={`${display} ${lineSize} my-[0.08em]`}
          >
            <span className="bg-ember px-[0.06em] text-bone [box-decoration-break:clone]">Niemożliwe</span>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease }}
            className={`${display} ${lineSize}`}
          >
            do&nbsp;zignorowania.
          </motion.h1>
        </div>

        <div className="flex max-w-[560px] flex-col items-center gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="m-0 text-[17px] leading-normal text-bone/86 sm:text-[19px]"
          >
            Pozwól się znaleźć tysiącom użytkowników, którzy szukają tego, co
            oferujesz. Niech Twoja marka stanie się nie do przeoczenia.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button href="/realisations" variant="primary">
              Zobacz realizacje
              <ArrowUpRight />
            </Button>
            <Button href="/contact" variant="ghost">
              Umów rozmowę
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95, duration: 0.6 }}
        className="relative z-2 hidden grid-cols-2 items-end font-mono text-bone/80 lg:grid"
      >
        <div className="flex items-center gap-7">
          <div className="text-[15px] leading-normal tracking-[0.12em]">
            SOCIAL MEDIA / WWW /
            <br />
            SEO / ADS / BRANDING
          </div>
          <GlobeRings />
        </div>
        <div className="flex items-center justify-end gap-[18px]">
          <Asterisk />
          <SparkLine />
          <span className="inline-block rounded-full border border-bone/50 px-3 py-[3px] text-xs tracking-[0.06em]">
            AA-2026
          </span>
        </div>
      </motion.div>
    </section>
  );
}
