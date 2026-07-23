"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send, Terminal } from "lucide-react";

function stringToHue(value: string) {
  if (!value) return 258;

  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const hue = stringToHue(name);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 4000);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center overflow-hidden bg-void py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 30% 50%, hsl(${hue}, 80%, 15%), transparent 50%)`,
        }}
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-10" />

      <div className="relative mx-auto w-full max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-plasma">
            / 04 - Synchronization
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-electric md:text-6xl">
            Let&apos;s build the <span className="text-mask-gradient">impossible</span>
          </h2>
          <p className="mt-6 max-w-xl font-mono text-lg text-chrome">
            Type below. The ambient light shifts to your unique signature. Tell us what
            you want to manifest.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass-panel mt-12 overflow-hidden rounded-2xl"
        >
          <div className="flex items-center gap-2 border-b border-white/5 bg-void/50 px-6 py-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="ml-3 flex items-center gap-2 font-mono text-xs text-chrome">
              <Terminal className="h-3.5 w-3.5" />
              abstractart@studio:~$
            </div>
            <div
              className="ml-auto h-3 w-3 rounded-full transition-colors duration-500"
              style={{ backgroundColor: `hsl(${hue}, 70%, 60%)` }}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-chrome">
                {"> "}Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-void/60 px-4 py-3 font-mono text-sm text-electric transition-colors focus:border-plasma focus:outline-none"
                placeholder="Enter your name..."
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-chrome">
                {"> "}Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-void/60 px-4 py-3 font-mono text-sm text-electric transition-colors focus:border-plasma focus:outline-none"
                placeholder="you@domain.com"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-chrome">
                {"> "}The Vision
              </label>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                rows={4}
                className="w-full resize-none rounded-lg border border-white/10 bg-void/60 px-4 py-3 font-mono text-sm text-electric transition-colors focus:border-plasma focus:outline-none"
                placeholder="Describe what you want to manifest..."
              />
            </div>

            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-lg px-8 py-4 font-mono text-sm text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 md:w-auto"
              style={{
                background: `linear-gradient(135deg, hsl(${hue}, 70%, 50%), #8b5cf6)`,
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {submitted ? "Transmission Received" : "Send Transmission"}
                {!submitted && (
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </span>
            </button>
          </form>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center gap-8 font-mono text-sm text-chrome">
          <a
            href="mailto:hello@abstractart.studio"
            className="transition-colors hover:text-electric"
          >
            hello@abstractart.studio
          </a>
          <span className="text-white/10">|</span>
          <span>Remote - Worldwide</span>
          <span className="text-white/10">|</span>
          <span>Available Q3 2026</span>
        </div>
      </div>
    </section>
  );
}
