import { useState } from 'react';
import { portfolio } from '../data/portfolio';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  return <section id="projects" className="border-b border-border py-20">
    <div className="wrap">
      <div className="mb-9 flex flex-wrap items-center gap-3"><span className="eyebrow">case-studies.projects</span><h2 className="font-display text-3xl font-semibold">Projects</h2></div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">{portfolio.projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} onViewDetails={setActiveProject} />)}</div>
    </div>
    <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
  </section>;
}
