"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import Button from "@/src/components/ui/Button";
import { Field, inputClass, textareaClass } from "@/src/components/ui/FormField";

/** Formularz zgłoszenia — w tym samym stylu co formularz kontaktowy (karta + pola z linią). */
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
    <div className="rounded-[18px] border border-ink/15 bg-paper p-6 md:p-10">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-[3px] w-8 bg-ember" />
        <h2 className="m-0 font-display text-xl font-extrabold font-stretch-110% uppercase leading-none tracking-[-0.02em] text-ink md:text-2xl">
          Wyślij zgłoszenie
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-7">
        <div className="grid gap-7 sm:grid-cols-2">
          <Field label="Imię i nazwisko" htmlFor="career-name" required>
            <input
              id="career-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className={inputClass}
              placeholder="Jak się nazywasz?"
            />
          </Field>
          <Field label="Adres e-mail" htmlFor="career-email" required>
            <input
              id="career-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className={inputClass}
              placeholder="ty@example.com"
            />
          </Field>
        </div>

        <div className="grid gap-7 sm:grid-cols-2">
          <Field label="W czym jesteś dobry/a" htmlFor="career-role" required>
            <input
              id="career-role"
              type="text"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              required
              className={inputClass}
              placeholder="np. Front-end Developer"
            />
          </Field>
          <Field label="Portfolio / LinkedIn / CV" htmlFor="career-link" required>
            <input
              id="career-link"
              type="url"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              required
              className={inputClass}
              placeholder="https://..."
            />
          </Field>
        </div>

        <Field label="Kilka słów o Tobie" htmlFor="career-message" required>
          <textarea
            id="career-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            rows={4}
            className={textareaClass}
            placeholder="Opowiedz nam o swoim doświadczeniu i dlaczego chcesz dołączyć..."
          />
        </Field>

        <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" variant="ink" className="w-full sm:w-auto">
            {submitted ? "Zgłoszenie wysłane" : "Wyślij zgłoszenie"}
            {!submitted && <Send className="h-4 w-4" />}
          </Button>
          <p className="m-0 font-mono text-[10px] uppercase tracking-[0.16em] text-stone">
            <span className="text-ember">*</span> pola obowiązkowe
          </p>
        </div>
      </form>
    </div>
  );
}
