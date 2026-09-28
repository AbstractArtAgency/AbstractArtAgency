"use client";

import { ArrowUpRight, Code2, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import Contact from "@/src/components/landing/Contact";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";
import { capabilities } from "@/src/lib/capabilities";

const projects = [
  {
    title: "Jacob Przyciasa Portfolio",
    category: "Strona portfolio",
    url: "https://jacobprzyciasa.com/",
  },
  {
    title: "RN Serwis Elektroniki",
    category: "Strona firmowa",
    url: "https://www.rnserwiselektroniki.pl/",
  },
  {
    title: "Time2run",
    category: "Strona wydarzenia",
    url: "https://www.time2run.pl/",
  },
];

function PolaroidPlaceholder({
  className = "",
  caption,
}: {
  className?: string;
  caption?: string;
}) {
  return (
    <div className={`border-4 border-paper bg-paper shadow-xl ${className}`}>
      <div className="flex aspect-4/5 items-center justify-center bg-line/60">
        <ImageIcon className="h-6 w-6 text-stone/50" />
      </div>
      {caption && (
        <p className="px-2 pb-2 pt-2 text-center font-accent text-sm italic text-ink-soft">
          {caption}
        </p>
      )}
    </div>
  );
}

export default function RealisationsContent() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="relative overflow-hidden bg-cream pt-40 pb-8 md:pt-48">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />

        <div className="relative mx-auto flex h-70 w-full max-w-6xl items-center justify-center px-6 sm:h-85 md:h-100">
          <h1 className="pointer-events-none select-none whitespace-nowrap font-accent italic text-[20vw] font-black uppercase leading-none tracking-tight text-ember sm:text-[16vw] lg:text-[13vw]">
            Realizacje
          </h1>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 sm:gap-4">
            <div className="hidden -rotate-6 sm:block">
              <PolaroidPlaceholder className="w-24 md:w-32" />
            </div>
            <div className="z-10 rotate-2">
              <PolaroidPlaceholder className="w-32 sm:w-40 md:w-52" caption="Impresje" />
            </div>
          </div>
        </div>

        <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 text-center font-mono text-[10px] uppercase tracking-widest text-stone md:text-xs">
          <span>Kampania Maison Lumière</span>
          <span className="text-line">/</span>
          <span>Strategia kampanii</span>
        </div>
      </section>

      <section className="relative border-t border-line bg-cream py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 border-b border-line pb-10 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Pomagamy markom rosnąć dzięki contentowi, kierunkowi kreatywnemu i strategii zorientowanej na social media.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft md:text-right">
              Poznaj usługi, które kształtują każdy nasz projekt.
            </p>
            <span className="shrink-0 font-mono text-sm text-stone">(01)</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mt-10"
          >
            <ul className="font-display text-3xl font-bold uppercase leading-[1.15] text-ink sm:text-5xl md:text-6xl">
              {capabilities.map((capability, index) => {
                const highlighted = index === 2;
                return (
                  <li key={capability.slug}>
                    <a
                      href={`/capabilities/${capability.slug}`}
                      className={`inline-block transition-colors duration-300 ${
                        highlighted ? "bg-ink px-4 py-1 text-cream" : "hover:text-ember"
                      }`}
                    >
                      {capability.navLabel}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="absolute -right-4 top-1/2 hidden w-40 -translate-y-1/2 rotate-3 md:block lg:w-48">
              <PolaroidPlaceholder className="w-full" />
            </div>
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
            className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between"
          >
            <div className="flex shrink-0 items-center gap-3">
              <span className="font-mono text-sm text-stone">(02)</span>
              <span className="font-mono text-xs uppercase tracking-widest text-stone">
                Wybrane realizacje
              </span>
            </div>

            <p className="font-display text-2xl font-bold leading-snug text-ink sm:text-4xl md:text-5xl">
              {projects.map((project, index) => (
                <span key={project.title}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-ember"
                  >
                    {project.title}
                  </a>
                  {index < projects.length - 1 && <span className="text-stone"> / </span>}
                </span>
              ))}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center bg-ink text-cream">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-ink">Projekt i wdrożenie</p>
                <p className="font-mono text-xs text-stone">Strony internetowe</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft">
              Współpracujemy z markami, które cenią jakość i historię, jaką chcą opowiedzieć. Oto część projektów, które zrealizowaliśmy.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-line bg-cream py-16 md:py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden border border-line bg-paper p-6 transition-colors duration-300 hover:border-ember/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-stone">
                      {project.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink">
                      {project.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-stone transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
                </div>
                <p className="mt-4 truncate font-mono text-xs text-stone">
                  {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Contact compact />
      <Footer />
    </main>
  );
}
