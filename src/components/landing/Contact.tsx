"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send, Terminal } from "lucide-react";

type ContactProps = {
  compact?: boolean;
};

export default function Contact({ compact = false }: ContactProps) {
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
      className={`relative overflow-hidden bg-cream-dim ${
        compact ? "py-24" : "flex min-h-screen items-center py-32"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(222,31,26,0.08), transparent 55%)",
        }}
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative mx-auto w-full max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mt-4 max-w-full font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
            Porozmawiajmy o <span className="text-ember font-accent italic tracking-wide">Twojej marce</span>
          </h2>
        </motion.div>

        {compact ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-10"
          >
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-ink px-8 py-4 font-mono text-sm text-cream"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative z-10 flex items-center gap-2">
                Przejdź do formularza kontaktowego
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-12 overflow-hidden rounded-2xl border border-line bg-paper shadow-lg"
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

            <div className="mt-12 flex flex-wrap items-center gap-8 font-mono text-sm text-stone">
              <a
                href="mailto:abstractartagency@gmail.com"
                className="transition-colors hover:text-ink"
              >
                abstractartagency@gmail.com
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
