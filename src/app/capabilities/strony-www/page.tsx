import type { Metadata } from "next";
import StronyWwwContent from "@/src/components/landing/StronyWwwContent";

export const metadata: Metadata = {
  title: "Strony WWW — AbstractArt",
  description:
    "Projektujemy i wdrażamy nowoczesne i szybkie strony www, oraz obsługujemy już istniejące.",
};

export default function StronyWwwPage() {
  return <StronyWwwContent />;
}
