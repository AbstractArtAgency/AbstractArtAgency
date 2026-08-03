"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We map the impossible. Deep-dive into your vision, constraints, and the physics of what can be built.",
  },
  {
    num: "02",
    title: "Architecture",
    desc: "Blueprints drawn in logic. System design, data flow, and technology selection calibrated to your exact needs.",
  },
  {
    num: "03",
    title: "Manifestation",
    desc: "Code becomes reality. Iterative builds, continuous delivery, and obsessive attention to every pixel and millisecond.",
  },
  {
    num: "04",
    title: "Transcendence",
    desc: "Launch is the beginning. We monitor, optimize, and evolve - your system gets smarter with every interaction.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-void py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.06), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-plasma">
            / 02 - Process
          </span>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-electric md:text-6xl">
            From chaos to <span className="text-mask-gradient">order</span>
          </h2>
        </motion.div>

        <div className="relative">
          <svg
            className="pointer-events-none absolute left-0 top-0 hidden h-full w-full lg:block"
            preserveAspectRatio="none"
            viewBox="0 0 1200 600"
            aria-hidden="true"
          >
            <path
              d="M 100 80 Q 400 40 600 200 T 1100 300 Q 600 400 100 520"
              fill="none"
              stroke="url(#thread-gradient)"
              strokeDasharray="4 6"
              strokeWidth="1"
              className="opacity-40"
            />
            <defs>
              <linearGradient id="thread-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative"
              >
                <div className="mb-4 font-mono text-5xl font-bold text-plasma/20">
                  {step.num}
                </div>
                <div className="mb-6 h-3 w-3 rounded-full bg-plasma shadow-[0_0_20px_rgba(139,92,246,0.6)]" />
                <h3 className="mb-3 font-display text-2xl font-bold text-electric">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-chrome">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
