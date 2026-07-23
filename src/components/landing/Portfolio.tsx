"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  {
    title: "Flow State",
    category: "Data Visualization",
    desc: "A living dashboard for 2 billion data points. Flows, breathes, and reveals patterns invisible to static charts.",
    image:
      "https://media.base44.com/images/public/6a60bebe0fa5491af08b0f4e/209480481_generated_bfb5bea0.png",
    tags: ["D3.js", "WebGL", "Streaming"],
  },
];

export default function Portfolio() {
  const targetRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-68%"]);

  return (
    <section id="work" ref={targetRef} className="relative h-[350vh] bg-void">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-10 px-6 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-7xl"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-plasma">
              / 03 - Selected Work
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-electric md:text-6xl">
              The <span className="text-mask-gradient">evidence</span>
            </h2>
          </motion.div>
        </div>

        <div className="flex h-full items-center">
          <motion.div style={{ x }} className="flex gap-6 pl-6 md:pl-16">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group relative h-[62vh] w-[80vw] flex-shrink-0 overflow-hidden rounded-2xl md:w-[55vw] lg:w-[40vw]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 55vw, 80vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
                <div className="absolute inset-0 bg-void/20 transition-colors duration-500 group-hover:bg-void/10" />

                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-plasma">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome">
                      / {project.category}
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="mb-3 font-display text-3xl font-bold text-electric md:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mb-4 max-w-md text-sm leading-relaxed text-chrome">
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-chrome"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-electric transition-all duration-500 group-hover:border-plasma group-hover:bg-plasma">
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:scale-110" />
                    </div>
                  </div>
                </div>

                <div className="absolute right-4 top-4 h-8 w-8">
                  <div className="absolute right-0 top-0 h-px w-full bg-plasma/40" />
                  <div className="absolute right-0 top-0 h-full w-px bg-plasma/40" />
                </div>
              </div>
            ))}

            <div className="flex h-[62vh] w-[40vw] flex-shrink-0 flex-col items-center justify-center px-6 text-center md:w-[30vw]">
              <h3 className="mb-4 font-display text-3xl font-bold text-electric">
                Your project
                <br />
                <span className="text-mask-gradient">goes here</span>
              </h3>
              <p className="mb-6 font-mono text-sm text-chrome">
                The next manifestation could be yours.
              </p>
              <a
                href="#contact"
                className="rounded-full border border-plasma/30 px-6 py-3 font-mono text-sm text-electric transition-all hover:border-plasma/50 hover:bg-plasma/10"
              >
                Start a Project -&gt;
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 h-px w-48 -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-full origin-left bg-plasma"
          />
        </div>
      </div>
    </section>
  );
}
