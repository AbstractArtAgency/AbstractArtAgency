"use client";

import { FormEvent, useState } from "react";
import { ChevronDown, Send, Terminal } from "lucide-react";
import { capabilities } from "@/src/lib/capabilities";

const budgetRanges = [
  "Do 5 000 zł",
  "5 000 – 15 000 zł",
  "15 000 – 30 000 zł",
  "30 000 zł +",
];

export default function StartProjectForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 4000);
    setName("");
    setEmail("");
    setCompany("");
    setIndustry("");
    setCompanyDesc("");
    setService("");
    setBudget("");
    setMessage("");
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-paper shadow-lg">
      <div className="flex items-center gap-2 border-b border-line bg-cream px-6 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-3 flex items-center gap-2 font-mono text-xs text-stone">
          <Terminal className="h-3.5 w-3.5" />
          abstractart@studio:~$ nowy-projekt --start
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
              {"> "}Imię i nazwisko
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
        </div>

        <div className="border-t border-line pt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-stone">
            Dane firmy <span className="text-ember">— opcjonalne</span>
          </p>
          <p className="mb-5 mt-1.5 text-xs text-stone">
            Nie masz jeszcze firmy ani marki i szukasz np. brandingu? Śmiało pomiń ten blok.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
                {"> "}Firma / marka
              </label>
              <input
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className="w-full rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
                placeholder="Nazwa Twojej firmy"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
                {"> "}Obszar działalności
              </label>
              <input
                type="text"
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                className="w-full rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
                placeholder="np. e-commerce, gastronomia, usługi B2B"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
              {"> "}Czym zajmuje się Twoja firma
            </label>
            <textarea
              value={companyDesc}
              onChange={(event) => setCompanyDesc(event.target.value)}
              rows={2}
              className="w-full resize-none rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
              placeholder="Krótko o profilu działalności"
            />
          </div>
        </div>

        <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
              {"> "}Czego potrzebujesz
            </label>
            <div className="relative">
              <select
                value={service}
                onChange={(event) => setService(event.target.value)}
                required
                className="w-full appearance-none rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
              >
                <option value="" disabled>
                  Wybierz zakres
                </option>
                {capabilities.map((capability) => (
                  <option key={capability.slug} value={capability.navLabel}>
                    {capability.navLabel}
                  </option>
                ))}
                <option value="Inne">Inne</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
              {"> "}Budżet projektu
            </label>
            <div className="relative">
              <select
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                required
                className="w-full appearance-none rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
              >
                <option value="" disabled>
                  Wybierz widełki
                </option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
            {"> "}Opowiedz nam o projekcie
          </label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            rows={4}
            className="w-full resize-none rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
            placeholder="Jaki jest cel projektu? Co chcesz osiągnąć?"
          />
        </div>

        <button
          type="submit"
          className="group relative w-full overflow-hidden rounded-lg bg-ink px-8 py-4 font-mono text-sm text-cream transition-transform duration-300 disabled:opacity-50 md:w-auto"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {submitted ? "Zgłoszenie wysłane" : "Rozpocznij projekt"}
            {!submitted && (
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </span>
        </button>
      </form>
    </div>
  );
}
