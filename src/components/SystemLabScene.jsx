import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { portfolio } from '../data/portfolio';

const COLORS = { active: '#4fe3d6', idle: '#5fcb8d', line: '#2a3338' };

function Node({ position, active, onHover, onLeave, onSelect, label }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    const s = active ? 1.35 : 1;
    mesh.current.scale.setScalar(
      THREE.MathUtils.lerp(mesh.current.scale.x, s, 0.15) +
        Math.sin(state.clock.elapsedTime * 1.4) * 0.02
    );
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover();
      }}
      onPointerOut={onLeave}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <sphereGeometry args={[0.22, 24, 24]} />
      <meshStandardMaterial
        color={active ? COLORS.active : COLORS.idle}
        emissive={active ? COLORS.active : COLORS.idle}
        emissiveIntensity={active ? 1.1 : 0.4}
        roughness={0.3}
        metalness={0.5}
      />
    </mesh>
  );
}

function Connector({ from, to }) {
  const points = useMemo(() => [new THREE.Vector3(...from), new THREE.Vector3(...to)], [from, to]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={COLORS.line} transparent opacity={0.6} />
    </line>
  );
}

function NetworkGroup({ hovered, setHovered, onSelect, isMobile }) {
  const group = useRef();
  const nodes = portfolio.systemLabNodes;
  const spacing = 1.15;
  const positions = useMemo(
    () => nodes.map((_, i) => [0, (nodes.length - 1) / 2 * spacing - i * spacing, 0]),
    [nodes]
  );

  useFrame((_, delta) => {
    if (group.current && !isMobile) group.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={group}>
      {positions.slice(0, -1).map((p, i) => (
        <Connector key={i} from={p} to={positions[i + 1]} />
      ))}
      {nodes.map((n, i) => (
        <Node
          key={n.id}
          position={positions[i]}
          active={hovered === n.id}
          onHover={() => setHovered(n.id)}
          onLeave={() => setHovered((h) => (h === n.id ? null : h))}
          onSelect={() => onSelect(n.id)}
          label={n.label}
        />
      ))}
    </group>
  );
}

export default function SystemLabScene({ hovered, setHovered, onSelect, isMobile }) {
  return (
    <Canvas
      dpr={isMobile ? [1, 1.4] : [1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [2.6, 0, 3.4], fov: 45 }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 2, 3]} intensity={1} color="#4fe3d6" />
      <Suspense fallback={null}>
        <NetworkGroup hovered={hovered} setHovered={setHovered} onSelect={onSelect} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
