"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, type MotionValue } from "framer-motion";

type Callout = { title: string; desc: string };

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Mobile (< md): hasła pod przewijanym urządzeniem, pokazywane parami.
 * Sterowane tym samym postępem scrolla (0–1) co zawartość urządzenia,
 * więc pary zmieniają się równo z przewijaniem ekranów w środku.
 */
export default function MobileCalloutPairs({
  callouts,
  progress,
}: {
  callouts: Callout[];
  progress: MotionValue<number>;
}) {
  const pairs: Callout[][] = [];
  for (let i = 0; i < callouts.length; i += 2) pairs.push(callouts.slice(i, i + 2));

  const toIndex = (p: number) => Math.min(pairs.length - 1, Math.max(0, Math.floor(p * pairs.length)));
  const [pairIndex, setPairIndex] = useState(() => toIndex(progress.get()));
  useMotionValueEvent(progress, "change", (p) => setPairIndex(toIndex(p)));

  return (
    <div className="flex flex-col gap-4 md:hidden">
      <div className="relative min-h-36">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={pairIndex} className="grid grid-cols-2 gap-4" initial="hidden" animate="visible" exit="exit">
            {pairs[pairIndex]?.map((callout, index) => (
              <motion.div
                key={callout.title}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: index * 0.08 } },
                  exit: { opacity: 0, y: 10, transition: { duration: 0.25, ease } },
                }}
                className="flex flex-col gap-2"
              >
                <span aria-hidden="true" className="h-[3px] w-6 bg-ember" />
                <p className="m-0 font-display text-[15px] font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em] text-ink [overflow-wrap:anywhere]">
                  {callout.title}
                </p>
                <p className="m-0 text-[13px] leading-snug text-ink-soft">{callout.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* postęp: która para jest widoczna */}
      <div aria-hidden="true" className="flex items-center justify-center gap-1.5">
        {pairs.map((_, index) => (
          <span
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${index === pairIndex ? "w-6 bg-ember" : "w-1.5 bg-ink/25"}`}
          />
        ))}
      </div>
    </div>
  );
}
