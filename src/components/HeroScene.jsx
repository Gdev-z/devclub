import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 1. COMPONENTE DA GEOMETRIA INTERATIVA
function InteractiveShape() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Rotação autônoma suave
    meshRef.current.rotation.y += delta * 0.25;
    meshRef.current.rotation.z += delta * 0.1;

    // Reação suave ao ponteiro do mouse (Lerp)
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetY,
      0.05
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      {/* GEOMETRIA PRINCIPAL: A carcaça metálica escovada */}
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 1]} />
        
        {/* Material Físico ajustado para refletir as luzes e o ambiente */}
        <meshPhysicalMaterial
          color="#3a3a48"          // Tom cinza chumbo (muito mais claro que o preto anterior)
          roughness={0.15}         // Rugosidade baixa para brilho escovado, sem virar espelho puro
          metalness={0.85}         // Alta metaização para dar peso e reflexo
          clearcoat={0.8}          // Camada de verniz por cima do metal
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>

      {/* WIREFRAME INTERNO: O esqueleto neon pulsante (agora bem visível) */}
      <mesh scale={2.21}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color="#39D353" 
          wireframe={true} 
          transparent={true} 
          opacity={0.45}           // Subimos de 0.15 para 0.45
        />
      </mesh>
    </Float>
  );
}

// 2. COMPONENTE PRINCIPAL DO PALCO 3D — canvas full-screen fixo ao fundo
export default function Hero3DStage() {
  return (
    <Canvas
      className="r3f-bg-canvas"
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh' }}
    >
        {/* O SEGREDO DO METÁLICO: Mapa de ambiente HDRI simula reflexos de estúdio */}
        <Environment preset="city" environmentIntensity={0.6} />

        {/* LUZ AMBIENTE: Preenchimento geral forte para não haver faces 100% pretas */}
        <ambientLight intensity={1.5} color="#ffffff" />

        {/* LUZ PRINCIPAL ROXA (Superior Direita): Cria o contorno violeta na geometria */}
        <directionalLight
          position={[5, 5, 3]}
          intensity={5}
          color="#8532F2"
        />

        {/* LUZ SECUNDÁRIA VERDE (Inferior Esquerda): Glow neon na base */}
        <pointLight
          position={[-4, -4, -2]}
          intensity={15}
          color="#39D353"
          distance={12}
        />

        {/* LUZ DE PREENCHIMENTO FRONTAL (Branca): Joga luz na face que olha para o usuário */}
        <directionalLight
          position={[0, 0, 5]}
          intensity={1.5}
          color="#ffffff"
        />

        {/* GEOMETRIA INTERATIVA */}
        <InteractiveShape />

        {/* SOMBRA NO CHÃO: Fixa o objeto no espaço */}
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.5}
          scale={10}
          blur={2.5}
          far={4}
          color="#8532F2"
        />
      </Canvas>
  );
}