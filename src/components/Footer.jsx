import { portfolio } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 text-center bg-bg">
      <div className="wrap">
        <div className="font-display text-lg font-semibold text-white">{portfolio.personal.name.toUpperCase()}</div>
        <div className="mt-2 text-sm text-text-muted">
          Python Developer · Backend Developer · AIML Engineer
        </div>
        <div className="mt-1.5 font-mono text-xs text-text-dim">
          © 2026 {portfolio.personal.name}
        </div>
      </div>
    </footer>
  );
}