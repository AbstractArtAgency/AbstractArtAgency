import type { Metadata } from "next";
import AboutContent from "@/src/components/landing/AboutContent";

export const metadata: Metadata = {
  title: "O nas - AbstractArt",
  description: "Poznaj nasz zespół. Multidyscyplinarni kreatywni profesjonaliści..",
};

export default function AboutPage() {
  return <AboutContent />;
}
