import { motion } from 'framer-motion';
import { AlertTriangle, Clock, HelpCircle, TrendingDown } from 'lucide-react';

const pains = [
  {
    icon: Clock,
    text: 'Sinto que estou ficando pra trás enquanto outros progredem na carreira.',
  },
  {
    icon: HelpCircle,
    text: 'Não sei por onde começar. Tem tanta coisa que me perco no caminho.',
  },
  {
    icon: TrendingDown,
    text: 'Troquei de carreira e agora me sinto perdido sem um norte claro.',
  },
  {
    icon: AlertTriangle,
    text: 'Já fiz vários cursos mas nenhum me levou de verdade a uma vaga.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function EmpathySection() {
  return (
    <section className="relative bg-[#09090B] py-24 text-white overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#39D353]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Tag */}
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-neutral-400 mb-8"
          >
            <span className="text-[#39D353]">●</span>
            Se alguma dessas situações é a sua...
          </motion.span>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-16"
          >
            Você não está sozinho nessa{' '}
            <span className="text-[#39D353]">jornada.</span>
          </motion.h2>

          {/* Pain cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pains.map((pain, i) => {
              const Icon = pain.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#121215] p-6 text-left transition-colors duration-300 hover:border-[#39D353]/20"
                >
                  <div className="shrink-0 mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                    <Icon size={18} className="text-neutral-400" />
                  </div>
                  <p className="text-neutral-300 text-base leading-relaxed">
                    {pain.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Transition line */}
          <motion.p
            variants={fadeUp}
            className="mt-14 text-lg text-neutral-500 max-w-xl mx-auto"
          >
            Você não precisa de mais um curso. Você precisa de um caminho que
            funciona.{' '}
            <span className="text-white font-semibold">
              O DevClub existe para ser esse caminho.
            </span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
