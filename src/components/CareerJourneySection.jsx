import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Layers,
  GraduationCap,
  Briefcase,
  Lightbulb,
} from 'lucide-react';

const journeyCards = [
  {
    icon: ShieldCheck,
    title: 'Formação completa do básico ao avançado',
    description:
      'Trilhas organizadas para quem está começando e para quem já atua na área, com formações em Front-end, Back-end e Full Stack.',
  },
  {
    icon: CheckCircle2,
    title: 'Conectado ao mercado',
    description:
      'Conteúdo alinhado às demandas reais de empresas que contratam profissionais de tech.',
  },
  {
    icon: Layers,
    title: 'MBA em IA reconhecido pelo MEC',
    description:
      'Aprofunde-se em IA com uma pós-graduação completa, certificações internacionais e foco em inovação.',
  },
  {
    icon: GraduationCap,
    title: 'Reconhecido pelo MEC',
    description:
      'Pós-graduação credenciada, com validade nacional e padrão acadêmico de excelência.',
  },
  {
    icon: Briefcase,
    title: 'Conexão com contratações',
    description:
      'O DevClub prepara você para vagas reais. Milhares de alunos empregados e empresas parceiras.',
  },
  {
    icon: Lightbulb,
    title: 'Cargos estratégicos',
    description:
      'Formação voltada para quem busca liderança, diferenciação profissional e cargos de alto nível.',
  },
];

export default function CareerJourneySection() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Measure the horizontal overflow after mount / on resize
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const track = trackRef.current.scrollWidth;
      const view = trackRef.current.parentElement.offsetWidth;
      setTrackWidth(track - view);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Scroll progress 0→1 drives X translation 0 → -(track overflow)
  const x = useTransform(scrollYProgress, [0, 1], [0, -trackWidth]);

  return (
    <section ref={wrapperRef} className="relative h-[400vh] bg-[#09090B]">
      {/* Sticky viewport — stays pinned while wrapper scrolls */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header — pinned at top inside the sticky block */}
        <div className="w-full text-center px-6 pt-10 pb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Uma jornada completa para sua{' '}
            <span className="text-[#39D353]">carreira em tecnologia</span>
          </h2>
        </div>

        {/* Horizontal card track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-8 px-8 w-max"
        >
          {journeyCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="group relative flex-shrink-0 w-[85vw] md:w-[500px] min-h-[350px] h-auto rounded-3xl bg-[#121215] border border-white/10 p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:border-[#39D353]/30"
              >
                {/* Hover glow */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#39D353]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

                {/* Icon circle */}
                <div className="bg-[#39D353] text-black w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(57,211,83,0.3)] group-hover:shadow-[0_0_30px_rgba(57,211,83,0.5)] transition-shadow duration-300">
                  <Icon size={24} strokeWidth={2.2} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-lg leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Scroll hint — fades out as user scrolls */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 text-sm pointer-events-none select-none"
        >
          <span>Role para explorar</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
