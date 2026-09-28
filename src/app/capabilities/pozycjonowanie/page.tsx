import type { Metadata } from "next";
import PozycjonowanieContent from "@/src/components/landing/PozycjonowanieContent";

export const metadata: Metadata = {
  title: "SEO i pozycjonowanie — AbstractArt",
  description: "Optymalizujemy strony internetowe pod kątem pozycjonowania w internecie.",
};

export default function PozycjonowaniePage() {
  return <PozycjonowanieContent />;
}
