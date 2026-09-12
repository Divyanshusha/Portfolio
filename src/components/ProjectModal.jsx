import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-surface p-7 shadow-2xl"
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 rounded-md p-1.5 text-text-dim transition-colors hover:bg-surface-2 hover:text-text"
            >
              <X size={18} />
            </button>

            <h3 id="project-modal-title" className="mb-3 pr-8 font-display text-xl font-semibold text-text">
              {project.title}
            </h3>

            <div className="mb-5 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-accent/30 bg-accent-bg px-2 py-1 font-mono text-[0.7rem] text-accent"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="space-y-4 text-sm text-text-muted">
              {project.problem && (
                <div>
                  <div className="mb-1 font-mono text-xs uppercase tracking-wide text-text-dim">Problem</div>
                  <p>{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div>
                  <div className="mb-1 font-mono text-xs uppercase tracking-wide text-text-dim">Solution</div>
                  <p>{project.solution}</p>
                </div>
              )}
              {project.features?.length > 0 && (
                <div>
                  <div className="mb-1 font-mono text-xs uppercase tracking-wide text-text-dim">Key Features</div>
                  <ul className="space-y-1.5" role="list">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-0.5 font-mono text-pass" aria-hidden="true">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {(project.githubUrl || project.demoUrl) && (
              <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <Github size={16} aria-hidden="true" /> GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <ExternalLink size={16} aria-hidden="true" /> Live Demo
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
