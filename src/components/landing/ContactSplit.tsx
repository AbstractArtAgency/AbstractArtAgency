"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Globe2, Mail, Send } from "lucide-react";
import TextLink from "@/src/components/ui/TextLink";
import Button from "@/src/components/ui/Button";
import { EMAIL, PHONE, phoneHref } from "@/src/lib/contact";
import { Field, inputClass, textareaClass } from "@/src/components/ui/FormField";

const ease = [0.16, 1, 0.3, 1] as const;

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const socialLinks = [
  { icon: Code2, href: "https://github.com/AbstractArtAgency", label: "Kod", external: true },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: Globe2, href: "/", label: "Web" },
  { icon: Mail, href: `mailto:${EMAIL}`, label: "E-mail" },
];

const infoTiles = [
  { label: "Najszybciej odpowiemy", value: "Pon–Pt, 9:00–17:00" },
  { label: "Lokalizacja", value: "Zdalnie / cała Polska" },
];

/** Podstrona Kontakt w stylu plakatu: wielkie słowo z notką, ciemne kafle z danymi i formularz z liniami. */
export default function ContactSplit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 4000);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <section
      id="contact"
      className="bg-glow-top bg-size-[auto,256px_256px] bg-fixed relative overflow-hidden bg-cream pt-[calc(var(--header-height,96px)+3rem)] pb-20 md:pb-28"
    >
      <div className="@container mx-auto w-full max-w-6xl px-6">
        {/* nagłówek: mała linia + wielkie słowo + odręczna notka */}
        <h1 className="m-0 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="block font-display text-2xl font-extrabold font-stretch-110% uppercase leading-[1.05] tracking-display text-ink sm:text-4xl"
          >
            Porozmawiajmy o{" "}
            <span className="bg-ember px-[0.06em] text-bone [box-decoration-break:clone]">Twojej marce</span>
          </motion.span>
          <span className="relative mt-3 block">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease }}
              className="block whitespace-nowrap font-display text-[19cqw] font-extrabold font-stretch-112% uppercase leading-[0.82] tracking-[-0.04em] text-ink"
            >
              Kontakt
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease }}
          className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-ink-soft md:text-lg"
        >
          Napisz kilka słów o swoim biznesie i celach, jakie chcesz osiągnąć. Odezwiemy się maksymalnie w ciągu 24 godzin z
          pierwszymi pomysłami!
        </motion.p>

        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8">
          {/* dane kontaktowe jako ciemne kafle */}
          <div className="grid grid-cols-1 content-start gap-3 sm:grid-cols-2 md:grid-cols-1">
            {infoTiles.map((tile, index) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: index * 0.08 }}
                className="flex min-h-32 flex-col justify-between gap-6 rounded-[14px] bg-ink p-5 text-cream"
              >
                <p className="m-0 text-xl font-semibold leading-snug">{tile.value}</p>
                <p className="m-0 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/60">{tile.label}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: 0.16 }}
              className="flex min-h-32 flex-col justify-between gap-6 rounded-[14px] bg-ink p-5 text-cream sm:col-span-2 md:col-span-1"
            >
              <div className="flex flex-col items-start gap-1.5">
                <TextLink
                  href={`mailto:${EMAIL}`}
                  hoverClassName="text-ember-light"
                  className="inline-flex text-xl font-semibold leading-snug [overflow-wrap:anywhere]"
                >
                  {EMAIL}
                </TextLink>
                <TextLink
                  href={phoneHref}
                  hoverClassName="text-ember-light"
                  className="inline-flex text-xl font-semibold leading-snug"
                >
                  {PHONE}
                </TextLink>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <p className="m-0 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/60">
                  E-mail, telefon i social media
                </p>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Button
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        target={social.external ? "_blank" : undefined}
                        rel={social.external ? "noopener noreferrer" : undefined}
                        variant="ghost"
                        size="icon"
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.6} />
                      </Button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* formularz */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="rounded-[18px] border border-ink/15 bg-paper p-6 md:p-10"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-[3px] w-8 bg-ember" />
              <h2 className="m-0 font-display text-xl font-extrabold font-stretch-110% uppercase leading-none tracking-[-0.02em] text-ink md:text-2xl">
                Napisz do nas
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Imię" htmlFor="contact-name" required>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className={inputClass}
                    placeholder="Jak się nazywasz?"
                  />
                </Field>
                <Field label="Numer telefonu" htmlFor="contact-phone" required>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                    className={inputClass}
                    placeholder="+48 500 100 200"
                  />
                </Field>
              </div>

              <Field label="Adres e-mail" htmlFor="contact-email" required>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className={inputClass}
                  placeholder="twoja@firma.pl"
                />
              </Field>

              <Field label="Opisz projekt" htmlFor="contact-message" required>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  rows={4}
                  className={textareaClass}
                  placeholder="Opowiedz nam o swoim biznesie i celach..."
                />
              </Field>

              <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" variant="ink" className="w-full sm:w-auto">
                  {submitted ? "Wiadomość wysłana" : "Wyślij wiadomość"}
                  {!submitted && <Send className="h-4 w-4" />}
                </Button>
                <p className="m-0 font-mono text-[10px] uppercase tracking-[0.16em] text-stone">
                  <span className="text-ember">*</span> pola obowiązkowe
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
