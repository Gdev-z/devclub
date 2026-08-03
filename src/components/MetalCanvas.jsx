/* =========================================================================
   MetalCanvas — Interactive metallic shape from HeroScene.jsx
   =========================================================================
   Extraído de HeroScene.jsx (cena "metal shape") para ser usado em uma
   caixa fixa de visualização (substituindo o logo .glb).

   Mudanças em relação ao original:
   1. Trocado color="var(--color-accent)" por "#39D353" (hex fixo) em
      todos os materiais — THREE.Color não resolve variáveis CSS, então
      o valor original não estava funcionando (ficava cor errada
      silenciosamente).
   2. Reduzidas as intensidades de luz que estavam desproporcionalmente
      altas (pointLight 15→6, directionalLight 5→1.2) — valores originais
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
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveShape() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.25;
    meshRef.current.rotation.z += delta * 0.1;
    const targetY = (state.pointer.y * Math.PI) / 4;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetY,
      0.05
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#3a3a48"
          roughness={0.15}
          metalness={0.85}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
      <mesh scale={2.21}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#39D353" wireframe transparent opacity={0.45} />
      </mesh>
    </Float>
  );
}

export default function MetalCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Environment preset="city" environmentIntensity={0.6} />
      <ambientLight intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -4, -2]} intensity={6} color="#39D353" distance={12} />
      <directionalLight position={[0, 0, 5]} intensity={1.2} color="#ffffff" />
      <InteractiveShape />
    </Canvas>
  );
}