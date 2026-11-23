import { useState } from 'react';
import { portfolio } from '../data/portfolio';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  return (
    <section id="projects" className="border-b border-border py-20 sm:py-28 bg-bg">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-center gap-3 justify-center text-center flex-col">
          <span className="eyebrow">case-studies.projects</span>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Featured Projects</h2>
          <p className="max-w-xl text-text-muted">A collection of systems and AI applications I've built.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {portfolio.projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onViewDetails={setActiveProject} />
          ))}
        </div>
      </div>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}