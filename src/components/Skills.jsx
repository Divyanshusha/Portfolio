import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';

function SkillCard({ group, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.08 }} className="glass-card p-6 transition-transform duration-200 hover:-translate-y-1 hover:border-accent/50">
      <div className="mb-4 flex items-center gap-2">
        <span className="font-mono text-text-dim">&gt;</span>
        <h3 className="font-display text-base font-semibold text-text">{group.category}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => <span key={item} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text"><span className="h-1.5 w-1.5 rounded-full bg-pass" aria-hidden="true" />{item}</span>)}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="border-b border-border py-20">
      <div className="wrap">
        <div className="mb-9 flex flex-wrap items-center gap-3"><span className="eyebrow">capabilities.index</span><h2 className="font-display text-3xl font-semibold">Skills</h2></div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{portfolio.skills.map((group, i) => <SkillCard key={group.category} group={group} index={i} />)}</div>
      </div>
    </section>
  );
}
