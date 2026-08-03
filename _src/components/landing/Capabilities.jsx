import { motion } from 'framer-motion';
import {
  Boxes,
  Sparkles,
  Wind,
  BarChart3,
  Zap,
  BrainCircuit,
} from 'lucide-react';

const capabilities = [
  {
    icon: Boxes,
    title: 'WebGL & 3D Engines',
    desc: 'We sculpt light into geometry. Real-time rendering, particle systems, and physics simulations that run at 60fps in any browser.',
    code: 'import * as THREE from "three"\nnew Engine({ realtime: true })',
  },
  {
    icon: Sparkles,
    title: 'Generative Systems',
    desc: 'Algorithms that paint themselves. Procedural content, parametric design, and self-evolving interfaces that never repeat.',
    code: 'generate({ seed: Math.random() })\n// → infinite variations',
  },
  {
    icon: Wind,
    title: 'Motion Architecture',
    desc: 'Choreographed physics. Every transition is a designed experience—spring-based, buttery, and purposeful.',
    code: 'animate({ tension: 170, friction: 26 })',
  },
  {
    icon: BarChart3,
    title: 'Data Visualization',
    desc: 'Chaos, rendered legible. We transform millions of data points into living, breathing visual narratives.',
    code: 'render(data, { live: true, depth: 3 })',
  },
  {
    icon: Zap,
    title: 'Edge Computing',
    desc: 'Logic at the speed of light. Distributed systems, serverless architecture, and sub-millisecond responses globally.',
    code: 'edge.deploy({ regions: "all" })',
  },
  {
    icon: BrainCircuit,
    title: 'AI Integration',
    desc: 'Neural orchestration. We embed intelligence into every pixel—predictive, adaptive, and eerily human.',
    code: 'neural.connect({ model: "v4" })',
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-32 bg-void overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-plasma">
            / 01 — Capabilities
          </span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl tracking-tight text-electric max-w-3xl">
            Complexity is our <span className="text-mask-gradient">playground</span>
          </h2>
          <p className="mt-6 text-chrome text-lg font-mono max-w-2xl">
            Every project is a descent into the unknown. We bring order to chaos,
            structure to imagination, and architecture to the impossible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative glass-panel rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 cursor-default"
            >
              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 40px rgba(139,92,246,0.15), inset 0 0 30px rgba(139,92,246,0.05)' }}
              />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-plasma/10 border border-plasma/20 flex items-center justify-center mb-6 group-hover:bg-plasma/20 group-hover:border-plasma/40 transition-all duration-500">
                  <cap.icon className="w-6 h-6 text-plasma" />
                </div>

                <h3 className="font-display font-bold text-xl text-electric mb-3">
                  {cap.title}
                </h3>
                <p className="text-chrome text-sm leading-relaxed mb-6">
                  {cap.desc}
                </p>

                <div className="font-mono text-[10px] text-plasma/50 leading-relaxed bg-void/60 rounded-lg p-3 border border-white/5 overflow-x-auto">
                  <pre className="whitespace-pre">{cap.code}</pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}