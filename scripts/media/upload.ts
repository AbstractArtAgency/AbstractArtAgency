/**
 * Wgrywa folder z plikami do Vercel Blob z zachowaniem ścieżek (= slotów strony) i odświeża spis.
 *
 *   npm run media:upload            → wgrywa folder ./media
 *   npm run media:upload -- inny/folder
 *
 * Przykład: media/realisations/time2run/cover.jpg trafi pod ścieżkę realisations/time2run/cover.jpg
 * i od razu pojawi się jako okładka realizacji Time2run. Istniejące pliki o tej samej ścieżce są nadpisywane.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { put } from "@vercel/blob";
import { contentTypeOf, requireToken, syncManifest } from "./shared.ts";

const root = process.argv[2] ?? "media";

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    // pomijane: pliki ukryte (.DS_Store) i notatki zaczynające się od „_” (np. _PLIKI.txt)
    if (name.startsWith(".") || name.startsWith("_")) return [];
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

async function main() {
  const token = requireToken();
  const files = walk(root);
  if (files.length === 0) return console.log(`Folder ${root} jest pusty.`);

  for (const file of files) {
    const pathname = relative(root, file).split(sep).join("/");
    const size = statSync(file).size;
    await put(pathname, readFileSync(file), {
      access: "public",
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: contentTypeOf(pathname),
      multipart: size > 5 * 1024 * 1024,
      cacheControlMaxAge: 60 * 60 * 24 * 30,
    });
    console.log(`✓ ${pathname} (${(size / 1024 / 1024).toFixed(1)} MB)`);
  }

  await syncManifest(token);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
