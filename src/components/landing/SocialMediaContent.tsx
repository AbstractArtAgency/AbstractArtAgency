"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Play,
  Send,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import CapabilityIntro from "@/src/components/landing/CapabilityIntro";
import CalloutItem from "@/src/components/landing/CalloutItem";
import Contact from "@/src/components/landing/Contact";
import StatementHeadline from "@/src/components/landing/StatementHeadline";
import MobileCalloutPairs from "@/src/components/landing/MobileCalloutPairs";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";

type Callout = {
  title: string;
  desc: string;
};

type Post = {
  profile: Callout;
  left: Callout;
  right: Callout;
};

const staticRight: Callout = {
  title: "Nazwa konta i bio",
  desc: "Buduje wiarygodność i ułatwia rozpoznanie marki w wynikach wyszukiwania.",
};

const posts: Post[] = [
  {
    profile: {
      title: "Zdjęcie profilowe",
      desc: "Widoczne przy każdym poście. Pokazuje spójność marki i konta.",
    },
    left: {
      title: "Przyciągnięcie uwagi",
      desc: "Wysokiej jakości grafika przyciąga uwagę w ułamku sekundy.",
    },
    right: {
      title: "Reakcje i komentarze",
      desc: "Polubienia i komentarze pokazują społeczny dowód zaufania.",
    },
  },
  {
    profile: {
      title: "Rolka / video",
      desc: "Krótka forma wideo zwiększa zasięgi i czas spędzony na profilu.",
    },
    left: {
      title: "Dobry hook",
      desc: "Każe video potrzebuje dobrego hooka, który przyciągnie uwagę.",
    },
    right: {
      title: "Napisy w video",
      desc: "Podpowiadają kontekst nawet bez włączonego dźwięku.",
    },
  },
  {
    profile: {
      title: "Ciągłość wizerunku",
      desc: "Utrzymuje spójny styl marki w całym feedzie.",
    },
    left: {
      title: "Karuzela",
      desc: "Wiele slajdów wydłuża czas interakcji i angażuje odbiorcę.",
    },
    right: {
      title: "Dobry opis",
      desc: "Jest często dopełnieniem lub dopowiedzeniem treści w poście.",
    },
  },
  {
    profile: {
      title: "Post sponsorowany",
      desc: "Promowane i targetowane posty docierające do nowych odbiorców.",
    },
    left: {
      title: "Powtarzalność",
      desc: "Uytkownik widzi tą samą reklamę parę razy. Zwiększa to szansę na jego działanie.",
    },
    right: {
      title: "Przycisk akcji",
      desc: "Zamienia obserwujących w klientów.",
    },
  },
];

function StoryAvatar({
  onClick,
  size = "h-6 w-6",
}: {
  onClick?: () => void;
  size?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Zobacz Instagram Stories"
      className="relative shrink-0 cursor-pointer"
    >
      <span className="absolute -inset-1.5 animate-pulse rounded-full bg-linear-to-br from-ember via-ember-light to-ember" />
      <span className="absolute -inset-0.5 rounded-full bg-cream" />
      <span
        className={`relative block ${size} rounded-full bg-linear-to-br from-ember to-ember-light`}
      />
    </button>
  );
}

function MockAppHeader({ onAvatarClick }: { onAvatarClick?: () => void }) {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between border-b border-line bg-cream px-4">
      <div className="flex items-center gap-2">
        <StoryAvatar onClick={onAvatarClick} />
        <span className="font-display text-xs font-bold text-ink">AbstractArt</span>
      </div>
      <div className="flex items-center gap-3">
        <Heart className="h-4 w-4 text-ink-soft" />
        <Send className="h-4 w-4 text-ink-soft" />
      </div>
    </div>
  );
}

function PostProduct() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="h-5 w-5 shrink-0 rounded-full bg-ember/30" />
        <span className="font-mono text-[8px] font-bold text-ink">AbstractArt</span>
      </div>
      <div className="flex-1 bg-linear-to-br from-ember/20 via-cream-dim to-paper" />
      <div className="flex items-center gap-3 px-3 py-1.5">
        <Heart className="h-3.5 w-3.5 text-ink" />
        <MessageCircle className="h-3.5 w-3.5 text-ink" />
        <Send className="h-3.5 w-3.5 text-ink" />
      </div>
      <p className="px-3 pb-2 font-mono text-[7px] leading-relaxed text-ink-soft">
        <span className="font-bold text-ink">AbstractArt</span> Nowy projekt gotowy do wdrożenia ✨
      </p>
    </div>
  );
}

function PostReel() {
  return (
    <div className="relative flex h-full items-center justify-center bg-coal">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bone/15">
        <Play className="h-4 w-4 fill-bone text-bone" />
      </div>
      <span className="absolute bottom-3 left-3 font-mono text-[7px] text-bone">
        Kulisy projektu 🎬
      </span>
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
        <Heart className="h-3.5 w-3.5 text-bone" />
        <MessageCircle className="h-3.5 w-3.5 text-bone" />
        <Send className="h-3.5 w-3.5 text-bone" />
      </div>
    </div>
  );
}

const CAROUSEL_SLIDES = 5;

function PostCarousel() {
  const [slide, setSlide] = useState(0);

  const prev = () => setSlide((s) => (s - 1 + CAROUSEL_SLIDES) % CAROUSEL_SLIDES);
  const next = () => setSlide((s) => (s + 1) % CAROUSEL_SLIDES);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="h-5 w-5 shrink-0 rounded-full bg-ember/30" />
        <span className="font-mono text-[8px] font-bold text-ink">AbstractArt</span>
      </div>
      <div className="relative flex-1 overflow-hidden bg-linear-to-br from-cream-dim via-paper to-ember/15">
        {/* in the future: real photo per slide index (`slide`) */}
        <div className="absolute right-2 top-2 rounded-full bg-ink/70 px-1.5 py-0.5 font-mono text-[6px] text-cream">
          {slide + 1}/{CAROUSEL_SLIDES}
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Poprzednie zdjęcie"
          className="absolute left-1.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-cream transition-colors hover:bg-ink/70"
        >
          <ChevronLeft className="h-3 w-3" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Następne zdjęcie"
          className="absolute right-1.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-cream transition-colors hover:bg-ink/70"
        >
          <ChevronRight className="h-3 w-3" />
        </button>

        <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1">
          {Array.from({ length: CAROUSEL_SLIDES }).map((_, i) => (
            <span
              key={i}
              className={`h-1 w-1 rounded-full transition-colors ${
                i === slide ? "bg-ink" : "bg-ink/25"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 px-3 py-1.5">
        <Heart className="h-3.5 w-3.5 text-ink" />
        <MessageCircle className="h-3.5 w-3.5 text-ink" />
        <Send className="h-3.5 w-3.5 text-ink" />
      </div>
      <p className="px-3 pb-2 font-mono text-[7px] leading-relaxed text-ink-soft">
        <span className="font-bold text-ink">AbstractArt</span> Case study: +240% ruchu w 3 miesiące →
      </p>
    </div>
  );
}

function PostCta() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="h-5 w-5 shrink-0 rounded-full bg-ember/30" />
        <div>
          <span className="block font-mono text-[8px] font-bold text-ink">AbstractArt</span>
          <span className="block font-mono text-[6px] text-stone">Sponsorowane</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-linear-to-br from-ember/10 via-cream to-paper px-6 text-center">
        <span className="font-display text-sm font-bold text-ink sm:text-base">
          Link w bio →
        </span>
        <span className="rounded-md bg-ember px-3 py-1.5 font-mono text-[8px] text-bone">
          Umów konsultację
        </span>
      </div>
      <div className="flex items-center gap-3 px-3 py-1.5">
        <Heart className="h-3.5 w-3.5 text-ink" />
        <MessageCircle className="h-3.5 w-3.5 text-ink" />
        <Send className="h-3.5 w-3.5 text-ink" />
      </div>
      <p className="px-3 pb-2 font-mono text-[7px] leading-relaxed text-ink-soft">
        <span className="font-bold text-ink">AbstractArt</span> Umów rozmowę i zacznij pozyskiwać klientów z social mediów 🚀
      </p>
    </div>
  );
}

function StoryOverlay({ onClose }: { onClose: () => void }) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setFilled(true));
    const timer = window.setTimeout(onClose, 5000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-20 overflow-hidden bg-coal"
    >
      {/* progress bar */}
      <div className="absolute inset-x-2 top-2 z-10 flex gap-1">
        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-bone/30">
          <div
            className="h-full bg-bone"
            style={{
              width: filled ? "100%" : "0%",
              transition: "width 5000ms linear",
            }}
          />
        </div>
      </div>

      {/* header */}
      <div className="absolute inset-x-0 top-5 z-10 flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 shrink-0 rounded-full bg-linear-to-br from-ember to-ember-light ring-2 ring-bone/40" />
          <span className="font-mono text-[9px] font-bold text-bone">AbstractArt</span>
          <span className="font-mono text-[8px] text-bone/60">teraz</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Zamknij Stories"
          className="text-bone/80 transition-colors hover:text-bone"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* story content */}
      <div className="flex h-full items-center justify-center bg-linear-to-br from-ember/40 via-coal to-coal px-8 text-center">
        <p className="font-display text-base font-bold leading-snug text-bone">
          Kulisy pracy nad projektem 👀
        </p>
      </div>
    </motion.div>
  );
}

const postComponents = [PostProduct, PostReel, PostCarousel, PostCta];

export default function SocialMediaContent() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const progress = useMotionValue(0);
  const [activePost, setActivePost] = useState(0);
  const [postHeight, setPostHeight] = useState(0);
  const [storiesOpen, setStoriesOpen] = useState(false);
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" }));
    update();
    const id = window.setInterval(update, 30000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const unsubscribe = progress.on("change", (p) => {
      const idx = Math.min(
        posts.length - 1,
        Math.max(0, Math.round(p * (posts.length - 1))),
      );
      setActivePost(idx);
    });
    return unsubscribe;
  }, [progress]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const getNavHeight = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(
        "--header-height",
      );
      const parsed = parseFloat(raw);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const calc = () => {
      const rect = el.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || 0;
      const start = rect.top + scrollTop - getNavHeight();
      const end = start + el.offsetHeight - window.innerHeight;
      return { start, end };
    };

    let bounds = calc();

    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      const p = (y - bounds.start) / (bounds.end - bounds.start);
      progress.set(Math.max(0, Math.min(1, p)));
    };

    const measure = () => {
      if (viewportRef.current) setPostHeight(viewportRef.current.clientHeight);
    };

    const onResize = () => {
      bounds = calc();
      measure();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [progress]);

  const translateY = useTransform(
    progress,
    (p) => -(p * (posts.length - 1) * postHeight),
  );

  return (
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />

      {/* (01) intro */}
      <CapabilityIntro
        slug="social-media"
        eyebrow="Social media"
        word="Marketing"
        note="więcej zasięgu ↗"
        highlight="Ty zajmujesz się swoim biznesem, a my jego widocznością w sieci."
        description="Opracowujemy i wdrażamy strategie prowadzenia profili w mediach społecznościowych, które budują zaangażowaną wokół marki. Planujemy publikacje, przygotowujemy zdjęcia i video, rolki i teksty, moderujemy komentarze i analizujemy wyniki. Ty zajmujesz się swoim biznesem, a my jego widocznością w sieci."
      />

      {/* (02) demo */}
      <section className="relative border-t border-line bg-cream-dim bg-paper-grain bg-size-[256px_256px] bg-fixed py-20 md:py-28">
        <div className="bg-grid bg-size-[44px_44px] bg-fixed pointer-events-none absolute inset-0 opacity-10" />

        <div className="relative mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <StatementHeadline
              note="przewiń ↓"
              lines={[
                { parts: ["Zobacz jak"] },
                { indent: 1, parts: ["powstaje ", { brush: "dobry" }] },
                { parts: ["feed w social"] },
                { indent: 2, parts: [{ accent: "mediach." }] },
              ]}
            />
          </motion.div>

          {/* desktop: scroll-synced app feed with side callouts */}
          <div ref={trackRef} className="relative mt-12 md:mt-16" style={{ height: "420vh" }}>
            <div className="sticky top-[var(--header-height,96px)] flex h-[calc(100vh-var(--header-height,96px))] items-center">
              <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-[190px_minmax(0,1fr)_190px] md:gap-4 lg:grid-cols-[240px_minmax(0,1fr)_240px] lg:gap-6">
                {/* left column */}
                <div className="hidden flex-col gap-12 md:flex">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`profile-${activePost}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CalloutItem callout={posts[activePost].profile} side="left" />
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePost}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CalloutItem callout={posts[activePost].left} side="left" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* phone/app mockup */}
                <div className="mx-auto w-full max-w-[min(30vw,420px)] max-md:w-11/12 max-md:max-w-none">
                  <div
                    className="relative overflow-hidden rounded-2xl border border-line bg-paper shadow-xl"
                    style={{ aspectRatio: "9 / 16" }}
                  >
                    {/* status bar */}
                    <div className="absolute inset-x-0 top-0 z-10 flex h-6 items-center justify-between border-b border-line bg-paper px-4">
                      <span className="font-mono text-[8px] text-ink">{time}</span>
                      <div className="flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-ink/50" />
                        <span className="h-1 w-1 rounded-full bg-ink/50" />
                        <span className="h-1 w-1 rounded-full bg-ink/50" />
                      </div>
                    </div>

                    {/* fixed app header */}
                    <div className="absolute inset-x-0 top-6 z-10">
                      <MockAppHeader onAvatarClick={() => setStoriesOpen(true)} />
                    </div>

                    {/* clipped scrolling feed */}
                    <div
                      ref={viewportRef}
                      className="absolute inset-x-0 bottom-0 overflow-hidden bg-cream"
                      style={{ top: "4.25rem" }}
                    >
                      <motion.div style={{ y: translateY }} className="absolute inset-x-0 top-0">
                        {postComponents.map((PostComponent, index) => (
                          <div
                            key={index}
                            style={{ height: postHeight ? `${postHeight}px` : "100%" }}
                          >
                            <PostComponent />
                          </div>
                        ))}
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {storiesOpen && <StoryOverlay onClose={() => setStoriesOpen(false)} />}
                    </AnimatePresence>
                  </div>
                </div>

                {/* right column */}
                <div className="hidden flex-col gap-12 md:flex">
                  <CalloutItem callout={staticRight} side="right" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePost}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CalloutItem callout={posts[activePost].right} side="right" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* mobile: hasła parami pod urządzeniem */}
                <MobileCalloutPairs
                  progress={progress}
                  callouts={[staticRight, ...posts.flatMap((p) => [p.profile, p.left, p.right])]}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      <Contact compact />
      <Footer />
    </main>
  );
}
