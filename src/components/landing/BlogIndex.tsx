"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { formatPostDate, type BlogPost } from "@/src/lib/blog";
import { HoverFill, setOrigin } from "@/src/components/ui/Button";
import { ArrowUpRight } from "./Brand";
import { brandImage } from "@/src/lib/media";

const ease = [0.16, 1, 0.3, 1] as const;

/** Karta wpisu w stylu kart realizacji: gradient/okładka, kategoria i data u góry, tytuł na dole. */
function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative isolate flex overflow-hidden rounded-[18px] bg-[#3A0A06] text-bone shadow-[0_30px_60px_rgba(14,9,7,0.2)] ${
        featured ? "min-h-[420px] md:min-h-[520px]" : "aspect-4/5"
      }`}
    >
      <Image
        src={post.cover ?? brandImage(post.fallback)}
        alt={post.cover ? post.title : ""}
        fill
        sizes={featured ? "(min-width: 1152px) 1104px, 100vw" : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"}
        className="-z-1 object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 -z-1 bg-noise opacity-20 mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 -z-1 bg-linear-to-t from-coal/60 via-transparent to-transparent" />

      <div className={`flex w-full flex-col justify-between ${featured ? "p-6 md:p-10" : "p-5 lg:p-6"}`}>
        <div className="flex justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em]">
          <span>{post.category}</span>
          <span>{formatPostDate(post.date)}</span>
        </div>

        <div className="flex flex-col gap-3">
          {featured && (
            <span className="w-fit bg-ember px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-bone">
              Najnowszy wpis
            </span>
          )}
          <h3
            className={`m-0 font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em] ${
              featured ? "max-w-3xl text-3xl md:text-5xl" : "text-xl lg:text-2xl"
            }`}
          >
            {post.title}
          </h3>
          <p className={`m-0 text-bone/85 ${featured ? "max-w-xl text-base" : "line-clamp-3 text-[13px] leading-snug"}`}>
            {post.excerpt}
          </p>
          <span className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bone/80">
            {post.readingTime} min czytania
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <ArrowUpRight />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Strona główna bloga: plakatowy nagłówek, najnowszy wpis, filtr kategorii i siatka wpisów. */
export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const [featured, ...rest] = posts;
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const visible = category ? posts.filter((post) => post.category === category) : rest;

  return (
    <section className="bg-glow-top bg-size-[auto,256px_256px] bg-fixed relative overflow-hidden bg-cream pt-[calc(var(--header-height,96px)+3rem)] pb-20 md:pb-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h1 className="sr-only">Blog AbstractArt</h1>

        {/* najnowszy wpis */}
        {featured && !category && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease }}
          >
            <PostCard post={featured} featured />
          </motion.div>
        )}

        {/* filtr kategorii */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2 ${featured && !category ? "mt-12" : ""}`}
          role="group"
          aria-label="Filtruj wpisy"
        >
          {[null, ...categories].map((item) => {
            const active = category === item;
            return (
              <button
                key={item ?? "all"}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(item)}
                onPointerEnter={setOrigin}
                onPointerLeave={setOrigin}
                className={`group/btn relative isolate inline-flex min-h-10 items-center overflow-hidden rounded-full border px-4 text-[15px] transition-colors duration-500 ${
                  active ? "border-ink bg-ink text-cream" : "border-ink/25 text-ink hover:border-ink"
                }`}
              >
                {active ? (
                  (item ?? "Wszystkie")
                ) : (
                  <HoverFill fill="bg-ink" hoverText="text-cream">
                    {item ?? "Wszystkie"}
                  </HoverFill>
                )}
              </button>
            );
          })}
        </div>

        {/* siatka wpisów */}
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((post, index) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease, delay: index * 0.04 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-10 text-center text-sm text-ink-soft">Wkrótce pojawią się tu nowe wpisy.</p>
        )}
      </div>
    </section>
  );
}
