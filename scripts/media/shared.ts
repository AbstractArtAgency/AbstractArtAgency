import { writeFileSync } from "node:fs";
import { list } from "@vercel/blob";

export const MANIFEST_PATH = new URL("../../src/lib/media-manifest.json", import.meta.url);

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
  svg: "image/svg+xml",
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
};

export const contentTypeOf = (pathname: string) =>
  TYPES[pathname.split(".").pop()?.toLowerCase() ?? ""] ?? "application/octet-stream";

export const slotOf = (pathname: string) => pathname.replace(/\.[a-z0-9]+$/i, "");

export function requireToken() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("Brak BLOB_READ_WRITE_TOKEN — dodaj go do .env.local (patrz docs/MEDIA.md).");
    process.exit(1);
  }
  return token;
}

/** Pobiera spis wszystkich plików z Vercel Blob i zapisuje src/lib/media-manifest.json. */
export async function syncManifest(token: string) {
  const manifest: Record<string, { pathname: string; url: string; contentType: string }> = {};
  let cursor: string | undefined;
  do {
    const page = await list({ token, cursor, limit: 1000 });
    for (const blob of page.blobs) {
      manifest[slotOf(blob.pathname)] = {
        pathname: blob.pathname,
        url: blob.url,
        contentType: contentTypeOf(blob.pathname),
      };
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`✓ media-manifest.json: ${Object.keys(sorted).length} plików`);
}
