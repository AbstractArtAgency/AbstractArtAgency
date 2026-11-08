"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/src/components/ui/Button";
import { capabilities, parseMeta } from "@/src/lib/capabilities";
import { ArrowUpRight, CircleArrow, LogoMark } from "./Brand";
import TextLink from "@/src/components/ui/TextLink";

export default function Capabilities() {
  // na starcie wszystko zamknięte; myszką otwiera hover, na dotyku — kliknięcie
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section
      id="capabilities"
      className="relative bg-linen bg-paper-grain bg-size-[256px_256px] px-gutter pt-16 pb-20 text-coal md:pt-24 md:pb-28"
    >
      <div className="mx-auto flex max-w-[1328px] flex-col gap-10 md:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-end justify-between gap-8 my-10"
        >
          <div className="flex max-w-full flex-col gap-5">
            <h2 className="m-0 font-display text-[32px] font-extrabold font-stretch-108% uppercase leading-[0.95] tracking-display sm:text-4xl md:text-5xl lg:text-7xl">
              Stwórz z nami markę
              <br />
              <span className="bg-ember px-[0.06em] text-bone [box-decoration-break:clone]">nie do przeoczenia.</span>
            </h2>
          </div>
          <div className="flex max-w-[360px] flex-col items-start gap-5 xl:items-end">
            <Button href="/contact" variant="dark">
              Umów rozmowę
              <ArrowUpRight />
            </Button>
            <p className="m-0 text-[17px] leading-[1.55] text-coal-soft">
              Sprawdź, co możemy dla Ciebie zrobić!
            </p>
          </div>
        </motion.div>

        <div
          className="border border-b-0 border-coal"
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setOpenIndex(-1);
          }}
        >
          {capabilities.map((capability, index) => {
            const isOpen = openIndex === index;
            const meta = capability.meta.map(parseMeta);

            return (
              <motion.article
                key={capability.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setOpenIndex(index);
                }}
                className="border-b border-coal"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`capability-${capability.slug}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center gap-3 px-4 py-5 text-left text-coal sm:gap-4 sm:px-5 sm:py-6 md:gap-6 md:px-8 md:py-7"
                >
                  <span
                    className={`w-6 shrink-0 font-mono text-xs tracking-[0.08em] transition-colors duration-200 sm:w-8 md:w-12 ${
                      isOpen ? "text-coal" : "text-coal-muted"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="m-0 min-w-0 flex-1 text-base font-extrabold font-stretch-110% uppercase leading-none tracking-[-0.02em] wrap-anywhere xs:text-[19px] sm:text-2xl md:text-4xl">
                    {capability.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-coal sm:h-12 sm:w-12 transition-colors duration-200 ${
                      isOpen ? "bg-coal text-bone" : "bg-transparent text-coal"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={1.6}>
                      <path d={isOpen ? "M2 9h14" : "M2 9h14M9 2v14"} />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`capability-${capability.slug}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-7 px-4 pb-8 sm:px-5 md:pl-[104px] md:pr-8">
                        <p className="m-0 max-w-[640px] text-base leading-[1.55] text-coal-soft">
                          {capability.desc}
                        </p>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-8 gap-y-6">
                          {meta.map(({ label, value }) => (
                            <div
                              key={label}
                              className="flex flex-col gap-2 border-t border-coal/30 pt-3.5"
                            >
                              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-coal-muted">
                                {label}
                              </span>
                              <span className="text-[17px] font-semibold leading-[1.4] text-coal">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                        <TextLink
                          href={`/capabilities/${capability.slug}`}
                          hoverClassName="text-ember"
                          className="inline-flex min-h-11 w-fit items-center gap-2.5 font-mono text-xs uppercase tracking-[0.1em] text-coal underline-offset-4"
                        >
                          Zobacz szczegóły
                          <ArrowUpRight />
                        </TextLink>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}

          <a
            href="/contact"
            className="group flex flex-wrap items-center justify-between gap-5 border-b border-coal bg-coal p-6 text-bone sm:gap-7 md:p-8"
          >
            <div className="flex flex-wrap items-center gap-5 sm:gap-7">
              <LogoMark height={44} />
              <div className="flex flex-col gap-2.5">
                <span className="font-accent text-3xl italic leading-none md:text-[40px]">
                  Nie wiesz, od czego zacząć?
                </span>
                <span className="text-base leading-normal text-bone/78">
                  Opowiedz nam o swoim biznesie. Z przyjemnością pomożemy w doborze odpowiedniej strategii!
                </span>
              </div>
            </div>
            <CircleArrow className="transition-colors duration-200 group-hover:text-ember-light" />
          </a>
        </div>
      </div>
    </section>
  );
}
