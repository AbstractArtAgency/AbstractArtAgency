"use client";

import { FormEvent, useState } from "react";
import { Send, Terminal } from "lucide-react";

export default function CareerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 4000);
    setName("");
    setEmail("");
    setRole("");
    setLink("");
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
          abstractart@studio:~$ aplikacja
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8">
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
            placeholder="ty@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
            {"> "}W czym jesteś dobry/a
          </label>
          <input
            type="text"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
            className="w-full rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
            placeholder="np. Front-end Developer"
          />
        </div>

        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
            {"> "}Portfolio / LinkedIn / CV
          </label>
          <input
            type="url"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            className="w-full rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-stone">
            {"> "}Kilka słów o Tobie
          </label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            rows={4}
            className="w-full resize-none rounded-lg border border-line bg-cream px-4 py-3 font-mono text-sm text-ink transition-colors focus:border-ember focus:outline-none"
            placeholder="Opowiedz nam o swoim doświadczeniu i dlaczego chcesz dołączyć..."
          />
        </div>

        <button
          type="submit"
          className="group relative w-full overflow-hidden rounded-lg bg-ink px-8 py-4 font-mono text-sm text-cream transition-transform duration-300 disabled:opacity-50 md:w-auto"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {submitted ? "Zgłoszenie wysłane" : "Wyślij zgłoszenie"}
            {!submitted && (
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </span>
        </button>
      </form>
    </div>
  );
}
