import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { portfolio } from '../data/portfolio';

export default function Contact() {
  const { social, personal } = portfolio;
  const cards = [
    { icon: Mail, label: 'Email', value: social.email, href: `mailto:${social.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: social.linkedin.replace(/^https?:\/\//, ''), href: social.linkedin },
    { icon: Github, label: 'GitHub', value: social.github.replace(/^https?:\/\//, ''), href: social.github },
  ];
  return <section id="contact" className="py-20">
    <div className="wrap"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
      <div className="mb-9 flex flex-wrap items-center gap-3"><span className="eyebrow">contact.endpoint</span><h2 className="font-display text-3xl font-semibold">Let&apos;s Connect</h2></div>
      <div className="glass-card p-7 sm:p-9"><p className="mb-7 max-w-[56ch] text-base text-text-muted sm:text-lg">Python Developer · Backend Developer · AIML Engineer</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{cards.map(({ icon: Icon, label, value, href }) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center gap-3 rounded-lg border border-border p-4 font-mono text-sm transition-colors hover:border-pass hover:bg-surface-2"><Icon size={18} className="flex-shrink-0 text-pass" aria-hidden="true" /><span className="min-w-0"><span className="block font-mono text-[0.68rem] uppercase text-text-dim">{label}</span><span className="block truncate text-text">{value}</span></span></a>)}</div>
        <div className="mt-7 font-mono text-sm text-text-dim">{personal.location}</div>
        <a href={`mailto:${social.email}`} className="btn btn-primary mt-7 inline-flex">Email Me <ArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </motion.div></div>
  </section>;
}
