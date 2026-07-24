import { motion } from 'framer-motion'
import { TrendingUp, Globe, DollarSign } from 'lucide-react'

/* =========================================================================
   SALARY & BENEFITS SECTION
   Two-column: animated salary bars (left) + glassmorphism benefit cards (right)
   ========================================================================= */

/* ---------- Dados ---------- */
const salaries = [
  {
    level: 'Júnior',
    range: 'R$ 4k – R$ 6k',
    width: '40%',
    gradient: 'linear-gradient(90deg, #71717a, #a1a1aa)',
    glow: '0 0 20px rgba(161,161,170,0.3)',
    delay: 0,
  },
  {
    level: 'Pleno',
    range: 'R$ 8k – R$ 12k',
    width: '65%',
    gradient: 'linear-gradient(90deg, #8532F2, #a855f7)',
    glow: '0 0 20px rgba(133,50,242,0.35)',
    delay: 0.15,
  },
  {
    level: 'Sênior',
    range: '+ R$ 12k até ∞',
    width: '95%',
    gradient: 'linear-gradient(90deg, #39D353, #4ade80)',
    glow: '0 0 24px rgba(57,211,83,0.4)',
    delay: 0.3,
  },
]

const benefits = [
  {
    icon: TrendingUp,
    title: 'Mercado Aquecido',
    description:
      'Mais de 500 mil vagas abertas para desenvolvedores no Brasil. Empresas nacionais e internacionais disputam profissionais qualificados (Indeed 2025).',
  },
  {
    icon: Globe,
    title: 'Trabalhe onde quiser',
    description:
      'Remoto, híbrido ou presencial — você escolhe. A carreira de tecnologia oferece liberdade geográfica que poucos setores têm.',
  },
  {
    icon: DollarSign,
    title: 'Ganhe em moeda estrangeira',
    description:
      'Trabalhe remotamente em companias que pagam em dólar ou euro. Você pode multiplicar seu poder de compra trabalhando do Brasil.',
  },
]

/* ---------- Variants ---------- */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ---------- Componente ---------- */
export default function SalaryBenefitsSection() {
  return (
    <section id="salario" className="relative bg-[#09090B] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          {/* ─── COLUNA ESQUERDA — Texto + Barras ─── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp}>
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-medium text-[#39D353]">
                <TrendingUp size={14} />
                Mercado em alta
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                Seu potencial de renda como{' '}
                <span className="text-[#39D353]">desenvolvedor</span> no Brasil
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-400">
                Com as habilidades certas, você cresce de Júnior a Sênior em
                menos tempo do que imagina. Dados do mercado brasileiro de 2025.
              </p>
            </motion.div>

            {/* Barras salariais */}
            <div className="mt-12 flex flex-col gap-8">
              {salaries.map((s) => (
                <motion.div
                  key={s.level}
                  variants={fadeUp}
                >
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-neutral-200">
                      {s.level}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {s.range}
                    </span>
                  </div>

                  {/* Track */}
                  <div className="relative h-10 w-full overflow-hidden rounded-xl bg-white/5">
                    {/* Barra animada */}
                    <motion.div
                      className="absolute inset-y-0 left-0 flex items-center rounded-xl"
                      style={{
                        background: s.gradient,
                        boxShadow: s.glow,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: s.width }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        delay: s.delay,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                    {/* Label sobre a barra */}
                    <motion.span
                      className="absolute inset-y-0 flex items-center pl-4 text-sm font-bold text-white"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: s.delay + 0.6,
                      }}
                    >
                      {s.range}
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─── COLUNA DIREITA — Cards Glassmorphism ─── */}
          <motion.div
            className="flex flex-col justify-center gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {benefits.map((b) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.title}
                  variants={fadeUp}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#39D353]/30 hover:bg-white/[0.07]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#39D353]/10">
                    <Icon size={20} className="text-[#39D353]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {b.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
