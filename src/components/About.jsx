import { BrainCircuit, Code2, GraduationCap, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';

const META = [
  { icon: GraduationCap, label: 'Education', value: 'MCA Graduate' },
  { icon: Code2, label: 'Primary', value: 'Python Developer' },
  { icon: Server, label: 'Focus', value: 'Backend / AI-ML' },
];

export default function About() {
  return (
    <section id="about" className="border-b border-border py-20">
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
          <div className="mb-9 flex flex-wrap items-center gap-3">
            <span className="eyebrow">profile.summary</span>
            <h2 className="font-display text-3xl font-semibold">About</h2>
          </div>
          <div className="glass-card p-7 sm:p-9">
            <p className="max-w-[86ch] text-base leading-relaxed text-text-muted sm:text-lg">{portfolio.personal.summary}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {META.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg border border-border bg-surface-2 p-4 transition-colors hover:border-accent/40">
                  <Icon size={16} className="mb-2 text-accent" aria-hidden="true" />
                  <div className="font-mono text-[0.68rem] uppercase tracking-wide text-text-dim">{label}</div>
                  <div className="mt-1 font-mono text-sm text-text">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
