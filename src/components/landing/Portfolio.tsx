"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const sites = [
  {
    title: "Quantum Commerce",
    url: "https://quantum.example",
    image:
      "https://media.base44.com/images/public/6a60bebe0fa5491af08b0f4e/a218b0a37_generated_230c4fff.png",
  },
  {
    title: "Neural Canvas",
    url: "https://neural.example",
    image:
      "https://media.base44.com/images/public/6a60bebe0fa5491af08b0f4e/62c956fed_generated_e6a3d272.png",
  },
  {
    title: "Prism Protocol",
    url: "https://prism.example",
    image:
      "https://media.base44.com/images/public/6a60bebe0fa5491af08b0f4e/5cf3d383d_generated_be1bc845.png",
  },
];

export default function Portfolio() {
  const targetRef = useRef<HTMLElement | null>(null);
  const numSites = sites.length;

  // scroll progress for the entire section (0..1)
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });

  // Phase mappings:
  // 0 - 0.12 : initial sticky header -> shrink window
  // 0.12 - 0.88 : horizontal scrolling across sites
  // 0.88 - 1 : final expansion
  const shrink = useTransform(scrollYProgress, [0, 0.12], [1, 0.62]);
  const translateX = useTransform(
    scrollYProgress,
    [0.12, 0.88],
    ["0%", `${-(numSites - 1) * 100}%`]
  );
  const finalScale = useTransform(scrollYProgress, [0.88, 1], [0.72, 1]);
  const finalOpacity = useTransform(scrollYProgress, [0.86, 0.95], [0, 1]);

  return (
    // big height to allow scroll-driven transitions
    <section id="work" ref={targetRef} className="relative h-[500vh] bg-transparent">
      {/* sticky viewport for the interactive gallery */}
      <div className="sticky top-0 z-10 h-screen">
        {/* Header overlay */}
        <div className="absolute inset-x-0 top-6 z-20 px-6">
          <div className="mx-auto max-w-7xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-plasma">/ 03 - Selected Work</span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-electric md:text-6xl">
              The <span className="text-mask-gradient">evidence</span>
            </h2>
          </div>
        </div>

        <div className="flex h-full items-center justify-center">
          {/* center area holding the 'mac window' */}
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="flex items-center justify-center h-screen">
              <motion.div
                style={{ scale: shrink }}
                className="relative w-[86vw] max-w-[1200px] transition-transform will-change-transform"
              >
                {/* faux mac window frame */}
                <div className="rounded-2xl border border-white/10 bg-white/80 shadow-lg">
                  {/* title bar */}
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                      <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
                    </div>
                    <div className="ml-4 text-xs font-mono text-chrome">AbstractArt Browser</div>
                  </div>

                  {/* viewport area */}
                  <div className="h-[72vh] overflow-hidden bg-[#f5f5f5]">
                    <motion.div
                      style={{ x: translateX }}
                      className="flex h-full touch-pan-x will-change-transform"
                    >
                      {sites.map((site, i) => (
                        <div key={site.title} className="relative flex-shrink-0 h-full w-[100vw] md:w-[900px] lg:w-[1100px]">
                          {/* page chrome inside window */}
                          <div className="absolute inset-0 m-6 overflow-hidden rounded-lg border border-white/10 bg-white">
                            {/* Mock page header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                              <div className="font-mono text-sm text-chrome">{site.url}</div>
                              <div className="font-display font-bold text-electric">{site.title}</div>
                            </div>

                            {/* content area - show image as hero of the site */}
                            <div className="p-6">
                              <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-[#eceff0]">
                                <Image src={site.image} alt={site.title} fill className="object-cover" />
                              </div>
                              <p className="mt-4 text-chrome">A short description of {site.title} and the role played in crafting the experience.</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* after the sticky gallery, reveal final full-size section that expands into the page */}
      <div className="relative mt-[100vh] flex items-center justify-center">
        <motion.div
          style={{ scale: finalScale, opacity: finalOpacity }}
          className="mx-auto w-full max-w-4xl px-6"
        >
          <div className="rounded-2xl border border-white/10 bg-white p-12 shadow-lg">
            <h3 className="font-display text-3xl font-bold text-electric">Deep Dive Case Study</h3>
            <p className="mt-4 text-chrome">
              This final section grows into the viewport and becomes a normal vertically-scrollable section where a full case study is presented. Scroll further to continue through the site normally.
            </p>
            <div className="mt-6 space-y-6">
              <p className="text-chrome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
              <p className="text-chrome">Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
