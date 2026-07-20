import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Route,
  Users,
  Bot,
  Code2,
  Trophy,
  Check,
  Star,
} from 'lucide-react'

/* ============================================================
   Dados dos 6 pilares do ecossistema
   ============================================================ */
const FEATURES = [
  {
    icon: GraduationCap,
    title: 'Plataforma de Ensino',
    desc: 'Ambiente de aulas moderno, com player otimizado, marcação de progresso e resumos interativos.',
    mock: 'platform',
  },
  {
    icon: Route,
    title: 'Trilhas e Formações',
    desc: 'Cursos organizados em rotas claras de aprendizado, do zero ao avançado em Full Stack, n8n e IA.',
    mock: 'paths',
  },
  {
    icon: Users,
    title: 'Comunidade de Alunos',
    desc: "O nosso 'Discord VIP'. Faça networking, tire dúvidas e compartilhe seus projetos com milhares de devs.",
    mock: 'community',
  },
  {
    icon: Bot,
    title: 'Club Agents (IA 24/7)',
    desc: 'Inteligência artificial treinada com a nossa metodologia para revisar seu código e tirar dúvidas de madrugada.',
    mock: 'agents',
  },
  {
    icon: Code2,
    title: 'Playground de Treinamento',
    desc: 'Onde a teoria vira prática. Codifique no navegador, resolva desafios técnicos e teste APIs do n8n na hora.',
    mock: 'playground',
  },
  {
    icon: Trophy,
    title: 'Mural da Fama dos Destaques',
    desc: 'Vitrine profissional onde os alunos com os melhores projetos ganham visibilidade direta para empresas parceiras e recrutadores.',
    mock: 'hall',
  },
]

/* ============================================================
   Mockups simulados (Tailwind puro) — um por pilar
   ============================================================ */
function MockShell({ title, children }) {
  return (
    <div className="w-full aspect-[16/10] rounded-2xl bg-[#09090B] border border-white/10 shadow-2xl overflow-hidden relative flex flex-col">
      {/* Barra superior estilo macOS */}
      <div className="h-10 bg-[#121215] border-b border-white/5 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="font-mono text-xs text-neutral-400">{title}</span>
        <span className="w-12" />
      </div>
      <div className="flex-1 overflow-hidden p-4 md:p-6">{children}</div>
    </div>
  )
}

function MockPlatform() {
  return (
    <MockShell title="plataforma.devclub.com/aulas">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#39D353]/15 flex items-center justify-center text-[#39D353] font-bold text-sm shrink-0">
            GZ
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span>Seu progresso</span>
              <span className="text-[#39D353] font-medium">68%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[68%] rounded-full bg-[#39D353] shadow-[0_0_12px_#39D353]" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['Introdução ao React', 'Hooks na Prática', 'APIs REST', 'Auth com JWT'].map((a, i) => (
            <div
              key={a}
              className={`rounded-xl border p-3 flex items-center gap-2 text-xs ${
                i < 2
                  ? 'border-[#39D353]/30 bg-[#39D353]/5 text-white'
                  : 'border-white/10 text-neutral-400'
              }`}
            >
              <span
                className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
                  i < 2 ? 'bg-[#39D353] text-black' : 'bg-white/10'
                }`}
              >
                {i < 2 && <Check size={11} strokeWidth={3} />}
              </span>
              {a}
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  )
}

function MockPaths() {
  const rows = [
    { name: 'Full Stack & IA', p: 80, active: true },
    { name: 'Automação n8n', p: 45, active: false },
    { name: 'Front-End Performance', p: 60, active: false },
  ]
  return (
    <MockShell title="devclub.com/trilhas">
      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r.name}
            className={`rounded-xl border p-3 ${
              r.active ? 'border-[#39D353]/40 bg-[#141A16]' : 'border-white/10'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className={r.active ? 'text-white font-medium' : 'text-neutral-400'}>
                {r.name}
              </span>
              <span className="text-neutral-500">{r.p}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#39D353]"
                style={{ width: `${r.p}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </MockShell>
  )
}

function MockCommunity() {
  const msgs = [
    { u: 'Marina', c: 'subiu o PR do ecommerce 🚀', me: false },
    { u: 'Lucas', c: 'alguém já usou Prisma com PostgreSQL?', me: false },
    { u: 'Você', c: 'usei! o generator economiza horas', me: true },
  ]
  return (
    <MockShell title="Discord VIP · #duvidas">
      <div className="space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.me ? 'flex-row-reverse' : ''}`}>
            <div
              className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                m.me ? 'bg-[#39D353] text-black' : 'bg-[#8532F2]/20 text-[#8532F2]'
              }`}
            >
              {m.u[0]}
            </div>
            <div
              className={`rounded-2xl px-3 py-2 text-xs max-w-[70%] ${
                m.me
                  ? 'bg-[#39D353]/15 text-white'
                  : 'bg-white/5 text-neutral-300'
              }`}
            >
              <span className="block text-[10px] text-neutral-500 mb-0.5">{m.u}</span>
              {m.c}
            </div>
          </div>
        ))}
      </div>
    </MockShell>
  )
}

function MockAgents() {
  return (
    <MockShell title="Club Agents · IA 24/7">
      <div className="space-y-3">
        <div className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-neutral-300 max-w-[80%]">
          <span className="block text-[10px] text-neutral-500 mb-0.5">Você · 02:14</span>
          por que meu useEffect roda 2x no StrictMode?
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-[#8532F2]/15 to-[#39D353]/15 px-3 py-2 text-xs text-white max-w-[85%] border border-[#39D353]/20">
          <span className="block text-[10px] mb-0.5 flex items-center gap-1 text-[#39D353]">
            <Bot size={11} /> Club Agent
          </span>
          É o modo de desenvolvimento do React 18 — monta, desmonta e remonta. Em
          produção ocorre 1x. Use <code className="text-[#39D353]">useEffect</code> puro.
        </div>
      </div>
    </MockShell>
  )
}

function MockPlayground() {
  return (
    <MockShell title="playground.devclub.com">
      <div className="rounded-xl bg-[#0D120F] border border-white/10 p-4 font-mono text-[11px] leading-relaxed">
        <div>
          <span className="text-[#C678DD]">const</span>{' '}
          <span className="text-[#61AFEF]">fetchUser</span> ={' '}
          <span className="text-[#C678DD]">async</span> (id) =&gt;{' '}
          {'{'}
        </div>
        <div className="pl-4">
          <span className="text-[#C678DD]">const</span> res ={' '}
          <span className="text-[#C678DD]">await</span>{' '}
          <span className="text-[#61AFEF]">fetch</span>(<span className="text-[#98C379]">`/api/users/${'{id}'}`</span>)
        </div>
        <div className="pl-4">
          <span className="text-[#C678DD]">return</span> res.<span className="text-[#61AFEF]">json</span>()
        </div>
        <div>{'}'}</div>
        <div className="mt-3 flex items-center gap-2 text-neutral-500">
          <span className="text-[#39D353]">✓</span> Teste executado — 12ms
        </div>
      </div>
    </MockShell>
  )
}

function MockHall() {
  const alunos = [
    { n: 'Bia S.', r: 'Front-end · iFood', s: 5 },
    { n: 'Pedro R.', r: 'Full Stack · VTEX', s: 5 },
    { n: 'Caio M.', r: 'DevOps · Conta Azul', s: 4 },
  ]
  return (
    <MockShell title="devclub.com/mural">
      <div className="grid grid-cols-3 gap-3">
        {alunos.map((a) => (
          <div key={a.n} className="rounded-xl border border-white/10 bg-[#141A16] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#39D353] to-[#8532F2]" />
              <span className="rounded-md bg-[#39D353]/15 px-1.5 py-0.5 text-[9px] font-bold text-[#39D353]">
                CONTRATADO
              </span>
            </div>
            <p className="text-xs font-medium text-white">{a.n}</p>
            <p className="text-[10px] text-neutral-400 mb-1">{a.r}</p>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={i < a.s ? 'text-[#39D353] fill-[#39D353]' : 'text-neutral-700'}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </MockShell>
  )
}

const MOCKS = {
  platform: MockPlatform,
  paths: MockPaths,
  community: MockCommunity,
  agents: MockAgents,
  playground: MockPlayground,
  hall: MockHall,
}

/* ============================================================
   SEÇÃO PRINCIPAL
   ============================================================ */
export default function PlatformEcosystemSection() {
  const [activeFeature, setActiveFeature] = useState(0)
  const active = FEATURES[activeFeature]
  const Mock = MOCKS[active.mock]

  return (
    <section className="max-w mx-auto px-6 md:px-12 py-24 bg-[#09090B] text-white relative z-10">
      {/* Cabeçalho */}
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center max-w-4xl mx-auto leading-tight">
        Você terá acesso a uma{' '}
        <span className="text-[#39D353]">plataforma moderna</span> de aulas,{' '}
        <span className="text-[#39D353]">comunidade ativa</span>, área de vagas e{' '}
        <span className="text-[#39D353]">IAs</span> para acelerar seu progresso
      </h2>
      <p className="text-neutral-400 text-lg md:text-xl text-center mt-4 mb-16 max-w-2xl mx-auto">
        Tudo reunido em um ecossistema projetado para a sua evolução técnica e
        profissional, com suporte diário de programadores sêniores.
      </p>

      {/* Container central do showcase */}
      <div className="max-w-6xl mx-auto rounded-3xl p-6 md:p-12 bg-gradient-to-b from-[#0F1E16] via-[#101412] to-[#09090B] border border-[#39D353]/20 shadow-[0_0_60px_rgba(57,211,83,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* MOCKUP — mobile: acima da lista (ordem DOM); desktop: à direita */}
          <div className="lg:order-2 lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.mock}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Mock />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* LISTA DE PILARES — mobile: abaixo; desktop: à esquerda */}
          <div className="flex flex-col gap-3 lg:order-1 lg:col-span-5">
            {FEATURES.map((f, i) => {
              const isActive = i === activeFeature
              const Icon = f.icon
              return (
                <button
                  key={f.title}
                  type="button"
                  onClick={() => setActiveFeature(i)}
                  className={
                    isActive
                      ? 'p-4 rounded-2xl cursor-pointer bg-[#141A16] border border-[#39D353]/40 text-white shadow-[0_0_20px_rgba(57,211,83,0.1)] flex items-start gap-4 text-left'
                      : 'p-4 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent hover:bg-white/5 text-neutral-400 hover:text-white flex items-start gap-4 text-left'
                  }
                >
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#39D353]/10 text-[#39D353]'
                        : 'bg-white/5 text-neutral-400'
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-sm md:text-base">
                      {f.title}
                    </span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="block overflow-hidden"
                        >
                          <span className="block pt-1.5 text-xs md:text-sm text-neutral-400 leading-relaxed">
                            {f.desc}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
