/* =========================================================================
   ParticlesCanvas — Particle halo from HeroScene.jsx
   =========================================================================
   Extraído de HeroScene.jsx (cena "particle halo") para ser usado em uma
   caixa fixa de visualização (substituindo o logo .glb).

   Mudanças em relação ao original:
   1. Trocado color="var(--color-accent)" por "#39D353" (hex fixo) em
      todos os materiais — THREE.Color não resolve variáveis CSS, então
      o valor original não estava funcionando (ficava cor errada
      silenciosamente).
   2. Reduzidas as intensidades de luz que estavam desproporcionalmente
      altas (pointLight 20→6, directionalLight 16→2) — valores originais
      estouravam o material.
   3. Sem frameloop="demand" aqui de propósito: as duas cenas têm rotação
      contínua por design (useFrame incrementando rotation a cada frame),
      então frameloop padrão (sempre renderizando) é o comportamento
      correto — "demand" só faz sentido pra animações que convergem e
      param (como o rastreamento de mouse do logo .glb).
   4. Sem <OrbitControls> — o original também não tinha, mantido assim.
   ========================================================================= */

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleHalo() {
  const group = useRef();
  const haloMat = useRef();
  const count = 220;

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.1 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15;
      group.current.rotation.x += delta * 0.05;
    }
    if (haloMat.current) {
      const t = state.clock.elapsedTime;
      haloMat.current.opacity = 0.4 + Math.sin(t * 1.5) * 0.25;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#39D353" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#8532F2"
          emissive="#8532F2"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={haloMat}
          size={0.04}
          color="#39D353"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function ParticlesCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={6} color="#39D353" />
      <directionalLight position={[-5, -3, 2]} intensity={2} color="#8532F2" />
      <ParticleHalo />
    </Canvas>
  );
}