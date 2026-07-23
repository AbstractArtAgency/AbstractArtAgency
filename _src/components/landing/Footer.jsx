import { Github, Twitter, Linkedin, Dribbble } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-void border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />

      {/* Large brand text */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-8">
        <div className="overflow-hidden">
          <h2 className="font-display font-black text-[18vw] md:text-[14vw] leading-none tracking-tighter text-mask-gradient opacity-20 select-none">
            AbstractArt
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-8 pt-8 border-t border-white/5">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 border-2 border-plasma rounded-sm rotate-45" />
                <div className="absolute inset-2 bg-electric rounded-sm rotate-45" />
              </div>
              <span className="font-display font-bold text-electric">
                AbstractArt<span className="text-plasma">.</span>
              </span>
            </div>
            <p className="text-chrome text-sm font-mono max-w-md">
              Engineering impossible digital experiences from the edge of code and imagination.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Dribbble, href: '#' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-chrome hover:text-electric hover:border-plasma/50 hover:bg-white/5 transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-white/5">
          <p className="text-xs font-mono text-chrome">
            © 2026 AbstractArt Studio. Manifesting since 2018.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs font-mono text-chrome hover:text-electric transition-colors">Privacy</a>
            <a href="#" className="text-xs font-mono text-chrome hover:text-electric transition-colors">Terms</a>
            <a href="#top" className="text-xs font-mono text-chrome hover:text-electric transition-colors">↑ Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}