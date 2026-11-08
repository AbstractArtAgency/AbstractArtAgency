import type { Metadata } from "next";
import RealisationsContent from "@/src/components/landing/RealisationsContent";
import { getRealisations } from "@/src/lib/realisations";

export const metadata: Metadata = {
  title: "Realizacje — AbstractArt",
  description: "Zobacz strony i projekty, które wykonaliśmy dla naszych klientów.",
};

export default async function RealisationsPage() {
  const realisations = await getRealisations();
  return <RealisationsContent realisations={realisations} />;
}
