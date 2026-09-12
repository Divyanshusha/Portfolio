import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolio } from '../data/portfolio';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
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
      className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled ? 'border-border bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#top" className="font-mono text-sm font-semibold text-text">
          Divyanshu<span className="text-pass">_</span>Sharma
        </a>

        <ul className="hidden gap-7 font-mono text-sm text-text-muted md:flex" role="list">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? 'true' : undefined}
                className={`relative py-1 transition-colors hover:text-text ${
                  active === l.href ? 'text-pass' : ''
                }`}
              >
                {l.label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div
            className="hidden items-center gap-2 rounded-full border border-border bg-pass-bg px-3 py-1.5 font-mono text-xs text-pass sm:flex"
            aria-label={`Availability status: ${portfolio.personal.availability}`}
          >
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pass shadow-[0_0_0_3px_rgba(95,203,141,0.15)]" aria-hidden="true" />
            OPEN TO WORK
          </div>
          <button
            type="button"
            className="p-2 text-text md:hidden"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <ul
          id="mobile-nav"
          ref={menuRef}
          className="flex flex-col gap-1 border-t border-border bg-bg-soft px-6 py-4 font-mono text-sm md:hidden"
        >
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block rounded-md px-2 py-3 text-text-muted hover:bg-surface hover:text-text"
                onClick={() => setOpen(false)}
              >
                {l.label.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
