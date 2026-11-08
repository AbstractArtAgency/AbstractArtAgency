"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "./Brand";
import TextLink from "@/src/components/ui/TextLink";
import Image from "next/image";
import { brandImage, media } from "@/src/lib/media";

// Uzupełnij prawdziwymi danymi z realizacji (nazwa klienta, rok, opis).
// Zdjęcia pionowe: Vercel Blob home/social-works/1, /2, /3 (docs/MEDIA.md) — do tego czasu gradienty.
const works = [
  {
    category: "Social media",
    year: "2026",
    client: "[Nazwa klienta]",
    desc: "[Krótki opis projektu i wynik, np. wzrost zasięgu]",
    image: media("home/social-works/1") ?? brandImage("gradient-red"),
    fallback: "#3A0A06",
  },
  {
    category: "Produkcja contentu",
    year: "2026",
    client: "[Nazwa klienta]",
    desc: "[Krótki opis projektu i wynik]",
    image: media("home/social-works/2") ?? brandImage("gradient-orange"),
    fallback: "#8A1A0E",
  },
  {
    category: "Social media + Ads",
    year: "2026",
    client: "[Nazwa klienta]",
    desc: "[Krótki opis projektu i wynik]",
    image: media("home/social-works/3") ?? brandImage("gradient-wine"),
    fallback: "#5A0E09",
  },
];

export default function SocialWork() {
  return (
    <section id="social-work" className="relative bg-cream px-gutter py-20 text-ink md:py-28">
      <div className="mx-auto flex max-w-[1328px] flex-col gap-10 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div className="flex flex-col gap-[18px]">
            <h2 className="m-0 font-display text-4xl font-extrabold font-stretch-112% uppercase leading-[0.92] tracking-display sm:text-5xl lg:text-7xl">
              Realizacje <span className="bg-ember px-[0.06em] text-bone [box-decoration-break:clone]">social media</span>
            </h2>
          </div>
          <TextLink
            href="/realisations"
            hoverClassName="text-ember-light"
            className="inline-flex min-h-11 items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.08em] text-bone"
          >
            Wszystkie projekty
            <ArrowUpRight />
          </TextLink>
        </motion.div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          {works.map((work, index) => (
            <motion.article
              key={work.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative h-[420px] overflow-hidden rounded-[18px] sm:h-[480px] md:h-[560px]"
              style={{ background: work.fallback }}
            >
              <Image
                src={work.image}
                alt="[Zdjęcie lub kadr z projektu]"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-bone sm:p-7">
                <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.1em]">
                  <span>{work.category}</span>
                  <span>{work.year}</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="m-0 text-3xl font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em] sm:text-[40px]">
                    {work.client}
                  </h3>
                  <p className="m-0 text-[15px] leading-normal text-bone/90">{work.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
