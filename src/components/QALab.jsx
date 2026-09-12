import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Loader2 } from 'lucide-react';
import { portfolio } from '../data/portfolio';

const SYSTEM_STATUS = [
  { label: 'Frontend', state: 'pass' },
  { label: 'Backend', state: 'pass' },
  { label: 'API', state: 'pass' },
  { label: 'Accessibility', state: 'pass' },
  { label: 'Performance', state: 'pass' },
  { label: 'Security', state: 'check' },
];

const STATE_ICON = { pass: '✓', check: '⚠' };
const STATE_STYLE = { pass: 'text-pass', check: 'text-wip' };

export default function QALab() {
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState([]);
  const [done, setDone] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => () => timeouts.current.forEach(clearTimeout), []);

  const runSuite = () => {
    if (running) return;
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setRunning(true);
    setDone(false);
    setLog(['Initializing test suite…']);

    portfolio.qaLabChecks.forEach((check, i) => {
      const t = setTimeout(() => {
        setLog((prev) => [...prev, `[PASS] ${check}`]);
      }, 450 + i * 350);
      timeouts.current.push(t);
    });

    const finalT = setTimeout(() => {
      setLog((prev) => [
        ...prev,
        '',
        'TEST SUITE COMPLETE',
        `${portfolio.qaLabChecks.length}/${portfolio.qaLabChecks.length} PASS`,
      ]);
      setRunning(false);
      setDone(true);
    }, 450 + portfolio.qaLabChecks.length * 350 + 300);
    timeouts.current.push(finalT);
  };

  return (
    <section id="lab" className="border-b border-border py-20">
      <div className="wrap">
        <div className="mb-9 flex flex-wrap items-center gap-3">
          <span className="eyebrow">test_suite: qa.lab</span>
          <h2 className="font-display text-3xl font-semibold">QA Lab</h2>
          <span className="badge badge-pass">✓ PASS</span>
        </div>

        <p className="mb-8 max-w-[60ch] text-sm text-text-muted">
          A simulated testing dashboard — a portfolio interaction demonstrating QA thinking, not a live
          production test report.
        </p>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6"
          >
            <div className="mb-4 font-mono text-xs uppercase tracking-wide text-text-dim">System Status</div>
            <ul className="space-y-3" role="list">
              {SYSTEM_STATUS.map((s) => (
                <li key={s.label} className="flex items-center justify-between font-mono text-sm">
                  <span className="text-text-muted">{s.label}</span>
                  <span className={`flex items-center gap-1.5 font-semibold ${STATE_STYLE[s.state]}`}>
                    {STATE_ICON[s.state]} {s.state === 'pass' ? 'PASS' : 'CHECK'}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card flex flex-col p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wide text-text-dim">Test Runner</span>
              <button
                type="button"
                onClick={runSuite}
                disabled={running}
                className="btn btn-primary !py-2 !text-xs disabled:cursor-not-allowed disabled:opacity-60"
                aria-live="polite"
              >
                {running ? (
                  <>
                    <Loader2 size={14} className="motion-safe:animate-spin" aria-hidden="true" /> Running…
                  </>
                ) : (
                  <>
                    <Play size={14} aria-hidden="true" /> Run Test Suite
                  </>
                )}
              </button>
            </div>
            <div
              role="log"
              aria-live="polite"
              className="min-h-[220px] flex-grow whitespace-pre-line rounded-lg border border-border bg-bg p-4 font-mono text-xs text-text-muted"
            >
              {log.length === 0 ? (
                <span className="text-text-dim">$ awaiting run…</span>
              ) : (
                log.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.startsWith('[PASS]')
                        ? 'text-pass'
                        : line === 'TEST SUITE COMPLETE'
                        ? 'mt-1 font-semibold text-text'
                        : line.includes('PASS') && done && line.includes('/')
                        ? 'text-pass'
                        : ''
                    }
                  >
                    {line || ' '}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
