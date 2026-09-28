import type { Metadata } from "next";
import RealisationsContent from "@/src/components/landing/RealisationsContent";

export const metadata: Metadata = {
  title: "Realizacje — AbstractArt",
  description: "Zobacz strony i projekty, które wykonaliśmy dla naszych klientów.",
};

export default function RealisationsPage() {
  return <RealisationsContent />;
}
