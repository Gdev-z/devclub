import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Fernanda Oliveira',
    role: 'Front-end Developer na iFood',
    text: 'Eu trabalhava como atendente e nunca imaginei que poderia estar escrevendo código para uma das maiores empresas de tecnologia do Brasil. O DevClub me deu o caminho e a confiança que eu precisava.',
    avatar: 'F',
    accent: '#39D353',
  },
  {
    name: 'Lucas Mendes',
    role: 'Full Stack Developer na Nubank',
    text: 'Fiz 3 cursos online antes do DevClub e nenhum me preparou de verdade. Aqui eu aprendi a construir projetos reais e foi isso que me fez passar na entrevista técnica.',
    avatar: 'L',
    accent: '#8532F2',
  },
  {
    name: 'Camila Santos',
    role: 'Dev Backend — Remote (US)',
    text: 'Saí de um emprego que me dava 2k por mês para ganhar em dólar trabalhando remoto. O DevClub não é só curso, é uma transformação completa de carreira.',
    avatar: 'C',
    accent: '#22D3EE',
  },
  {
    name: 'Rafael Costa',
    role: 'Automação & IA — Freelancer',
    text: 'Comecei do zero absoluto. Hoje automatizo processos para empresas usando n8n e IA. Em 8 meses saí do zero para faturar mais do que meu emprego anterior.',
    avatar: 'R',
    accent: '#F97316',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="relative bg-[#09090B] py-24 text-white overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-neutral-400 mb-6">
              <span className="text-[#39D353]">●</span>
              Quem já passou por aqui
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Histórias reais de{' '}
              <span className="text-[#39D353]">transformação.</span>
            </h2>
          </motion.div>

          {/* Testimonial card */}
          <motion.div variants={fadeUp} className="relative">
            <div className="rounded-3xl border border-white/10 bg-[#121215] p-8 md:p-12 min-h-[320px] flex flex-col justify-between">
              {/* Quote icon */}
              <Quote
                size={40}
                className="mb-6 opacity-10"
                style={{ color: t.accent }}
              />

              {/* Text */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={current}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="text-lg md:text-xl leading-relaxed text-neutral-300 mb-10 max-w-3xl"
                >
                  &ldquo;{t.text}&rdquo;
                </motion.p>
              </AnimatePresence>

              {/* Author + nav */}
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-4">
                  {/* Avatar circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-lg"
                    style={{ backgroundColor: t.accent }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`name-${current}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-bold text-white"
                      >
                        {t.name}
                      </motion.p>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`role-${current}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-neutral-500"
                      >
                        {t.role}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  {/* Dots */}
                  <div className="flex gap-1.5 mr-3">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === current
                            ? 'w-6 bg-[#39D353]'
                            : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                        }`}
                        aria-label={`Depoimento ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={prev}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
                    aria-label="Próximo"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={fadeUp}
            className="mt-10 grid grid-cols-3 gap-4 text-center"
          >
            {[
              { value: '+25.000', label: 'Alunos formados' },
              { value: '87%', label: 'Empregados em até 6 meses' },
              { value: 'R$ 8.500', label: 'Salário médio pleno' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-[#121215] py-5 px-4"
              >
                <p className="text-2xl md:text-3xl font-extrabold text-[#39D353]">
                  {stat.value}
                </p>
                <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
