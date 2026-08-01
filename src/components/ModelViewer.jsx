import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// ============================================================
// useIsDesktop — detecta breakpoint >= 1024px
// Roda no client (evita SSR), reavalia no resize
// ============================================================
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  )
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isDesktop
}

// ============================================================
// Model — renderiza o glTF com rotação por mouse
// ============================================================
function Model({ mouseX, mouseY, isDesktop }) {
  const meshRef = useRef()
  const { scene } = useGLTF('/logoForSpline2.glb')

  useFrame(() => {
    if (!meshRef.current) return

    const targetY = mouseX * Math.PI * 0.08
    const targetX = mouseY * Math.PI * 0.04

    // lerp = interpolação suave — o objeto segue o mouse com atraso orgânico
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05)
  })

  // Posição do modelo no espaço 3D
  // Desktop: centro do container (0, 0, 0) — modelo parece centralizado
  // Mobile: levemente para baixo (-0.3) — compensação ótica de 3D
  const modelPosition = isDesktop
    ? [0, -1, 0]
    : [0, -0.3, 0]

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <primitive ref={meshRef} object={scene} position={modelPosition} scale={2} />
    </Float>
  )
}

// ============================================================
// LoadingSkeleton — feedback visual enquanto o 3D carrega
// ============================================================
function LoadingSkeleton() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-[#09090B]"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 0.3, 0.6] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-[#39D353]" />
    </motion.div>
  )
}

// ============================================================
// ModelViewer — componente principal
// ============================================================
export default function ModelViewer() {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const isDesktop = useIsDesktop()

  // Mouse tracking — só ativo quando o componente está montado
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX((e.clientX / window.innerWidth) * 2 - 1)
      setMouseY((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Detecta quando o Three.js terminou de carregar (primeiro render)
  useEffect(() => {
    // O Canvas do R3F emite 'started' no primeiro render
    const timer = setTimeout(() => setLoaded(true), 1000) // fallback de 1s
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden bg-transparent">
      {/* Skeleton loading — desaparece após carregamento */}
      {!loaded && <LoadingSkeleton />}

      {/* Canvas 3D — posicionado absolutamente para cobrir o container */}
      <Canvas
        frameloop="demand"
        camera={{
          position: isDesktop ? [0, 0, 5.5] : [0, -0.2, 4],
          fov: isDesktop ? 45 : 65,
        }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          // Quando o Three.js estiver pronto, esconde o skeleton
          setLoaded(true)
          // Define fundo transparente para o renderer
          gl.setClearColor(0x09090b, 0)
        }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={20} />
        <directionalLight position={[0, 5, 5]} intensity={10} />
        <Environment preset="city" environmentIntensity={0.6} />
        <Model mouseX={mouseX} mouseY={mouseY} isDesktop={isDesktop} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}