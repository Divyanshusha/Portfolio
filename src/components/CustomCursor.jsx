import { useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, canvas';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || reducedMotion) return;

    document.documentElement.classList.add('cursor-active');

    let ringX = 0;
    let ringY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animateRing);
    };

    const onOver = (e) => {
      if (e.target.closest?.(HOVER_SELECTOR)) {
        document.documentElement.classList.add('cursor-hover');
      }
    };
    const onOut = (e) => {
      if (e.target.closest?.(HOVER_SELECTOR)) {
        document.documentElement.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('cursor-active', 'cursor-hover');
    };
  }, [reducedMotion]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;
  if (reducedMotion) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
