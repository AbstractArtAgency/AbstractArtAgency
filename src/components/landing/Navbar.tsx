"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { capabilities } from "@/src/lib/capabilities";

const links = [
  { label: "Możliwości", href: "/#capabilities" },
  { label: "Realizacje", href: "/realisations" },
  { label: "O nas", href: "/about" },
  { label: "Kontakt", href: "/contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCapabilitiesOpen, setMobileCapabilitiesOpen] = useState(false);

  useEffect(() => {
    const syncHeaderHeight = () => {
      if (!navRef.current) return;
      document.documentElement.style.setProperty(
        "--header-height",
        `${navRef.current.getBoundingClientRect().height}px`,
      );
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      requestAnimationFrame(syncHeaderHeight);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, []);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!desktopDropdownOpen) return;

    const handleOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDesktopDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [desktopDropdownOpen]);

  return (
    <header ref={navRef} className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-cream/85 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-cream/60 py-5 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="/" className="group flex items-center gap-2.5">
            <Image
              src="/AbstractArt_logo.png"
              alt="AbstractArt"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              priority
            />
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              <span className="font-accent italic font-black tracking-wider">AbstractArt</span><span className="text-ember">.</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) =>
              link.label === "Możliwości" ? (
                <div
                  key={link.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => !isTouch && setDesktopDropdownOpen(true)}
                  onMouseLeave={() => !isTouch && setDesktopDropdownOpen(false)}
                >
                  <a
                    href={link.href}
                    onClick={(event) => {
                      if (isTouch) {
                        event.preventDefault();
                        setDesktopDropdownOpen((prev) => !prev);
                      }
                    }}
                    className="group relative px-4 py-2 font-mono text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-ember transition-all duration-300 group-hover:w-10/12" />
                  </a>

                  <div
                    className={`absolute left-1/2 top-full w-56 pt-3 transition-all duration-300 ${
                      desktopDropdownOpen
                        ? "visible opacity-100 transform-[translate(-50%,0)]"
                        : "invisible opacity-0 transform-[translate(-50%,-8px)]"
                    }`}
                  >
                    <div className="divide-y divide-line overflow-hidden border border-line bg-cream/95 shadow-xl backdrop-blur-xl">
                      {capabilities.map((item) => (
                        <a
                          key={item.slug}
                          href={`/capabilities/${item.slug}`}
                          onClick={() => setDesktopDropdownOpen(false)}
                          className="block px-5 py-3 text-center font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors duration-200 hover:text-ember"
                        >
                          {item.navLabel}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative px-4 py-2 font-mono text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-ember transition-all duration-300 group-hover:w-10/12" />
                </a>
              ),
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/start-project"
              className="group relative overflow-hidden rounded-lg bg-ink px-5 py-2.5 font-mono text-sm text-cream"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10">Rozpocznij projekt →</span>
            </a>

            <button
              type="button"
              aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-ink lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-line lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col px-6 py-2">
                {links.map((link) =>
                  link.label === "Możliwości" ? (
                    <div key={link.href} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => setMobileCapabilitiesOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between py-3 font-mono text-sm text-ink-soft"
                      >
                        {link.label}
                        <span className="flex h-7 w-7 items-center justify-center border border-line text-stone">
                          {mobileCapabilitiesOpen ? (
                            <Minus className="h-3.5 w-3.5" />
                          ) : (
                            <Plus className="h-3.5 w-3.5" />
                          )}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileCapabilitiesOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pb-3 pl-2">
                              {capabilities.map((item) => (
                                <a
                                  key={item.slug}
                                  href={`/capabilities/${item.slug}`}
                                  onClick={() => setMobileOpen(false)}
                                  className="py-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft/80"
                                >
                                  {item.navLabel}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="border-b border-line py-3 font-mono text-sm text-ink-soft"
                    >
                      {link.label}
                    </a>
                  ),
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
