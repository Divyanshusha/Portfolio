import { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import useWebGL from '../hooks/useWebGL';
import useIsMobile from '../hooks/useIsMobile';
import SceneErrorBoundary from './SceneErrorBoundary';

const SystemLabScene = lazy(() => import('./SystemLabScene'));

export default function SystemLab() {
  const [hovered, setHovered] = useState(null);
  const webglSupported = useWebGL();
  const isMobile = useIsMobile();
  const nodes = portfolio.systemLabNodes;
  const activeNode = nodes.find((n) => n.id === hovered) ?? null;

  return (
    <section className="border-b border-border py-20">
      <div className="wrap">
        <div className="mb-9 flex flex-wrap items-center gap-3">
          <span className="eyebrow">test_suite: system.lab</span>
          <h2 className="font-display text-3xl font-semibold">Digital System Lab</h2>
          <span className="badge badge-pass">✓ PASS</span>
        </div>

        <p className="mb-8 max-w-[60ch] text-sm text-text-muted">
          A conceptual map of how the systems I work with fit together. Hover or select a node to see what
          it does.
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative h-[320px] sm:h-[380px]">
            <SceneErrorBoundary fallback={<StaticNetwork nodes={nodes} hovered={hovered} setHovered={setHovered} />}>
              {webglSupported ? (
                <Suspense fallback={<StaticNetwork nodes={nodes} hovered={hovered} setHovered={setHovered} />}>
                  <SystemLabScene
                    hovered={hovered}
                    setHovered={setHovered}
                    onSelect={setHovered}
                    isMobile={isMobile}
                  />
                </Suspense>
              ) : (
                <StaticNetwork nodes={nodes} hovered={hovered} setHovered={setHovered} />
              )}
            </SceneErrorBoundary>
          </div>

          <div>
            <div
              className="mb-4 flex flex-wrap gap-2"
              role="group"
              aria-label="System component selector"
            >
              {nodes.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onMouseEnter={() => setHovered(n.id)}
                  onFocus={() => setHovered(n.id)}
                  onClick={() => setHovered(n.id)}
                  aria-pressed={hovered === n.id}
                  className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                    hovered === n.id
                      ? 'border-accent bg-accent-bg text-accent'
                      : 'border-border text-text-muted hover:border-accent/40 hover:text-text'
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>

            <motion.div
              key={activeNode?.id ?? 'idle'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="glass-card min-h-[180px] p-6"
              aria-live="polite"
            >
              {activeNode ? (
                <>
                  <div className="mb-2 font-mono text-xs uppercase tracking-wide text-accent">
                    {activeNode.label}
                  </div>
                  <p className="mb-4 text-sm text-text-muted">{activeNode.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeNode.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-[0.7rem] text-text"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="font-mono text-sm text-text-dim">
                  Hover or select a node to inspect it.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Non-WebGL fallback: same interaction model, plain CSS vertical node list.
function StaticNetwork({ nodes, hovered, setHovered }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3" role="img" aria-label="System architecture diagram">
      {nodes.map((n, i) => (
        <div key={n.id} className="flex flex-col items-center">
          <button
            type="button"
            onMouseEnter={() => setHovered(n.id)}
            onFocus={() => setHovered(n.id)}
            className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
              hovered === n.id ? 'border-accent bg-accent-bg text-accent' : 'border-border text-text-muted'
            }`}
          >
            {n.label}
          </button>
          {i < nodes.length - 1 && <span className="h-6 w-px bg-border" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}
