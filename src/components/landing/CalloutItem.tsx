type Callout = { title: string; desc: string };

/**
 * Hasło obok przewijanego urządzenia na podstronach usług: czerwona kreska,
 * tytuł w kroju nagłówków (wersaliki, pogrubiony) i czytelny opis.
 */
export default function CalloutItem({ callout, side }: { callout: Callout; side: "left" | "right" }) {
  const right = side === "right";
  return (
    <div className={`flex flex-col gap-3 ${right ? "items-end text-right" : "items-start"}`}>
      <span aria-hidden="true" className="h-[3px] w-8 bg-ember" />
      <p className="m-0 font-display text-base font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em] text-ink [overflow-wrap:anywhere] md:text-lg lg:text-xl">
        {callout.title}
      </p>
      <p className="m-0 text-[15px] leading-snug text-ink-soft">{callout.desc}</p>
    </div>
  );
}
