import type { StaticImageData } from "next/image";

/**
 * Realizacja (case study). Docelowo dane przyjdą z Contentful — wtedy wystarczy podmienić
 * ciało getRealisations() / getRealisationBySlug() na zapytania do Contentful API,
 * zachowując ten sam kształt obiektu.
 */
export type Realisation = {
  /** adres podstrony: /realisations/[slug] */
  slug: string;
  title: string;
  client: string;
  /** slug usługi z src/lib/capabilities.ts — po nim filtrujemy listę */
  capability: string;
  year: string;
  /** krótki opis projektu i wynik */
  summary: string;
  /** zdjęcie z realizacji (tło po hoverze i okładka podstrony); null = gradient zastępczy */
  cover: string | StaticImageData | null;
  fallback: string;
  /** opcjonalny link do efektu na żywo */
  url?: string;
};

// Dane tymczasowe — do zastąpienia wpisami z Contentful.
const realisations: Realisation[] = [
  {
    slug: "rn-serwis-elektroniki",
    title: "RN Serwis Elektroniki",
    client: "RN Serwis Elektroniki",
    capability: "strony-www",
    year: "2026",
    summary: "Strona firmowa serwisu elektroniki — [krótki opis projektu i wynik].",
    cover: null,
    fallback: "/brand/gradient-orange.jpg",
    url: "https://www.rnserwiselektroniki.pl/",
  },
  {
    slug: "time2run",
    title: "Time2run",
    client: "Time2run",
    capability: "strony-www",
    year: "2026",
    summary: "Strona wydarzenia biegowego — [krótki opis projektu i wynik].",
    cover: null,
    fallback: "/brand/gradient-red.jpg",
    url: "https://www.time2run.pl/",
  },
  {
    slug: "jacob-przyciasa-portfolio",
    title: "Jacob Przyciasa Portfolio",
    client: "Jacob Przyciasa",
    capability: "strony-www",
    year: "2026",
    summary: "Strona portfolio — [krótki opis projektu i wynik].",
    cover: null,
    fallback: "/brand/gradient-wine.jpg",
    url: "https://jacobprzyciasa.com/",
  },
  {
    slug: "przyklad-social-media",
    title: "[Nazwa projektu]",
    client: "[Nazwa klienta]",
    capability: "social-media",
    year: "2026",
    summary: "[Krótki opis projektu i wynik, np. wzrost zasięgu]",
    cover: null,
    fallback: "/brand/gradient-red.jpg",
  },
  {
    slug: "przyklad-social-media-2",
    title: "[Nazwa projektu]",
    client: "[Nazwa klienta]",
    capability: "social-media",
    year: "2026",
    summary: "[Krótki opis projektu i wynik]",
    cover: null,
    fallback: "/brand/gradient-orange.jpg",
  },
  {
    slug: "przyklad-pozycjonowanie",
    title: "[Nazwa projektu]",
    client: "[Nazwa klienta]",
    capability: "pozycjonowanie",
    year: "2026",
    summary: "[Krótki opis projektu i wynik, np. wzrost ruchu organicznego]",
    cover: null,
    fallback: "/brand/gradient-wine.jpg",
  },
  {
    slug: "przyklad-kampanie-ads",
    title: "[Nazwa projektu]",
    client: "[Nazwa klienta]",
    capability: "kampanie-ads",
    year: "2026",
    summary: "[Krótki opis projektu i wynik]",
    cover: null,
    fallback: "/brand/gradient-red.jpg",
  },
  {
    slug: "przyklad-branding",
    title: "[Nazwa projektu]",
    client: "[Nazwa klienta]",
    capability: "branding",
    year: "2026",
    summary: "[Krótki opis projektu i wynik]",
    cover: null,
    fallback: "/brand/gradient-orange.jpg",
  },
];

export async function getRealisations(): Promise<Realisation[]> {
  return realisations;
}

export async function getRealisationBySlug(slug: string): Promise<Realisation | undefined> {
  return realisations.find((item) => item.slug === slug);
}
