import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import { BrainCircuit, Code2, GraduationCap, Server } from 'lucide-react';

const META = [
  { icon: GraduationCap, label: 'Education', value: 'MCA Graduate' },
  { icon: Code2, label: 'Primary', value: 'Python Developer' },
  { icon: Server, label: 'Focus', value: 'Backend / AI-ML' },
];v

export default function About() {
  return (
    <section id="about" className="border-b border-border py-20 sm:py-28 bg-bg-soft">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="mb-9 flex flex-wrap items-center gap-3">
            <span className="eyebrow">profile.summary</span>
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">About Me</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <div className="glass-card p-7 sm:p-9 bg-surface">
              <p className="max-w-[86ch] text-base leading-relaxed text-text-muted sm:text-lg">
                {portfolio.personal.summary}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {META.map(({ icon: Icon, label, value }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="rounded-xl border border-border bg-surface-2 p-5 transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                  >
                    <Icon size={20} className="mb-3 text-accent" aria-hidden="true" />
                    <div className="font-mono text-[0.65rem] uppercase tracking-wide text-text-dim">{label}</div>
                    <div className="mt-1 font-mono text-sm text-white">{value}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card p-7 bg-surface"
              >
                <h3 className="font-display text-xl font-semibold text-white mb-4">Technical Expertise</h3>
                <div className="space-y-3">
                  {['Python', 'Backend Development', 'AI/ML', 'API Design'].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-text-muted">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}