import { motion } from 'framer-motion';
import { ShieldCheck, Search, TrendingUp } from 'lucide-react';
import { portfolio } from '../data/portfolio';

const ICONS = [ShieldCheck, Search, TrendingUp];

export default function QAPhilosophy() {
  return (
    <section className="border-b border-border py-20">
      <div className="wrap">
        <div className="mb-9 flex flex-wrap items-center gap-3">
          <span className="eyebrow">test_suite: qa.philosophy</span>
          <h2 className="font-display text-3xl font-semibold">How I Think About Quality</h2>
          <span className="badge badge-pass">✓ PASS</span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {portfolio.qaPhilosophy.map((item, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-7 transition-transform hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex rounded-lg border border-accent/30 bg-accent-bg p-3 text-accent">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
