"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "200+", label: "Projects Manifested" },
  { value: "47", label: "Awards Collected" },
  { value: "99.9%", label: "Uptime Guaranteed" },
  { value: "∞", label: "Possibilities" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-void py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-mask-gradient mb-2 font-display text-5xl font-black md:text-7xl">
                {stat.value}
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-chrome">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
