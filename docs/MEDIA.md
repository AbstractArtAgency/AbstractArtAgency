# Zdjęcia i filmy — Vercel Blob

Wszystkie zdjęcia i filmy strony (poza blogiem, który idzie przez Contentful) trzymamy w **Vercel Blob**. Każde miejsce na stronie ma stałą ścieżkę — **slot**. Wystarczy wgrać plik pod tą ścieżką (z dowolnym rozszerzeniem), a pojawi się na stronie. Dopóki pliku nie ma, strona pokazuje gradient marki.

## Sloty

| Slot (ścieżka bez rozszerzenia) | Gdzie na stronie | Format |
|---|---|---|
| `brand/gradient-red`, `-orange`, `-wine` | gradienty marki — zastępcze tła kart i okładek wszędzie, gdzie nie ma zdjęcia | gotowe pliki WebP w `media/brand/` |
| `brand/hero-bg`, `brand/cta-bg`, `brand/paper-grain` | domyślne tło hero, tło sekcji kontaktowej, ziarno papieru | gotowe pliki w `media/brand/` |
| `home/hero` | tło hero na stronie głównej — **zdjęcie albo film** | poziomy, min. 1920 px; film MP4 bez dźwięku, krótka pętla |
| `home/social-works/1`, `/2`, `/3` | karty „Realizacje social media” na stronie głównej | pionowe 4:5 |
| `featured/<usługa>` | karta po najechaniu na usługę na stronie Realizacje | social-media, kampanie-ads, branding: pionowe 4:5; strony-www, pozycjonowanie: poziome 16:10 |
| `realisations/<slug>/cover` | okładka realizacji: tło po hoverze na liście, karty w hero, okładka podstrony | poziome 16:9 |
| `realisations/<slug>/gallery/<nazwa>` | galeria na podstronie realizacji — **zdjęcia i filmy**, kolejność wg nazwy (01, 02, …) | 4:3; filmy MP4 |
| `realisations-page/thumbnail` | miniatura po prawej w hero strony Realizacje | poziome 16:10 |
| `realisations-page/avatar-1`, `-2`, `-3` | okrągłe miniatury przy „10+” | kwadrat |
| `team/<imie-nazwisko>` | zdjęcie osoby na stronie O nas | pionowe 4:5 |

**Usługi (`<usługa>`):** `social-media`, `strony-www`, `pozycjonowanie`, `kampanie-ads`, `branding`.

**Realizacje (`<slug>`):** `rn-serwis-elektroniki`, `time2run`, `jacob-przyciasa-portfolio`, `przyklad-social-media`, `przyklad-social-media-2`, `przyklad-pozycjonowanie`, `przyklad-kampanie-ads`, `przyklad-branding` (lista w `src/lib/realisations.ts`).

**Zespół (`<imie-nazwisko>`):** `jakub-przyciasa`, `dawid-slusarczyk`, `jan-walicki`, `julia-tenerle` — małe litery, bez polskich znaków, spacje → myślniki.

Przykłady: `team/jan-walicki.jpg`, `realisations/time2run/cover.jpg`, `realisations/time2run/gallery/01.jpg`, `realisations/time2run/gallery/02.mp4`, `home/hero.mp4`.

Obsługiwane formaty: JPG, PNG, WebP, AVIF, GIF, SVG, MP4, WebM, MOV. Zdjęcia wrzucaj do ok. 2500 px szerokości — strona sama je zmniejsza.

## Jednorazowa konfiguracja

1. W panelu Vercel: projekt → **Storage → Create → Blob**, podłącz store do projektu. Vercel sam doda zmienną `BLOB_READ_WRITE_TOKEN` do projektu.
2. Skopiuj ten token do pliku `.env.local` w katalogu projektu (plik jest ignorowany przez git):
   ```bash
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
   ```

## Jak wgrywać pliki

**Sposób 1 — z komputera (zalecany):** ułóż pliki w folderze `media/` w katalogu projektu dokładnie wg slotów (folder jest ignorowany przez git), np.:

```
media/
  home/hero.mp4
  team/jan-walicki.jpg
  realisations/time2run/cover.jpg
  realisations/time2run/gallery/01.jpg
```

Gotowa struktura folderów jest już w `media/` — w każdym folderze plik `_PLIKI.txt` podpowiada, jakie nazwy plików tam wrzucić. Notatki `_PLIKI.txt` (i wszystkie pliki zaczynające się od `_` lub `.`) nie są wgrywane. Puste foldery nic nie zmieniają — wrzucaj pliki stopniowo.

Potem uruchom:

```bash
npm run media:upload
```

Skrypt wgra pliki pod właściwe ścieżki (nadpisując istniejące) i odświeży spis plików `src/lib/media-manifest.json`.

**Sposób 2 — przez panel Vercel:** wgraj plik w Storage → Blob, nadając mu nazwę zgodną ze slotem (bez losowego sufiksu), a potem uruchom `npm run media:sync`, żeby odświeżyć spis.

W obu przypadkach **zatwierdź zmieniony `src/lib/media-manifest.json` (commit) i wdroż stronę** — spis jest częścią kodu, dzięki czemu strona nie odpytuje Blob przy każdym wejściu.

## Usuwanie

Usuń plik w panelu Vercel (Storage → Blob), uruchom `npm run media:sync` i wdroż — w tym miejscu wróci gradient.
