import type { ReactNode } from "react";

/** Pole formularza z samą linią pod spodem (kontakt, kariera). */
export const inputClass =
  "w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-lg text-ink placeholder:text-stone/70 transition-colors duration-300 focus:border-ember focus:outline-none";

/** Textarea: można ją wydłużać w dół (uchwyt w rogu), z sensowną minimalną wysokością. */
export const textareaClass = `${inputClass} min-h-16 resize-y`;

/** Czerwona gwiazdka przy polu obowiązkowym. */
export function RequiredMark() {
  return (
    <span aria-hidden="true" className="ml-1 text-ember">
      *
    </span>
  );
}

export function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  /** pokazuje czerwoną gwiazdkę (samo pole i tak musi mieć atrybut required) */
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
        {label}
        {required && <RequiredMark />}
      </label>
      {children}
    </div>
  );
}
