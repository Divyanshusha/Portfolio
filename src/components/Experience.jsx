import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="border-b border-border py-20">
      <div className="wrap">
        <div className="mb-9 flex flex-wrap items-center gap-3"><span className="eyebrow">timeline.experience</span><h2 className="font-display text-3xl font-semibold">Experience</h2></div>
        <ol className="relative space-y-8 border-l border-border pl-8" role="list">
          {portfolio.experience.map((exp, i) => <motion.li key={exp.role + exp.company} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.08 }} className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-pass shadow-[0_0_0_4px_rgba(95,203,141,0.12)]" aria-hidden="true" />
            <div className="glass-card p-6">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3"><h3 className="font-display text-lg font-semibold text-text">{exp.role} <span className="font-body font-normal text-text-dim">@ {exp.company}</span></h3><span className="font-mono text-xs text-text-dim">{exp.dates}</span></div>
              <ul className="space-y-2" role="list">{exp.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-2.5 text-sm text-text-muted sm:text-base"><span className="mt-0.5 font-mono text-pass" aria-hidden="true">✓</span>{bullet}</li>)}</ul>
            </div>
          </motion.li>)}
        </ol>
      </div>
    </section>
  );
}
