import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We map the impossible. Deep-dive into your vision, constraints, and the physics of what can be built.',
  },
  {
    num: '02',
    title: 'Architecture',
    desc: 'Blueprints drawn in logic. System design, data flow, and technology selection calibrated to your exact needs.',
  },
  {
    num: '03',
    title: 'Manifestation',
    desc: 'Code becomes reality. Iterative builds, continuous delivery, and obsessive attention to every pixel and millisecond.',
  },
  {
    num: '04',
    title: 'Transcendence',
    desc: 'Launch is the beginning. We monitor, optimize, and evolve—your system gets smarter with every interaction.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-32 bg-void overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.06), transparent 60%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-plasma">
            / 02 — Process
          </span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl tracking-tight text-electric max-w-3xl">
            From chaos to <span className="text-mask-gradient">order</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* The Thread of Logic */}
          <svg
            className="absolute left-0 top-0 w-full h-full hidden lg:block pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 1200 600"
          >
            <path
              d="M 100 80 Q 400 40 600 200 T 1100 300 Q 600 400 100 520"
              fill="none"
              stroke="url(#thread-gradient)"
              strokeWidth="1"
              strokeDasharray="4 6"
              className="opacity-40"
            />
            <defs>
              <linearGradient id="thread-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                <div className="font-mono text-5xl font-bold text-plasma/20 mb-4">
                  {step.num}
                </div>
                <div className="w-3 h-3 rounded-full bg-plasma mb-6 shadow-[0_0_20px_rgba(139,92,246,0.6)]" />
                <h3 className="font-display font-bold text-2xl text-electric mb-3">
                  {step.title}
                </h3>
                <p className="text-chrome text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}