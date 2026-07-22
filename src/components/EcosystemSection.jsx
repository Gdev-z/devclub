import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

/* ---------- Ícones (SVG inline, sem dependência externa) ---------- */
function HeartIcon({ className = '' }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function BotIcon({ className = '' }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
    </svg>
  )
}

function CheckBadgeIcon({ className = '' }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 12l2 2 4-4" />
      <path d="M12 3l2.5 1.5L17 3l1 2.5L20.5 5 21 8l2.5.5L21 12l1 3-3 .5L21 18l-2.5.5L17 21l-2.5-1.5L12 21l-2.5-2L7 21l-1-2.5L3.5 18 3 15l-2.5-.5L3 12l-1-3 3-.5L3 6l2.5-1L7 3l2.5 1.5z" />
    </svg>
  )
}

/* ---------- Variantes de animação (scroll reveal com stagger) ---------- */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  // reveal apenas com opacity (sem translateY) para não conflitar com
  // o transform do tilt 3D, que roda no mesmo elemento (card colorido).
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/* Atualiza a posição do cursor para o efeito spotlight radial */
function handleMouseMove(e) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}

const baseCard =
  'h-full bg-[#18181B] border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-500'

/* Spotlight layer (segue o cursor) */
function Spotlight() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background:
          'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)',
      }}
    />
  )
}

export default function EcosystemSection() {
  const gridRef = useRef(null)

  // Tilt 3D nos cards — mesma lógica do animations-lab (initTilt):
  // px/py em -0.5..0.5, rotateY = px*max*2, rotateX = -py*max*2,
  // com transformPerspective aplicada no próprio card (não precisa de
  // perspective no pai). Range máx 14°. Retorno com elastic ease.
  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll('.card-tilt')
    const max = 14
    const cleanups = []

    cards.forEach((card) => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        gsap.to(card, {
          rotateY: px * max * 2,
          rotateX: -py * max * 2,
          transformPerspective: 800,
          duration: 0.01,
          ease: 'power2.out',
        })
      }
      const onLeave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.07, ease: 'elastic.out(1,0.4)' })
      }

      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <section
      id="ecossistema"
      className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 bg-transparent text-white"
    >
      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-left"
      >
        <span className="inline-flex w-fit items-center gap-2 border border-white/10 bg-[#18181B] px-4 py-1 rounded-full text-sm font-medium text-[#39D353] mb-4">
          🌟 Ecossistema Completo de Aceleração
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Muito além de aulas gravadas. Você nunca estará sozinho.
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mt-4 mb-16">
          O DevClub une tecnologia, acompanhamento humano e estratégia de
          carreira para garantir que você chegue à sua vaga.
        </p>
      </motion.div>

      {/* Bento Grid — recebe a perspective para o tilt 3D dos cards */}
      <motion.div
        ref={gridRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="ecosystem-grid grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] md:auto-rows-[320px]"
      >
        {/* CARD 1 — Recrutadora (span 2) */}
        <div className="md:col-span-2">
          <motion.article
            variants={cardVariants}
            className="h-full"
          >
            <div
            onMouseMove={handleMouseMove}
            className={`card-tilt ${baseCard} group-hover:shadow-[0_0_40px_rgba(57,211,83,0.12)] group-hover:border-[#39D353]/50`}
          >
            <div className="flex h-full flex-col justify-between">
              <Spotlight />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white">
                  Acompanhamento direto com Recrutadora Tech
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400 max-w-xl">
                  Nossa especialista analisa seu perfil do LinkedIn, refatoramos seu
                  currículo e treinamos você com simulações reais de entrevistas
                  técnicas e comportamentais.
                </p>
              </div>
              {/* Card de aprovação / checklist LinkedIn verificado */}
              <div className="relative z-10 mt-6 flex items-center gap-3 self-end rounded-2xl border border-[#39D353]/30 bg-[#39D353]/5 px-4 py-3 text-[#39D353]">
                <CheckBadgeIcon />
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">LinkedIn Verificado</p>
                  <p className="text-xs">Perfil aprovado pela recrutadora</p>
                </div>
              </div>
            </div>
          </div>
          </motion.article>
          </div>

        {/* CARD 2 — Agentes IA 24/7 (span 1) */}
        <div className="md:col-span-1">
          <motion.article
            variants={cardVariants}
            className="h-full"
          >
            <div
            onMouseMove={handleMouseMove}
            className={`card-tilt ${baseCard} group-hover:shadow-[0_0_40px_rgba(133,50,242,0.15)] group-hover:border-[#8532F2]/50`}
          >
            <div className="flex h-full flex-col justify-between">
              <Spotlight />
              <div className="relative z-10 flex items-start justify-between">
                <BotIcon className="text-[#8532F2]" />
                <span className="rounded-full bg-[#8532F2]/10 px-2.5 py-1 text-xs font-medium text-[#8532F2]">
                  24/7
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white">
                  Agentes IA &amp; Plantão 24/7
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  Travou em um erro às 2h da manhã? Nossa inteligência artificial e
                  nossa comunidade tiram suas dúvidas de código instantaneamente.
                </p>
              </div>
            </div>
          </div>
          </motion.article>
          </div>

        {/* CARD 3 — Apoio Psicológico (span 1) */}
        <div className="md:col-span-1">
          <motion.article
            variants={cardVariants}
            className="h-full"
          >
            <div
            onMouseMove={handleMouseMove}
            className={`card-tilt ${baseCard} group-hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] group-hover:border-white/30`}
          >
            <div className="flex h-full flex-col justify-between">
              <Spotlight />
              <HeartIcon className="relative z-10 text-neutral-300" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white">
                  Apoio Psicológico e Emocional
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  A transição de carreira exige força mental. Conte com nossa
                  terapeuta parceira para vencer a síndrome do impostor e gerenciar
                  a ansiedade.
                </p>
              </div>
            </div>
          </div>
          </motion.article>
          </div>

        {/* CARD 4 — Mentorias com Sêniores (span 2) */}
        <div className="md:col-span-2">
          <motion.article
            variants={cardVariants}
            className="h-full"
          >
            <div
            onMouseMove={handleMouseMove}
            className={`card-tilt ${baseCard} group-hover:shadow-[0_0_40px_rgba(57,211,83,0.12)] group-hover:border-[#39D353]/50`}
          >
            <div className="flex h-full flex-col justify-between">
              <Spotlight />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white">
                  Mentorias ao Vivo &amp; Code Reviews
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400 max-w-xl">
                  Encontros semanais com programadores Sêniores que atuam nas maiores
                  empresas do mercado para revisar seu código, tirar dúvidas de
                  arquitetura e guiar seus projetos.
                </p>
              </div>
              {/* Avatares sobrepostos simulando devs em chamada */}
              <div className="relative z-10 mt-6 flex -space-x-2 overflow-hidden">
                {['#39D353', '#8532F2', '#fafafa', '#39D353', '#8532F2'].map((c, i) => (
                  <span
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-[#18181B]"
                    style={{ backgroundColor: c, opacity: 0.9 }}
                  />
                ))}
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#18181B] bg-white/10 text-xs font-semibold text-white">
                  +12
                </span>
              </div>
            </div>
          </div>
          </motion.article>
          </div>
      </motion.div>
    </section>
  )
}
