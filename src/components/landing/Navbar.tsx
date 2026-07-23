"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-void/70 py-3 backdrop-blur-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-2.5">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rotate-45 rounded-sm border-2 border-plasma transition-transform duration-700 group-hover:rotate-[135deg]" />
            <div className="absolute inset-1.5 rotate-45 rounded-sm bg-plasma/40 blur-sm transition-transform duration-700 group-hover:rotate-[135deg]" />
            <div className="absolute inset-2.5 rotate-45 rounded-sm bg-electric transition-transform duration-700 group-hover:rotate-[135deg]" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-electric">
            AbstractArt<span className="text-plasma">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative px-4 py-2 font-mono text-sm text-chrome transition-colors duration-300 hover:text-electric"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-plasma transition-all duration-300 group-hover:w-1/2" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="group relative overflow-hidden rounded-full border border-white/10 px-5 py-2.5 font-mono text-sm text-electric transition-all duration-300 hover:border-plasma/50"
        >
          <span className="relative z-10">Start a Project -&gt;</span>
          <div className="absolute inset-0 bg-plasma/0 transition-colors duration-300 group-hover:bg-plasma/20" />
        </a>
      </div>
    </motion.nav>
  );
}
