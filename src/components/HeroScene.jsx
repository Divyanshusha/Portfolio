import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function DataNodes({ count, radius }) {
  const positions = useMemo(() => {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      pts.push(
        new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        )
      );
    }
    return pts;
  }, [count, radius]);

  return (
    <group>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#4fe3d6" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function CodeFragments({ count }) {
  const group = useRef();
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        pos: [
          (Math.random() - 0.5) * 4.2,
          (Math.random() - 0.5) * 4.2,
          (Math.random() - 0.5) * 4.2,
        ],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        speed: 0.15 + Math.random() * 0.25,
      })),
    [count]
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((mesh, i) => {
      mesh.rotation.z += 0.002 * items[i].speed * 10 * 0.016;
      mesh.position.y += Math.sin(state.clock.elapsedTime * items[i].speed + i) * 0.0015;
    });
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} rotation={it.rot}>
          <planeGeometry args={[0.22, 0.1]} />
          <meshBasicMaterial color="#6e8cff" transparent opacity={0.35} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function AICore({ isMobile }) {
  const coreRef = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const group = useRef();
  const [pulse, setPulse] = useState(0);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    target.current.x = state.pointer.x;
    target.current.y = state.pointer.y;

    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        target.current.y * 0.25,
        0.04
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        group.current.rotation.y + target.current.x * 0.15,
        0.04
      );
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.08;
    }
    if (ring1.current) ring1.current.rotation.x += delta * 0.18;
    if (ring2.current) ring2.current.rotation.y += delta * 0.22;
    if (ring3.current) ring3.current.rotation.z += delta * 0.15;

    if (pulse > 0) setPulse((p) => Math.max(0, p - delta * 1.2));
  });

  return (
    <group ref={group} onClick={() => setPulse(1)}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#5fcb8d"
            emissive="#5fcb8d"
            emissiveIntensity={0.35 + pulse * 0.8}
            distort={0.28}
            speed={1.6}
            roughness={0.25}
            metalness={0.6}
            wireframe={false}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial color="#4fe3d6" wireframe transparent opacity={0.18} />
        </mesh>
      </Float>

      <mesh ref={ring1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.9, 0.012, 8, 96]} />
        <meshBasicMaterial color="#4fe3d6" transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh ref={ring2} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[2.25, 0.008, 8, 96]} />
        <meshBasicMaterial color="#6e8cff" transparent opacity={0.35} toneMapped={false} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 2.2, Math.PI / 5, 0]}>
        <torusGeometry args={[1.6, 0.006, 8, 96]} />
        <meshBasicMaterial color="#5fcb8d" transparent opacity={0.3} toneMapped={false} />
      </mesh>

      <DataNodes count={isMobile ? 8 : 14} radius={1.9} />
      <CodeFragments count={isMobile ? 3 : 7} />
    </group>
  );
}

export default function HeroScene({ isMobile, reducedMotion }) {
  const dpr = isMobile ? [1, 1.5] : [1, 2];

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      frameloop={reducedMotion ? 'demand' : 'always'}
      aria-label="Interactive 3D visualization of a glowing AI core, decorative"
      role="img"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={1.1} color="#5fcb8d" />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color="#6e8cff" />
      <Suspense fallback={null}>
        <AICore isMobile={isMobile} />
        {!isMobile && (
          <Sparkles count={60} scale={7} size={1.4} speed={0.25} color="#4fe3d6" opacity={0.5} />
        )}
      </Suspense>
    </Canvas>
  );
}
