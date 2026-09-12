import { portfolio } from '../data/portfolio';

export default function Footer() {
  return <footer className="border-t border-border py-10 text-center font-mono text-xs text-text-dim"><div className="wrap"><div>{portfolio.personal.name.toUpperCase()}</div><div className="mt-2">Python Developer · Backend Developer · AIML Engineer</div><div className="mt-1.5">© 2026 {portfolio.personal.name}</div></div></footer>;
}
