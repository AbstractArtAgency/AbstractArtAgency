import { Code2, Globe2, Mail, Share2 } from "lucide-react";

const socialLinks = [
  { icon: Code2, href: "#", label: "Code" },
  { icon: Share2, href: "#", label: "Network" },
  { icon: Globe2, href: "#", label: "Web" },
  { icon: Mail, href: "mailto:hello@abstractart.studio", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-void">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-5" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-20">
        <div className="overflow-hidden">
          <h2 className="text-mask-gradient select-none font-display text-[18vw] font-black leading-none tracking-tight opacity-20 md:text-[14vw]">
            AbstractArt
          </h2>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-8 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <div className="relative h-6 w-6">
                <div className="absolute inset-0 rotate-45 rounded-sm border-2 border-plasma" />
                <div className="absolute inset-2 rotate-45 rounded-sm bg-electric" />
              </div>
              <span className="font-display font-bold text-electric">
                AbstractArt<span className="text-plasma">.</span>
              </span>
            </div>
            <p className="max-w-md font-mono text-sm text-chrome">
              Engineering impossible digital experiences from the edge of code and
              imagination.
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-chrome transition-all duration-300 hover:border-plasma/50 hover:bg-white/5 hover:text-electric"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="font-mono text-xs text-chrome">
            © 2026 AbstractArt Studio. Manifesting since 2018.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-xs text-chrome transition-colors hover:text-electric">
              Privacy
            </a>
            <a href="#" className="font-mono text-xs text-chrome transition-colors hover:text-electric">
              Terms
            </a>
            <a href="#top" className="font-mono text-xs text-chrome transition-colors hover:text-electric">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
