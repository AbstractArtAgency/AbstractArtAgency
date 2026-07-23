import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Process', href: '#process' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 backdrop-blur-2xl bg-void/70 border-b border-white/5'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 border-2 border-plasma rounded-sm rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
            <div className="absolute inset-1.5 bg-plasma/40 rounded-sm rotate-45 group-hover:rotate-[135deg] transition-transform duration-700 blur-sm" />
            <div className="absolute inset-2.5 bg-electric rounded-sm rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
          </div>
          <span className="font-display font-bold tracking-tight text-electric text-lg">
            AbstractArt<span className="text-plasma">.</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-mono text-chrome hover:text-electric transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-plasma group-hover:w-1/2 transition-all duration-300" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="group relative px-5 py-2.5 text-sm font-mono text-electric border border-white/10 rounded-full overflow-hidden hover:border-plasma/50 transition-all duration-300"
        >
          <span className="relative z-10">Start a Project →</span>
          <div className="absolute inset-0 bg-plasma/0 group-hover:bg-plasma/20 transition-colors duration-300" />
        </a>
      </div>
    </motion.nav>
  );
}