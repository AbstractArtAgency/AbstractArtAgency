"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PointerEvent, ReactNode } from "react";
import { buttonSizes, buttonVariants, type ButtonSize, type ButtonVariant } from "@/src/lib/button";

type CommonProps = {
  variant: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

// z href → <a>, bez href → <button> (np. submit w formularzu)
type ButtonProps =
  | (CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined });

export const buttonEase = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const ease = buttonEase;
export const showNew =
  "group-hover/btn:translate-y-0 group-hover/btn:opacity-100 group-focus-visible/btn:translate-y-0 group-focus-visible/btn:opacity-100";
export const hideOld =
  "group-hover/btn:translate-y-1.5 group-hover/btn:opacity-0 group-focus-visible/btn:translate-y-1.5 group-focus-visible/btn:opacity-0";

// punkt wejścia/wyjścia kursora = środek koła; średnica pokrywa przycisk z każdego punktu
export function setOrigin(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--btn-x", `${event.clientX - rect.left}px`);
  el.style.setProperty("--btn-y", `${event.clientY - rect.top}px`);
  el.style.setProperty("--btn-d", `${Math.ceil(Math.hypot(rect.width, rect.height) * 2)}px`);
}

/**
 * Sama warstwa hovera przycisków (koło koloru od kursora + podmiana napisu) do użycia w innych
 * elementach-pigułkach. Rodzic musi mieć: `group/btn relative isolate overflow-hidden`
 * oraz onPointerEnter/onPointerLeave={setOrigin}.
 */
export function HoverFill({ fill, hoverText, children }: { fill: string; hoverText: string; children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        style={{
          left: "var(--btn-x, 50%)",
          top: "var(--btn-y, 50%)",
          width: "var(--btn-d, 300%)",
          height: "var(--btn-d, 300%)",
        }}
        className={`pointer-events-none absolute -z-1 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full ${fill} transition-transform duration-700 ${ease} group-hover/btn:scale-100 group-focus-visible/btn:scale-100 motion-reduce:transition-none`}
      />
      <span className="relative block min-w-0">
        <span className={`flex items-center justify-center gap-2.5 transition-[translate,opacity] duration-500 ${ease} ${hideOld} motion-reduce:transition-none`}>
          {children}
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-0 flex -translate-y-1.5 items-center justify-center gap-2.5 opacity-0 transition-[translate,opacity] duration-500 ${ease} ${showNew} ${hoverText} motion-reduce:transition-none`}
        >
          {children}
        </span>
      </span>
    </>
  );
}

/**
 * Pigułka (link albo <button>) z hoverem: kolor rozlewa się kołem od miejsca, w którym kursor wszedł
 * (i zwija się do miejsca wyjścia), a napis w nowym kolorze delikatnie opada z góry,
 * a stary wygasza się, lekko opadając w dół (przesunięcie tylko 6px).
 */
export default function Button(props: ButtonProps) {
  const { variant, size = "md", className = "", children, ...rest } = props;
  const v = buttonVariants[variant];

  const classes = `group/btn relative isolate inline-flex items-center justify-center overflow-hidden rounded-full text-center disabled:pointer-events-none disabled:opacity-50 ${buttonSizes[size]} ${v.base} ${className}`;

  const content = (
    <>
      <span
        aria-hidden="true"
        style={{
          left: "var(--btn-x, 50%)",
          top: "var(--btn-y, 50%)",
          width: "var(--btn-d, 300%)",
          height: "var(--btn-d, 300%)",
        }}
        className={`pointer-events-none absolute -z-1 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full ${v.fill} transition-transform duration-700 ${ease} group-hover/btn:scale-100 group-focus-visible/btn:scale-100 motion-reduce:transition-none`}
      />
      <span className="relative block min-w-0">
        <span
          className={`flex items-center justify-center gap-2.5 transition-[translate,opacity] duration-500 ${ease} ${hideOld} motion-reduce:transition-none`}
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-0 flex -translate-y-1.5 items-center justify-center gap-2.5 opacity-0 transition-[translate,opacity] duration-500 ${ease} ${showNew} ${v.hoverText} motion-reduce:transition-none`}
        >
          {children}
        </span>
      </span>
    </>
  );

  if (rest.href !== undefined) {
    const { onPointerEnter, onPointerLeave, ...anchor } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...anchor}
        onPointerEnter={(event) => {
          setOrigin(event);
          onPointerEnter?.(event);
        }}
        onPointerLeave={(event) => {
          setOrigin(event);
          onPointerLeave?.(event);
        }}
        className={classes}
      >
        {content}
      </a>
    );
  }

  const { onPointerEnter, onPointerLeave, type = "button", ...button } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...button}
      type={type}
      onPointerEnter={(event) => {
        setOrigin(event);
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event) => {
        setOrigin(event);
        onPointerLeave?.(event);
      }}
      className={classes}
    >
      {content}
    </button>
  );
}
