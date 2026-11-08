"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { capabilities } from "@/src/lib/capabilities";
import type { Realisation } from "@/src/lib/realisations";
import { ArrowUpRight } from "./Brand";

const ease = [0.16, 1, 0.3, 1] as const;

export const REALISATION_INDEX_ID = "wybrane-realizacje";

/**
 * (02) Wybrane realizacje: lista filtrowana usługą wybraną w liście (01) — ponowne kliknięcie zdejmuje filtr.
 * Hover na pozycji podmienia tło sekcji na zdjęcie z realizacji; kliknięcie → /realisations/[slug].
 */
export default function RealisationIndex({
  realisations,
  selected,
}: {
  realisations: Realisation[];
  /** slug usługi albo null = wszystkie */
  selected: string | null;
}) {
  const [hovered, setHovered] = useState<Realisation | null>(null);
  const visible = selected ? realisations.filter((item) => item.capability === selected) : realisations;
  const dark = hovered !== null;

  return (
    <section
      id={REALISATION_INDEX_ID}
      className="relative isolate scroll-mt-(--header-height,96px) overflow-hidden border-t border-line bg-cream bg-paper-grain bg-size-[256px_256px] py-20 md:py-28"
    >
      {/* tło: zdjęcie realizacji, na którą najechano (do czasu dodania zdjęć — gradient) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.slug}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="pointer-events-none absolute inset-0 -z-1"
          >
            <Image src={hovered.cover ?? hovered.fallback} alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-coal/55" />
            <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`mx-auto w-full max-w-6xl px-6 transition-colors duration-500 ${dark ? "text-bone" : "text-ink"}`}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex shrink-0 items-center gap-3">
            <span
              className={`font-mono text-xs uppercase tracking-widest transition-colors duration-500 ${dark ? "text-bone/70" : "text-stone"}`}
            >
              Wybrane realizacje
              {selected && <> · {capabilities.find((item) => item.slug === selected)?.navLabel}</>}
            </span>
          </div>
        </div>

        <ul className="m-0 mt-10 list-none p-0" onMouseLeave={() => setHovered(null)}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item, index) => {
              const capability = capabilities.find((cap) => cap.slug === item.capability);
              return (
                <motion.li
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, ease }}
                  className={`border-t transition-colors duration-500 ${dark ? "border-bone/25" : "border-ink/20"}`}
                >
                  <Link
                    href={`/realisations/${item.slug}`}
                    onMouseEnter={() => setHovered(item)}
                    onFocus={() => setHovered(item)}
                    onBlur={() => setHovered(null)}
                    className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-5 md:grid-cols-[3rem_minmax(0,1fr)_14rem_auto] md:gap-6 md:py-7"
                  >
                    <span className={`font-mono text-xs transition-colors duration-500 ${dark ? "text-bone/60" : "text-stone"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="truncate font-display text-2xl font-extrabold font-stretch-110% uppercase leading-none tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:text-4xl md:text-5xl">
                        {item.title}
                      </span>
                      <span
                        className={`truncate text-sm transition-colors duration-500 md:hidden ${dark ? "text-bone/75" : "text-ink-soft"}`}
                      >
                        {capability?.navLabel} · {item.year}
                      </span>
                    </span>
                    <span
                      className={`hidden flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-500 md:flex ${dark ? "text-bone/75" : "text-stone"}`}
                    >
                      <span>{capability?.navLabel}</span>
                      <span>
                        {item.client} · {item.year}
                      </span>
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current/30 transition-colors duration-300 group-hover:border-ember group-hover:bg-ember group-hover:text-bone">
                      <ArrowUpRight />
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {visible.length === 0 && (
          <p className={`mt-10 text-sm ${dark ? "text-bone/75" : "text-ink-soft"}`}>
            Wkrótce pokażemy tu realizacje z tego zakresu.
          </p>
        )}
      </div>
    </section>
  );
}
