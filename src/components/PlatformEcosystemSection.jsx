import {
  GraduationCap,
  Route,
  Users,
  Bot,
  Code2,
  Trophy,
} from 'lucide-react'

/* ============================================================
   Os 6 pilares do ecossistema (textos persuasivos, foco em benefício)
   ============================================================ */
const PILARS = [
  {
    icon: GraduationCap,
    title: 'Plataforma de Ensino Proprietária',
    text: 'Ambiente de aprendizado moderno, sem distrações, com player otimizado, marcação de progresso e resumos práticos para você focar no que importa.',
  },
  {
    icon: Route,
    title: 'Trilhas e Formações do Zero ao Pro',
    text: 'Chega de se sentir perdido. Siga um plano de estudos estruturado em rotas claras que guiam você até o nível Full Stack de verdade.',
  },
  {
    icon: Users,
    title: 'Comunidade VIP de Alunos',
    text: "O nosso 'Discord exclusivo'. Faça networking, compartilhe seus repositórios, comemore conquistas e nunca mais estude sozinho.",
  },
  {
    icon: Bot,
    title: 'Club Agents (Sua IA 24/7)',
    text: 'Travou em um bug de madrugada? Nossa Inteligência Artificial exclusiva analisa seu código e ensina a solução em segundos.',
  },
  {
    icon: Code2,
    title: 'Playground de Treinamento',
    text: 'Onde a teoria vira código rodando. Pratique em ambientes reais, resolva desafios técnicos e teste APIs diretamente no navegador.',
  },
  {
    icon: Trophy,
    title: 'Mural da Fama e Vagas',
    text: 'Sua vitrine profissional no ecossistema. Alunos destaque ganham visibilidade direta perante recrutadores e empresas parceiras.',
  },
]

/* ============================================================
   SEÇÃO — Editorial Premium (Split 60/40, zero blur)
   ============================================================ */
export default function PlatformEcosystemSection() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 bg-[#09090B] text-white">
      {/* Cabeçalho */}
      <span className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[#121215] px-4 py-1.5 text-xs font-semibold tracking-wide text-[#39D353] md:text-sm">
        ECOSSISTEMA COMPLETO DE ACELERAÇÃO
      </span>
      <h2 className="mb-6 max-w-4xl text-left text-3xl font-extrabold leading-tight tracking-tight md:text-center md:text-5xl mx-auto">
        Muito mais que aulas gravadas: você terá acesso ao{' '}
        <span className="text-[#39D353]">ecossistema definitivo</span> para virar um
        programador desejado pelo mercado.
      </h2>
      <p className="mb-20 max-w-3xl text-left text-base font-light text-neutral-400 md:text-center md:text-xl mx-auto">
        Plataforma própria, suporte diário com professores, networking ativo e
        Inteligência Artificial trabalhando 24/7 para acelerar a sua evolução.
      </p>

      {/* GRID EDITORIAL SPLIT 60/40 */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ESQUERDA — Mobile: imagem vem antes (impacto), depois os pilares */}

        {/* Imagem (40% no desktop, topo no mobile) */}
        <div className="lg:order-2 lg:col-span-5">
          <div className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#121215] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {/* glow verde suave ATRÁS, sem blur na imagem */}
            <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-[#39D353]/20 to-transparent opacity-30" />
            <img
              src="/assets/background-2.png"
              alt="Ecossistema DevClub FullStack PRO e IA Club"
              className="h-auto w-full transform object-cover object-center transition-transform duration-500 ease-out group-hover:scale-102"
            />
            {/* Badge flutuante */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl border border-white/10 bg-[#09090B]/90 px-4 py-2 text-xs font-mono text-neutral-300 shadow-lg">
              Ambiente 100% Integrado
            </div>
          </div>
        </div>

        {/* DIREITA/ESQUERDA — Grade dos 6 pilares (60% no desktop) */}
        <div className="lg:order-1 lg:col-span-7">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {PILARS.map((p) => {
              const Icon = p.icon
              return (
                <div
                  key={p.title}
                  className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-[#121215]/60 p-5 transition-all duration-200 hover:border-[#39D353]/30"
                >
                  <h3 className="flex items-center gap-3 text-lg font-bold text-white">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#39D353]/10 text-[#39D353]">
                      <Icon size={18} />
                    </span>
                    {p.title}
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-neutral-400">
                    {p.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
