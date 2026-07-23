import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import javascript from '../assets/icons/javascript.svg'
import typescript from '../assets/icons/Typescript.svg'
import react from '../assets/icons/React.svg'
import node from '../assets/icons/node_js.svg'
import postgres from '../assets/icons/postgresql.svg'
import docker from '../assets/icons/Docker.svg'
import n8n from '../assets/icons/n8n.svg'
import ai from '../assets/icons/openai.svg'

gsap.registerPlugin(ScrollTrigger)

/* ============================================================
   Ícones reais (SVGs de src/assets/icons) — cor própria de marca
   ============================================================ */
const ICONS = {
  javascript,
  typescript,
  react,
  node,
  postgres,
  docker,
  n8n,
  ai,
}

/* ============================================================
   Dock principal — 8 tecnologias
   ============================================================ */
const DOCK = [
  { key: 'javascript', label: 'JavaScript' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'react', label: 'React' },
  { key: 'node', label: 'Node.js' },
  { key: 'postgres', label: 'PostgreSQL' },
  { key: 'docker', label: 'Docker' },
  { key: 'n8n', label: 'n8n' },
  { key: 'ai', label: 'Claude' },
]

/* Pílulas complementares */
const PILLS = [
  'HTML5', 'CSS3', 'Tailwind CSS', 'Git', 'GitHub', 'Next.js', 'Express',
  'Prisma ORM', 'MongoDB', 'Docker', 'Jest', 'REST APIs',
  'Webhooks', 'Vscode', 'Vercel',
]

/* ============================================================
   SEÇÃO PRINCIPAL
   ============================================================ */
export default function TechStackSection() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const dockRef = useRef(null)

  // Reveal circular do fundo da seção, controlado pelo scroll (scrub),
  // igual ao demo 8 do animations-lab (clip-path expandindo de 0% a 150%).
  useLayoutEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    if (!section || !bg) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(150% at 50% 50%)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'center 40%',
            scrub: true,
          },
        },
      )

      // Fade-in do dock de tecnologias ao dar scroll (stagger por ícone).
      const icons = dockRef.current?.children
      if (icons && icons.length) {
        gsap.fromTo(
          icons,
          { opacity: 0, y: 16, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.07,
            scrollTrigger: {
              trigger: dockRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="stack" className="max-w mx-auto px-6 md:px-12 py-28 text-white relative z-10 overflow-hidden">
      {/* Fundo com reveal circular (scroll-driven) */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          clipPath: 'circle(0% at 50% 50%)',
          background: '#09090B',
        }}
      />
      {/* Cabeçalho */}
      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center max-w-4xl mx-auto leading-tight">
          Aprenda as <span className="text-[#39D353]">PRINCIPAIS</span> Tecnologias
          do Mercado - Do ZERO, de forma Didática com os{' '}
          <span className="text-[#39D353]">MELHORES</span> do Mercado
        </h2>
        <p className="text-neutral-400 text-lg md:text-xl text-center mt-4 mb-16 max-w-2xl mx-auto font-light">
          Uma stack moderna, focada em alta performance, automação e inteligência
          artificial para você disputar as melhores vagas.
        </p>
      </div>

      {/* Core Card — Circular Reveal (scroll-driven) */}
      <motion.div
        initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
        whileInView={{ clipPath: 'circle(150% at 50% 50%)', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto rounded-[32px] p-8 md:p-14 relative border  overflow-hidden"
      >
        {/* glow radial de fundo */}
        <div className="absolute inset-0 pointer-events-none" />

        {/* Tag superior */}
        <span className="bg-[#39D353]/10 text-[#39D353] border border-[#39D353]/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider mx-auto w-fit mb-8 flex items-center gap-2 shadow-[0_0_15px_rgba(57,211,83,0.2)] relative z-10">
          ⚡ STACK COMPLETA &amp; ATUALIZADA
        </span>

        {/* Título interno */}
        <h3 className="text-2xl md:text-4xl font-bold text-center max-w-2xl mx-auto mb-12 text-white relative z-10">
          Dominando as ferramentas mais desejadas pelas grandes empresas, sem
          enrolação
        </h3>

        {/* Dock de tecnologias */}
        <div ref={dockRef} className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-12 relative z-10">
          {DOCK.map((t) => (
            <div
              key={t.key}
              className="group w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center relative cursor-pointer bg-[#141816]/80 backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:border-[#39D353]/60 hover:shadow-[0_0_25px_rgba(57,211,83,0.3)]"
            >
              <img
                src={ICONS[t.key]}
                alt={t.label}
                className="w-8 h-8 md:w-10 md:h-10 relative z-10 object-contain"
                aria-hidden="true"
              />
              {/* tooltip */}
              <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t.label}
              </span>
            </div>
          ))}
        </div>

        {/* Parágrafo de reforço */}
        <p className="text-center text-neutral-300 max-w-xl mx-auto text-sm md:text-base mb-8 relative z-10">
          Ementa atualizada em tempo real com o que o mercado exige em
          desenvolvimento, automação com n8n e Inteligência Artificial.
        </p>

        {/* CTA */}
        <a
          href="https://wa.me/5516990482444"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#39D353] hover:bg-[#32b848] text-black font-extrabold px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(57,211,83,0.4)] hover:shadow-[0_0_45px_rgba(57,211,83,0.6)] mx-auto block w-fit scale-100 hover:scale-105 active:scale-95 relative z-10"
        >
          Quero Dominar Essa Stack ➔
        </a>
      </motion.div>

      {/* Ecossistema complementar — pílulas (ticker infinito) */}
      <div className="mt-8 max-w-5xl mx-auto overflow-hidden rounded-2xl border border-white/5 bg-[#0E1210]/60 backdrop-blur-sm">
        <div className="pills-track py-4 px-4">
          {[...PILLS, ...PILLS].map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="group cursor-default shrink-0 bg-[#141A16] border border-white/10 hover:border-[#39D353]/50 px-4 py-2 rounded-xl text-xs md:text-sm text-neutral-400 hover:text-white transition-all duration-200 flex items-center gap-2 font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-[#39D353] transition-colors" />
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
