"use client";

import { motion } from "framer-motion";

/** fragment linii: zwykły tekst, słowo podkreślone czerwonym pędzlem albo słowo na czerwonym tle */
type Segment = string | { brush: string } | { accent: string };
type Line = { indent?: 0 | 1 | 2; parts: Segment[] };

const indents = ["0", "12cqw", "30cqw"];
const ease = [0.16, 1, 0.3, 1] as const;

/** Odręczne podkreślenie pędzlem pod słowem, rysowane po wejściu w widok. */
function Brush() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 60"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -left-[4%] top-[88%] h-[0.32em] w-[108%] -rotate-2 overflow-visible text-ember mix-blend-multiply"
    >
      <motion.path
        d="M6 38 C 70 16, 150 44, 220 24 S 330 18, 394 14"
        fill="none"
        stroke="currentColor"
        strokeWidth={30}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
        opacity={0.85}
      />
      <motion.path
        d="M30 50 C 110 34, 200 52, 300 36 S 370 40, 388 32"
        fill="none"
        stroke="currentColor"
        strokeWidth={8}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease, delay: 0.55 }}
        opacity={0.7}
      />
    </svg>
  );
}

/**
 * Duży, wielowierszowy nagłówek w stylu plakatu: linie z różnymi wcięciami, jedno słowo
 * podkreślone pędzlem, akcent na czerwonym tle i odręczna notka z boku. Rozmiar liczony
 * względem szerokości kontenera (cqw), więc zawsze mieści się w marginesach.
 */
export default function StatementHeadline({
  lines,
  note,
  size = 8.5,
}: {
  lines: Line[];
  note?: string;
  /** rozmiar w cqw — mniejszy dla długich słów */
  size?: number;
}) {
  return (
    <div className="@container relative w-full">
      <h2 style={{ fontSize: `${size}cqw` }} className="m-0 font-display font-extrabold font-stretch-110% uppercase leading-[0.9] tracking-[-0.03em] text-ink">
        {lines.map((line, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: index * 0.08 }}
            className="block"
            style={{ paddingLeft: indents[line.indent ?? 0] }}
          >
            {line.parts.map((part, partIndex) => {
              if (typeof part === "string") return <span key={partIndex}>{part}</span>;
              if ("brush" in part)
                return (
                  <span key={partIndex} className="relative inline-block">
                    {part.brush}
                    <Brush />
                  </span>
                );
              return (
                <span key={partIndex} className="bg-ember px-[0.06em] text-bone [box-decoration-break:clone]">
                  {part.accent}
                </span>
              );
            })}
          </motion.span>
        ))}
      </h2>

      {note && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, rotate: -14, scale: 0.9 }}
          whileInView={{ opacity: 1, rotate: -8, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease, delay: 0.5 }}
          className="pointer-events-none absolute right-0 top-[8%] font-accent text-[5.5cqw] italic leading-none text-ember"
        >
          {note}
        </motion.span>
      )}
    </div>
  );
}
