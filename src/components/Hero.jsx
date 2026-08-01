import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton.jsx'
import ModelViewerContainer from './ModelViewerContainer.jsx'

// ============================================================
// CONTROLE DO REVEAL DO HERO
// STAGGER = intervalo entre cada elemento
// DELAY   = tempo antes da animação começar
// ============================================================
const STAGGER = 0.6
const DELAY = 0.1

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: DELAY,
      staggerChildren: STAGGER,
    },
  },
}

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
      delay: STAGGER * 6,
    },
  },
}

export default function Hero({
  loading = false,
  heroModelPath = '/logoForSpline2.glb',
  heroModelEnabled = false,
  heroModelId = 'hero-model',
}) {
  return (
    <section className="hero-section relative min-h-screen w-full overflow-hidden">
      <div className="relative z-10 flex w-full flex-col items-start justify-center bg-[#09090B] px-6 py-20 sm:px-8 sm:py-24 md:px-12 md:py-28 lg:px-24 lg:h-screen lg:w-2/5 lg:min-w-[40vw]">
        {/* Spacer — o Modelo é renderizado fora do fluxo pelo ModelViewerContainer */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={loading ? 'hidden' : 'show'}
          className="mx-auto flex max-w-full flex-col items-start lg:mx-0 lg:max-w-2xl"
        >
          {/* Badge */}
          <motion.span
            variants={badge}
            className="flex w-fit shrink-0 items-center gap-2 rounded-full border border-white/10 bg-[#18181B] px-4 py-1.5 text-sm text-white/80"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#39D353]" />
            +25 mil alunos formados
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="mt-4 max-w-full bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-2xl font-semibold leading-[1.2] tracking-tight text-transparent sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Construa sua carreira em tecnologia com quem já trilhou esse
            caminho.
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={item}
            className="mt-4 max-w-[55ch] text-sm text-neutral-300/90 sm:mt-6 sm:text-lg"
          >
            Você vai construir projetos reais, receber feedback de quem trabalha
            nas maiores empresas do país, e sair com um portfólio que fala por
            você. Do primeiro código à sua primeira vaga.
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="mt-8 sm:mt-10">
            <MagneticButton
              label="Matricule-se"
              href="https://wa.me/5516990482444"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Model — responsive: full width on mobile, 40% of right side on desktop */}
      <div className="relative h-[60vh] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:z-10 lg:block lg:h-screen lg:w-3/5">
        <ModelViewerContainer
          modelPath={heroModelPath}
          enabled={heroModelEnabled}
          modelId={heroModelId}
        />
      </div>
    </section>
  )
}