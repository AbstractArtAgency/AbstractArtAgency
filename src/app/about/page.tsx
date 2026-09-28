import type { Metadata } from "next";
import AboutContent from "@/src/components/landing/AboutContent";

export const metadata: Metadata = {
  title: "O nas AbstractArt",
  description: "Poznaj AbstractArt — software house tworzący strony internetowe i marketing, który napędza wzrost realnych biznesów.",
};

export default function AboutPage() {
  return <AboutContent />;
}
