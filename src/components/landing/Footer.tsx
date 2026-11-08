import { Code2, Globe2, Mail } from "lucide-react";
import { LogoMark } from "./Brand";
import TextLink from "@/src/components/ui/TextLink";
import Button from "@/src/components/ui/Button";
import { capabilities } from "@/src/lib/capabilities";
import { EMAIL, PHONE, phoneHref } from "@/src/lib/contact";
import Link from "next/link";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
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
  { icon: Mail, href: `mailto:${EMAIL}`, label: "E-mail" },
];

// mapa strony: wszystkie istniejące podstrony
const footerColumns = [
  {
    title: "Możliwości",
    links: capabilities.map((item) => ({ label: item.navLabel, href: `/capabilities/${item.slug}` })),
  },
  {
    title: "Agencja",
    links: [
      { label: "Strona główna", href: "/" },
      { label: "Realizacje", href: "/realisations" },
      { label: "O nas", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Kariera", href: "/careers" },
    ],
  },
  {
    title: "Współpraca",
    links: [
      { label: "Rozpocznij projekt", href: "/start-project" },
      { label: "Kontakt", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="theme-dark relative bg-cream pt-3 text-ink md:pt-4">
      {/* panel z ciepłym gradientem wyłaniającym się od dołu, jak plakat */}
      <div className="@container relative isolate overflow-hidden rounded-t-[24px] bg-[#120706]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-1"
          style={{
            background:
              "radial-gradient(120% 80% at 85% 115%, rgba(241,96,1,0.55), transparent 60%), radial-gradient(90% 70% at 15% 120%, rgba(221,30,27,0.45), transparent 60%)",
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 bg-noise opacity-20 mix-blend-overlay" />

        <div className="relative z-10 flex flex-col gap-12 px-6 pt-10 md:flex-row md:justify-between md:gap-10 md:px-10 md:pt-12">
          {/* lewa: logo + mapa strony */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="flex w-fit items-center gap-3">
              <LogoMark height={28} alt="AbstractArt" />
              <span className="text-[19px] font-bold tracking-[-0.01em] text-ink">
                AbstractArt
              </span>
            </Link>

            <nav aria-label="Mapa strony" className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.title} className="flex flex-col gap-3">
                  <p className="m-0 font-mono text-[10px] uppercase tracking-[0.16em] text-stone">{column.title}</p>
                  <ul className="m-0 flex list-none flex-col p-0">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <TextLink
                          href={link.href}
                          hoverClassName="text-ember-light"
                          className="inline-flex min-h-9 items-center text-[17px] font-medium text-ink"
                        >
                          {link.label}
                        </TextLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* prawa: social media + dane kontaktowe, wyrównane do prawej */}
          <div className="flex flex-col items-start gap-5 md:items-end md:text-right">
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    variant="outline"
                    size="icon"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </Button>
                );
              })}
            </div>
            <div className="flex flex-col gap-1.5 md:items-end">
              <TextLink href={`mailto:${EMAIL}`} hoverClassName="text-ember-light" className="inline-flex text-[15px] text-ink">
                E-mail: {EMAIL}
              </TextLink>
              <TextLink href={phoneHref} hoverClassName="text-ember-light" className="inline-flex text-[15px] text-ink">
                Telefon: {PHONE}
              </TextLink>
              <span className="text-[15px] text-stone">Zdalnie / cała Polska</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-12 flex flex-col items-start justify-between gap-3 px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-stone sm:flex-row sm:items-center md:mt-16 md:px-10">
          <p className="m-0">© 2026 AbstractArt Agency.</p>
          <TextLink href="#top" hoverClassName="text-ember-light">
            Do góry ↑
          </TextLink>
        </div>

        {/* ogromny napis przy dolnej krawędzi, lekko ucięty i rozmyty — rozmiar względem szerokości panelu (cqw) */}
        <p
          aria-hidden="true"
          className="m-0 -mb-[0.16em] mt-2 select-none whitespace-nowrap bg-linear-to-b from-bone/5 to-bone/35 bg-clip-text text-center font-display text-[15.5cqw] font-extrabold leading-[0.95] tracking-[-0.05em] text-transparent blur-[1.5px]"
        >
          AbstractArt
        </p>
      </div>
    </footer>
  );
}
