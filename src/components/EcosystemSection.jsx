import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import fernandaImg from '../assets/bento_grid/fernanda.png'
import psicologoImg from '../assets/bento_grid/marcio_mentor.png'
import giovannaImg from '../assets/bento_grid/giovanna_ia.jpg'

/* =========================================================================
   ECOSYSTEM SECTION — Dark Futuristic Redesign
   Layout: 2×2 grid, horizontal split cards (35% icon | 65% content)
   ========================================================================= */

/* ---------- Paleta de acento ---------- */
const ACCENT = {
  green:  { solid: '#39D353', glow: 'rgba(57,211,83,0.35)',  border: 'rgba(57,211,83,0.25)' },
  purple: { solid: '#8532F2', glow: 'rgba(133,50,242,0.35)', border: 'rgba(133,50,242,0.25)' },
  cyan:   { solid: '#22D3EE', glow: 'rgba(34,211,238,0.35)',  border: 'rgba(34,211,238,0.25)' },
  orange: { solid: '#F97316', glow: 'rgba(249,115,22,0.35)',  border: 'rgba(249,115,22,0.25)' },
}

/* ---------- Componentes reutilizáveis ---------- */

/** Badge pill — translúcido com borda colorida */
function Badge({ accent = 'green', icon, children }) {
  const a = ACCENT[accent]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide"
      style={{
        background: `${a.solid}0D`,
        border: `1px solid ${a.border}`,
        color: a.solid,
      }}
    >
      {icon}
      {children}
    </span>
  )
}

/** Avatar stack — sobrepostos com anel colorido */
function AvatarStack({ colors, count, accent = 'green' }) {
  const a = ACCENT[accent]
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {colors.map((c, i) => (
          <span
            key={i}
            className="h-8 w-8 rounded-full ring-2 ring-[#0a0e14]"
            style={{ backgroundColor: c }}
          />
        ))}
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-[#0a0e14]"
          style={{ backgroundColor: `${a.solid}18`, color: a.solid }}
        >
          +{count}
        </span>
      </div>
    </div>
  )
}

/** Wrapper de ícone 3D — bloco ilustrativo no painel esquerdo */
function IconBlock({ accent = 'green', children }) {
  const a = ACCENT[accent]
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{
        background: `radial-gradient(ellipse at center, ${a.solid}12 0%, transparent 70%)`,
      }}
    >
      <div
        className="flex h-20 w-20 items-center justify-center rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${a.solid}18, ${a.solid}08)`,
          border: `1px solid ${a.border}`,
          boxShadow: `0 0 40px ${a.glow}, inset 0 1px 0 ${a.solid}20`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ---------- Ícones SVG ---------- */

function UsersIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#39D353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function BotIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8532F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#39D353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function CheckIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ClockIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function SparkleIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.912 5.813L20 10l-6.088 1.187L12 17l-1.912-5.813L4 10l6.088-1.187z" />
    </svg>
  )
}

/* ---------- Bokeh Background ---------- */
function BokehBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Purple blob — top-left */}
      <div
        className="absolute -top-32 -left-24 h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(133,50,242,0.15) 0%, transparent 70%)' }}
      />
      {/* Cyan blob — center-right */}
      <div
        className="absolute top-1/3 -right-16 h-[400px] w-[400px] rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)' }}
      />
      {/* Orange blob — bottom-left */}
      <div
        className="absolute -bottom-24 left-1/4 h-[350px] w-[350px] rounded-full blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }}
      />
      {/* Green blob — bottom-right */}
      <div
        className="absolute bottom-0 right-1/3 h-[300px] w-[300px] rounded-full blur-[90px]"
        style={{ background: 'radial-gradient(circle, rgba(57,211,83,0.10) 0%, transparent 70%)' }}
      />
    </div>
  )
}

/* ---------- Card Wrapper ---------- */
function Card({ accent = 'green', children, className = '' }) {
  const a = ACCENT[accent]
  return (
    <motion.article
      variants={cardVariants}
      className={`group relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: 'linear-gradient(160deg, #12161f 0%, #0a0e14 100%)',
        border: `1px solid ${a.border}`,
        boxShadow: `0 0 30px ${a.glow.replace('0.35', '0.08')}, 0 8px 32px rgba(0,0,0,0.4)`,
      }}
    >
      {children}
    </motion.article>
  )
}

/* ---------- Variantes de animação ---------- */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

/* =========================================================================
   SECTION
   ========================================================================= */

export default function EcosystemSection() {
  const gridRef = useRef(null)

  /* Tilt 3D no hover */
  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll('.card-tilt')
    const max = 10
    const cleanups = []

    cards.forEach((card) => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        gsap.to(card, {
          rotateY: px * max * 2,
          rotateX: -py * max * 2,
          transformPerspective: 900,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
      const onLeave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' })
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
      <BokehBackground />

      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-left"
      >
        <Badge accent="green" icon={<SparkleIcon />}>
          Ecossistema Completo de Aceleração
        </Badge>
        <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
          Muito além de aulas gravadas.
          <br />
          Você nunca estará sozinho.
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mt-4 mb-16">
          O DevClub une tecnologia, acompanhamento humano e estratégia de
          carreira para garantir que você chegue à sua vaga.
        </p>
      </motion.div>

      {/* 2×2 Grid — horizontal split cards */}
      <motion.div
        ref={gridRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        style={{ gridAutoRows: 'auto' }}
      >
        {/* ─── CARD 1 — Recrutadora ─── */}
        <Card accent="green" className="card-tilt">
          <div className="flex flex-col md:flex-row h-full">
            <div className="relative w-full md:w-[35%] shrink-0 h-48 md:h-full overflow-hidden">
              <img
                src={fernandaImg}
                alt="Fernanda — Recrutadora Tech"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent 50%, #12161f 100%)',
                }}
              />
              <div
                className="absolute top-0 right-0 h-full w-px hidden md:block"
                style={{ background: 'linear-gradient(180deg, rgba(57,211,83,0.4) 0%, rgba(57,211,83,0.1) 100%)' }}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 md:p-10">
              <div>
                <h3 className="text-lg md:text-[26px] font-bold text-white leading-tight mb-2 md:mb-3">
                  Acompanhamento direto com Recrutadora
                </h3>
                <p className="text-[13px] md:text-[14px] leading-relaxed text-neutral-400">
                  Nossa especialista analisa seu perfil do LinkedIn, refatoramos seu
                  currículo e treinamos você com simulações reais de entrevistas
                  técnicas e comportamentais.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* ─── CARD 2 — Agentes IA 24/7 ─── */}
        <Card accent="purple" className="card-tilt">
          <div className="flex flex-col md:flex-row h-full">
            <div className="relative w-full md:w-[35%] shrink-0 h-48 md:h-full overflow-hidden">
              <img
                src={giovannaImg}
                alt="Giovanna — Inteligência Artificial"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent 50%, #12161f 100%)',
                }}
              />
              <div
                className="absolute top-0 right-0 h-full w-px hidden md:block"
                style={{ background: 'linear-gradient(180deg, rgba(133,50,242,0.4) 0%, rgba(133,50,242,0.1) 100%)' }}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 md:p-10">
              <div>
                <h3 className="text-lg md:text-[26px] font-bold text-white leading-tight mb-2 md:mb-3">
                  Agentes IA &amp; Plantão 24/7
                </h3>
                <p className="text-[13px] md:text-[14px] leading-relaxed text-neutral-400">
                  Travou em um erro às 2h da manhã? Nossa inteligência artificial e
                  nossa comunidade tiram suas dúvidas de código instantaneamente.
                </p>
              </div>
              <div>
                <Badge accent="purple" icon={<ClockIcon />}>
                  24/7
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* ─── CARD 3 — Apoio Psicológico ─── */}
        <Card accent="orange" className="card-tilt">
          <div className="flex flex-col md:flex-row h-full">
            <div className="relative w-full md:w-[35%] shrink-0 h-48 md:h-full overflow-hidden">
              <img
                src={psicologoImg}
                alt="Psicólogo — Apoio Emocional"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent 50%, #12161f 100%)',
                }}
              />
              <div
                className="absolute top-0 right-0 h-full w-px hidden md:block"
                style={{ background: 'linear-gradient(180deg, rgba(249,115,22,0.4) 0%, rgba(249,115,22,0.1) 100%)' }}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 md:p-10">
              <div>
                <h3 className="text-lg md:text-[26px] font-bold text-white leading-tight mb-2 md:mb-3">
                  Apoio Psicológico e Emocional
                </h3>
                <p className="text-[13px] md:text-[14px] leading-relaxed text-neutral-400">
                  A transição de carreira exige força mental. Conte com nossa
                  terapeuta parceira para vencer a síndrome do impostor e gerenciar
                  a ansiedade.
                </p>
              </div>
              <div>
                <Badge accent="orange" icon={<CheckIcon />}>
                  Incluso na assinatura
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* ─── CARD 4 — Mentorias ─── */}
        <Card accent="green" className="card-tilt">
          <div className="flex flex-col md:flex-row h-full">
            <div className="hidden md:flex w-[35%] shrink-0">
              <IconBlock accent="green">
                <CodeIcon />
              </IconBlock>
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 md:p-10">
              <div>
                <h3 className="text-lg md:text-[26px] font-bold text-white leading-tight mb-2 md:mb-3">
                  Mentorias ao Vivo &amp; Code Reviews
                </h3>
                <p className="text-[13px] md:text-[14px] leading-relaxed text-neutral-400">
                  Encontros semanais com programadores Sêniores que atuam nas maiores
                  empresas do mercado para revisar seu código, tirar dúvidas de
                  arquitetura e guiar seus projetos.
                </p>
              </div>
              <AvatarStack
                accent="green"
                colors={['#39D353', '#8532F2', '#fafafa', '#22D3EE', '#F97316']}
                count={12}
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}
