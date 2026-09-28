import type { Metadata } from "next";
import BrandingContent from "@/src/components/landing/BrandingContent";

export const metadata: Metadata = {
  title: "Branding — AbstractArt",
  description: "Projektujemy identyfikację wizualną, która buduje zaufanie i odzwierciedla twoje cele.",
};

export default function BrandingPage() {
  return <BrandingContent />;
}
