import type { Metadata } from "next";
import StartProjectContent from "@/src/components/landing/StartProjectContent";

export const metadata: Metadata = {
  title: "Rozpocznij projekt - AbstractArt",
  description: "Opowiedz nam o swoim celu. Odpiszemy z pierwszymi pomysłami w ciągu 24 godzin.",
};

export default function StartProjectPage() {
  return <StartProjectContent />;
}
