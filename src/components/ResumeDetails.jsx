import { Award, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';

function Heading({ label, title }) {
  return <div className="mb-9 flex flex-wrap items-center gap-3"><span className="eyebrow">{label}</span><h2 className="font-display text-3xl font-semibold">{title}</h2></div>;
}

export default function ResumeDetails() {
  const { education, publication, certifications } = portfolio;
  return <>
    <section id="education" className="border-b border-border py-20"><div className="wrap"><Heading label="academic.record" title="Education" /><div className="grid grid-cols-1 gap-5 md:grid-cols-2">{education.map((item) => <motion.article key={item.degree} whileInView={{ opacity: [0, 1], y: [12, 0] }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass-card p-6"><GraduationCap className="mb-5 text-accent" aria-hidden="true" /><h3 className="font-display text-xl font-semibold text-text">{item.degree}</h3><p className="mt-2 text-text-muted">{item.institution}</p><div className="mt-5 flex flex-wrap gap-3 font-mono text-xs text-text-dim"><span>{item.dates}</span>{item.result && <span className="text-pass">{item.result}</span>}</div></motion.article>)}</div></div></section>

    <section id="research" className="border-b border-border py-20"><div className="wrap"><Heading label="publication.record" title="Research" /><article className="glass-card p-7 sm:p-9"><BookOpen className="mb-5 text-accent" aria-hidden="true" /><h3 className="max-w-3xl font-display text-2xl font-semibold text-text">“{publication.title}”</h3><p className="mt-4 font-mono text-sm text-text-muted">{publication.journal} · {publication.issue}</p><a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex font-mono text-sm text-accent hover:text-pass">DOI: {publication.doi} ↗</a>
    </article>
    </div>
    </section>

    <section id="certifications" className="border-b border-border py-20"><div className="wrap"><Heading label="recognition.record" title="Certifications & Achievements" /><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{certifications.map((item) => <div key={item} className="glass-card flex items-start gap-3 p-5"><Award className="mt-0.5 flex-shrink-0 text-pass" size={18} aria-hidden="true" /><span className="text-sm text-text-muted">{item}</span>

    </div>)}
    </div>
    </div>
    </section>
  </>;
}
