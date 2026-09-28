import type { Metadata } from "next";
import StartProjectContent from "@/src/components/landing/StartProjectContent";

export const metadata: Metadata = {
  title: "Rozpocznij projekt — AbstractArt",
  description: "Opowiedz nam o swoim projekcie — wrócimy z pierwszymi pomysłami i wyceną w ciągu 24 godzin.",
};

export default function StartProjectPage() {
  return <StartProjectContent />;
}
