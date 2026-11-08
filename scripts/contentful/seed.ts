/**
 * Zakłada w Contentful typ „Wpis na blogu” i wgrywa przykładowe wpisy (z src/lib/blog.ts).
 *
 * Uruchomienie (Node 22.18+ / 24 — obsługuje TypeScript bez kompilacji):
 *   CONTENTFUL_SPACE_ID=... CONTENTFUL_MANAGEMENT_TOKEN=... npm run contentful:seed
 *   (opcjonalnie CONTENTFUL_ENVIRONMENT=master, domyślnie master)
 *   --dry-run  pokazuje, co zostanie utworzone, bez wysyłania czegokolwiek
 *
 * Skrypt można uruchamiać wielokrotnie: wpisy mają stałe ID, więc zostaną zaktualizowane, a nie zdublowane.
 * Uwaga: ponowne uruchomienie NADPISZE zmiany zrobione ręcznie w Contentful w tych wpisach.
 * Okładek nie wgrywa — pole okładki zostaje puste, a strona pokazuje wtedy gradient zastępczy.
 */
import { getPosts, type BlogBlock } from "../../src/lib/blog.ts";
import { contentTypes } from "./model.ts";

const DRY_RUN = process.argv.includes("--dry-run");
const SPACE = process.env.CONTENTFUL_SPACE_ID;
const TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENV = process.env.CONTENTFUL_ENVIRONMENT ?? "master";

if (!DRY_RUN && (!SPACE || !TOKEN)) {
  console.error("Brak CONTENTFUL_SPACE_ID lub CONTENTFUL_MANAGEMENT_TOKEN. Zobacz docs/CONTENTFUL.md.");
  process.exit(1);
}

const BASE = `https://api.contentful.com/spaces/${SPACE}/environments/${ENV}`;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type CmaResponse = { sys: { version: number }; items?: { code: string; default: boolean }[] };

async function cma(path: string, init: RequestInit = {}, attempt = 0): Promise<CmaResponse | null> {
  await sleep(160); // darmowy plan: ok. 7 zapytań/s do Management API
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      ...(init.headers ?? {}),
    },
  });
  if (res.status === 429 && attempt < 5) {
    await sleep(1000 * (attempt + 1));
    return cma(path, init, attempt + 1);
  }
  if (res.status === 404) return null;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${init.method ?? "GET"} ${path} → ${res.status}: ${JSON.stringify(body)}`);
  return body as CmaResponse;
}

// ---------- pomocnicze: pola, linki, rich text ----------

let LOCALE = "en-US";
const localize = (fields: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(fields)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => [key, { [LOCALE]: value }]),
  );
const textNode = (value: string) => ({ nodeType: "text", value, marks: [], data: {} });
const paragraph = (value: string) => ({ nodeType: "paragraph", data: {}, content: [textNode(value)] });

function richText(blocks: BlogBlock[]) {
  return {
    nodeType: "document",
    data: {},
    content: blocks.map((block) => {
      switch (block.type) {
        case "heading":
          return { nodeType: "heading-2", data: {}, content: [textNode(block.text)] };
        case "list":
          return {
            nodeType: "unordered-list",
            data: {},
            content: block.items.map((item) => ({ nodeType: "list-item", data: {}, content: [paragraph(item)] })),
          };
        case "quote":
          return { nodeType: "blockquote", data: {}, content: [paragraph(block.text)] };
        default:
          return paragraph(block.text);
      }
    }),
  };
}

// ---------- zapis ----------

async function upsertContentType(def: (typeof contentTypes)[number]) {
  if (DRY_RUN) return console.log(`[typ] ${def.id}`);
  const existing = await cma(`/content_types/${def.id}`);
  const saved = (await cma(`/content_types/${def.id}`, {
    method: "PUT",
    headers: existing ? { "X-Contentful-Version": String(existing.sys.version) } : {},
    body: JSON.stringify({ name: def.name, description: def.description, displayField: def.displayField, fields: def.fields }),
  }))!;
  await cma(`/content_types/${def.id}/published`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(saved.sys.version) },
  });
  console.log(`✓ typ ${def.id}`);
}

const entries: { id: string; type: string; fields: Record<string, unknown> }[] = [];
const add = (id: string, type: string, fields: Record<string, unknown>) => entries.push({ id, type, fields });

async function upsertEntry({ id, type, fields }: (typeof entries)[number]) {
  if (DRY_RUN) return console.log(`[wpis] ${type} → ${id}`);
  const existing = await cma(`/entries/${id}`);
  const saved = await cma(`/entries/${id}`, {
    method: "PUT",
    headers: {
      "X-Contentful-Content-Type": type,
      ...(existing ? { "X-Contentful-Version": String(existing.sys.version) } : {}),
    },
    body: JSON.stringify({ fields: localize(fields) }),
  });
  return saved;
}

async function publishEntry(id: string) {
  if (DRY_RUN) return;
  const entry = await cma(`/entries/${id}`);
  await cma(`/entries/${id}/published`, { method: "PUT", headers: { "X-Contentful-Version": String(entry!.sys.version) } });
}

// ---------- treści ----------

async function buildEntries() {
  const posts = await getPosts();
  for (const post of posts) {
    add(`post-${post.slug}`, "blogPost", {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      readingTime: post.readingTime,
      author: post.author,
      body: richText(post.body),
    });
  }
}

/** Sprawdza wpisy względem modelu przed wysłaniem: nieznane pola, brak wymaganych, za długie teksty. */
function validate() {
  const problems: string[] = [];
  for (const entry of entries) {
    const def = contentTypes.find((type) => type.id === entry.type)!;
    for (const key of Object.keys(entry.fields)) {
      if (!def.fields.some((field) => field.id === key)) problems.push(`${entry.id}: nieznane pole ${key}`);
    }
    for (const field of def.fields) {
      const value = entry.fields[field.id];
      if (field.required && (value === undefined || value === null || value === "")) problems.push(`${entry.id}: brak ${field.id}`);
      if (field.type === "Symbol" && typeof value === "string" && value.length > 255) problems.push(`${entry.id}: ${field.id} > 255 znaków`);
    }
  }
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
}

async function main() {
  if (!DRY_RUN) {
    const locales = await cma("/locales");
    LOCALE = locales?.items?.find((locale) => locale.default)?.code ?? "en-US";
    console.log(`Space ${SPACE} / ${ENV}, domyślny język: ${LOCALE}`);
  }

  for (const def of contentTypes) await upsertContentType(def);

  await buildEntries();
  validate();
  // najpierw zapis wszystkich (linki mogą wskazywać na wpisy tworzone później), potem publikacja
  for (const entry of entries) await upsertEntry(entry);
  for (const entry of entries) await publishEntry(entry.id);

  console.log(`${DRY_RUN ? "[dry-run] " : "✓ "}${contentTypes.length} typów, ${entries.length} wpisów.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
