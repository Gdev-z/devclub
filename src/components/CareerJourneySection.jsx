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
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex-shrink-0 flex items-center gap-5 w-[85vw] sm:w-[75vw] md:w-[460px] rounded-[28px] bg-[#121215] border border-white/10 px-6 py-8 md:px-7 md:py-9 transition-all duration-300 hover:-translate-y-1 hover:border-[#39D353]/30 snap-center"
    >
      {/* Ícone — preenche a div, sem fundo, branco */}
      <div className="shrink-0 w-14 h-14 flex items-center justify-center">
        <Icon size={56} strokeWidth={1.8} className="text-white" />
      </div>

      {/* Texto */}
      <div className="min-w-0">
        <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
          {card.title}
        </h3>
        <p className="mt-1.5 text-neutral-400 text-sm md:text-base leading-relaxed">
          {card.description}
        </p>
      </div>
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
              backgroundColor: isActive ? 'var(--color-accent)' : '#27272A',
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
function DesktopLayout({ reducedMotion, showTitle, headingRef, titleText, accentText }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  /* Typing reveal — trigger on view */
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <section ref={wrapperRef} className="relative h-[300vh] bg-bg-base">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[#09090B]">
        {/* Header com z-index sobre os cards */}
        <div ref={headingRef} className="absolute top-8 left-0 right-0 text-center px-6 pt-4 md:pt-8 pointer-events-none">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#FAFAFA] leading-tight whitespace-pre">
            {titleText.split('').map((char, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: revealed ? 1 : 0,
                  transition: `opacity 0.03s ease ${i * 0.03}s`,
                }}
              >
                {char}
              </span>
            ))}
            <span className="text-[#39D353]">
              {accentText.split('').map((char, i) => (
                <span
                  key={`a-${i}`}
                  style={{
                    display: 'inline-block',
                    opacity: revealed ? 1 : 0,
                    transition: `opacity 0.03s ease ${(titleText.length + i) * 0.03}s`,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h2>
        </div>

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
    <section className="relative bg-bg-base py-16 overflow-hidden">
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
  const headingRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const titleText = 'Uma jornada completa para sua ';
  const accentText = 'carreira em tecnologia';

  return (
    <div className="bg-[#09090B]">
      {/* Layout switches at md breakpoint */}
      {isMobile ? (
        <MobileLayout reducedMotion={prefersReduced} />
      ) : (
        <DesktopLayout reducedMotion={prefersReduced} headingRef={headingRef} titleText={titleText} accentText={accentText} />
      )}
    </div>
  );
}
