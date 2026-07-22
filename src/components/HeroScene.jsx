import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment } from '@react-three/drei';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

import bgVideo from '../assets/video.webm';

/* ============================================================
   CENA A — Metal escovado + wireframe neon
   ============================================================ */
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

function MetalScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Environment preset="city" environmentIntensity={0.6} />
      <ambientLight intensity={1.5} color="#ffffff" />
      {/* <directionalLight position={[5, 5, 3]} intensity={5} color="#8532F2" /> */}
      <pointLight position={[-4, -4, -2]} intensity={15} color="#39D353" distance={12} />
      <directionalLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />
      <InteractiveShape />
      {/* <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.5}
        scale={10}
        blur={2.5}
        far={4}
        color="#8532F2"
      /> */}
    </Canvas>
  );
}

/* ============================================================
   CENA B — Partículas / halo
   ============================================================ */
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

function ParticleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={20} color="#39D353" />
      <directionalLight position={[-5, -3, 2]} intensity={16} color="#8532F2" />
      <ParticleHalo />
    </Canvas>
  );
}

/* ============================================================
   HERO 3D STAGE — controlado por scroll

   Fluxo:
   - 0% → 30%:   Partículas (cena B), posição center
   - 30% → 60%:  Metal (cena A), canvas desliza para a direita
   - 60% → 100%: Volta para Partículas (cena B), posição center
   ============================================================ */
const SWITCH_MS = 60000; // alterna a cada 1 minuto

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isDesktop;
}

export default function Hero3DStage() {
  const { scrollYProgress } = useScroll();
  const isDesktop = useIsDesktop();

  // Posição do canvas: centrado no mobile, deslocado no desktop
  const baseX = isDesktop ? '50%' : '0%';
  const peakX = isDesktop ? '53%' : '0%';

  const canvasX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [baseX, peakX, peakX, baseX]
  );

  // Troca de cena por tempo (a cada 60s)
  const [mode, setMode] = useState('particles');

  useEffect(() => {
    const id = setInterval(() => {
      setMode((m) => (m === 'metal' ? 'particles' : 'metal'));
    }, SWITCH_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="r3f-bg-canvas">
      {/* Vídeo de fundo — fica fixo, não se move com o scroll */}
      <video
        className="absolute inset-0 h-full w-full object-cover pointer-events-none -z-10"
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Canvas 3D — se move com o scroll */}
      <motion.div
        className="absolute inset-0"
        style={{ x: canvasX }}
      >

      {/* Cena Metal */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {mode === 'metal' && (
            <motion.div
              key="metal"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <MetalScene />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cena Partículas */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {mode === 'particles' && (
            <motion.div
              key="particles"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <ParticleScene />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </motion.div>
    </div>
  );
}
