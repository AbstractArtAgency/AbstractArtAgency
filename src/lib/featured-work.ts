import type { StaticImageData } from "next/image";
import { brandImage, media } from "./media";

export type FeaturedWork = {
  /** etykieta w lewym górnym rogu karty */
  category: string;
  /** nazwa klienta / projektu */
  client: string;
  /** krótki opis projektu i wynik */
  summary: string;
  year: string;
  /** pionowa (4:5) albo pozioma (16:10) karta */
  orientation: "portrait" | "landscape";
  /** lekki obrót karty w stopniach — każda pozycja leży trochę inaczej */
  rotate: number;
  /**
   * Obrazek realizacji. Zostaw null, dopóki go nie ma — pokaże się gradient marki.
   * Np. image: "/realisations/social-media.jpg" (plik w public/realisations)
   * albo statyczny import: import socialImg from "@/public/realisations/social-media.jpg"
   */
  image: string | StaticImageData | null;
  /** gradient pokazywany zamiast obrazka */
  fallback: string;
};

/** Jedna przykładowa realizacja na każdą usługę (klucz = slug z src/lib/capabilities.ts). */
const featuredWorkData: Record<string, FeaturedWork> = {
  "social-media": {
    category: "Social media",
    client: "[Nazwa klienta]",
    summary: "[Krótki opis projektu i wynik, np. wzrost zasięgu]",
    year: "2026",
    orientation: "portrait",
    rotate: 3,
    image: null,
    fallback: brandImage("gradient-red"),
  },
  "strony-www": {
    category: "Strona WWW",
    client: "RN Serwis Elektroniki",
    summary: "[Krótki opis projektu i wynik]",
    year: "2026",
    orientation: "landscape",
    rotate: -2,
    image: null,
    fallback: brandImage("gradient-orange"),
  },
  pozycjonowanie: {
    category: "SEO",
    client: "[Nazwa klienta]",
    summary: "[Krótki opis projektu i wynik, np. wzrost ruchu]",
    year: "2026",
    orientation: "landscape",
    rotate: 2,
    image: null,
    fallback: brandImage("gradient-wine"),
  },
  "kampanie-ads": {
    category: "Kampanie Ads",
    client: "[Nazwa klienta]",
    summary: "[Krótki opis projektu i wynik]",
    year: "2026",
    orientation: "portrait",
    rotate: -3,
    image: null,
    fallback: brandImage("gradient-red"),
  },
  branding: {
    category: "Branding",
    client: "[Nazwa klienta]",
    summary: "[Krótki opis projektu i wynik]",
    year: "2026",
    orientation: "portrait",
    rotate: 4,
    image: null,
    fallback: brandImage("gradient-orange"),
  },
};

/** Obrazek karty: plik z Vercel Blob `featured/<slug-usługi>` (np. featured/branding.jpg), inaczej pole `image`. */
export const featuredWork: Record<string, FeaturedWork> = Object.fromEntries(
  Object.entries(featuredWorkData).map(([slug, work]) => [slug, { ...work, image: media(`featured/${slug}`) ?? work.image }]),
);
