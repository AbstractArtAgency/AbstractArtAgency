"use client";

import { ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import Contact from "@/src/components/landing/Contact";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";

const team = [
  {
    initials: "JP",
    name: "Jakub Przyciasa",
    role: "Founder & Marketing Lead",
    rotate: -6,
    shift: "mt-0",
    width: "w-44 sm:w-52 md:w-60",
  },
  {
    initials: "DŚ",
    name: "Dawid Ślusarczyk",
    role: "Head of Design",
    rotate: 4,
    shift: "mt-10 sm:mt-16",
    width: "w-36 sm:w-44 md:w-48",
  },
  {
    initials: "JW",
    name: "Jan Walicki",
    role: "Lead Developer",
    rotate: -3,
    shift: "-mt-4 sm:mt-4",
    width: "w-40 sm:w-48 md:w-56",
  },
  {
    initials: "JT",
    name: "Julia Tenerle",
    role: "Social Media & Content Manager",
    rotate: 7,
    shift: "mt-6 sm:-mt-2",
    width: "w-36 sm:w-40 md:w-48",
  },
];

function Polaroid({
  className = "",
  caption,
  subCaption,
}: {
  className?: string;
  caption?: string;
  subCaption?: string;
}) {
  return (
    <div className={`border-4 border-paper bg-paper shadow-xl ${className}`}>
      <div className="flex aspect-4/5 items-center justify-center bg-linear-to-br from-ember/15 via-cream-dim to-paper">
        <ImageIcon className="h-6 w-6 text-stone/50" />
      </div>
      {caption && (
        <div className="px-2 pb-2 pt-2 text-center">
          <p className="font-accent text-sm italic text-ink-soft">{caption}</p>
          {subCaption && (
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-stone">
              {subCaption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function TeamPolaroid({ member }: { member: (typeof team)[number] }) {
  return (
    <div
      className={`${member.shift} ${member.width} transition-transform duration-300 hover:-translate-y-1 hover:rotate-0`}
      style={{ transform: `rotate(${member.rotate}deg)` }}
    >
      <div className="border-4 border-paper bg-paper shadow-xl">
        <div className="flex aspect-4/5 items-center justify-center bg-linear-to-br from-ember/15 via-cream-dim to-paper">
          <span className="font-display text-5xl font-bold text-ember/30 sm:text-6xl">
            {member.initials}
          </span>
        </div>
        <div className="px-3 pb-3 pt-2 text-center">
          <p className="font-display text-sm font-bold text-ink">{member.name}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-stone">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutContent() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="relative overflow-hidden bg-cream pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />

        <div className="relative mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <h1 className="max-w-3xl font-display text-3xl font-bold leading-[1.15] text-ink sm:text-5xl md:text-6xl">
              Kim <span className="text-ember font-accent italic tracking-wide normal-case">my</span> jesteśmy?
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              Wykorzystując nasze umiejętności i doświadczenie chcemy pomagać firmom w osiąganiu ich celów i dalszym rozwoju.
            </p>

            <div className="absolute -right-4 top-0 hidden w-40 -translate-y-4 rotate-3 md:block lg:w-48">
              <Polaroid className="w-full" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              AbstractArt to zespół kreatywnych i ambitnych ludzi, gotowych do podejmowania wyzwań i tworzenia innowacyjnych rozwiązań.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft md:text-right">
              Naszym celem jest współpraca z markami, które dzięki nam będą nie do przeoczenia w internecie.
            </p>
            <span className="shrink-0 font-mono text-sm text-stone">(01)</span>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-line bg-cream py-20 md:py-28">
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
                Nasz zespół
              </span>
            </div>

            <p className="max-w-xl font-display text-2xl font-bold leading-snug text-ink sm:text-4xl md:text-5xl">
              Multidyscyplinarni kreatywni profesjonaliści.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-16 flex flex-wrap items-start justify-center gap-6 sm:justify-between md:mt-24 md:gap-8"
          >
            {team.map((member) => (
              <TeamPolaroid key={member.name} member={member} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-line bg-cream py-16 md:py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6 border border-line bg-paper px-8 py-12 text-center"
          >
            <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Masz coś do zaoferowania?
            </p>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft">
              Szukamy ludzi, którzy chcą tworzyć rzeczy, z których będziemy dumni. Dołącz do zespołu AbstractArt.
            </p>
            <a
              href="/careers"
              className="group relative mt-2 inline-flex items-center gap-2 overflow-hidden rounded-lg bg-ember px-6 py-3 font-mono text-sm text-cream"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10">Dołącz do nas →</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Contact compact />
      <Footer />
    </main>
  );
}
