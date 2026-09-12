import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { portfolio, RESUME_URL } from '../data/portfolio';
import useReducedMotion from '../hooks/useReducedMotion';
import useWebGL from '../hooks/useWebGL';
import useIsMobile from '../hooks/useIsMobile';
import SceneErrorBoundary from './SceneErrorBoundary';
import HeroSceneFallback from './HeroSceneFallback';

const HeroScene = lazy(() => import('./HeroScene'));

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
};

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebGL();
  const isMobile = useIsMobile();
  const { personal, social } = portfolio;

  const use3D = webglSupported === true;

  return (
    <header id="top" className="relative overflow-hidden border-b border-border pt-32 pb-20">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-pass/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-electric/10 blur-[100px]" />

      <div className="wrap relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={reducedMotion ? false : 'hidden'}
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.span variants={fadeUp} className="eyebrow mb-4 block">
            Who am i
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mb-4 font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-bold leading-[1.05] tracking-tight"
          >
            {personal.name.toUpperCase()}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mb-3 font-display text-xl font-semibold text-text-muted sm:text-2xl"
          >
            <span className="text-gradient">Python FullStack Developer</span> · AIML Engineer
          </motion.p>

          <motion.p variants={fadeUp} className="mb-6 max-w-[54ch] font-mono text-sm text-pass">
            {personal.heroLine}
          </motion.p>

          <motion.p variants={fadeUp} className="mb-8 max-w-[56ch] text-base text-text-muted sm:text-lg">
            {personal.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={16} aria-hidden="true" />
            </a>
            {RESUME_URL ? (
              <a href={RESUME_URL} className="btn btn-ghost" download>
                Download Résumé <Download size={16} aria-hidden="true" />
              </a>
            ) : null}
            <a href="#contact" className="btn btn-ghost">
              Contact Me
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-4">
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Divyanshu Sharma on GitHub"
                className="text-text-dim transition-colors hover:text-pass"
              >
                <Github size={20} />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Divyanshu Sharma on LinkedIn"
                className="text-text-dim transition-colors hover:text-pass"
              >
                <Linkedin size={20} />
              </a>
            )}
            {social.email && (
              <a
                href={`mailto:${social.email}`}
                aria-label="Email Divyanshu Sharma"
                className="text-text-dim transition-colors hover:text-pass"
              >
                <Mail size={20} />
              </a>
            )}
          </motion.div>
        </motion.div>

        <div className="relative mx-auto h-[320px] w-full max-w-[420px] sm:h-[420px]" aria-hidden={false}>
          <SceneErrorBoundary fallback={<HeroSceneFallback />}>
            {use3D ? (
              <Suspense fallback={<HeroSceneFallback />}>
                <HeroScene isMobile={isMobile} reducedMotion={reducedMotion} />
              </Suspense>
            ) : (
              <HeroSceneFallback />
            )}
          </SceneErrorBoundary>
        </div>
      </div>
    </header>
  );
}
