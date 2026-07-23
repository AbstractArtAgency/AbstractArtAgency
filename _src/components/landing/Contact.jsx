import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal } from 'lucide-react';

function stringToHue(str) {
  if (!str) return 258;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const hue = stringToHue(name);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center py-32 bg-void overflow-hidden">
      {/* Dynamic ambient light based on name input */}
      <div
        className="absolute inset-0 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 50%, hsl(${hue}, 80%, 15%), transparent 50%)`,
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-plasma">
            / 04 — Synchronization
          </span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl tracking-tight text-electric max-w-2xl">
            Let's build the <span className="text-mask-gradient">impossible</span>
          </h2>
          <p className="mt-6 text-chrome text-lg font-mono max-w-xl">
            Type below. The ambient light shifts to your unique signature.
            Tell us what you want to manifest.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 glass-panel rounded-2xl overflow-hidden"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5 bg-void/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="flex items-center gap-2 ml-3 text-xs font-mono text-chrome">
              <Terminal className="w-3.5 h-3.5" />
              abstractart@studio:~$
            </div>
            <div
              className="ml-auto w-3 h-3 rounded-full transition-colors duration-500"
              style={{ backgroundColor: `hsl(${hue}, 70%, 60%)` }}
            />
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-chrome mb-2">
                {'> '}Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-void/60 border border-white/10 rounded-lg px-4 py-3 text-electric font-mono text-sm focus:border-plasma focus:outline-none transition-colors"
                placeholder="Enter your name..."
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-chrome mb-2">
                {'> '}Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-void/60 border border-white/10 rounded-lg px-4 py-3 text-electric font-mono text-sm focus:border-plasma focus:outline-none transition-colors"
                placeholder="you@domain.com"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-chrome mb-2">
                {'> '}The Vision
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full bg-void/60 border border-white/10 rounded-lg px-4 py-3 text-electric font-mono text-sm focus:border-plasma focus:outline-none transition-colors resize-none"
                placeholder="Describe what you want to manifest..."
              />
            </div>

            <button
              type="submit"
              className="group relative w-full md:w-auto px-8 py-4 rounded-lg font-mono text-sm text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              style={{
                background: `linear-gradient(135deg, hsl(${hue}, 70%, 50%), #8B5CF6)`,
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {submitted ? 'Transmission Received ✓' : 'Send Transmission'}
                {!submitted && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center gap-8 text-sm font-mono text-chrome">
          <a href="mailto:hello@abstractart.studio" className="hover:text-electric transition-colors">
            hello@abstractart.studio
          </a>
          <span className="text-white/10">|</span>
          <span>Remote · Worldwide</span>
          <span className="text-white/10">|</span>
          <span>Available Q3 2026</span>
        </div>
      </div>
    </section>
  );
}