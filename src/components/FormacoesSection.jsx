import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import imgIA from '../assets/cards_imgs/Inteligencia_artificial.png'
import imgAutomacao from '../assets/cards_imgs/Automação.png'
import imgFront from '../assets/cards_imgs/Front_end.png'
import imgBack from '../assets/cards_imgs/Back_end.png'

gsap.registerPlugin(ScrollTrigger)

const TRILHAS = [
  {
    title: 'Full Stack com React, Node.js & Typescript',
    desc: 'Domine o desenvolvimento completo, do visual ao banco de dados,.',
    techs: ['React', 'Node.js', 'TypeScript'],
    topics: ['Fundamentos de UI e APIs REST', 'Banco de dados e autenticação', 'Gateway de pagamento', 'Projeto full stack completo'],
    badge: '🚀 Mais Procurada',
    img: imgIA,
  },
  {
    title: 'Automação & Integrações com n8n',
    desc: 'A habilidade mais quente do mercado. Crie fluxos automatizados, integre APIs e desenvolva sistemas autônomos para empresas de alto nível.',
    techs: ['n8n', 'Webhooks', 'APIs', 'Python'],
    topics: ['Lógica de fluxos e webhooks', 'Integração de APIs externas', 'Automação com Python', 'Sistemas autônomos de ponta a ponta'],
    badge: '⚡ Em Alta',
    img: imgAutomacao,
  },
  {
    title: 'Front-End de Alta Performance',
    desc: 'Construa interfaces modernas, interativas e com otimização extrema que impressionam recrutadores e geram conversão real.',
    techs: ['React', 'Next.js', 'Tailwind', 'GSAP'],
    topics: ['Componentização com React/Next', 'Estilização com Tailwind', 'Animações com GSAP', 'Otimização e Core Web Vitals'],
    badge: '🎯 Foco em Conversão',
    img: imgFront,
  },
  {
    title: 'Back-End & Arquitetura Limpa',
    desc: 'Projete APIs robustas, arquiteturas escaláveis e gerencie bancos de dados complexos prontos para o tráfego de grandes empresas.',
    techs: ['Node.js', 'SQL', 'NoSQL', 'Docker'],
    topics: ['APIs REST e GraphQL', 'Modelagem SQL e NoSQL', 'Padrões de arquitetura limpa', 'Containers e deploy com Docker'],
    badge: '🏗️ Escalável',
    img: imgBack,
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
  const cardsRef = useRef([])
  cardsRef.current = []

  const addCard = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el)
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // DESKTOP / TABLET (>= 768px): stack cards com sticky + sobreposição.
      // Cada card gruda no topo; o próximo sobe por cima. O card anterior
      // recua progressivamente (scale/brightness/saturate/blur/overlay),
      // 100% sincronizado com o scroll (scrub) — sem saltos.
      mm.add('(min-width: 768px)', () => {
        const cards = cardsRef.current
        cards.forEach((card, i) => {
          const inner = card.querySelector('.card-inner')
          // entrada do card: scale 0.985 -> 1 + sobe levemente.
          // Acompanha quase toda a subida (base da viewport -> topo).
          gsap.fromTo(
            inner,
            { scale: 0.985, yPercent: 4 },
            {
              scale: 1,
              yPercent: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
              },
            }
          )
          // o card anterior perde protagonismo de forma extremamente suave,
          // exatamente enquanto este sobe (mesmo trigger/range).
          // fromTo explícito + immediateRender:false => começa CLARO no
          // mount e só escurece ao rolar (evita aparecer já escuro).
          if (i > 0) {
            const prevInner = cards[i - 1].querySelector('.card-inner')
            const prevOverlay = cards[i - 1].querySelector('.card-overlay')
            gsap.fromTo(
              prevInner,
              { scale: 1, filter: 'brightness(1) blur(0px)' },
              {
                scale: 0.985,
                filter: 'brightness(0.9) blur(0.5px)',
                ease: 'none',
                immediateRender: false,
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'top top',
                  scrub: true,
                },
              }
            )
            // overlay quase imperceptível (máx 0.15)
            gsap.fromTo(
              prevOverlay,
              { opacity: 0 },
              {
                opacity: 0.9,
                ease: 'none',
                immediateRender: false,
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'top top',
                  scrub: true,
                },
              }
            )
          }
        })
      })

      // MOBILE (< 768px): animação simples — fade + translateY, sem sticky.
      mm.add('(max-width: 767px)', () => {
        const cards = cardsRef.current
        cards.forEach((card) => {
          gsap.fromTo(
            card.querySelector('.card-inner'),
            { autoAlpha: 0, y: 48 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 88%' },
            }
          )
        })
      })
    }, sectionRef)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    window.addEventListener('devclub:loaded', refresh)

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
      className="relative w-full bg-[#09090B] py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Cabeçalho da seção */}
        <header className="mb-16 max-w-2xl text-left">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[#18181B] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/70">
            🎯 Carreiras Tech & Mercado
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Conheça nossas trilhas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-400">
            Diversas formações desenhadas para te levar do zero ao primeiro
            emprego (ou à próxima promoção) com projetos reais e tecnologias que
            as empresas realmente usam.
          </p>
        </header>
      </div>

      {/* Pilha de cards */}
      <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-8 px-4 sm:px-6 lg:gap-[15vh]">
        {TRILHAS.map((t, i) => (
          <div
            key={t.title}
            ref={addCard}
            className="stack-card relative"
          >
            <article className="card-inner max-h-fit group relative flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#18181B] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] transition-colors duration-500 hover:border-[#39D353]/40 hover:shadow-[0_30px_90px_-30px_rgba(57,211,83,0.18)] md:h-[72vh] md:flex-row">
              {/* COLUNA ESQUERDA — imagem (52%, arte 100% visível, escala maior) */}
              <div className="relative w-full max-h-fit shrink-0 overflow-hidden md:w-[65%]">
                <img
                  src={t.img}
                  alt={t.title}
                  loading="lazy"
                  className="max-h-full max-w-full scale-100 object-contain object-center transition-transform duration-[900ms] ease-out"
                />
              </div>

              {/* COLUNA DIREITA — conteúdo (~55%) */}
              <div className="flex max-h-fit flex-1 flex-col p-7 md:justify-center md:p-12">
                {t.badge && (
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/80">
                    {t.badge}
                  </span>
                )}

                <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                  {t.title}
                </h3>

                <p className="mt-3 max-w-prose text-sm leading-relaxed text-neutral-400 md:text-base">
                  {t.desc}
                </p>

                {/* Módulos — discretos */}
                <ul className="mt-6 hidden space-y-2 sm:block">
                  {t.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2.5 text-[13px] text-neutral-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px] bg-[#39D353]/80" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>

                {/* Techs — chips minimalistas */}
                <ul className="mt-6 flex flex-wrap gap-2">
                  {t.techs.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-neutral-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#"
                  className="mt-7 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#39D353] transition-colors hover:text-[#39D353]/80"
                >
                  Ver ementa completa
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              {/* overlay de escurecimento progressivo (animado via GSAP) */}
              <div className="card-overlay pointer-events-none absolute inset-0 z-20 rounded-[28px] bg-black opacity-0" />
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
