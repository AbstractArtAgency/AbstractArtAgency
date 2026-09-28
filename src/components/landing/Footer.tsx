import { Code2, Globe2, Mail } from "lucide-react";
import Image from "next/image";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const socialLinks = [
  {
    icon: Code2,
    href: "https://github.com/AbstractArtAgency",
    label: "Kod",
    external: true,
  },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: Globe2, href: "/", label: "Web" },
  { icon: Mail, href: "mailto:abstractartagency@gmail.com", label: "E-mail" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-cream">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-20">
        <div className="overflow-hidden w-full flex items-center justify-center">
          <h2 className="select-none font-display text-[18vw] font-black leading-none tracking-tight text-ink opacity-[0.06] md:text-[14vw]">
            AbstractArt.
          </h2>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-8 border-t border-line pt-8 md:flex-row md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <Image
                src="/AbstractArt_logo.png"
                alt="AbstractArt"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
              <span className="font-display font-bold text-ink">
                AbstractArt<span className="text-ember">.</span>
              </span>
            </div>
            <p className="max-w-md font-mono text-sm text-stone">
              Agencja tworząca nowoczesne strony internetowe i kampanie marketingowe. Projektujemy, kodujemy i skalujemy marki online.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  className="flex h-10 w-10 rounded-full items-center justify-center border border-line text-stone transition-all duration-300 hover:border-ember/50 hover:bg-ember/5 hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 md:flex-row">
          <p className="font-mono text-xs text-stone">
            © 2026 AbstractArt Studio.
          </p>
          <div className="flex items-center gap-6">
            <a href="#top" className="font-mono text-xs text-stone transition-colors hover:text-ink">
              Do góry
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
