"use client";

import { motion } from "framer-motion";
import { BarChart3, Boxes, BrainCircuit, Sparkles, Wind, Zap } from "lucide-react";

const capabilities = [
  {
    icon: Boxes,
    title: "WebGL & 3D Engines",
    desc: "We sculpt light into geometry. Real-time rendering, particle systems, and physics simulations that run at 60fps in any browser.",
    code: 'import * as THREE from "three"\nnew Engine({ realtime: true })',
  },
  {
    icon: Sparkles,
    title: "Generative Systems",
    desc: "Algorithms that paint themselves. Procedural content, parametric design, and self-evolving interfaces that never repeat.",
    code: "generate({ seed: Math.random() })\n// -> infinite variations",
  },
  {
    icon: Wind,
    title: "Motion Architecture",
    desc: "Choreographed physics. Every transition is a designed experience - spring-based, buttery, and purposeful.",
    code: "animate({ tension: 170, friction: 26 })",
  },
  {
    icon: BarChart3,
    title: "Data Visualization",
    desc: "Chaos, rendered legible. We transform millions of data points into living, breathing visual narratives.",
    code: "render(data, { live: true, depth: 3 })",
  },
  {
    icon: Zap,
    title: "Edge Computing",
    desc: "Logic at the speed of light. Distributed systems, serverless architecture, and sub-millisecond responses globally.",
    code: 'edge.deploy({ regions: "all" })',
  },
  {
    icon: BrainCircuit,
    title: "AI Integration",
    desc: "Neural orchestration. We embed intelligence into every pixel - predictive, adaptive, and eerily human.",
    code: 'neural.connect({ model: "v4" })',
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative overflow-hidden bg-void py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-plasma">
            / 01 - Capabilities
          </span>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-electric md:text-6xl">
            Complexity is our <span className="text-mask-gradient">playground</span>
          </h2>
          <p className="mt-6 max-w-2xl font-mono text-lg text-chrome">
            Every project is a descent into the unknown. We bring order to chaos,
            structure to imagination, and architecture to the impossible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;

            return (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-panel group relative cursor-default rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "0 0 40px rgba(139,92,246,0.15), inset 0 0 30px rgba(139,92,246,0.05)",
                  }}
                />

                <div className="relative">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-plasma/20 bg-plasma/10 transition-all duration-500 group-hover:border-plasma/40 group-hover:bg-plasma/20">
                    <Icon className="h-6 w-6 text-plasma" />
                  </div>

                  <h3 className="mb-3 font-display text-xl font-bold text-electric">
                    {capability.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-chrome">
                    {capability.desc}
                  </p>

                  <div className="overflow-x-auto rounded-lg border border-white/5 bg-void/60 p-3 font-mono text-[10px] leading-relaxed text-plasma/50">
                    <pre className="whitespace-pre">{capability.code}</pre>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
