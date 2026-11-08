/**
 * Odświeża spis plików (src/lib/media-manifest.json) na podstawie zawartości Vercel Blob.
 * Użyj po wgraniu/usunięciu plików w panelu Vercel:  npm run media:sync
 */
import { requireToken, syncManifest } from "./shared.ts";

syncManifest(requireToken()).catch((error) => {
  console.error(error);
  process.exit(1);
});
