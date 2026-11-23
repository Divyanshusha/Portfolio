import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolio } from '../data/portfolio';

const LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About Me' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Technical Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education & Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#top');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive('#' + entry.target.id);
        });
      },
      { rootMargin: '-10% 0px -75% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-sm font-semibold text-white tracking-tight">
          Divyanshu<span className="text-accent">_</span>Sharma
        </a>

        <ul className="hidden gap-7 font-mono text-sm text-text-muted md:flex" role="list">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? 'page' : undefined}
                className={`relative py-1.5 transition-colors hover:text-white ${
                  active === l.href ? 'text-accent font-medium' : ''
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="p-2 text-white md:hidden"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <ul
          id="mobile-nav"
          className="fixed inset-0 z-[50] flex flex-col w-full border-b border-border bg-bg px-6 py-4 font-mono text-sm md:hidden shadow-2xl"
        >
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block rounded-xl px-4 py-3 text-text-muted hover:bg-accent/10 hover:text-accent transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}