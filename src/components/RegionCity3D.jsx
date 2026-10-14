import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/*
 * Miniatura 3D de cidade (estilo maquete): quadras escuras com prédios, avenidas amarelas
 * com rotatória, rio verde-água, árvores e luzes verdes, e um pin brilhante no centro.
 * Tudo é gerado proceduralmente (sem arquivos externos) e gira devagar em loop.
 */

const ROAD = 0.62; // largura das avenidas principais
const RING_IN = 1.05;
const RING_OUT = 1.55;
const EXTENT = 9;

// Gerador pseudoaleatório com semente fixa: a cidade é sempre a mesma
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const riverCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-10, 0, 3.6),
  new THREE.Vector3(-5, 0, 2.6),
  new THREE.Vector3(-2.6, 0, 4.2),
  new THREE.Vector3(1, 0, 5.4),
  new THREE.Vector3(5, 0, 4.6),
  new THREE.Vector3(10, 0, 5.6),
]);

const riverCurve2 = new THREE.CatmullRomCurve3([
  new THREE.Vector3(10, 0, -3.2),
  new THREE.Vector3(5.5, 0, -2.4),
  new THREE.Vector3(3, 0, -4.4),
  new THREE.Vector3(-1, 0, -5.6),
  new THREE.Vector3(-6, 0, -6.4),
  new THREE.Vector3(-10, 0, -8),
]);

function distToCurve(curve, x, z) {
  let best = Infinity;
  for (let i = 0; i <= 60; i += 1) {
    const p = curve.getPoint(i / 60);
    best = Math.min(best, Math.hypot(p.x - x, p.z - z));
  }
  return best;
}

function ribbonGeometry(curve, width) {
  const pts = curve.getSpacedPoints(120);
  const pos = [];
  const idx = [];
  pts.forEach((p, i) => {
    const t = curve.getTangentAt(Math.min(i / 120, 1));
    const n = new THREE.Vector3(-t.z, 0, t.x).multiplyScalar(width / 2);
    pos.push(p.x + n.x, 0.012, p.z + n.z, p.x - n.x, 0.012, p.z - n.z);
    if (i > 0) {
      const a = (i - 1) * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

function useCity() {
  return useMemo(() => {
    const rand = rng(20261013);
    const buildings = [];
    const glows = [];
    const trees = [];
    for (let gx = -EXTENT; gx < EXTENT; gx += 1) {
      for (let gz = -EXTENT; gz < EXTENT; gz += 1) {
        const cx = gx + 0.5;
        const cz = gz + 0.5;
        if (Math.abs(cx) < ROAD / 2 + 0.55 || Math.abs(cz) < ROAD / 2 + 0.55) continue;
        if (Math.hypot(cx, cz) < RING_OUT + 0.7) continue;
        const nearRiver = Math.min(distToCurve(riverCurve, cx, cz), distToCurve(riverCurve2, cx, cz));
        if (nearRiver < 0.75) continue;
        if (nearRiver < 1.45 && rand() < 0.75) {
          trees.push([cx + (rand() - 0.5) * 0.5, cz + (rand() - 0.5) * 0.5, 0.18 + rand() * 0.16]);
          continue;
        }
        // Cada quadra vira 1 a 4 prédios
        const parts = rand() < 0.45 ? 4 : rand() < 0.5 ? 2 : 1;
        const dist = Math.hypot(cx, cz);
        for (let k = 0; k < parts; k += 1) {
          const w = parts === 1 ? 0.78 : 0.36;
          const ox = parts === 1 ? 0 : (k % 2 === 0 ? -0.2 : 0.2);
          const oz = parts === 4 ? (k < 2 ? -0.2 : 0.2) : 0;
          const h = 0.08 + rand() * (dist > 5 ? 1.1 : 0.45) + (rand() < 0.08 ? 0.8 : 0);
          buildings.push([cx + ox, cz + oz, w, h, w * (0.85 + rand() * 0.15)]);
          if (rand() < 0.16) glows.push([cx + ox, h + 0.035, cz + oz]);
        }
      }
    }
    return { buildings, glows, trees };
  }, []);
}

function Buildings({ items }) {
  const ref = useRef();
  useEffect(() => {
    const m = new THREE.Matrix4();
    items.forEach(([x, z, w, h, d], i) => {
      m.compose(new THREE.Vector3(x, h / 2, z), new THREE.Quaternion(), new THREE.Vector3(w, h, d));
      ref.current.setMatrixAt(i, m);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [items]);
  return (
    <instancedMesh ref={ref} args={[null, null, items.length]} castShadow receiveShadow>
      <boxGeometry />
      <meshStandardMaterial color="#2f3138" roughness={0.75} metalness={0.15} />
    </instancedMesh>
  );
}

function Glows({ items }) {
  const ref = useRef();
  useEffect(() => {
    const m = new THREE.Matrix4();
    items.forEach(([x, y, z], i) => {
      m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion(), new THREE.Vector3(0.16, 0.07, 0.16));
      ref.current.setMatrixAt(i, m);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [items]);
  return (
    <instancedMesh ref={ref} args={[null, null, items.length]}>
      <boxGeometry />
      <meshStandardMaterial color="#8dff3a" emissive="#6cff1f" emissiveIntensity={1.6} toneMapped={false} />
    </instancedMesh>
  );
}

function Trees({ items }) {
  const ref = useRef();
  useEffect(() => {
    const m = new THREE.Matrix4();
    items.forEach(([x, z, r], i) => {
      m.compose(new THREE.Vector3(x, r * 0.9, z), new THREE.Quaternion(), new THREE.Vector3(r, r, r));
      ref.current.setMatrixAt(i, m);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [items]);
  return (
    <instancedMesh ref={ref} args={[null, null, items.length]} castShadow>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#7ee23b" emissive="#3fae12" emissiveIntensity={0.55} roughness={0.6} flatShading />
    </instancedMesh>
  );
}

function Roads() {
  const yellow = <meshStandardMaterial color="#f2b81e" emissive="#c98a00" emissiveIntensity={0.35} roughness={0.5} />;
  return (
    <group position={[0, 0.006, 0]}>
      {/* Avenidas em cruz */}
      <mesh rotation-x={-Math.PI / 2} position={[-(EXTENT + RING_OUT) / 2 - 0.3, 0, 0]}>
        <planeGeometry args={[EXTENT - RING_OUT + 0.6, ROAD]} />
        {yellow}
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[(EXTENT + RING_OUT) / 2 + 0.3, 0, 0]}>
        <planeGeometry args={[EXTENT - RING_OUT + 0.6, ROAD]} />
        {yellow}
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -(EXTENT + RING_OUT) / 2 - 0.3]}>
        <planeGeometry args={[ROAD, EXTENT - RING_OUT + 0.6]} />
        {yellow}
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, (EXTENT + RING_OUT) / 2 + 0.3]}>
        <planeGeometry args={[ROAD, EXTENT - RING_OUT + 0.6]} />
        {yellow}
      </mesh>
      {/* Rotatória */}
      <mesh rotation-x={-Math.PI / 2}>
        <ringGeometry args={[RING_IN, RING_OUT, 72]} />
        {yellow}
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.004, 0]}>
        <circleGeometry args={[RING_IN, 64]} />
        <meshStandardMaterial color="#26282e" roughness={0.9} />
      </mesh>
      {[0.42, 0.7, 0.95].map((r) => (
        <mesh key={r} rotation-x={-Math.PI / 2} position={[0, 0.008, 0]}>
          <ringGeometry args={[r - 0.015, r + 0.015, 64]} />
          <meshBasicMaterial color="#4a4d56" />
        </mesh>
      ))}
      {/* Faixas centrais escuras nas avenidas */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.003, 0]}>
        <planeGeometry args={[EXTENT * 2, 0.035]} />
        <meshBasicMaterial color="#8a6a00" />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.003, 0]}>
        <planeGeometry args={[0.035, EXTENT * 2]} />
        <meshBasicMaterial color="#8a6a00" />
      </mesh>
    </group>
  );
}

function Rivers() {
  const g1 = useMemo(() => ribbonGeometry(riverCurve, 0.85), []);
  const g2 = useMemo(() => ribbonGeometry(riverCurve2, 0.7), []);
  const mat = <meshStandardMaterial color="#21d3b6" emissive="#0aa38a" emissiveIntensity={0.55} roughness={0.15} metalness={0.2} />;
  return (
    <>
      <mesh geometry={g1}>{mat}</mesh>
      <mesh geometry={g2}>{mat}</mesh>
    </>
  );
}

// Pin de localização brilhante (anel + ponta), sobre um pedestal dourado na rotatória
function Pin({ animate }) {
  const ref = useRef();
  const tipGeom = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 24; i += 1) {
      const t = i / 24;
      pts.push(new THREE.Vector2(0.42 * Math.sin((t * Math.PI) / 2) * (1 - t * 0.98), -t * 1.05));
    }
    return new THREE.LatheGeometry(pts, 48);
  }, []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = animate ? clock.getElapsedTime() : 0;
    ref.current.position.y = 1.62 + Math.sin(t * 1.4) * 0.07;
    ref.current.rotation.y = -ref.current.parent.rotation.y; // sempre de frente para a câmera
  });
  const glossy = (
    <meshPhysicalMaterial color="#e3237a" emissive="#9c0c47" emissiveIntensity={0.35} roughness={0.12} metalness={0.1} clearcoat={1} clearcoatRoughness={0.05} />
  );
  return (
    <>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[0.46, 0.5, 0.1, 48]} />
        <meshStandardMaterial color="#f5c434" emissive="#d39400" emissiveIntensity={0.45} metalness={0.4} roughness={0.35} />
      </mesh>
      <group ref={ref}>
        <mesh castShadow>
          <torusGeometry args={[0.36, 0.16, 32, 64]} />
          {glossy}
        </mesh>
        <mesh geometry={tipGeom} position={[0, -0.2, 0]} castShadow>
          {glossy}
        </mesh>
      </group>
    </>
  );
}

function City({ animate }) {
  const group = useRef();
  const { buildings, glows, trees } = useCity();
  useFrame((_, dt) => {
    if (animate && group.current) group.current.rotation.y += dt * 0.12;
  });
  return (
    <group ref={group} rotation-y={0.5}>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[EXTENT * 2.4, EXTENT * 2.4]} />
        <meshStandardMaterial color="#1f2126" roughness={0.95} />
      </mesh>
      <Roads />
      <Rivers />
      <Buildings items={buildings} />
      <Glows items={glows} />
      <Trees items={trees} />
      <Pin animate={animate} />
    </group>
  );
}

export default function RegionCity3D({ className }) {
  const wrap = useRef(null);
  const [onScreen, setOnScreen] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    setAnimate(!q.matches);
    const node = wrap.current;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: '200px 0px' });
    if (node) io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={className}>
      <Canvas
        frameloop={onScreen ? 'always' : 'never'}
        dpr={[1, 2]}
        shadows
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 5.4, 6.4], fov: 34, near: 0.1, far: 60 }}
        onCreated={({ camera }) => camera.lookAt(0, 0.4, 0)}
      >
        {/* Névoa quente: as quadras distantes se perdem em luz, como na foto de maquete */}
        <fog attach="fog" args={['#f6d7c6', 7, 15]} />
        <hemisphereLight args={['#ffe2c4', '#1a1c22', 0.75]} />
        <directionalLight position={[-6, 9, -4]} intensity={2.2} color="#ffd29a" castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[5, 4, 6]} intensity={0.5} color="#ffb7d2" />
        <City animate={animate} />
      </Canvas>
    </div>
  );
}
