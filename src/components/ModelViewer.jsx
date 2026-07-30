import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls, Float } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'

// Hook local: detecta se a viewport é "desktop" (>= 1024px).
// Roda no client (checa `typeof window` pra evitar erro em SSR)
// e reavalia sempre que a janela é redimensionada.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  )
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', check)
    // cleanup: remove o listener ao desmontar, evitando leak de memória
    return () => window.removeEventListener('resize', check)
  }, [])
  return isDesktop
}

// Componente que renderiza o objeto 3D (glTF) e o rotaciona
// suavemente em direção à posição do mouse na tela.
function Model({ mouseX, mouseY }) {
  const meshRef = useRef() // referência direta ao mesh do objeto, pra manipular rotation no useFrame
  const { scene } = useGLTF('/logoForSpline2.glb') // carrega o modelo 3D (cacheado pelo drei)

  // useFrame roda a cada frame renderizado pelo Canvas (equivalente ao loop de animação do R3F)
  useFrame(() => {
    if (!meshRef.current) return // guarda: evita erro se o mesh ainda não montou

    // Converte a posição do mouse (-1 a 1) em um ângulo alvo de rotação
    const targetY = mouseX * Math.PI * 0.08
    const targetX = mouseY * Math.PI * 0.04

    // Interpolação suave (lerp) entre a rotação atual e o alvo — evita "grudar" na posição do mouse,
    // criando um movimento com leve atraso/suavidade (o 0.05 é o "peso" da interpolação por frame)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05)
  })

  return (
    // Float: componente do drei que aplica flutuação/oscilação idle ao filho,
    // independente da rotação controlada pelo mouse acima
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <primitive ref={meshRef} object={scene} position={[0, -0.4, 0]} scale={2} />
    </Float>
  )
}

export default function ModelViewer() {
  const [open, setOpen] = useState(true)   // controla se a cena 3D inteira está visível
  const [mouseX, setMouseX] = useState(0)  // posição X do mouse normalizada (-1 a 1)
  const [mouseY, setMouseY] = useState(0)  // posição Y do mouse normalizada (-1 a 1)

  const { scrollYProgress } = useScroll() // progresso do scroll da página (0 a 1), do framer-motion
  const isDesktop = useIsDesktop()        // breakpoint atual (mobile vs desktop)

  // Posição do canvas: centrado no mobile, deslocado no desktop.
  // baseX/peakX são strings percentuais consumidas pelo framer-motion.
  const baseX = isDesktop ? '40%' : '0%'
  const peakX = isDesktop ? '53%' : '0%'

  // Mapeia o progresso do scroll (0 → 0.3 → 0.8 → 1) para os valores de X acima,
  // criando um pequeno "deslocamento e volta" do canvas conforme o usuário rola a página
  const canvasX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [baseX, peakX, peakX, baseX]
  )

  // Efeito de rastreamento do mouse: só ativa o listener enquanto `open` for true,
  // evitando trabalho desnecessário quando a cena está fechada.
  useEffect(() => {
    if (!open) return
    const handleMouseMove = (e) => {
      // Normaliza a posição do mouse na tela para o intervalo [-1, 1],
      // que é o formato que o `Model` espera para calcular a rotação
      setMouseX((e.clientX / window.innerWidth) * 2 - 1)
      setMouseY((e.clientY / window.innerHeight) * 2 - 1)
    }
    // passive: true -> otimização de performance, indica que o handler não vai chamar preventDefault()
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [open])

  // Early return: se `open` for false, não renderiza nada (desmonta o Canvas e libera recursos da GPU)
  if (!open) return null

  return (
    // Container fixo que serve de "palco" pro fundo 3D
    <div className="r3f-bg-canvas">
      {/* motion.div aplica o deslocamento horizontal (canvasX) calculado a partir do scroll */}
      <motion.div className="absolute inset-0" style={{ x: canvasX }}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ antialias: true, alpha: true }} // alpha:true permite fundo transparente
          dpr={[1, 2]} // limita o device pixel ratio entre 1x e 2x (economiza GPU em telas retina)
          style={{ width: '100vw', height: '100vh', background: 'transparent' }}
        >
          {/* Luzes da cena: ambient ilumina tudo uniformemente; point/directional dão volume e sombra */}
          <ambientLight intensity={1.5} />
          <pointLight position={[5, 5, 5]} intensity={20} />
          <directionalLight position={[0, 5, 5]} intensity={10} />

          {/* Environment: mapa de reflexo/iluminação baseado em HDRI pré-definido ("city") */}
          <Environment preset="city" environmentIntensity={0.6} />

          {/* Objeto 3D principal, recebendo a posição do mouse já normalizada */}
          <Model mouseX={mouseX} mouseY={mouseY} />

          {/* Permite ao usuário arrastar pra orbitar a câmera manualmente */}
          <OrbitControls />
        </Canvas>

        <button
          className="absolute bottom-6 text-white/50 text-sm underline cursor-pointer hover:text-white/80"
          onClick={() => setOpen(false)}
        >
          Fechar
        </button>
      </motion.div>
    </div>
  )
}