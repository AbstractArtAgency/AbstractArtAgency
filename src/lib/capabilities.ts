export type Capability = {
  slug: string;
  navLabel: string;
  title: string;
  desc: string;
  /** "Etykieta: wartość" — pokazywane na stronie głównej (sekcja Możliwości) i na podstronie usługi */
  meta: string[];
  /**
   * Dodatkowe pozycje w tym samym formacie, widoczne TYLKO na podstronie usługi (pod `meta`).
   * Np. extraMeta: ["Raportowanie: co miesiąc", "Wsparcie: dedykowany opiekun"]
   */
  extraMeta?: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "social-media",
    navLabel: "Social Media",
    title: "Social media marketing",
    desc: "Tworzymy i wdrażamy strategie treści i zarządzania profilami, które budują docelowy wizerunek oraz społeczność wokół marki.",
    meta: [
      "Zakres: strategia, treści, moderacja",
      "Publikacje: harmonogram tygodniowy",
      "Efekt: rosnąca społeczność marki, wykreowanie docelowego wizerunku",
    ],
    extraMeta: [],
  },
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
    extraMeta: [],
  },
  {
    slug: "pozycjonowanie",
    navLabel: "Pozycjonowanie",
    title: "SEO i pozycjonowanie",
    desc: "Optymalizujemy strony internetowe pod kątem pozycjonowania w internecie. Podnosimy pozycje w wyszukiwarkach i zwiększamy ruch organiczny.",
    meta: [
      "Zakres: audyt, modyfikacja kodu, linkbuilding",
      "Pierwsze efekty: 2-3 miesiące",
      "Efekt: zdecydowanie wyższa pozycja strony, wzrost ruchu organicznego",
    ],
    extraMeta: [],
  },
  {
    slug: "kampanie-ads",
    navLabel: "Kampanie Ads",
    title: "Kampanie reklamowe Ads",
    desc: "Tworzymy strategie kampanii Ads (Google, Mata, LinkedIn, itp.). Planujemy, nagrywamy i wdrażamy płatne kampanie reklamowe.",
    meta: [
      "Zakres: Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads, X Ads, itp.",
      "Rozliczenie: model efektywnościowy",
      "Efekt: sponsorowane wyniki wyszukiwania i reklamy w social mediach",
    ],
    extraMeta: [],
  },
  {
    slug: "branding",
    navLabel: "Branding",
    title: "Branding",
    desc: "Projektujemy identyfikację wizualną, która buduje zaufanie i odzwierciedla twoje cele.",
    meta: [
      "Zakres: logo, system wizualny, UI, system komunikacyjny",
      "Czas realizacji: 2-4 tygodni",
      "Efekt: spójna identyfikacja twojej marki",
    ],
    extraMeta: [],
  },
];

/** Rozbija "Etykieta: wartość" na części do wyświetlenia. */
export function parseMeta(line: string) {
  const [label, ...rest] = line.split(": ");
  return { label, value: rest.join(": ") };
}

export function getCapabilityBySlug(slug: string) {
  return capabilities.find((capability) => capability.slug === slug);
}
