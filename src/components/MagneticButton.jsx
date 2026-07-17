import { useRef } from 'react'
import gsap from 'gsap'

/**
 * MagneticButton — botão CTA verde neon com micro-interação:
 * é atraído suavemente pelo cursor (magnetic) e ganha glow no hover.
 */
export default function MagneticButton({ label = 'COMEÇAR MINHA JORNADA' }) {
  const wrapRef = useRef(null)
  const btnRef = useRef(null)

  const handleMove = (e) => {
    const btn = btnRef.current
    const wrap = wrapRef.current
    if (!btn || !wrap) return
    const rect = wrap.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2

    gsap.to(btn, {
      x: relX * 0.35,
      y: relY * 0.45,
      duration: 0.4,
      ease: 'power3.out',
    })
  }

  const handleLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      <button
        ref={btnRef}
        className="group relative inline-flex items-center gap-2 rounded-lg bg-devgreen px-8 py-4 font-mono text-sm font-bold tracking-widest text-zinc-950 shadow-neon-green transition-[box-shadow,transform] duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(57,211,83,0.5),0_0_50px_rgba(57,211,83,0.3)]"
      >
        <span className="relative z-10">{label}</span>
        {/* brilho deslizante no hover */}
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <svg
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  )
}
