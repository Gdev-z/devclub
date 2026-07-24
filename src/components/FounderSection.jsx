import { motion } from 'framer-motion'
import { Target, Users, Code } from 'lucide-react'
import rodolfoImg from '../assets/mentoria-rodolfo.png'

/* =========================================================================
   FOUNDER SECTION — Conheça Rodolfo Mori
   Two-column: image with floating badges (left) + copy (right)
   ========================================================================= */

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const badges = [
  { icon: Users, label: 'Comunidade Ativa' },
  { icon: Code, label: 'Código na Prática' },
]

/* ---------- Componente ---------- */
export default function FounderSection() {
  return (
    <section className="relative bg-[#09090B] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">

          {/* ─── COLUNA ESQUERDA — Imagem ─── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="relative"
          >
            <img
              src={rodolfoImg}
              alt="Rodolfo Mori — Fundador do DevClub"
              className="w-full rounded-3xl object-cover shadow-2xl"
            />
            {/* Gradiente de fusão com o fundo */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-3xl bg-gradient-to-t from-[#09090B] to-transparent" />

            {/* Badges flutuantes */}
            <div className="absolute bottom-6 left-6 flex gap-3">
              {badges.map((b) => {
                const Icon = b.icon
                return (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md"
                  >
                    <Icon size={14} className="text-[#39D353]" />
                    {b.label}
                  </span>
                )
              })}
            </div>
          </motion.div>

          {/* ─── COLUNA DIREITA — Texto ─── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {/* Tagline */}
              <motion.div variants={fadeUp} className="mb-4">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#39D353]">
                  <Target size={16} />
                  Conheça quem guia a sua jornada
                </span>
              </motion.div>

              {/* Título */}
              <motion.h2
                variants={fadeUp}
                className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
              >
                Rodolfo Mori
              </motion.h2>

              {/* Subtítulo */}
              <motion.h3
                variants={fadeUp}
                className="mt-2 text-xl font-medium text-neutral-400"
              >
                Fundador do DevClub
              </motion.h3>

              {/* Corpo */}
              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg leading-relaxed text-neutral-300"
              >
                O DevClub nasceu da frustração de ver gente talentosa perdida no
                meio de cursos que prometem tudo e entregam nada. Aqui, você não
                vai assistir aulas e torcer para dar certo. Vai construir projetos
                reais, receber feedback de quem atua nas maiores empresas do país,
                e sair com um portfólio e uma preparação que falam por você.
              </motion.p>

              {/* Blockquote */}
              <motion.blockquote
                variants={fadeUp}
                className="mt-8 border-l-2 border-[#39D353] pl-6 text-base italic leading-relaxed text-white/90"
              >
                &ldquo;A diferença entre um curso e uma carreira é o que acontece
                depois da aula. Aqui, você não estuda sozinho — tem recrutadora
                revisando seu currículo, mentor corrigindo seu código e uma
                comunidade que não te deixa parar.&rdquo;
              </motion.blockquote>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
