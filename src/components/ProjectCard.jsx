import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Info } from 'lucide-react';

export default function ProjectCard({ project, index, onViewDetails }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="glass-card group flex flex-col gap-4 p-6 transition-[border-color,box-shadow] duration-200 hover:border-accent/50 hover:shadow-[0_10px_40px_rgba(79,227,214,0.1)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div><div className="mb-1 font-mono text-xs text-pass">{project.number}</div><h3 className="font-display text-lg font-semibold text-text">{project.title}</h3><p className="mt-1 font-mono text-xs text-text-dim">{project.subtitle}</p></div>
        <span className="whitespace-nowrap font-mono text-xs text-text-dim">{project.dates}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-accent/30 bg-accent-bg px-2 py-1 font-mono text-[0.7rem] text-accent"
          >
            {t}
          </span>
        ))}
      </div>

      <p className="flex-grow text-sm text-text-muted">{project.description}</p>
      <div className="flex flex-wrap items-center gap-2 border-y border-border py-3" aria-label={`${project.title} visual pipeline`}>
        {project.pipeline.map((step, i) => <span key={step} className="flex items-center gap-2 font-mono text-[0.65rem] text-accent"><span className="rounded border border-accent/30 bg-accent-bg px-1.5 py-1">{step}</span>{i < project.pipeline.length - 1 && <span aria-hidden="true">→</span>}</span>)}
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-border pt-4 font-mono text-xs">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-text-muted transition-colors hover:text-pass"
          >
            <Github size={14} aria-hidden="true" /> GitHub
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-text-muted transition-colors hover:text-pass"
          >
            <ExternalLink size={14} aria-hidden="true" /> Live Demo
          </a>
        )}
        <button
          type="button"
          onClick={() => onViewDetails(project)}
          className="ml-auto flex items-center gap-1.5 text-accent transition-colors hover:text-text"
        >
          <Info size={14} aria-hidden="true" /> View Details
        </button>
      </div>
    </motion.div>
  );
}
