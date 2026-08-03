import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls, Float, Card, Html } from '@react-three/drei'
import * as THREE from 'three'

const CAMERA_PARAMS = {
  'hero-model': { zoom: 1.2, position: [0, -0.5, 2.5] },
  'light-model': { zoom: 1.2, position: [0, -0.5, 2.5] },
  'scene-metal': { zoom: 2, position: [0, -2, 2.5] },
  'scene-particles': { zoom: 1.5, position: [0, 0, 3] },
}

// ============================================================
// ErrorBoundary — captura erros do useGLTF e renderiza fallback
// ============================================================
class ModelCardErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error) {
    console.error('[ModelCard] ERROR BOUNDARY:', error)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-xs text-white/40">Erro ao carregar o modelo 3D.</p>
        </div>
      )
    }
    return this.props.children
  }
}

// ============================================================
// Model — glTF com mouse tracking
// ============================================================
function Model({ modelPath, mouseX, mouseY }) {
  const meshRef = useRef()
  const { scene } = useGLTF(modelPath)

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) child.castShadow = true
      })
    }
  }, [scene])

  useFrame(() => {
    if (!meshRef.current) return
    const targetY = mouseX * Math.PI * 0.08
    const targetX = mouseY * Math.PI * 0.04
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetY,
      0.05
    )
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetX,
      0.05
    )
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <primitive ref={meshRef} object={scene} position={[0, -0.5, 0]} scale={1} />
    </Float>
  )
}

// ============================================================
// ModelViewer — Canvas + mouse tracking + loading
// ============================================================
function ModelViewer({ modelPath, cameraParams }) {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const canvasRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMouseX((x / rect.width) * 2 - 1)
      setMouseY((y / rect.height) * 2 - 1)
    }
    const canvas = canvasRef.current
    canvas?.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => canvas?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={canvasRef} className="relative h-full w-full overflow-hidden bg-transparent">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-base">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#39D353]" />
        </div>
      )}
      <Canvas
        ref={canvasRef}
        frameloop="demand"
        camera={{ ...cameraParams, fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          setLoaded(true)
          gl.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={20} />
        <directionalLight position={[0, 5, 5]} intensity={10} />
        <Environment preset="city" environmentIntensity={0.6} />
        <ModelErrorCardErrorBoundary>
          <Model modelPath={modelPath} mouseX={mouseX} mouseY={mouseY} />
        </ModelErrorCardErrorBoundary>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

// ============================================================
// ModelCard — wrapper estilizado
// ============================================================
function ModelCard({
  model = {
    path: '/logoForSpline2.glb',
    type: 'glb',
  },
  selected,
  onSelect,
}) {
  const isGLB = model?.type === 'glb'
  const modelPath = isGLB ? model.path : '/logoForSpline2.glb'
  const cameraParams =
    CAMERA_PARAMS[model.id] || CAMERA_PARAMS['hero-model']

  return (
    <div>
      <div className="relative flex min-h-[250px] min-w-[200px] flex-col">
        <Canvas
          className="aspect-[3/2] w-full rounded-lg border border-white/[0.15] bg-[#151515] p-3"
          camera={{
            fov: 40,
            zoom: cameraParams.zoom,
            position: cameraParams.position,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -3, 3]} intensity={0.8} />
          {selected && modelPath && (
            <>
              {isGLB ? (
                <Card
                  path={modelPath}
                  format="glb"
                  position={[0, -0.5, 0]}
                  rotation={[0, Math.PI, 0]}
                  scale={0.6}
                />
              ) : (
                <Html>
                  <iframe
                    src={modelPath}
                    style={{ width: '100%', height: '100%' }}
                    frameBorder="0"
                  />
                </Html>
              )}
            </>
          )}
        </Canvas>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm font-medium text-ink">{model.name}</span>
        {selected && <span className="text-xs text-white/60">Selecionado</span>}
      </div>
    </div>
  )
}

export default ModelCard