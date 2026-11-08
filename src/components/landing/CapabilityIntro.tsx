import Button from "@/src/components/ui/Button";
import { getCapabilityBySlug, parseMeta } from "@/src/lib/capabilities";
import PosterIntro from "./PosterIntro";

/** (01) na podstronie usługi: plakatowy nagłówek + dane usługi (meta i extraMeta) jako kafle. */
export default function CapabilityIntro({
  slug,
  ...props
}: {
  slug: string;
  eyebrow: string;
  word: string;
  description: string;
  highlight?: string;
  note?: string;
}) {
  const capability = getCapabilityBySlug(slug);
  const tiles = capability ? [...capability.meta, ...(capability.extraMeta ?? [])].map(parseMeta) : [];

  return (
    <PosterIntro
      {...props}
      tiles={tiles}
      actions={
        <>
          <Button href="/contact" variant="ink" size="sm">
            Umów rozmowę →
          </Button>
          <Button href="/#capabilities" variant="outline" size="sm">
            Wszystkie możliwości
          </Button>
        </>
      }
    />
  );
}
