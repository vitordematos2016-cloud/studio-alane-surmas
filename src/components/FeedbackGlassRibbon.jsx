import { useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/*
 * Fita de vidro rosa que envolve a moldura da Alane.
 * O mesmo percurso é desenhado em dois canvas sobrepostos: "back" (atrás da foto)
 * só mostra o trecho com z < 0 e "front" (na frente) só o trecho com z > 0.
 * Os dois usam o mesmo relógio (performance.now), então as metades se encaixam.
 */

// Margens do canvas em relação à moldura (frações da largura/altura da moldura).
// Precisam bater com .fb-ribbon-canvas no CSS.
export const RIBBON_PAD = { left: 0.3, right: 0.3, top: 0.36, bottom: 0.34 };

const CYCLE_SECONDS = 16;
const SEGMENTS = 280;
const RADIAL = 24;

/*
 * Percurso medido na referência, em unidades da moldura (largura = 1, centro = 0, y para cima):
 * ponta esquerda (-0.62, 0.35), ponta direita (0.61, -0.11); a frente passa abaixo do balão
 * de coração, na altura das mãos, e sai pela base da moldura.
 * P(t) = C + A·cos t + B·sin t, com B.z < 0: o trecho de cima fica atrás da foto.
 */
const FEEDBACK_PATH = {
  c: [-0.005, 0.12, 0],
  a: [0.615, -0.23, 0],
  b: [0, 0.95, -0.5],
};

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec4 view = viewMatrix * world;
    vWorld = world.xyz;
    vViewPos = view.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * view;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uSide;
  uniform float uFrameTop;
  uniform float uFrameW;
  uniform float uIntensity;
  uniform float uFadeAbove;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec3 vWorld;

  void main() {
    // Corta no plano da fotografia: cada canvas desenha só a sua metade
    if (vWorld.z * uSide < 0.0) discard;

    vec3 N = normalize(vNormal);
    if (!gl_FrontFacing) N = -N;
    vec3 V = normalize(-vViewPos);
    float ndv = clamp(abs(dot(N, V)), 0.0, 1.0);
    float fresnel = pow(1.0 - ndv, 2.2);

    // Estúdio falso: softbox no alto, rebatedores laterais e filetes diagonais
    vec3 R = reflect(-V, N);
    float top = smoothstep(0.5, 0.95, R.y);
    float side = smoothstep(0.72, 0.98, R.x) + 0.6 * smoothstep(0.78, 0.98, -R.x);
    float streak = pow(max(0.0, sin(R.y * 8.0 + R.x * 5.0)), 28.0) * 0.6;
    float highlight = clamp(top * 0.85 + side * 0.65 + streak, 0.0, 1.0);

    // Corpo rosa acetinado e transparente; as bordas do vidro concentram cor (rosa mais
    // profundo) e os reflexos puxam para o branco perolado
    vec3 tint = vec3(1.0, 0.66, 0.78);
    vec3 rim = vec3(0.9, 0.3, 0.52);
    vec3 color = mix(tint, rim, smoothstep(0.15, 0.85, fresnel));
    color = mix(color, vec3(1.0), highlight);

    float alpha = (0.3 + fresnel * 0.6 + highlight * 0.75) * uIntensity;
    // O trecho de trás se perde em profundidade antes de passar acima da moldura
    alpha *= 1.0 - uFadeAbove * smoothstep(uFrameTop - 0.3 * uFrameW, uFrameTop - 0.04 * uFrameW, vWorld.y);
    alpha = clamp(alpha, 0.0, 0.95);
    // Saída pré-multiplicada: evita bordas acinzentadas na composição com a página
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

// Preenche posições e normais de um tubo de seção elíptica ao longo do percurso.
// A torção e a largura correm pelo caminho conforme "phase": é o movimento de fita escorrendo.
function writeRibbon(positions, normals, phase, path) {
  const PATH_C = path.c;
  const PATH_A = path.a;
  const PATH_B = path.b;
  const center = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const outward = new THREE.Vector3();
  const binormal = new THREE.Vector3();
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const n = new THREE.Vector3();
  let k = 0;

  for (let i = 0; i <= SEGMENTS; i += 1) {
    const t = (i / SEGMENTS) * Math.PI * 2;
    const ct = Math.cos(t);
    const st = Math.sin(t);
    center.copy(PATH_C).addScaledVector(PATH_A, ct).addScaledVector(PATH_B, st);
    tangent.copy(PATH_A).multiplyScalar(-st).addScaledVector(PATH_B, ct).normalize();
    // Direção "para fora" do anel, ortogonal à tangente
    outward.copy(PATH_A).multiplyScalar(ct).addScaledVector(PATH_B, st);
    outward.addScaledVector(tangent, -outward.dot(tangent)).normalize();
    binormal.crossVectors(tangent, outward).normalize();

    const u = t - phase;
    const twist = 0.1 + 0.6 * Math.sin(u + 0.6) + 0.18 * Math.sin(2 * u);
    const halfWidth = 0.066 * (0.78 + 0.5 * (0.5 + 0.5 * Math.sin(2 * u + 1.1)));
    const halfThick = 0.02;

    // "a" é a face larga da fita, "b" é a espessura
    a.copy(outward).multiplyScalar(Math.cos(twist)).addScaledVector(binormal, Math.sin(twist));
    b.copy(outward).multiplyScalar(-Math.sin(twist)).addScaledVector(binormal, Math.cos(twist));

    for (let j = 0; j <= RADIAL; j += 1) {
      const phi = (j / RADIAL) * Math.PI * 2;
      const ca = Math.cos(phi);
      const sb = Math.sin(phi);
      positions[k] = center.x + a.x * ca * halfWidth + b.x * sb * halfThick;
      positions[k + 1] = center.y + a.y * ca * halfWidth + b.y * sb * halfThick;
      positions[k + 2] = center.z + a.z * ca * halfWidth + b.z * sb * halfThick;
      n.copy(a).multiplyScalar(ca / halfWidth).addScaledVector(b, sb / halfThick).normalize();
      normals[k] = n.x;
      normals[k + 1] = n.y;
      normals[k + 2] = n.z;
      k += 3;
    }
  }
}

function Ribbon({ side, animate, path, pad, intensity, fadeAbove }) {
  const { viewport } = useThree();

  // Converte o retângulo da moldura para unidades do mundo no plano z = 0
  const frameW = viewport.width / (1 + pad.left + pad.right);
  const frameH = viewport.height / (1 + pad.top + pad.bottom);
  const offsetX = ((pad.left - pad.right) / 2) * frameW;
  const offsetY = ((pad.bottom - pad.top) / 2) * frameH;
  const vectors = useMemo(
    () => ({ c: new THREE.Vector3(...path.c), a: new THREE.Vector3(...path.a), b: new THREE.Vector3(...path.b) }),
    [path]
  );

  const geometry = useMemo(() => {
    const count = (SEGMENTS + 1) * (RADIAL + 1);
    const positions = new Float32Array(count * 3);
    const normals = new Float32Array(count * 3);
    writeRibbon(positions, normals, 0, vectors);
    const indices = [];
    const row = RADIAL + 1;
    for (let i = 0; i < SEGMENTS; i += 1) {
      for (let j = 0; j < RADIAL; j += 1) {
        const p0 = i * row + j;
        const p1 = p0 + row;
        indices.push(p0, p1, p0 + 1, p1, p1 + 1, p0 + 1);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('normal', new THREE.BufferAttribute(normals, 3).setUsage(THREE.DynamicDrawUsage));
    g.setIndex(indices);
    g.computeBoundingSphere();
    return g;
  }, [vectors]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uSide: { value: side === 'front' ? 1 : -1 },
          uFrameTop: { value: 0 },
          uFrameW: { value: 1 },
          uIntensity: { value: intensity },
          uFadeAbove: { value: fadeAbove ? 1 : 0 },
        },
        transparent: true,
        premultipliedAlpha: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [side, intensity, fadeAbove]
  );

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  material.uniforms.uFrameTop.value = offsetY + frameH / 2;
  material.uniforms.uFrameW.value = frameW;

  useFrame(() => {
    if (!animate) return;
    const phase = ((performance.now() / 1000) % CYCLE_SECONDS) / CYCLE_SECONDS * Math.PI * 2;
    writeRibbon(geometry.attributes.position.array, geometry.attributes.normal.array, phase, vectors);
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.normal.needsUpdate = true;
  });

  return (
    <mesh
      geometry={geometry}
      material={material}
      position={[offsetX, offsetY, 0]}
      scale={[frameW, frameW, frameW]}
      frustumCulled={false}
    />
  );
}

// Reutilizada em outras seções: cada uma passa o próprio percurso, margens e classe do canvas
export default function FeedbackGlassRibbon({
  side,
  animate = true,
  active = true,
  path = FEEDBACK_PATH,
  pad = RIBBON_PAD,
  className = 'fb-ribbon-canvas',
  intensity = 1,
  // true: o trecho de trás some antes de passar acima da moldura; false: anel completo
  fadeAbove = false,
}) {
  return (
    <Canvas
      className={`${className} ${className}-${side}`}
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 9], fov: 24 }}
      aria-hidden="true"
    >
      <Ribbon side={side} animate={animate} path={path} pad={pad} intensity={intensity} fadeAbove={fadeAbove} />
    </Canvas>
  );
}
