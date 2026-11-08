"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Opis z jedną frazą na czerwonym tle. */
function Highlighted({ text, highlight }: { text: string; highlight?: string }) {
  const index = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <span className="bg-ember px-1 text-bone [box-decoration-break:clone]">{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}

export type PosterTile = { label: string; value: string };

/**
 * Sekcja (01) podstron w stylu plakatu: mały nagłówek, ogromne słowo na całą szerokość
 * z odręczną notką, przyciski, wyśrodkowany opis wersalikami z podświetloną frazą i ciemne kafle.
 * Używana na podstronach usług (CapabilityIntro) i na stronie „O nas”.
 */
export default function PosterIntro({
  eyebrow,
  word,
  description,
  highlight,
  note,
  label = "Na czym to polega",
  actions,
  tiles,
}: {
  /** mała linia nad wielkim słowem */
  eyebrow: string;
  /** wielkie słowo na całą szerokość */
  word: string;
  description: string;
  /** fragment opisu na czerwonym tle */
  highlight?: string;
  /** odręczna notka przy wielkim słowie */
  note?: string;
  /** mały podpis nad opisem */
  label?: string;
  /** przyciski pod wielkim słowem */
  actions: ReactNode;
  tiles: PosterTile[];
}) {
  // rozmiar dobierany do długości słowa, żeby zawsze wypełniało szerokość, ale nie wychodziło poza nią
  const wordSize = Math.min(26, 92 / (word.length * 0.66));

  return (
    <section className="bg-glow-top bg-size-[auto,256px_256px] bg-fixed relative overflow-hidden bg-cream pt-[calc(var(--header-height,96px)+2.5rem)] pb-20 md:pb-28">
      <div className="@container mx-auto w-full max-w-6xl px-6">
        {/* nagłówek: mała linia + ogromne słowo */}
        <h1 className="m-0 mt-6 text-center md:mt-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="block font-display text-2xl font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-display text-ink sm:text-4xl"
          >
            {eyebrow}
          </motion.span>
          <span className="relative block">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease }}
              className="block whitespace-nowrap font-display font-extrabold font-stretch-112% uppercase leading-[0.82] tracking-[-0.04em] text-ink"
              style={{ fontSize: `${wordSize}cqw` }}
            >
              {word}
            </motion.span>
            {note && (
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, rotate: -16, scale: 0.9 }}
                animate={{ opacity: 1, rotate: -9, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6, ease }}
                className="pointer-events-none absolute -top-[1.2em] right-0 font-accent text-[4.5cqw] font-normal italic leading-none text-ember normal-case sm:-top-[0.9em]"
              >
                {note}
              </motion.span>
            )}
          </span>
        </h1>

        {/* pod słowem: przyciski */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease }}
          className="mt-10 flex justify-center"
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row">{actions}</div>
        </motion.div>

        {/* wyśrodkowany opis wersalikami z podświetleniem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mt-20 flex flex-col items-center md:mt-28"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone">{label}</span>
          <p className="m-0 mt-6 max-w-4xl text-center font-display text-lg font-bold uppercase leading-[1.2] tracking-[-0.01em] text-ink sm:text-2xl md:text-[1.75rem]">
            <Highlighted text={description} highlight={highlight} />
          </p>
          <span aria-hidden="true" className="mt-10 h-16 w-px bg-ink/30 md:h-24" />
        </motion.div>

        {/* dane jako ciemne kafle */}
        <dl className="m-0 mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-3">
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: index * 0.08 }}
              className="flex min-h-36 flex-col justify-between gap-6 rounded-[14px] bg-ink p-5 text-cream"
            >
              <dd className="m-0 text-lg font-semibold leading-snug">{tile.value}</dd>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/60">{tile.label}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
