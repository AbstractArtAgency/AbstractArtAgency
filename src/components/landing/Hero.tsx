"use client";

import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void"
    >
      <ParticleBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void" />

      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="animate-glow-pulse h-1.5 w-1.5 rounded-full bg-plasma" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-chrome">
            Digital Architecture Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[16vw] font-black leading-[0.85] tracking-tight md:text-[13vw] lg:text-[12vw]"
        >
          <span className="text-mask-gradient text-glow block">MANIFEST</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mx-auto mt-8 max-w-2xl font-mono text-lg leading-relaxed text-chrome md:text-xl"
        >
          We engineer impossible digital experiences - where raw code transmutes into
          living, breathing dimensions. No complexity is beyond our reach.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-full px-8 py-4 font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(139,92,246,0.4)]"
          >
            <div className="animate-gradient-shift absolute inset-0 bg-gradient-to-r from-plasma via-indigo-500 to-cyan-400" />
            <span className="relative z-10 font-mono text-sm tracking-wide text-white">
              Begin the Transmission
            </span>
          </a>
          <a
            href="#work"
            className="rounded-full border border-white/15 px-8 py-4 font-mono text-sm tracking-wide text-electric transition-all duration-300 hover:border-plasma/50 hover:bg-white/5"
          >
            View the Codex
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute left-0 top-1/10 hidden select-none text-left font-mono text-[10px] leading-relaxed text-plasma/30 lg:block"
        >
          <div>{"const manifest = (idea) =>"}</div>
          <div className="pl-3">{"{"}</div>
          <div className="pl-6">{"return reality(idea)"}</div>
          <div className="pl-3">{"}"}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute right-0 bottom-1/10 hidden select-none text-right font-mono text-[10px] leading-relaxed text-cyan/30 lg:block"
        >
          <div>{"function transcend() {"}</div>
          <div className="pr-3">{"await architect.execute()"}</div>
          <div>{"}"}</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome">
            Scroll
          </span>
          <div className="h-12 w-px overflow-hidden bg-gradient-to-b from-plasma to-transparent">
            <div className="animate-scroll-line h-full w-full bg-electric" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
