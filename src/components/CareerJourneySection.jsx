import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Layers,
  GraduationCap,
  Briefcase,
  Lightbulb,
  ArrowDown,
  ArrowRight,
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

/* ---------- shared card renderer ---------- */
function JourneyCard({ card, index, reducedMotion }) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex-shrink-0 w-[85vw] sm:w-[75vw] md:w-[500px] min-h-[350px] h-auto rounded-3xl bg-[#121215] border border-white/10 p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:border-[#39D353]/30 snap-center"
    >
      {/* Hover glow */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#39D353]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

      {/* Icon circle */}
      <div className="bg-[#39D353] text-black w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(57,211,83,0.3)] group-hover:shadow-[0_0_30px_rgba(57,211,83,0.5)] transition-shadow duration-300">
        <Icon size={24} strokeWidth={2.2} />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>

      {/* Description */}
      <p className="text-neutral-400 text-lg leading-relaxed">
        {card.description}
      </p>
    </motion.div>
  );
}

/* ---------- progress dots ---------- */
function ProgressDots({ count, progress }) {
  return (
    <div className="flex items-center justify-center gap-2.5 py-6">
      {Array.from({ length: count }).map((_, i) => {
        const seg = 1 / count;
        const isActive = progress >= i * seg && progress < (i + 1) * seg;
        const isPast = progress >= (i + 1) * seg;

        return (
          <motion.div
            key={i}
            animate={{
              width: isActive ? 28 : 8,
              backgroundColor: isActive || isPast ? '#39D353' : '#27272A',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="h-2 rounded-full"
          />
        );
      })}
    </div>
  );
}

/* ===================================================================
   DESKTOP: Sticky vertical-to-horizontal scroll
   =================================================================== */
function DesktopLayout({ reducedMotion }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Measure horizontal overflow
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

  // Track scroll progress for dots
  useEffect(() => {
    return scrollYProgress.on('change', (v) => setScrollProgress(v));
  }, [scrollYProgress]);

  // Scroll → horizontal translation
  const x = reducedMotion
    ? 0
    : useTransform(scrollYProgress, [0, 1], [0, -trackWidth]);

  return (
    <section ref={wrapperRef} className="relative h-[400vh] bg-[#09090B]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Card track */}
        <motion.div
          ref={trackRef}
          style={reducedMotion ? {} : { x }}
          className="flex gap-8 px-8 w-max"
        >
          {journeyCards.map((card, i) => (
            <JourneyCard key={i} card={card} index={i} reducedMotion={reducedMotion} />
          ))}
        </motion.div>

        {/* Progress dots */}
        <ProgressDots count={journeyCards.length} progress={scrollProgress} />

        {/* Scroll hint */}
        {!reducedMotion && (
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 text-sm pointer-events-none select-none"
          >
            <span>Role para explorar</span>
            <ArrowDown size={18} className="animate-bounce" />
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ===================================================================
   MOBILE: Native horizontal scroll-snap
   =================================================================== */
function MobileLayout({ reducedMotion }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.querySelector('[data-card]')?.offsetWidth || 1;
    const gap = 32; // gap-8 = 2rem
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(idx, journeyCards.length - 1));
  }, []);

  return (
    <section className="relative bg-[#09090B] py-16 overflow-hidden">
      {/* Scrollable card row */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-4 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {journeyCards.map((card, i) => (
          <JourneyCard key={i} card={card} index={i} reducedMotion={reducedMotion} />
        ))}
      </div>

      {/* Progress dots */}
      <ProgressDots count={journeyCards.length} progress={(activeIndex + 1) / journeyCards.length} />

      {/* Swipe hint */}
      {!reducedMotion && activeIndex === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center gap-2 text-neutral-500 text-sm mt-2"
        >
          <span>Deslize para o lado</span>
          <ArrowRight size={16} className="animate-pulse" />
        </motion.div>
      )}
    </section>
  );
}

/* ===================================================================
   MAIN EXPORT
   =================================================================== */
export default function CareerJourneySection() {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="bg-[#09090B]">
      {/* Shared header — outside sticky, outside scroll */}
      <div className="w-full text-center px-6 pt-20 pb-10 md:pt-24 md:pb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Uma jornada completa para sua{' '}
          <span className="text-[#39D353]">carreira em tecnologia</span>
        </h2>
      </div>

      {/* Layout switches at md breakpoint */}
      {isMobile ? (
        <MobileLayout reducedMotion={prefersReduced} />
      ) : (
        <DesktopLayout reducedMotion={prefersReduced} />
      )}
    </div>
  );
}
