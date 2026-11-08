"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Megaphone,
  Menu,
  Minus,
  MonitorSmartphone,
  PenTool,
  Plus,
  Search,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import Button from "@/src/components/ui/Button";
import { capabilities } from "@/src/lib/capabilities";
import { ArrowUpRight, LogoMark } from "./Brand";
import TextLink from "@/src/components/ui/TextLink";

// ikony usług w mega menu i w menu mobilnym
const capabilityIcons: Record<string, LucideIcon> = {
  "strony-www": MonitorSmartphone,
  pozycjonowanie: Search,
  "kampanie-ads": Megaphone,
  branding: PenTool,
  "social-media": Users,
};

const shortcuts = [
  { label: "Realizacje", href: "/realisations" },
  { label: "O nas", href: "/about" },
  { label: "Kariera", href: "/careers" },
  { label: "Kontakt", href: "/contact" },
];

const links = [
  { label: "Możliwości", href: "/#capabilities" },
  { label: "Realizacje", href: "/realisations" },
  { label: "O nas", href: "/about" },
  { label: "Kontakt", href: "/contact" },
];

export default function Navbar() {
  // podstrony mają jasne tło, strona główna zaczyna się od ciemnego hero
  const light = usePathname() !== "/";
  const navRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  // krótkie opóźnienie zamknięcia, żeby kursor zdążył przejść z linku na panel
  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopDropdownOpen(true);
  };
  const closeDropdown = (delay = 120) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDesktopDropdownOpen(false), delay);
  };

  useEffect(() => {
    if (!desktopDropdownOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDesktopDropdownOpen(false);
    };
    document.addEventListener("keydown", handleKey);

    const handleOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDesktopDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [desktopDropdownOpen]);

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50"
      style={
        {
          "--nav-fg": light ? "#0e0907" : "#fff5e8",
          "--nav-bg": light ? "#ece8e1" : "#0e0907",
        } as React.CSSProperties
      }
    >
      <motion.nav
        aria-label="Główna nawigacja"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`px-gutter transition-[background-color,backdrop-filter] duration-500 ${
          scrolled || mobileOpen
            ? "bg-(--nav-bg)/92 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div
          className={`relative flex items-center justify-between gap-5 border-b border-(--nav-fg)/20 transition-[padding] duration-500 ${
            scrolled ? "py-3" : "pt-7 pb-5"
          }`}
        >
          <a href="/" className="flex items-center gap-3 text-(--nav-fg)">
            <LogoMark variant={light ? "ink" : "cream"} height={34} alt="AbstractArt" priority />
            <span className="text-[19px] font-bold tracking-[-0.01em]">AbstractArt</span>
          </a>

          <div className="hidden items-center gap-8 font-mono text-[13px] uppercase tracking-[0.06em] lg:flex">
            {links.map((link) =>
              link.label === "Możliwości" ? (
                <div
                  key={link.href}
                  ref={dropdownRef}
                  onMouseEnter={() => !isTouch && openDropdown()}
                  onMouseLeave={() => !isTouch && closeDropdown()}
                  onFocus={openDropdown}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeDropdown(0);
                  }}
                >
                  <TextLink
                    href={link.href}
                    hoverClassName="text-ember-light"
                    aria-haspopup="true"
                    aria-expanded={desktopDropdownOpen}
                    onClick={(event) => {
                      if (isTouch) {
                        event.preventDefault();
                        setDesktopDropdownOpen((prev) => !prev);
                      }
                    }}
                    className="inline-flex min-h-11 items-center text-(--nav-fg)"
                  >
                    {link.label}
                  </TextLink>

                  <CapabilitiesMenu
                    open={desktopDropdownOpen}
                    onNavigate={() => setDesktopDropdownOpen(false)}
                  />
                </div>
              ) : (
                <TextLink
                  key={link.href}
                  href={link.href}
                  hoverClassName="text-ember-light"
                  className="inline-flex min-h-11 items-center text-(--nav-fg)"
                >
                  {link.label}
                </TextLink>
              ),
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              href="/start-project"
              variant={light ? "dark" : "light"}
              size="sm"
              className="max-sm:hidden"
            >
              Rozpocznij projekt
              <ArrowUpRight />
            </Button>

            <button
              type="button"
              aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-(--nav-fg)/50 text-(--nav-fg) lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
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
              className="overflow-hidden lg:hidden"
            >
              <div className="flex flex-col py-2 font-mono text-[13px] uppercase tracking-[0.06em]">
                {links.map((link) =>
                  link.label === "Możliwości" ? (
                    <div key={link.href} className="border-b border-(--nav-fg)/15">
                      <button
                        type="button"
                        aria-expanded={mobileCapabilitiesOpen}
                        onClick={() => setMobileCapabilitiesOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between py-3 uppercase text-(--nav-fg)"
                      >
                        {link.label}
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-(--nav-fg)/40 text-(--nav-fg)">
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
                            <div className="flex flex-col pb-3 sm:grid sm:grid-cols-2 sm:gap-x-6">
                              {capabilities.map((item) => {
                                const Icon = capabilityIcons[item.slug] ?? MonitorSmartphone;
                                return (
                                  <a
                                    key={item.slug}
                                    href={`/capabilities/${item.slug}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex min-h-11 items-center gap-3 py-1 text-xs text-(--nav-fg)/80"
                                  >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-(--nav-fg)/20">
                                      <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                                    </span>
                                    {item.navLabel}
                                  </a>
                                );
                              })}
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
                      className="border-b border-(--nav-fg)/15 py-3 text-(--nav-fg)"
                    >
                      {link.label}
                    </a>
                  ),
                )}
                <Button
                  href="/start-project"
                  onClick={() => setMobileOpen(false)}
                  variant={light ? "dark" : "light"}
                  className="my-4 sm:hidden"
                >
                  Rozpocznij projekt
                  <ArrowUpRight />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}

const iconEase = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/**
 * Środek koła wypełnienia = punkt wejścia/wyjścia kursora, liczony względem ikony
 * (może leżeć poza nią — wtedy kolor napływa z tej strony). Średnica sięga najdalszego rogu ikony.
 */
function setIconFillOrigin(event: React.PointerEvent<HTMLElement>) {
  const icon = event.currentTarget.querySelector<HTMLElement>("[data-menu-icon]");
  if (!icon) return;
  const rect = icon.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const r = Math.max(
    Math.hypot(x, y),
    Math.hypot(rect.width - x, y),
    Math.hypot(x, rect.height - y),
    Math.hypot(rect.width - x, rect.height - y),
  );
  icon.style.setProperty("--btn-x", `${x}px`);
  icon.style.setProperty("--btn-y", `${y}px`);
  icon.style.setProperty("--btn-d", `${Math.ceil(r * 2)}px`);
}

/** Kwadratowa ikona z hoverem jak przyciski social w stopce (wypełnienie kołem od kursora + podmiana ikony). */
function MenuIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      data-menu-icon=""
      className="relative isolate flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-(--nav-fg)/20 text-(--nav-fg) transition-colors duration-500 group-hover/cap:border-(--nav-fg) group-focus-visible/cap:border-(--nav-fg)"
    >
      <span
        aria-hidden="true"
        style={{
          left: "var(--btn-x, 50%)",
          top: "var(--btn-y, 50%)",
          width: "var(--btn-d, 300%)",
          height: "var(--btn-d, 300%)",
        }}
        className={`pointer-events-none absolute -z-1 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-(--nav-fg) transition-transform duration-700 ${iconEase} group-hover/cap:scale-100 group-focus-visible/cap:scale-100 motion-reduce:transition-none`}
      />
      <span className="relative block">
        <span
          className={`flex transition-[translate,opacity] duration-500 ${iconEase} group-hover/cap:translate-y-1.5 group-hover/cap:opacity-0 group-focus-visible/cap:translate-y-1.5 group-focus-visible/cap:opacity-0 motion-reduce:transition-none`}
        >
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-0 flex -translate-y-1.5 text-(--nav-bg) opacity-0 transition-[translate,opacity] duration-500 ${iconEase} group-hover/cap:translate-y-0 group-hover/cap:opacity-100 group-focus-visible/cap:translate-y-0 group-focus-visible/cap:opacity-100 motion-reduce:transition-none`}
        >
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        </span>
      </span>
    </span>
  );
}

/**
 * Panel „Możliwości” na desktopie: usługi z opisami po lewej, skróty i CTA po prawej.
 * Zamknięty panel ma pointer-events-none — podczas wygaszania nie łapie już kursora,
 * więc powrót myszką w jego miejsce nie otwiera menu ponownie.
 */
function CapabilitiesMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <div
      className={`absolute inset-x-0 top-full z-10 pt-3 font-sans normal-case tracking-normal transition-[opacity,translate,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="grid max-h-[calc(100svh-var(--header-height,96px)-24px)] overflow-y-auto overscroll-contain border border-(--nav-fg)/15 bg-(--nav-bg) text-(--nav-fg) shadow-[0_40px_80px_rgba(0,0,0,0.35)] lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="p-6 xl:p-8">
          <p className="m-0 mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-(--nav-fg)/55">
            Możliwości
          </p>
          <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-1 p-0 xl:gap-x-8">
            {capabilities.map((item) => {
              const Icon = capabilityIcons[item.slug] ?? MonitorSmartphone;
              return (
                <li key={item.slug}>
                  <a
                    href={`/capabilities/${item.slug}`}
                    onClick={onNavigate}
                    onPointerEnter={setIconFillOrigin}
                    onPointerLeave={setIconFillOrigin}
                    className="group/cap -mx-3 flex gap-4 p-3 transition-colors duration-300 hover:bg-(--nav-fg)/5 focus-visible:bg-(--nav-fg)/5"
                  >
                    <MenuIcon icon={Icon} />
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="flex items-baseline gap-2 text-[15px] font-semibold leading-tight">
                        {item.navLabel}
                      </span>
                      <span className="line-clamp-2 text-[13px] leading-snug text-(--nav-fg)/60">{item.desc}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-6 border-l border-(--nav-fg)/15 bg-(--nav-fg)/3 p-6 xl:p-8">
          <div>
            <p className="m-0 mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-(--nav-fg)/55">Nawigacja</p>
            <ul className="m-0 grid list-none grid-cols-2 gap-x-4 p-0">
              {shortcuts.map((item) => (
                <li key={item.href}>
                  <TextLink
                    href={item.href}
                    hoverClassName="text-ember-light"
                    onClick={onNavigate}
                    className="inline-flex min-h-10 items-center text-[15px] font-medium"
                  >
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA w stylu ciemnych kafli strony: nagłówek wersalikami z czerwonym podświetleniem */}
          <div className="mt-auto flex flex-col items-start gap-5 rounded-[14px] bg-coal p-5 text-bone xl:p-6">
            <span aria-hidden="true" className="h-[3px] w-8 bg-ember" />
            <div className="flex flex-col gap-2.5">
              <span className="font-display text-xl font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em] xl:text-2xl">
                Nie wiesz, od czego{" "}
                <span className="bg-ember px-[0.06em] [box-decoration-break:clone]">zacząć?</span>
              </span>
              <span className="text-[13px] leading-snug text-bone/70">
                Porozmawiajmy i opracujmy strategie rozwoju Twojej firmy.
              </span>
            </div>
            <Button href="/contact" variant="primary" size="sm" onClick={onNavigate}>
              Umów rozmowę
              <ArrowUpRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
