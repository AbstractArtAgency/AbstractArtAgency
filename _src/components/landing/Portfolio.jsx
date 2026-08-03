import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Quantum Commerce',
    category: 'E-Commerce Platform',
    desc: 'A WebGL-powered shopping experience where products orbit in 3D space. Built for a luxury brand with 10M+ monthly visitors.',
    image: 'https://media.base44.com/images/public/6a60bebe0fa5491af08b0f4e/a218b0a37_generated_230c4fff.png',
    tags: ['WebGL', 'React', 'Edge'],
  },
  {
    title: 'Neural Canvas',
    category: 'AI Creative Suite',
    desc: 'Real-time generative art platform powered by neural networks. Users paint with algorithms—every stroke is unique.',
    image: 'https://media.base44.com/images/public/6a60bebe0fa5491af08b0f4e/62c956fed_generated_e6a3d272.png',
    tags: ['AI', 'Canvas', 'Realtime'],
  },
  {
    title: 'Prism Protocol',
    category: 'Web3 Application',
    desc: 'A decentralized marketplace with glassmorphic 3D asset previews and sub-second transaction rendering.',
    image: 'https://media.base44.com/images/public/6a60bebe0fa5491af08b0f4e/5cf3d383d_generated_be1bc845.png',
    tags: ['Web3', 'Three.js', 'Solidity'],
  },
  {
    title: 'Flow State',
    category: 'Data Visualization',
    desc: 'A living dashboard for 2 billion data points. Flows, breathes, and reveals patterns invisible to static charts.',
    image: 'https://media.base44.com/images/public/6a60bebe0fa5491af08b0f4e/209480481_generated_bfb5bea0.png',
    tags: ['D3.js', 'WebGL', 'Streaming'],
  },
];

export default function Portfolio() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-78%']);

  return (
    <section id="work" ref={targetRef} className="relative h-[350vh] bg-void">
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Section header */}
        <div className="absolute top-0 left-0 right-0 z-10 pt-28 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-plasma">
              / 03 — Selected Work
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl tracking-tight text-electric">
              The <span className="text-mask-gradient">evidence</span>
            </h2>
          </motion.div>
        </div>

        {/* Horizontal scroll track */}
        <div className="flex items-center h-full">
          <motion.div style={{ x }} className="flex gap-6 pl-6 md:pl-16">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="group relative w-[80vw] md:w-[55vw] lg:w-[40vw] h-[62vh] flex-shrink-0 rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
                <div className="absolute inset-0 bg-void/20 group-hover:bg-void/10 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-plasma">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-chrome">
                      / {project.category}
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display font-bold text-3xl md:text-4xl text-electric mb-3">
                        {project.title}
                      </h3>
                      <p className="text-chrome text-sm leading-relaxed max-w-md mb-4">
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 text-chrome bg-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-electric group-hover:bg-plasma group-hover:border-plasma transition-all duration-500 flex-shrink-0">
                      <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8">
                  <div className="absolute top-0 right-0 w-full h-px bg-plasma/40" />
                  <div className="absolute top-0 right-0 w-px h-full bg-plasma/40" />
                </div>
              </div>
            ))}

            {/* End card */}
            <div className="w-[40vw] md:w-[30vw] flex-shrink-0 flex flex-col items-center justify-center h-[62vh] text-center px-6">
              <h3 className="font-display font-bold text-3xl text-electric mb-4">
                Your project
                <br />
                <span className="text-mask-gradient">goes here</span>
              </h3>
              <p className="text-chrome text-sm font-mono mb-6">
                The next manifestation could be yours.
              </p>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full border border-plasma/30 text-electric font-mono text-sm hover:bg-plasma/10 hover:border-plasma/50 transition-all"
              >
                Start a Project →
              </a>
            </div>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-px bg-white/10 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-full bg-plasma origin-left"
          />
        </div>
      </div>
    </section>
  );
}