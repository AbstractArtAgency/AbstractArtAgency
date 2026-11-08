/**
 * Model treści Contentful — tylko blog (zdjęcia i filmy reszty strony są w Vercel Blob, docs/MEDIA.md).
 * Opis po ludzku: docs/CONTENTFUL.md. Skrypt seed.ts zakłada ten typ w Contentful.
 */

type Validation = Record<string, unknown>;
export type FieldDef = {
  id: string;
  name: string;
  type: "Symbol" | "Text" | "RichText" | "Integer" | "Number" | "Date" | "Boolean" | "Link" | "Array";
  linkType?: "Entry" | "Asset";
  items?: { type: "Symbol" | "Link"; linkType?: "Entry" | "Asset"; validations?: Validation[] };
  required?: boolean;
  localized?: boolean;
  validations?: Validation[];
};
export type ContentTypeDef = { id: string; name: string; description: string; displayField: string; fields: FieldDef[] };

const text = (id: string, name: string, required = false, validations: Validation[] = []): FieldDef => ({
  id,
  name,
  type: "Symbol",
  required,
  validations,
});
const longText = (id: string, name: string, required = false): FieldDef => ({ id, name, type: "Text", required });
const slug = (): FieldDef => text("slug", "Slug (adres URL)", true, [
  { unique: true },
  { regexp: { pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" }, message: "Tylko małe litery, cyfry i myślniki" },
]);
const image = (id: string, name: string, required = false): FieldDef => ({
  id,
  name,
  type: "Link",
  linkType: "Asset",
  required,
  validations: [{ linkMimetypeGroup: ["image"] }],
});
const int = (id: string, name: string, required = false): FieldDef => ({ id, name, type: "Integer", required });

export const BLOG_CATEGORIES = ["Social Media", "Strony WWW", "Pozycjonowanie", "Kampanie Ads", "Branding", "Inne"];

export const contentTypes: ContentTypeDef[] = [
  {
    id: "blogPost",
    name: "Wpis na blogu",
    description: "Wpis: lista /blog i podstrona /blog/[slug].",
    displayField: "title",
    fields: [
      slug(),
      text("title", "Tytuł", true),
      longText("excerpt", "Zajawka (lista + opis w Google)", true),
      text("category", "Kategoria", true, [{ in: BLOG_CATEGORIES }]),
      { id: "date", name: "Data publikacji", type: "Date", required: true },
      int("readingTime", "Czas czytania (min)"),
      text("author", "Autor (imię i nazwisko)"),
      image("cover", "Okładka"),
      { id: "body", name: "Treść", type: "RichText", required: true },
    ],
  },
];
