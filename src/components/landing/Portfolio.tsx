"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Quantum Commerce",
    category: "E-Commerce Platform",
    desc: "A WebGL-powered shopping experience where products orbit in 3D space. Built for a luxury brand with 10M+ monthly visitors.",
    image:
      "https://media.base44.com/images/public/6a60bebe0fa5491af08b0f4e/a218b0a37_generated_230c4fff.png",
    tags: ["WebGL", "React", "Edge"],
  },
  {
    title: "Neural Canvas",
    category: "AI Creative Suite",
    desc: "Real-time generative art platform powered by neural networks. Users paint with algorithms - every stroke is unique.",
    image:
      "https://media.base44.com/images/public/6a60bebe0fa5491af08b0f4e/62c956fed_generated_e6a3d272.png",
    tags: ["AI", "Canvas", "Realtime"],
  },
  {
    title: "Prism Protocol",
    category: "Web3 Application",
    desc: "A decentralized marketplace with glassmorphic 3D asset previews and sub-second transaction rendering.",
    image:
      "https://media.base44.com/images/public/6a60bebe0fa5491af08b0f4e/5cf3d383d_generated_be1bc845.png",
    tags: ["Web3", "Three.js", "Solidity"],
  },
];

export default function Portfolio() {
  const targetRef = useRef<HTMLElement | null>(null);
  const items = [
    {
      type: "intro",
      title: "Zobacz nasze prace",
      subtitle:
        "Przewiń, aby zobaczyć wybrane realizacje — każde w osobnym 'oknie'",
    },
    ...projects,
    {
      type: "outro",
      title: "Chcesz więcej?",
      subtitle: "Skontaktuj się z nami, aby omówić projekt",
    },
  ];
  const count = items.length;

  const progress = useMotionValue(0);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const nav = document.querySelector("nav");
    const navHeight = nav
      ? (nav as HTMLElement).getBoundingClientRect().height
      : 0;

    const calc = () => {
      const rect = el.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || 0;
      const start = rect.top + scrollTop - navHeight + 100;
      const span = window.innerHeight * (count + 0.8); // horizontal travel + final expand hold
      const end = start + span;
      return { start, end };
    };

    let bounds = calc();

    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      const p = (y - bounds.start) / (bounds.end - bounds.start);
      progress.set(Math.max(0, Math.min(1, p)));
    };

    const onResize = () => {
      bounds = calc();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [count, progress]);

  // Combined scale: full -> small -> small -> full
  const scale = useTransform(progress, [0, 0.12, 0.82, 0.94], [1, 0.7, 0.7, 1]);
  const frameOpacity = useTransform(
    progress,
    [0, 0.12, 0.88, 0.98],
    [0, 1, 1, 0],
  );
  const translateX = useTransform(
    progress,
    [0.12, 0.78],
    ["0%", `${-(count - 1) * 100}%`],
  );

  return (
    <section
      id="work"
      ref={targetRef}
      className="relative h-[740vh] bg-transparent"
    >
      <div className="sticky top-[var(--header-height,72px)] z-10 h-[calc(100vh-var(--header-height,72px))]">
        {/* ⬇️ DOSTOSUJ: zmień top-0 aby sekcja zatrzymywała się dalej poniżej */}
        {/* Użyj top-8, top-16, top-24 itp aby zatrzymała się DALEJ w dół */}
        {/* Im wyższa wartość top, tym dalej będzie się zatrzymywać */}
        {/* <div className="relative inset-x-0 top-24 z-20 px-6 pt-6">
          <div className="mx-auto max-w-7xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-plasma">/ 03 - Selected Work</span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-electric md:text-6xl">The <span className="text-mask-gradient">evidence</span></h2>
          </div>
        </div> */}

        <div className="flex h-full items-center justify-center">
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <motion.div
              style={{ scale }}
              className="relative w-screen h-[calc(100vh-var(--header-height,72px))] flex items-center justify-center"
            >
              {/* sliding horizontal strip of panels */}
              <div className="absolute inset-0 ">
                <motion.div
                  style={{ x: translateX }}
                  className="flex gap-20 h-full will-change-transform"
                >
                  {items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-full h-full flex items-center justify-center bg-red-600 rounded-2xl"
                    >
                      {/* apple-like window */}

                      {/* content */}
                      <div className="relative inset-0 p-8 flex items-center justify-center">
                        {it.type === "intro" || it.type === "outro" ? (
                          <div className="text-center max-w-xl">
                            <h3 className="font-display text-4xl font-bold text-electric">
                              {it.title}
                            </h3>
                            <p className="mt-3 text-chrome">{it.subtitle}</p>
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col">
                            <div className="flex-1 relative rounded-md overflow-hidden">
                              <Image
                                src={it.image}
                                alt={it.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="mt-4">
                              <h4 className="font-display text-2xl text-electric">
                                {it.title}
                              </h4>
                              <p className="text-chrome mt-2">{it.desc}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* frame border (fades in) */}
                      <motion.div
                        style={{ opacity: frameOpacity }}
                        className="pointer-events-none absolute inset-0 flex items-center justify-center w-full"
                      >
                        <div className="w-full h-full rounded-2xl border-2 border-white/10">
                          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 shadow-md">
                            {/* titlebar */}
                            <div className="absolute top-0 left-0 right-0 flex items-center gap-3 px-4 py-3 bg-white">
                              <span className="h-3 w-3 rounded-full bg-red-500/80" />
                              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                              <span className="h-3 w-3 rounded-full bg-green-500/80" />
                              <div className="ml-4 text-xs font-mono text-chrome">
                                AbstractArt Browser
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* spacer after to allow expansion and normal scroll */}
      <div className="h-screen bg-transparent" />
    </section>
  );
}
