"use client";

import { useRef, useEffect } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const sites = [
  {
    intro: true,
    title: "Zobacz nasze prace",
    content: "Przewiń, aby zobaczyć wybrane realizacje — każde w osobnym 'oknie' przeglądarki.",
  },
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

  // manual scroll-driven progress aligned to nav bottom
  const progress = useMotionValue(0);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const nav = document.querySelector('nav');
    const headerHeight = nav ? (nav as HTMLElement).getBoundingClientRect().height : 0;

    const updateBounds = () => {
      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const start = rect.top + scrollTop - headerHeight; // when section top hits nav bottom
      const span = window.innerHeight * (numSites + 1);
      const end = start + span;
      return { start, end };
    };

    let bounds = updateBounds();

    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      const p = (y - bounds.start) / (bounds.end - bounds.start);
      progress.set(Math.max(0, Math.min(1, p)));
    };

    const onResize = () => {
      bounds = updateBounds();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [numSites, progress]);

  const shrink = useTransform(progress, [0, 0.12], [1, 0.7]);
  const frameOpacity = useTransform(progress, [0.02, 0.18], [0, 1]);
  const translateX = useTransform(progress, [0.12, 0.88], ["0%", `${-(numSites - 1) * 100}%`]);
  const finalScale = useTransform(progress, [0.88, 1], [0.72, 1]);
  const finalOpacity = useTransform(progress, [0.86, 0.95], [0, 1]);

  return (
    <section id="work" ref={targetRef} className="relative h-[500vh] bg-transparent">
      <div className="sticky top-0 z-10 h-screen">
        {/* header */}
        <div className="absolute inset-x-0 top-6 z-20 px-6">
          <div className="mx-auto max-w-7xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-plasma">/ 03 - Selected Work</span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-electric md:text-6xl">The <span className="text-mask-gradient">evidence</span></h2>
          </div>
        </div>

        <div className="flex h-full items-center justify-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="flex items-center justify-center h-screen">
              <motion.div style={{ scale: shrink }} className="relative w-screen h-screen will-change-transform">
                {/* content panels (each is its own scrollable 'window') */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div style={{ x: translateX }} className="flex h-full will-change-transform">
                    {sites.map((site, i) => (
                      <div key={i} className="relative flex-shrink-0 h-full w-screen">
                        <div className="absolute inset-0 m-6 overflow-auto rounded-lg border border-white/10 bg-white">
                          {site.intro ? (
                            <div className="flex h-full items-center justify-center p-8">
                              <div className="max-w-xl text-center">
                                <h3 className="font-display text-4xl font-bold text-electric">{site.title}</h3>
                                <p className="mt-4 text-chrome">{site.content}</p>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                                <div className="font-mono text-sm text-chrome">{site.url}</div>
                                <div className="font-display font-bold text-electric">{site.title}</div>
                              </div>
                              <div className="p-6">
                                <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-[#eceff0] relative">
                                  <Image src={site.image} alt={site.title} fill className="object-cover" />
                                </div>
                                <p className="mt-4 text-chrome">A short description of {site.title} and the role played in crafting the experience.</p>
                                <div className="mt-6 space-y-4">
                                  <p className="text-chrome">Example case study content. Scroll inside this window to see independent scrolling.</p>
                                  <p className="text-chrome">More details, stats and imagery about the project.</p>
                                  <p className="text-chrome">Even more content to show inner-window scroll behavior.</p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* overlay frame (border only) that fades in; content underneath is fully interactive */}
                <motion.div style={{ opacity: frameOpacity }} className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="rounded-2xl border-2 border-white/10 shadow-lg w-[92vw] h-[92vh]" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* final expanding case study */}
      <div className="relative mt-[100vh] flex items-center justify-center">
        <motion.div style={{ scale: finalScale, opacity: finalOpacity }} className="mx-auto w-full max-w-4xl px-6">
          <div className="rounded-2xl border border-white/10 bg-white p-12 shadow-lg">
            <h3 className="font-display text-3xl font-bold text-electric">Deep Dive Case Study</h3>
            <p className="mt-4 text-chrome">This final section grows into the viewport and becomes a normal vertically-scrollable section where a full case study is presented. Scroll further to continue through the site normally.</p>
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
