import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Download, Code2, Terminal, Braces } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { portfolio, RESUME_URL } from '../data/portfolio';
import useReducedMotion from '../hooks/useReducedMotion';
import useWebGL from '../hooks/useWebGL';
import useIsMobile from '../hooks/useIsMobile';
import SceneErrorBoundary from './SceneErrorBoundary';
import HeroSceneFallback from './HeroSceneFallback';

const HeroScene = lazy(() => import('./HeroScene'));

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const textReveal = {
  hidden: { opacity: 0, y: 10 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.05, ease: 'easeOut' },
  }),
};

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebGL();
  const isMobile = useIsMobile();
  const { personal, social } = portfolio;

  const use3D = webglSupported === true;

  return (
    <header id="top" className="relative overflow-hidden pt-32 pb-20 sm:pb-28 min-h-screen flex items-center">
      {/* Deep black-purple background with animated stars and orbs */}
      <div className="absolute inset-0 bg-bg" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_50%,transparent_100%)]" />

      {/* Floating gradient orbs */}
      <div className="orb -left-40 top-1/4 h-80 w-80 bg-gradient-to-br from-accent/40 via-electric/30 to-pass/20 animate-float" style={{ animationDelay: '0s' }} />
      <div className="orb -right-32 top-20 h-96 w-96 bg-gradient-to-bl from-pass/30 via-electric/20 to-accent/30 animate-float" style={{ animationDelay: '-2s' }} />
      <div className="orb left-1/2 -bottom-40 h-72 w-72 bg-gradient-to-t from-accent/20 via-transparent to-pass/15 animate-float" style={{ animationDelay: '-4s' }} />

      {/* Star particles */}
      <StarField reducedMotion={reducedMotion} />

      <div className="wrap relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 min-h-[80vh]">
        <motion.div
          initial={reducedMotion ? false : 'hidden'}
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={fadeUp} className="eyebrow mb-4 block">
            Hello, I'm
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mb-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mb-4 font-display text-[clamp(1.25rem,3vw,1.75rem)] font-medium text-gradient"
          >
            Python Developer · Backend Developer · AIML Engineer
          </motion.p>

          <motion.p variants={fadeUp} className="mb-4 max-w-[54ch] font-mono text-sm text-text-muted sm:text-base">
            {personal.heroLine}
          </motion.p>

          <motion.p variants={fadeUp} className="mb-10 max-w-[56ch] text-base text-text-muted sm:text-lg leading-relaxed">
            {personal.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-4">
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

          <motion.div variants={fadeUp} className="flex items-center gap-5">
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Divyanshu Sharma on GitHub"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-surface/50 text-text-muted transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
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
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-surface/50 text-text-muted transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
              >
                <Linkedin size={20} />
              </a>
            )}
            {social.email && (
              <a
                href={`mailto:${social.email}`}
                aria-label="Email Divyanshu Sharma"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-surface/50 text-text-muted transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
              >
                <Mail size={20} />
              </a>
            )}
          </motion.div>
        </motion.div>

        <div className="relative mx-auto h-[320px] w-full max-w-[420px] sm:h-[420px] lg:h-[480px] flex items-center justify-center" aria-hidden="false">
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

function StarField({ reducedMotion }) {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 4,
  }));

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {stars.map((star, i) => (
          <div
            key={i}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
            className="absolute rounded-full bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          className="absolute rounded-full bg-white"
          initial={{ opacity: star.opacity }}
          animate={{ opacity: [star.opacity, 1, star.opacity] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}