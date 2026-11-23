import { Award, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';

function Heading({ label, title }) {
  return (
    <div className="mb-9 flex flex-wrap items-center gap-3">
      <span className="eyebrow">{label}</span>
      <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
    </div>
  );
}

export default function ResumeDetails() {
  const { education, publication, certifications } = portfolio;
  return (
    <>
      <section id="education" className="border-b border-border py-20 sm:py-28 bg-bg">
        <div className="wrap">
          <Heading label="academic.record" title="Education" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {education.map((item, i) => (
              <motion.article
                key={item.degree}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-7 bg-surface"
              >
                <div className="mb-5 inline-flex rounded-xl border border-accent/30 bg-accent/5 p-3 text-accent">
                  <GraduationCap size={22} aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{item.degree}</h3>
                <p className="mt-2 text-text-muted">{item.institution}</p>
                <div className="mt-5 flex flex-wrap gap-3 font-mono text-xs text-text-dim">
                  <span>{item.dates}</span>
                  {item.result && <span className="text-pass font-medium">{item.result}</span>}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="research" className="border-b border-border py-20 sm:py-28 bg-bg">
        <div className="wrap">
          <Heading label="publication.record" title="Research" />
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-7 sm:p-9 bg-surface"
          >
            <div className="mb-5 inline-flex rounded-xl border border-pass/30 bg-pass/5 p-3 text-pass">
              <BookOpen size={22} aria-hidden="true" />
            </div>
            <h3 className="max-w-3xl font-display text-2xl font-semibold text-white">
              &ldquo;{publication.title}&rdquo;
            </h3>
            <p className="mt-4 font-mono text-sm text-text-muted">
              {publication.journal} · {publication.issue}
            </p>
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex font-mono text-sm text-accent transition-colors hover:text-white"
            >
              DOI: {publication.doi} ↗
            </a>
          </motion.article>
        </div>
      </section>

      <section id="certifications" className="border-b border-border py-20 sm:py-28 bg-bg">
        <div className="wrap">
          <Heading label="recognition.record" title="Certifications & Achievements" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card flex items-start gap-4 p-5 bg-surface transition-all duration-300 hover:border-accent/40"
              >
                <div className="flex-shrink-0 rounded-lg border border-pass/30 bg-pass/5 p-2 text-pass">
                  <Award size={20} aria-hidden="true" />
                </div>
                <span className="text-sm text-text-muted leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}