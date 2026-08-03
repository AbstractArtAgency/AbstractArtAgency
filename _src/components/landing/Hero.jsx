import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void">
      <ParticleBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.08), transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-plasma animate-glow-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-chrome">
            Digital Architecture Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black tracking-tighter leading-[0.85] text-[16vw] md:text-[13vw] lg:text-[12vw]"
        >
          <span className="block text-mask-gradient text-glow">MANIFEST</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-lg md:text-xl text-chrome max-w-2xl mx-auto font-mono leading-relaxed"
        >
          We engineer impossible digital experiences—where raw code transmutes into
          living, breathing dimensions. No complexity is beyond our reach.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="group relative px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(139,92,246,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-plasma via-indigo-500 to-cyan-400 animate-gradient-shift" />
            <span className="relative z-10 text-white font-mono text-sm tracking-wide">
              Begin the Transmission
            </span>
          </a>
          <a
            href="#work"
            className="px-8 py-4 border border-white/15 text-electric rounded-full font-mono text-sm tracking-wide hover:border-plasma/50 hover:bg-white/5 transition-all duration-300"
          >
            View the Codex
          </a>
        </motion.div>

        {/* Floating code snippet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute hidden lg:block left-4 top-1/3 font-mono text-[10px] text-plasma/30 leading-relaxed text-left select-none"
        >
          <div>{'const manifest = (idea) =>'}</div>
          <div className="pl-3">{'{'}</div>
          <div className="pl-6">{'return reality(idea)'}</div>
          <div className="pl-3">{'}'}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute hidden lg:block right-4 top-1/3 font-mono text-[10px] text-cyan/30 leading-relaxed text-right select-none"
        >
          <div>{'function transcend() {'}</div>
          <div className="pr-3">{'await architect.execute()'}</div>
          <div>{'}'}</div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-chrome">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-plasma to-transparent overflow-hidden">
            <div className="w-full h-full bg-electric animate-scroll-line" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}