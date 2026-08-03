import { motion } from 'framer-motion';

const stats = [
  { value: '200+', label: 'Projects Manifested' },
  { value: '47', label: 'Awards Collected' },
  { value: '99.9%', label: 'Uptime Guaranteed' },
  { value: '∞', label: 'Possibilities' },
];

export default function Stats() {
  return (
    <section className="relative py-24 bg-void overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-black text-5xl md:text-7xl text-mask-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-chrome">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}