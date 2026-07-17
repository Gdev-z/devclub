import { motion } from 'framer-motion'
import HeroScene from './HeroScene.jsx'
import MagneticButton from './MagneticButton.jsx'

// container com stagger dos filhos
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section className="hero-section relative min-h-screen w-full overflow-hidden bg-transparent px-6 pt-24 md:px-12">
      {/* Canvas 3D full-screen atrás do conteúdo (pointer-events:none) */}
      <HeroScene />

      {/* Conteúdo — SEMPRE à esquerda da tela, por cima do canvas */}
      <div className="mx-auto flex min-h-screen max-w-7xl items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mr-auto flex w-full max-w-xl flex-col items-start text-left lg:w-1/2"
        >
          {/* BADGE de prova social */}
          <motion.span
            variants={item}
            className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[#18181B] px-4 py-1.5 text-sm text-white/80"
          >
            <span className="inline-block animate-pulse text-[#39D353]">⭐️</span>
            +25 mil alunos já passaram por aqui
          </motion.span>

          {/* HEADLINE */}
          <motion.h1
            variants={item}
            className="mt-6 bg-gradient-to-r from-white to-neutral-400 bg-clip-text font-display text-4xl font-semibold leading-tight tracking-tight text-transparent md:text-6xl"
          >
            Aprenda as tecnologias mais demandadas do mercado e transforme sua
            carreira.
          </motion.h1>

          {/* SUBTÍTULO */}
          <motion.p
            variants={item}
            className="mt-6 text-base text-neutral-300/90 sm:text-lg"
          >
            Formação prática e acelerada: domine as stacks mais pedidas pelas
            empresas e conquiste sua primeira vaga em tecnologia com projetos
            reais, mentoria e comunidade ativa.
          </motion.p>

          {/* CTA principal */}
          <motion.div variants={item} className="mt-10">
            <MagneticButton label="MATRICULE-SE AGORA ➔" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
