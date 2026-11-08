"use client";

import { motion } from "framer-motion";
import Button from "@/src/components/ui/Button";
import { ArrowUpRight, LogoMark } from "./Brand";

type ContactProps = {
  compact?: boolean;
};

const email = "abstractartagency@gmail.com";

export default function Contact({ compact = false }: ContactProps) {
  return (
    <section
      id="contact"
      className={`relative isolate overflow-hidden bg-[#120403] bg-cta bg-cover bg-bottom px-gutter text-center text-bone after:pointer-events-none after:absolute after:inset-0 after:z-0 after:bg-noise after:opacity-16 after:mix-blend-overlay ${
        compact ? "py-24" : "pt-24 pb-24 md:pt-[136px] md:pb-32"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative z-1 mx-auto flex max-w-[1100px] flex-col items-center gap-6 sm:gap-8"
      >
        <LogoMark height={64} />
        <h2 className="m-0 font-display text-4xl font-extrabold font-stretch-112% uppercase leading-[0.92] tracking-display sm:text-5xl md:text-6xl lg:text-display">
          Już nie musisz szukać.{" "}
          <span className="block font-accent font-normal italic tracking-[-0.03em] normal-case">Napisz do nas!</span>
        </h2>
        <p className="m-0 max-w-[560px] text-base leading-[1.55] text-bone/88 sm:text-lg">
          Opisz nam swoją markę i cel, jaki chcesz osiągnąć. Odezwiemy się już z pierwszymi pomysłami.
        </p>
        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <Button href="/contact" variant="light" size="lg" className="py-3">
            Przejdź do formularza kontaktowego
            <ArrowUpRight />
          </Button>
          <Button
            href={`mailto:${email}`}
            variant="ghost"
            size="mono"
            className="break-all"
          >
            {email}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
