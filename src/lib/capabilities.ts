export type Capability = {
  slug: string;
  navLabel: string;
  title: string;
  desc: string;
  meta: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "strony-www",
    navLabel: "Strony WWW",
    title: "Strony WWW",
    desc: "Projektujemy i wdrażamy nowoczesne i szybkie strony www, oraz obsługujemy już istniejące.",
    meta: [
      "Zakres: projekt, kod, wdrożenie, (opcjonalnie utrzymanie)",
      "Czas realizacji: 2-4 tygodni",
      "Efekt: gotowa strona internetowa dla Twojej firmy",
    ],
  },
  {
    slug: "pozycjonowanie",
    navLabel: "Pozycjonowanie",
    title: "SEO i pozycjonowanie",
    desc: "Optymalizujemy strony internetowe pod kątem pozycjonowania w internecie.",
    meta: [
      "Zakres: audyt, modyfikacja kodu, linkbuilding",
      "Pierwsze efekty: 2-3 miesiące",
      "Efekt: wzrost ruchu organicznego",
    ],
  },
  {
    slug: "kampanie-ads",
    navLabel: "Kampanie Ads",
    title: "Kampanie reklamowe Ads",
    desc: "Tworzymy kampanie Google Ads i Meta Ads, aby twoja marka była jeszcze bardziej widoczna.",
    meta: [
      "Zakres: Google Ads, Meta Ads",
      "Rozliczenie: model efektywnościowy",
      "Efekt: sponsorowane wyniki wyszukiwania i reklamy w social mediach",
    ],
  },
  {
    slug: "branding",
    navLabel: "Branding",
    title: "Branding",
    desc: "Projektujemy identyfikację wizualną, która buduje zaufanie i odzwierciedla twoje cele.",
    meta: [
      "Zakres: logo, system wizualny, UI",
      "Czas realizacji: 2-4 tygodni",
      "Efekt: spójna identyfikacja twojej marki",
    ],
  },
  {
    slug: "social-media",
    navLabel: "Social Media",
    title: "Social media marketing",
    desc: "Tworzymy i wdrażamy strategie treści i zarządzania profilami, które budują społeczność wokół marki.",
    meta: [
      "Zakres: strategia, treści, moderacja",
      "Publikacje: harmonogram tygodniowy",
      "Efekt: rosnąca społeczność marki",
    ],
  },
];

export function getCapabilityBySlug(slug: string) {
  return capabilities.find((capability) => capability.slug === slug);
}
