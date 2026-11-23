import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';

function SkillCard({ group, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group rounded-2xl border border-border bg-surface/60 backdrop-blur-md p-6 transition-all duration-500 hover:border-accent hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:-translate-y-1"
    >
      <div className="mb-5 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent font-mono text-sm text-white uppercase tracking-wider">
          {" > "}
        </span>
        <h3 className="font-display text-base font-semibold text-white">{group.category}</h3>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {group.items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-xs text-white transition-all duration-300 hover:border-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="border-b border-border py-20 sm:py-28 bg-bg">
      <div className="wrap">
        <div className="mb-9 flex flex-wrap items-center gap-3 justify-center text-center flex-col">
          <span className="eyebrow">capabilities.index</span>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Technical Skills</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.skills.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}