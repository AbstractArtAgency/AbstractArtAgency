# Contentful — blog

Contentful służy wyłącznie do wpisów na blogu. Zdjęcia i filmy reszty strony są w Vercel Blob (`docs/MEDIA.md`), a pozostałe treści w kodzie.

## Typ treści: Wpis na blogu (`blogPost`)

| Pole | Typ | Opis |
|---|---|---|
| Slug\* | tekst, unikalny | adres wpisu `/blog/<slug>` — małe litery, cyfry, myślniki |
| Tytuł\* | tekst | |
| Zajawka\* | długi tekst | lista wpisów i opis w Google |
| Kategoria\* | lista | Social Media, Strony WWW, Pozycjonowanie, Kampanie Ads, Branding, Inne |
| Data publikacji\* | data | kolejność na liście (najnowszy jako duży kafel) |
| Czas czytania | liczba | minuty |
| Autor | tekst | imię i nazwisko |
| Okładka | zdjęcie (Contentful Media) | bez okładki strona pokazuje gradient |
| Treść\* | Rich Text | akapity, nagłówki H2, listy, cytaty |

To jeden typ treści i kilka–kilkadziesiąt wpisów, więc mieści się w darmowym planie. Przed wdrożeniem produkcyjnym sprawdź aktualne warunki planu Free: <https://www.contentful.com/help/admin/usage/usage-limit/>.

## Krok po kroku

1. Załóż space w Contentful (język domyślny może zostać `en-US` — to tylko kod techniczny).
2. Utwórz **Personal access token** (*Settings → CMA tokens*) — tylko do jednorazowego skryptu, nie wysyłaj go nikomu.
3. Załóż typ treści i 5 przykładowych wpisów (z katalogu projektu):
   ```bash
   CONTENTFUL_SPACE_ID=twoje_space_id CONTENTFUL_MANAGEMENT_TOKEN=twoj_cma_token npm run contentful:seed
   ```
   Podgląd bez wysyłania: `npm run contentful:seed -- --dry-run`. Ponowne uruchomienie nadpisuje przykładowe wpisy.
4. Utwórz **API key** (*Settings → API keys*) i przekaż mi dane z tabeli niżej — wtedy podłączę stronę bloga.

## Czego potrzebuję od Ciebie

| Dane | Gdzie znaleźć |
|---|---|
| Space ID | Settings → General settings |
| Environment | zwykle `master` |
| Content Delivery API — access token | Settings → API keys |
| Content Preview API — access token (opcjonalnie) | ten sam klucz — podgląd szkiców |
| Gdzie stoi strona (np. Vercel) | do odświeżania bloga po publikacji (webhook) |

Wpisz je do `.env.local` (ignorowany przez git) i do zmiennych środowiskowych projektu w Vercel:

```bash
CONTENTFUL_SPACE_ID=
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_DELIVERY_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=
```
