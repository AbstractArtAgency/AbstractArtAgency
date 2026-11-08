import Image from "next/image";

type IconProps = { className?: string; size?: number };

export function ArrowUpRight({ className, size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden="true"
      className={className}
    >
      <path d="M3 11L11 3M5 3h6v6" />
    </svg>
  );
}

export function CircleArrow({ className, size = 40 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      aria-hidden="true"
      className={className}
    >
      <circle cx="20" cy="20" r="19" />
      <path d="M14 26L26 14M17 14h9v9" />
    </svg>
  );
}

export function CirclePlus({ className, size = 44 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      aria-hidden="true"
      className={className}
    >
      <circle cx="22" cy="22" r="21" />
      <path d="M22 12v20M12 22h20" />
    </svg>
  );
}

export function GlobeRings({ className }: IconProps) {
  return (
    <svg
      width="62"
      height="34"
      viewBox="0 0 62 34"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      aria-hidden="true"
      className={className}
    >
      <circle cx="17" cy="17" r="15.5" />
      <circle cx="34" cy="17" r="15.5" />
      <path d="M34 1.5c-5 4-5 27 0 31M34 1.5c5 4 5 27 0 31M19 17h30" />
    </svg>
  );
}

export function Asterisk({ className, size = 26 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      aria-hidden="true"
      className={className}
    >
      <path d="M13 1v24M1 13h24M4.5 4.5l17 17M21.5 4.5l-17 17" />
    </svg>
  );
}

export function SparkLine({ className }: IconProps) {
  return (
    <svg
      width="70"
      height="16"
      viewBox="0 0 70 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      aria-hidden="true"
      className={className}
    >
      <path d="M8 0c0 6 2 8 8 8-6 0-8 2-8 8 0-6-2-8-8-8 6 0 8-2 8-8zM16 8h54" />
    </svg>
  );
}

/** Sygnet „A” — ciepła biel na ciemnym tle, atrament na papierze. */
export function LogoMark({
  variant = "cream",
  height = 34,
  alt = "",
  className,
  priority,
}: {
  variant?: "cream" | "ink";
  height?: number;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round((height * 1212) / 923);
  return (
    <Image
      src={variant === "cream" ? "/brand/logo-cream.png" : "/brand/logo-ink.png"}
      alt={alt}
      width={width}
      height={height}
      preload={priority}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
