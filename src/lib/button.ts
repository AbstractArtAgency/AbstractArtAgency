// Przyciski-pigułki marki. Rozmiar i wariant są osobno, bo klasy Tailwinda
// o tej samej właściwości (np. min-h-11 i min-h-13) nie nadpisują się kolejnością.
export const buttonSizes = {
  sm: "min-h-11 px-5 text-[15px]",
  md: "min-h-13 px-7 text-base",
  lg: "min-h-14 px-6 text-base sm:px-8 sm:text-[17px]",
  /** pigułka z adresem e-mail (mono, mniejszy tekst) */
  mono: "min-h-14 px-6 font-mono text-sm tracking-[0.04em] sm:px-7",
  /** okrągły przycisk z ikoną */
  icon: "h-11 w-11",
};

// base — wygląd spoczynkowy, fill — kolor rozlewający się od kursora, hoverText — kolor napisu po najechaniu.
// Warianty marki (stałe kolory, na ciemne sekcje):
//   dark (czarny) → czerwony, primary (czerwony) → biały, light (biały) → czerwony, ghost (przezroczysty) → biały.
// ink / outline to te same reguły dla sekcji zależnych od motywu: ink = pełny w kolorze tekstu
// (biały w ciemnym motywie, czarny w jasnym), outline = przezroczysty, wypełnia się kolorem tekstu.
export const buttonVariants = {
  primary: { base: "bg-ember font-semibold text-bone", fill: "bg-bone", hoverText: "text-ember" },
  light: { base: "bg-bone font-semibold text-coal", fill: "bg-ember", hoverText: "text-bone" },
  dark: { base: "bg-coal font-semibold text-bone", fill: "bg-ember", hoverText: "text-bone" },
  ghost: {
    base: "border border-bone/50 font-medium text-bone transition-colors duration-500 hover:border-bone",
    fill: "bg-bone",
    hoverText: "text-coal",
  },
  ink: { base: "bg-ink font-semibold text-cream", fill: "bg-ember", hoverText: "text-bone" },
  outline: {
    base: "border border-ink/40 font-medium text-ink transition-colors duration-500 hover:border-ink",
    fill: "bg-ink",
    hoverText: "text-cream",
  },
};

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;
