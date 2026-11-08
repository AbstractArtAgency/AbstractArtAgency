import manifest from "./media-manifest.json" with { type: "json" };

/**
 * Zdjęcia i filmy z Vercel Blob.
 *
 * Każde miejsce na stronie ma stałą ścieżkę („slot”), np. `realisations/time2run/cover`.
 * Plik wgrany do Blob pod tą ścieżką (z dowolnym rozszerzeniem, np. `.jpg`, `.mp4`) pojawia się na stronie;
 * dopóki go nie ma, strona pokazuje gradient zastępczy. Lista slotów: docs/MEDIA.md.
 *
 * media-manifest.json generuje `npm run media:sync` (albo `media:upload`) — to spis plików z Blob.
 */
export type MediaFile = { pathname: string; url: string; contentType: string };

const files = manifest as Record<string, MediaFile>;

/** Ścieżka bez rozszerzenia: `team/jan-walicki.jpg` → `team/jan-walicki`. */
export const slotOf = (pathname: string) => pathname.replace(/\.[a-z0-9]+$/i, "");

/** Pełna informacja o pliku (adres + typ) albo null. */
export function mediaFile(slot: string): MediaFile | null {
  return files[slot] ?? null;
}

/** Adres pliku dla slotu albo null, gdy plik nie został jeszcze wgrany. */
export function media(slot: string): string | null {
  return files[slot]?.url ?? null;
}

/** Wszystkie pliki w folderze (np. galeria realizacji), posortowane po nazwie. */
export function mediaList(folder: string): MediaFile[] {
  const prefix = folder.endsWith("/") ? folder : `${folder}/`;
  return Object.values(files)
    .filter((file) => file.pathname.startsWith(prefix))
    .sort((a, b) => a.pathname.localeCompare(b.pathname, "pl", { numeric: true }));
}

export const isVideo = (file: MediaFile) => file.contentType.startsWith("video/");

/** „Jan Walicki” → „jan-walicki” (nazwy plików zdjęć zespołu). */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Lokalne kopie grafik marki (public/brand) — używane, dopóki nie zostaną wgrane do Blob jako brand/<nazwa>. */
const BRAND_FALLBACK = {
  "gradient-red": "/brand/gradient-red.jpg",
  "gradient-orange": "/brand/gradient-orange.jpg",
  "gradient-wine": "/brand/gradient-wine.jpg",
  "hero-bg": "/brand/hero-bg.jpg",
  "cta-bg": "/brand/cta-bg.jpg",
  "paper-grain": "/brand/paper-grain.png",
} as const;

export type BrandImage = keyof typeof BRAND_FALLBACK;

/** Grafika marki: z Vercel Blob (`brand/gradient-red.webp` itd.), a gdy jej tam nie ma — z public/brand. */
export function brandImage(name: BrandImage): string {
  return media(`brand/${name}`) ?? BRAND_FALLBACK[name];
}
