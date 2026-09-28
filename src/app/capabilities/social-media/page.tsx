import type { Metadata } from "next";
import SocialMediaContent from "@/src/components/landing/SocialMediaContent";

export const metadata: Metadata = {
  title: "Social media marketing — AbstractArt",
  description:
    "Tworzymy i wdrażamy strategie treści i zarządzania profilami, które budują społeczność wokół marki.",
};

export default function SocialMediaPage() {
  return <SocialMediaContent />;
}
