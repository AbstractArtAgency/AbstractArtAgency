"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Globe2, Mail, Send, Terminal } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
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
  {
    icon: Code2,
    href: "https://github.com/AbstractArtAgency",
    label: "Kod",
    external: true,
  },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: Globe2, href: "/", label: "Web" },
  { icon: Mail, href: "mailto:abstractartagency@gmail.com", label: "E-mail" },
];

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
      className="relative flex min-h-screen items-center overflow-hidden bg-cream-dim py-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(222,31,26,0.08), transparent 55%)",
        }}
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-16 md:grid-cols-2 md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
              Porozmawiajmy o <span className="text-ember font-accent italic tracking-wide">Twojej marce</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-ink-soft">
              Napisz kilka słów o swoim biznesie i celach, jakie chcesz osiągnąć - odezwiemy się w ciągu
              24 godzin z pierwszymi pomysłami!
            </p>

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-stone">
                  Najszybciej odpowiemy
                </p>
                <p className="mt-2 text-ink">Pon-Pt, 9:00-17:00</p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-stone">
                  Lokalizacja
                </p>
                <p className="mt-2 text-ink">Zdalnie <span className="text-stone">/</span> Cała Polska</p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-stone">
                  Email
                </p>
                <a
                  href="mailto:abstractartagency@gmail.com"
                  className="mt-2 block text-ink transition-colors hover:text-ember"
                >
                  abstractartagency@gmail.com
                </a>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-stone">
                  Social media
                </p>
                <div className="mt-3 flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        target={social.external ? "_blank" : undefined}
                        rel={social.external ? "noopener noreferrer" : undefined}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-stone transition-all duration-300 hover:border-ember/50 hover:bg-ember/5 hover:text-ink"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="overflow-hidden rounded-2xl border border-line bg-paper shadow-lg"
          >
            <div className="flex items-center gap-2 border-b border-line bg-cream px-6 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="ml-3 flex items-center gap-2 font-mono text-xs text-stone">
                <Terminal className="h-3.5 w-3.5" />
                abstractart@studio:~$ nowy-projekt
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8">
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
                  {"> "}Imię
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="w-full rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
                  placeholder="Jak się nazywasz?"
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
                  {"> "}Adres e-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
                  placeholder="ty@firma.pl"
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
                  {"> "}Numer telefonu
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="w-full rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
                  placeholder="+48 500 100 200"
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
                  {"> "}Opisz projekt
                </label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  rows={4}
                  className="w-full resize-none rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
                  placeholder="Opowiedz nam o swoim biznesie i celach..."
                />
              </div>

              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-lg bg-ink px-8 py-4 font-mono text-sm text-cream transition-transform duration-300 disabled:opacity-50 md:w-auto"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitted ? "Wiadomość wysłana" : "Wyślij wiadomość"}
                  {!submitted && (
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
