import type { Metadata } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`scroll-smooth bg-coal antialiased ${archivo.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen bg-coal font-sans text-bone">{children}</body>
    </html>
  );
}
