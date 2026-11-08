import type { Metadata } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { media } from "@/src/lib/media";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AbstractArt - Strony internetowe i marketing, które działają",
  description:
    "Agencja tworząca nowoczesne strony internetowe i kampanie marketingowe. Projektujemy, kodujemy i skalujemy marki online.",
};

// tła z CSS (bg-hero, bg-cta, ziarno papieru) — z Vercel Blob, gdy są wgrane jako brand/*; inaczej zostają z globals.css
const brandBackgrounds = Object.fromEntries(
  (
    [
      ["--background-image-hero", "brand/hero-bg"],
      ["--background-image-cta", "brand/cta-bg"],
      ["--background-image-paper-grain", "brand/paper-grain"],
    ] as const
  )
    .map(([variable, slot]) => [variable, media(slot)] as const)
    .filter(([, url]) => url)
    .map(([variable, url]) => [variable, `url("${url}")`]),
) as React.CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`scroll-smooth bg-coal antialiased ${archivo.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
      style={brandBackgrounds}
    >
      <body className="min-h-screen bg-coal font-sans text-bone">{children}</body>
    </html>
  );
}
