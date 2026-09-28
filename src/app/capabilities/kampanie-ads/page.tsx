import type { Metadata } from "next";
import KampanieAdsContent from "@/src/components/landing/KampanieAdsContent";

export const metadata: Metadata = {
  title: "Kampanie reklamowe Ads — AbstractArt",
  description: "Tworzymy kampanie Google Ads i Meta Ads, aby twoja marka była jeszcze bardziej widoczna.",
};

export default function KampanieAdsPage() {
  return <KampanieAdsContent />;
}
