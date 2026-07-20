import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ============================================================
   Ícones (SVG inline — cores via currentColor, sem libs externas)
   ============================================================ */
const ICONS = {
  javascript: (
    <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-4.5 11.5c.4.7.9 1.2 1.8 1.2.8 0 1.3-.4 1.3-1 0-.7-.5-1-1.4-1.5l-.5-.2c-1.4-.6-2.3-1.4-2.3-3 0-1.5 1.1-2.6 2.9-2.6 1.3 0 2.2.5 2.9 1.7l-1.6 1c-.4-.7-.8-1-1.3-1-.6 0-.9.3-.9.8 0 .5.3.8 1.1 1.2l.5.2c1.6.7 2.4 1.4 2.4 3.1 0 1.8-1.4 2.8-3.2 2.8-1.8 0-3-.9-3.6-2.2l1.6-.9Zm-7 0c.4.7.9 1.2 1.8 1.2.8 0 1.3-.4 1.3-1 0-.7-.5-1-1.4-1.5l-.5-.2C8.8 12.4 7.9 11.6 7.9 10c0-1.5 1.1-2.6 2.9-2.6 1.3 0 2.2.5 2.9 1.7l-1.6 1c-.4-.7-.8-1-1.3-1-.6 0-.9.3-.9.8 0 .5.3.8 1.1 1.2l.5.2c1.6.7 2.4 1.4 2.4 3.1 0 1.8-1.4 2.8-3.2 2.8-1.8 0-3-.9-3.6-2.2l1.6-.9Z" />
  ),
  typescript: (
    <>
      <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M12 11.5h-2.5v1.2H12c.8 0 1.4.2 1.4.9 0 .8-.6 1.1-1.5 1.1-.7 0-1.3-.2-1.6-.6l-.8.9c.5.5 1.3.9 2.5.9 1.6 0 2.6-.7 2.6-2 0-1.1-.7-1.6-2.1-1.8v-.1c1-.2 1.6-.7 1.6-1.6 0-1-.8-1.5-2.1-1.5-1 0-1.8.3-2.2.8l.8.8c.3-.3.7-.5 1.2-.5.6 0 1 .2 1 .7 0 .5-.4.7-1.2.7Zm-2.5 4.2h-1.3v1.1c.4 0 .7.1.9.2l.4-.9Z" fill="#0B1A12" />
    </>
  ),
  react: (
    <path d="M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm7.4 4.1c-1.6 2.8-4.1 4.3-6.9 4.3-2.4 0-4.4-1-6-2.7.4 0 .9-.1 1.2-.3 1.2 1 2.8 1.6 4.5 1.6 2.3 0 4.3-1.1 5.7-3.1-.2-.1-.5-.2-.7-.3 1.6-.9 2.6-2.4 2.6-4.2 0-1.6-.8-2.9-2.2-3.8.1-.3.2-.6.2-.9 0-1.9-1.8-3.4-4.1-3.4-.8 0-1.5.2-2.1.5-.2-.1-.5-.2-.8-.2C9.3 2 7.5 3.5 7.5 5.4c0 .3.1.6.2.9C6.2 7.2 5.4 8.5 5.4 10.1c0 1.8 1 3.3 2.6 4.2-.2.1-.5.3-.7.4 1.4 2 3.4 3.1 5.7 3.1 1.7 0 3.3-.6 4.5-1.6.3.2.8.3 1.2.3Zm-7-9.9c1.3 0 2.3 1 2.3 2.1 0 1-.9 1.9-2.3 1.9-1.3 0-2.3-1-2.3-2.1 0-1 .8-1.9 2.3-1.9Zm0 8.7c1.3 0 2.3-1 2.3-2.1 0-1-.9-1.9-2.3-1.9-1.3 0-2.3 1-2.3 2.1 0 1 .9 1.9 2.3 1.9Z" />
  ),
  node: (
    <>
      <path d="M12 2 4.5 6v8l7.5 4 7.5-4V6Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 8.5c-1.5 0-2.4.7-2.4 1.6 0 .5.3.8.7.8.5 0 .8-.3 1.2-.3.4 0 .7.2.7.6 0 .5-.5.7-1.4.9-1.2.3-2.3.7-2.3 2 0 1.3 1.1 2 2.5 2 1.4 0 2.3-.6 2.4-1.7h-.9c-.1.6-.5.9-1.5.9-1 0-1.4-.3-1.4-1 0-.5.3-.7.9-.9 1.2-.3 2.5-.6 2.5-2 0-1.2-1-1.9-2.4-1.9Zm0-1.6V6.4m0 11.2v-1.4" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  postgres: (
    <path d="M12 3C8 3 5 4.3 5 6v12c0 1.7 3 3 7 3s7-1.3 7-3V6c0-1.7-3-3-7-3Zm5 14c0 .6-2.2 1.5-5 1.5S7 17.6 7 17v-2.1c1.2.6 3 .9 5 .9s3.8-.3 5-.9Zm0-4c0 .6-2.2 1.5-5 1.5S7 13.6 7 13v-2.1c1.2.6 3 .9 5 .9s3.8-.3 5-.9Zm-5-3c-2.8 0-5-.9-5-1.9S9.2 5.5 12 5.5s5 .9 5 2-2.2 1.9-5 1.9Z" />
  ),
  python: (
    <path d="M12 3c-3 0-3.3 1.4-3.3 2.4V7h3.4v.7H7.9c-2 0-3.4 1.2-3.4 3.7 0 2.5 1.2 3.6 3.2 3.6h1.1v-2.1c0-1.6 1.4-2.5 3-2.5h2.4c1.1 0 1.8-.7 1.8-1.8V5.4C17 3.9 15.4 3 12 3Zm-1.6 1.2c.5 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.3-.8.8-.8ZM12 14c3 0 3.3-1.4 3.3-2.4V12h-3.4v-.7h4.8c2 0 3.4-1.2 3.4-3.7 0-2.5-1.2-3.6-3.2-3.6h-1.1v2.1c0 1.6-1.4 2.5-3 2.5h-2.4c-1.1 0-1.8.7-1.8 1.8v2.4C8 15.1 9.6 16 13 16Zm1.6-1.2c-.5 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.3.8-.8.8Z" />
  ),
  n8n: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 7v5l3.2 2.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7.5 12h1.8M14.7 12h1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="8" y="8" width="8" height="8" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  ),
}

/* ============================================================
   Dock principal — 8 tecnologias (cores de destaque no ícone)
   ============================================================ */
const DOCK = [
  { key: 'javascript', label: 'JavaScript', cls: 'text-[#F7DF1E] group-hover:bg-[#F7DF1E]/10' },
  { key: 'typescript', label: 'TypeScript', cls: 'text-[#3178C6] group-hover:bg-[#3178C6]/10' },
  { key: 'react', label: 'React', cls: 'text-[#61DAFB] group-hover:bg-[#61DAFB]/10' },
  { key: 'node', label: 'Node.js', cls: 'text-[#39D353] group-hover:bg-[#39D353]/10' },
  { key: 'postgres', label: 'PostgreSQL', cls: 'text-[#336791] group-hover:bg-[#336791]/10' },
  { key: 'python', label: 'Python', cls: 'text-[#FFD43B] group-hover:bg-[#FFD43B]/10' },
  { key: 'n8n', label: 'n8n', cls: 'text-[#FF6D5A] group-hover:bg-[#FF6D5A]/10' },
  { key: 'ai', label: 'OpenAI / Claude', cls: 'text-[#AB68FF] group-hover:bg-[#AB68FF]/10' },
]

/* Pílulas complementares */
const PILLS = [
  'HTML5', 'CSS3', 'Tailwind CSS', 'Git', 'GitHub', 'Next.js', 'Express',
  'Prisma ORM', 'MongoDB', 'Docker', 'Jest', 'LangChain', 'REST APIs',
  'Webhooks', 'Linux', 'Vercel',
]

/* ============================================================
   SEÇÃO PRINCIPAL
   ============================================================ */
export default function TechStackSection() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

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
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="max-w mx-auto px-6 md:px-12 py-28 text-white relative z-10 overflow-hidden">
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
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto rounded-[32px] p-8 md:p-14 relative border border-[#39D353]/30 shadow-[0_0_80px_rgba(57,211,83,0.12)] bg-gradient-to-b from-[#0B1A12] via-[#0D120F] to-[#09090B] overflow-hidden"
      >
        {/* glow radial de fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,211,83,0.15)_0,transparent_70%)] pointer-events-none" />

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
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-12 relative z-10">
          {DOCK.map((t) => (
            <div
              key={t.key}
              className={`group w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center relative cursor-pointer bg-[#141816]/80 backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:border-[#39D353]/60 hover:shadow-[0_0_25px_rgba(57,211,83,0.3)] ${t.cls}`}
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10 relative z-10"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                {ICONS[t.key]}
              </svg>
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
          href="#"
          className="bg-[#39D353] hover:bg-[#32b848] text-black font-extrabold px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(57,211,83,0.4)] hover:shadow-[0_0_45px_rgba(57,211,83,0.6)] mx-auto block w-fit scale-100 hover:scale-105 active:scale-95 relative z-10"
        >
          Quero Dominar Essa Stack ➔
        </a>
      </motion.div>

      {/* Ecossistema complementar — pílulas */}
      <div className="mt-8 max-w-5xl mx-auto bg-[#0E1210]/60 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        <div className="flex flex-wrap justify-center items-center gap-3">
          {PILLS.map((p) => (
            <span
              key={p}
              className="group cursor-default bg-[#141A16] border border-white/10 hover:border-[#39D353]/50 px-4 py-2 rounded-xl text-xs md:text-sm text-neutral-400 hover:text-white transition-all duration-200 flex items-center gap-2 font-mono"
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
