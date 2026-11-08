import type { StaticImageData } from "next/image";

/**
 * Blog. Docelowo wpisy przyjdą z Contentful — wtedy wystarczy podmienić ciało
 * getPosts() / getPostBySlug() na zapytania do Contentful API, zachowując kształt obiektów.
 * Treść wpisu to lista prostych bloków, łatwa do zmapowania z Contentful Rich Text.
 */
export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** krótki opis na listę wpisów i do meta description */
  excerpt: string;
  category: string;
  /** data publikacji w formacie ISO (RRRR-MM-DD) */
  date: string;
  /** szacowany czas czytania w minutach */
  readingTime: number;
  author: string;
  /** okładka; null = gradient zastępczy */
  cover: string | StaticImageData | null;
  fallback: string;
  body: BlogBlock[];
};

// Przykładowe wpisy — do zastąpienia wpisami z Contentful.
const posts: BlogPost[] = [
  {
    slug: "jak-zaplanowac-feed-na-instagramie",
    title: "Jak zaplanować feed na Instagramie, który przyciąga klientów",
    excerpt:
      "Spójny feed to nie przypadek. Pokazujemy, jak zaplanować publikacje na miesiąc do przodu i nie stracić przy tym spontaniczności.",
    category: "Social Media",
    date: "2026-10-28",
    readingTime: 6,
    author: "Julia Tenerle",
    cover: null,
    fallback: "/brand/gradient-red.jpg",
    body: [
      {
        type: "paragraph",
        text: "Profil marki na Instagramie to często pierwsze miejsce, w którym klient wyrabia sobie zdanie o firmie. Zanim przeczyta opis czy zajrzy na stronę, ocenia siatkę postów — w kilka sekund.",
      },
      { type: "heading", text: "Zacznij od filarów treści" },
      {
        type: "paragraph",
        text: "Zamiast wymyślać każdy post od zera, ustal 3–4 filary, wokół których będziesz publikować: edukacja, kulisy pracy, realizacje i opinie klientów. Każdy wpis powinien należeć do jednego z nich.",
      },
      {
        type: "list",
        items: [
          "Edukacja — porady i odpowiedzi na częste pytania klientów.",
          "Kulisy — ludzie, proces i codzienność marki.",
          "Realizacje — efekty pracy, najlepiej z liczbami.",
          "Opinie — głos zadowolonych klientów.",
        ],
      },
      { type: "heading", text: "Planuj na miesiąc, publikuj co tydzień" },
      {
        type: "paragraph",
        text: "Miesięczny harmonogram pozwala zachować rytm i spójność wizualną, a cotygodniowy przegląd daje miejsce na reakcję na bieżące wydarzenia.",
      },
      {
        type: "quote",
        text: "Dobry feed nie musi być idealny — musi być rozpoznawalny.",
      },
      {
        type: "paragraph",
        text: "Na koniec każdego miesiąca sprawdź, które posty najlepiej się sprawdziły, i zaplanuj kolejny miesiąc na podstawie danych, a nie przeczucia.",
      },
    ],
  },
  {
    slug: "szybka-strona-www-dlaczego-to-wazne",
    title: "Szybka strona www: dlaczego każda sekunda ładowania ma znaczenie",
    excerpt:
      "Wolna strona traci klientów, zanim ci zdążą zobaczyć ofertę. Wyjaśniamy, co spowalnia strony i jak to naprawić.",
    category: "Strony WWW",
    date: "2026-10-14",
    readingTime: 5,
    author: "Jan Walicki",
    cover: null,
    fallback: "/brand/gradient-orange.jpg",
    body: [
      {
        type: "paragraph",
        text: "Użytkownicy oczekują, że strona załaduje się natychmiast. Każda dodatkowa sekunda oczekiwania zwiększa szansę, że odwiedzający zamknie kartę i wybierze konkurencję.",
      },
      { type: "heading", text: "Najczęstsze przyczyny wolnych stron" },
      {
        type: "list",
        items: [
          "Zbyt duże, nieoptymalizowane zdjęcia.",
          "Nadmiar wtyczek i skryptów zewnętrznych.",
          "Słaby hosting i brak pamięci podręcznej.",
          "Fonty i style ładowane w niewłaściwej kolejności.",
        ],
      },
      { type: "heading", text: "Co możesz zrobić już dziś" },
      {
        type: "paragraph",
        text: "Zacznij od pomiaru — narzędzia takie jak PageSpeed Insights pokażą, które elementy spowalniają stronę najbardziej. Często największą różnicę daje sama kompresja zdjęć.",
      },
      {
        type: "paragraph",
        text: "Szybkość wpływa też na pozycję w Google, więc inwestycja w wydajność strony to jednocześnie inwestycja w widoczność.",
      },
    ],
  },
  {
    slug: "seo-od-czego-zaczac",
    title: "SEO od podstaw: od czego zacząć pozycjonowanie strony",
    excerpt:
      "Pozycjonowanie nie musi być czarną magią. Oto pierwsze kroki, które pomogą Twojej stronie pojawić się wyżej w wynikach wyszukiwania.",
    category: "Pozycjonowanie",
    date: "2026-09-30",
    readingTime: 7,
    author: "Jakub Przyciasa",
    cover: null,
    fallback: "/brand/gradient-wine.jpg",
    body: [
      {
        type: "paragraph",
        text: "SEO to długofalowa praca, ale pierwsze efekty można zobaczyć szybciej, niż się wydaje — pod warunkiem że zaczniesz od fundamentów.",
      },
      { type: "heading", text: "1. Audyt techniczny" },
      {
        type: "paragraph",
        text: "Sprawdź, czy strona jest poprawnie indeksowana, czy nie ma błędów 404 i czy działa dobrze na telefonach. Bez tego nawet najlepsze treści nie będą widoczne.",
      },
      { type: "heading", text: "2. Słowa kluczowe" },
      {
        type: "paragraph",
        text: "Dowiedz się, jak Twoi klienci szukają Twoich usług. Często używają innych słów niż te, których używasz Ty w opisie oferty.",
      },
      { type: "heading", text: "3. Treści, które odpowiadają na pytania" },
      {
        type: "paragraph",
        text: "Google nagradza strony, które najlepiej odpowiadają na pytania użytkowników. Blog firmowy to świetne miejsce, żeby to robić regularnie.",
      },
      {
        type: "quote",
        text: "Najlepsza strategia SEO to strona, która naprawdę pomaga swoim odwiedzającym.",
      },
    ],
  },
  {
    slug: "google-ads-czy-meta-ads",
    title: "Google Ads czy Meta Ads? Gdzie reklamować swoją firmę",
    excerpt:
      "Obie platformy działają, ale w zupełnie inny sposób. Podpowiadamy, którą wybrać na start w zależności od celu kampanii.",
    category: "Kampanie Ads",
    date: "2026-09-16",
    readingTime: 6,
    author: "Jakub Przyciasa",
    cover: null,
    fallback: "/brand/gradient-red.jpg",
    body: [
      {
        type: "paragraph",
        text: "Google Ads i Meta Ads to dwa najpopularniejsze systemy reklamowe, ale odpowiadają na różne potrzeby. Wybór zależy przede wszystkim od tego, na jakim etapie decyzji jest Twój klient.",
      },
      { type: "heading", text: "Google Ads — gdy klient już szuka" },
      {
        type: "paragraph",
        text: "Reklamy w wyszukiwarce trafiają do osób, które aktywnie szukają rozwiązania. To dobry wybór dla usług, na które istnieje konkretne zapotrzebowanie.",
      },
      { type: "heading", text: "Meta Ads — gdy chcesz wzbudzić potrzebę" },
      {
        type: "paragraph",
        text: "Reklamy na Facebooku i Instagramie docierają do ludzi na podstawie zainteresowań. Sprawdzają się przy budowaniu świadomości marki i produktach, które przyciągają wzrok.",
      },
      {
        type: "list",
        items: [
          "Masz ograniczony budżet i konkretną usługę? Zacznij od Google Ads.",
          "Budujesz nową markę lub sprzedajesz produkt wizualny? Postaw na Meta Ads.",
          "Chcesz skalować sprzedaż? Połącz obie platformy.",
        ],
      },
    ],
  },
  {
    slug: "spojna-identyfikacja-wizualna",
    title: "Spójna identyfikacja wizualna: więcej niż ładne logo",
    excerpt:
      "Logo to dopiero początek. Wyjaśniamy, z czego składa się dobra identyfikacja wizualna i dlaczego spójność buduje zaufanie.",
    category: "Branding",
    date: "2026-09-02",
    readingTime: 5,
    author: "Dawid Ślusarczyk",
    cover: null,
    fallback: "/brand/gradient-orange.jpg",
    body: [
      {
        type: "paragraph",
        text: "Identyfikacja wizualna to zestaw zasad, dzięki którym marka wygląda tak samo — na stronie, w social mediach, na wizytówce i na opakowaniu.",
      },
      { type: "heading", text: "Z czego się składa" },
      {
        type: "list",
        items: [
          "Logo i jego warianty.",
          "Paleta kolorów z zasadami użycia.",
          "Typografia — kroje i hierarchia tekstu.",
          "Styl zdjęć, ilustracji i grafik.",
        ],
      },
      { type: "heading", text: "Dlaczego spójność ma znaczenie" },
      {
        type: "paragraph",
        text: "Powtarzalne elementy sprawiają, że klient szybciej rozpoznaje markę i łatwiej jej ufa. Każda niespójność to drobny sygnał, że coś jest nie tak.",
      },
      {
        type: "paragraph",
        text: "Dlatego wszystkie zasady warto zebrać w jednej księdze znaku, z której korzysta każdy, kto tworzy materiały dla marki.",
      },
    ],
  },
];

/** Wpisy od najnowszego. */
export async function getPosts(): Promise<BlogPost[]> {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return posts.find((post) => post.slug === slug);
}

/** „28 października 2026” */
export function formatPostDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
