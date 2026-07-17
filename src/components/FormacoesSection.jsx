import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TRILHAS = [
  {
    title: 'Full Stack & Inteligência Artificial',
    desc: 'Domine o desenvolvimento completo, do visual ao banco de dados, integrando agentes de IA e Claude para programar 10x mais rápido.',
    techs: ['React', 'Node.js', 'TypeScript', 'IA'],
    topics: ['Fundamentos de UI e APIs REST', 'Banco de dados e autenticação', 'Integração de agentes de IA', 'Projeto full stack completo'],
    badge: '🚀 Mais Procurada',
  },
  {
    title: 'Automação & Integrações com n8n',
    desc: 'A habilidade mais quente do mercado. Crie fluxos automatizados, integre APIs e desenvolva sistemas autônomos para empresas de alto nível.',
    techs: ['n8n', 'Webhooks', 'APIs', 'Python'],
    topics: ['Lógica de fluxos e webhooks', 'Integração de APIs externas', 'Automação com Python', 'Sistemas autônomos de ponta a ponta'],
    badge: '⚡ Em Alta',
  },
  {
    title: 'Front-End de Alta Performance',
    desc: 'Construa interfaces modernas, interativas e com otimização extrema que impressionam recrutadores e geram conversão real.',
    techs: ['React', 'Next.js', 'Tailwind', 'GSAP'],
    topics: ['Componentização com React/Next', 'Estilização com Tailwind', 'Animações com GSAP', 'Otimização e Core Web Vitals'],
    badge: '🎯 Foco em Conversão',
  },
  {
    title: 'Back-End & Arquitetura Limpa',
    desc: 'Projete APIs robustas, arquiteturas escaláveis e gerencie bancos de dados complexos prontos para o tráfego de grandes empresas.',
    techs: ['Node.js', 'SQL', 'NoSQL', 'Docker'],
    topics: ['APIs REST e GraphQL', 'Modelagem SQL e NoSQL', 'Padrões de arquitetura limpa', 'Containers e deploy com Docker'],
    badge: '🏗️ Escalável',
  },
]

function ArrowRight({ className = '' }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

export default function FormacoesSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // DESKTOP (>= 1024px): scroll horizontal com pinning
      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current
        const distance = () => track.scrollWidth - window.innerWidth

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => '+=' + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })

        return () => tween.kill()
      })
    }, sectionRef)

    // O ScrollTrigger é criado antes do LoadingScreen sair e antes das
    // fontes/vídeo estabilizarem o layout. Recalcula a distância do pin
    // quando a página está pronta para evitar pin "travado" ou distância 0.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    window.addEventListener('devclub:loaded', refresh)

    // Cleanup total — evita memory leaks ao desmontar
    return () => {
      window.removeEventListener('load', refresh)
      window.removeEventListener('devclub:loaded', refresh)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="formacoes"
      className="relative w-full overflow-hidden bg-[#09090B] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Cabeçalho da seção */}
        <header className="mb-12 max-w-2xl text-left">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[#18181B] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/70">
            🎯 Carreiras Tech & Mercado
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Trilhas direto ao ponto para o mercado
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-400">
            Quatro formações desenhadas para te levar do zero ao primeiro
            emprego (ou à próxima promoção) com projetos reais e tecnologias que
            as empresas realmente usam.
          </p>
        </header>
      </div>

      {/* Track de cards */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto px-6 pb-8 snap-x snap-mandatory no-scrollbar md:gap-8 lg:overflow-visible lg:px-12"
      >
        {TRILHAS.map((t) => (
          <article
            key={t.title}
            className="group flex w-[350px] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#18181B] transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-[#39D353]/50 hover:shadow-[0_18px_40px_-12px_rgba(57,211,83,0.25)] md:w-[560px] md:flex-row"
          >
            {/* Lado esquerdo — placeholder de imagem (~45%) */}
            <div className="relative h-44 w-full shrink-0 rounded-t-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] ring-1 ring-inset ring-white/5 md:h-auto md:w-[45%] md:rounded-none md:rounded-l-3xl">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium uppercase tracking-widest text-white/25">
                Imagem
              </span>
            </div>

            {/* Lado direito — conteúdo */}
            <div className="flex flex-1 flex-col p-7 md:p-8">
              {t.badge && (
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/80">
                  {t.badge}
                </span>
              )}

              <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-white">
                {t.title}
              </h3>

              <p className="mt-3 max-w-prose text-sm leading-relaxed text-neutral-400">
                {t.desc}
              </p>

              {/* Tópicos do módulo */}
              <ul className="mt-6 space-y-2.5">
                {t.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2.5 text-sm text-neutral-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px] bg-[#39D353]" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              {/* Techs */}
              <ul className="mt-6 flex flex-wrap gap-2">
                {t.techs.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {/* Rodapé / ação */}
              <a
                href="#"
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-[#39D353] transition-colors hover:text-[#39D353]/80"
              >
                Ver ementa completa
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
