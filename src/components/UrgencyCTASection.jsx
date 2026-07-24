import { motion } from 'framer-motion';
import { Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import MagneticButton from './MagneticButton';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function UrgencyCTASection() {
  return (
    <section className="relative bg-[#09090B] py-28 text-white overflow-hidden">
    

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Urgency badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#39D353]/30 bg-[#39D353]/10 px-5 py-2 text-sm font-semibold text-[#39D353] shadow-[0_0_20px_rgba(57,211,83,0.15)]">
              <Zap size={16} className="fill-current" />
              Vagas limitadas para a próxima turma
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
          >
            Você merece uma{' '}
            <span className="text-[#39D353]">nova história.</span>
          </motion.h2>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Não espere o momento perfeito — ele não existe. Cada semana que
            passa é uma semana a mais longe da vaga que você merece.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <MagneticButton
              label="MATRICULE-SE AGORA"
              href="https://wa.me/5516990482444"
            />
            <a
              href="#formacoes"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector('#formacoes')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              Ver formações
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-neutral-500"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#39D353]" />
              Pós-graduação reconhecida pelo MEC
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#39D353]" />
              +25.000 alunos formados
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#39D353]" />
              Comunidade ativa 24/7
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
