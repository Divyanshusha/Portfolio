import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="border-b border-border py-20 sm:py-28 bg-bg-soft">
      <div className="wrap">
        <div className="mb-9 flex flex-wrap items-center gap-3">
          <span className="eyebrow">timeline.experience</span>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Professional Experience</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-electric to-pass md:left-24" aria-hidden="true" />
          <ol className="space-y-12" role="list">
            {portfolio.experience.map((exp, i) => (
              <motion.li
                key={exp.role + exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute left-0 top-1 w-10 h-10 md:left-22 -translate-x-1/2">
                  <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-accent shadow-[0_0_12px_rgba(139,92,246,0.8)]" aria-hidden="true" />
                </div>
                <div className="ml-12 md:ml-32 glass-card p-6 bg-surface">
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {exp.role} <span className="font-body font-normal text-text-muted">@ {exp.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-text-dim whitespace-nowrap">{exp.dates}</span>
                  </div>
                  <ul className="space-y-3" role="list">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm text-text-muted sm:text-base">
                        <span className="mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}