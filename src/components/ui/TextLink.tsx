"use client";

import type { AnchorHTMLAttributes, PointerEvent } from "react";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** klasa koloru napisu po najechaniu, np. "text-ember" */
  hoverClassName: string;
};

/**
 * Link z samym tekstem. Hover jak w <Button>: nowy kolor napisu rozlewa się kołem
 * od miejsca, w którym wjechał kursor, aż pokryje cały napis (style: .text-link-fill w globals.css).
 */
export default function TextLink({
  hoverClassName,
  className = "",
  children,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: TextLinkProps) {
  // środek koła liczony względem samego napisu; promień = przekątna, żeby pokryć go z każdego punktu
  function setOrigin(event: PointerEvent<HTMLAnchorElement>) {
    const label = event.currentTarget.querySelector<HTMLElement>("[data-text-link-label]");
    if (!label) return;
    const rect = label.getBoundingClientRect();
    const style = event.currentTarget.style;
    style.setProperty("--tl-x", `${event.clientX - rect.left}px`);
    style.setProperty("--tl-y", `${event.clientY - rect.top}px`);
    style.setProperty("--tl-r", `${Math.ceil(Math.hypot(rect.width, rect.height))}px`);
  }

  return (
    <a
      {...rest}
      data-text-link=""
      onPointerEnter={(event) => {
        setOrigin(event);
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event) => {
        setOrigin(event);
        onPointerLeave?.(event);
      }}
      className={className}
    >
      <span data-text-link-label="" className="relative inline-flex items-center gap-[inherit]">
        {children}
        <span
          aria-hidden="true"
          className={`text-link-fill pointer-events-none absolute inset-0 inline-flex items-center gap-[inherit] ${hoverClassName}`}
        >
          {children}
        </span>
      </span>
    </a>
  );
}
