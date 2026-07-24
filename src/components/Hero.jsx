import { motion } from 'framer-motion'
import HeroScene from './HeroScene.jsx'
import MagneticButton from './MagneticButton.jsx'

// ============================================================
// CONTROLE DO REVEAL DA HERO
// STAGGER = intervalo entre cada elemento
// DELAY   = tempo antes da animação começar
// ============================================================
const STAGGER = 0.6
const DELAY = 0.1

// Container controla apenas a sequência dos filhos
const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: DELAY,
      staggerChildren: STAGGER,
    },
  },
}

// Animação individual de cada elemento
const item = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const badge = {
  hidden: {
    opacity: 0,
    x: 50,
    filter: 'blur(8px)',
  },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      delay: STAGGER * 6, // aparece depois de todos
    },
  },
}

export default function Hero({ loading = false }) {
  return (
    <section className="hero-section relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-transparent lg:flex-row lg:items-center">
      {/* Canvas 3D */}

      {/* Conteúdo */}
      <div className="relative z-10 flex lg:min-h-screen w-full max-w-7xl items-center bg-[#09090B] px-6 py-20 sm:py-2ag4 md:px-12 md:py-28 lg:px-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate={loading ? 'hidden' : 'show'}
          className="mr-auto flex w-full max-w-full flex-col items-start text-left lg:max-w-2xl"
        >
          {/* Badge */}
          <motion.span
            variants={badge}
            className="flex w-fit max-w-full items-center gap-2 rounded-full border border-white/10 bg-[#18181B] px-4 py-1.5 text-sm text-white/80"
          >
            <span className="w-2 h-2 rounded-full bg-[#39D353]" />
            +25 mil alunos formados
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="mt-4 max-w-full break-words bg-gradient-to-r from-white to-neutral-400 bg-clip-text font-jakarta text-2xl font-semibold leading-tight tracking-tight text-transparent sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Construa sua carreira em tecnologia com quem já trilhou esse caminho.
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={item}
            className="mt-4 max-w-prose break-words text-sm text-neutral-300/90 sm:mt-6 sm:text-lg"
          >
            Você vai construir projetos reais, receber feedback de quem trabalha
            nas maiores empresas do país, e sair com um portfólio que fala por
            você. Do primeiro código à sua primeira vaga.
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="mt-8 sm:mt-10">
            <MagneticButton label="Matricule-se" href="https://wa.me/5516990482444" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}