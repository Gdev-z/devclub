import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

/**
 * Tela de Loading (pré-carregador):
 * - fixed inset-0 intercepta o usuário enquanto os recursos carregam.
 * - contador 0→100% + barra ultrafina com glow verde neon.
 * - ao atingir 100%, o App removede o componente e o AnimatePresence
 *   aplica exit (fade-out + slide-up), revelando a Hero por baixo (sem FOUC).
 */
export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let current = 0
    const start = performance.now()
    const duration = 2600

    let raf
    const tick = (now) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // desacelera perto do fim
      current = Math.max(0, Math.round(eased * 100))
      setProgress(current)

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => onComplete?.(), 450)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <motion.div
      id="loading-screen"
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#09090B]"
    >
      {/* brilhos de fundo sutis */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,211,83,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(133,50,242,0.10),transparent_50%)]" />

      {/* Logo real (assets/logo.png) */}
      <img
        src={logo}
        alt="DevClub"
        className="mb-10 h-12 w-auto"
      />

      {/* contador */}
      <div className="mb-4 font-mono text-5xl font-bold tabular-nums text-white">
        {Math.max(0, progress)}
        <span className="text-[#39D353]">%</span>
      </div>

      {/* barra de progresso ultrafina com glow verde */}
      <div className="h-[2px] w-64 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-[#39D353] shadow-[0_0_12px_rgba(57,211,83,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-6 font-mono text-xs tracking-wide text-white/40">
        Preparando sua jornada...
      </p>
    </motion.div>
  )
}
