"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { capabilities } from "@/src/lib/capabilities";
import Button, { HoverFill, setOrigin } from "@/src/components/ui/Button";
import { Field, RequiredMark, inputClass, textareaClass } from "@/src/components/ui/FormField";

const budgetRanges = ["Do 5 000 zł", "5 000 – 15 000 zł", "15 000 – 30 000 zł", "30 000 zł +"];
const serviceOptions = [...capabilities.map((capability) => capability.navLabel), "Inne"];

/** Wybór jednej opcji jako pigułki (radio) — zamiast rozwijanej listy. */
function ChoiceGroup({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
      <legend className="mb-3 p-0 font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
        {label}
        <RequiredMark />
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => {
          const checked = value === option;
          return (
            <label
              key={option}
              onPointerEnter={setOrigin}
              onPointerLeave={setOrigin}
              className={`group/btn relative isolate inline-flex min-h-10 cursor-pointer items-center overflow-hidden rounded-full border px-4 text-[15px] transition-colors duration-500 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ember ${
                checked ? "border-ink bg-ink text-cream" : "border-ink/25 text-ink hover:border-ink"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                required={index === 0}
                className="absolute inset-0 z-10 cursor-pointer opacity-0"
              />
              {checked ? (
                option
              ) : (
                // hover jak w przyciskach: kolor rozlewa się kołem od kursora, napis podmienia się z góry
                <HoverFill fill="bg-ink" hoverText="text-cream">
                  {option}
                </HoverFill>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Formularz „Rozpocznij projekt” w stylu formularzy kontakt / kariera. */
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
    <div className="rounded-[18px] border border-ink/15 bg-paper p-6 md:p-10">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-[3px] w-8 bg-ember" />
        <h2 className="m-0 font-display text-xl font-extrabold font-stretch-110% uppercase leading-none tracking-[-0.02em] text-ink md:text-2xl">
          Opowiedz nam o projekcie
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-8">
        <div className="grid gap-7 sm:grid-cols-2">
          <Field label="Imię i nazwisko" htmlFor="project-name" required>
            <input
              id="project-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className={inputClass}
              placeholder="Jak się nazywasz?"
            />
          </Field>
          <Field label="Adres e-mail" htmlFor="project-email" required>
            <input
              id="project-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className={inputClass}
              placeholder="twoja@firma.pl"
            />
          </Field>
        </div>

        <ChoiceGroup name="service" label="Czego potrzebujesz" options={serviceOptions} value={service} onChange={setService} />
        <ChoiceGroup name="budget" label="Budżet projektu" options={budgetRanges} value={budget} onChange={setBudget} />

        <div className="flex flex-col gap-7 border-t border-ink/15 pt-8">
          <div>
            <p className="m-0 font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
              Dane firmy <span className="text-ember">— opcjonalne</span>
            </p>
            <p className="m-0 mt-1.5 text-sm text-ink-soft">
              Nie masz jeszcze firmy ani marki i szukasz np. brandingu? Śmiało pomiń ten blok.
            </p>
          </div>
          <div className="grid gap-7 sm:grid-cols-2">
            <Field label="Firma / marka" htmlFor="project-company">
              <input
                id="project-company"
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className={inputClass}
                placeholder="Nazwa Twojej firmy"
              />
            </Field>
            <Field label="Obszar działalności" htmlFor="project-industry">
              <input
                id="project-industry"
                type="text"
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                className={inputClass}
                placeholder="np. e-commerce, gastronomia, usługi B2B"
              />
            </Field>
          </div>
          <Field label="Czym zajmuje się Twoja firma" htmlFor="project-company-desc">
            <textarea
              id="project-company-desc"
              value={companyDesc}
              onChange={(event) => setCompanyDesc(event.target.value)}
              rows={2}
              className={textareaClass}
              placeholder="Krótko o profilu działalności"
            />
          </Field>
        </div>

        <Field label="Opowiedz nam o projekcie" htmlFor="project-message" required>
          <textarea
            id="project-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            rows={4}
            className={textareaClass}
            placeholder="Co chcesz osiągnąć?"
          />
        </Field>

        <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" variant="ink" className="w-full sm:w-auto">
            {submitted ? "Zgłoszenie wysłane" : "Rozpocznij projekt"}
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
