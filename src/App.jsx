import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import HeroScene from './components/HeroScene.jsx'
import LogosCarousel from './components/LogosCarousel.jsx'
import EmpathySection from './components/EmpathySection.jsx'
import FounderSection from './components/FounderSection.jsx'
import FormacoesSection from './components/FormacoesSection.jsx'
import EcosystemSection from './components/EcosystemSection.jsx'
import TechStackSection from './components/TechStackSection.jsx'
import SalaryBenefitsSection from './components/SalaryBenefitsSection.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import UrgencyCTASection from './components/UrgencyCTASection.jsx'
import CareerJourneySection from './components/CareerJourneySection.jsx'
import PlatformFeatures from './components/PlatformFeatures.jsx'
import BrandShowcase from './components/BrandShowcase.jsx'
import Footer from './components/Footer.jsx'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [revealHero, setRevealHero] = useState(false)

  useSmoothScroll(loading)

  if (typeof document !== 'undefined') {
    document.body.classList.toggle('loading-active', loading)
  }

  return (
    <div className="relative min-h-screen w-full bg-[#09090B] text-white">
      <Header />
      <HeroScene />

      <Hero loading={!revealHero} />

      <LogosCarousel />

      {/* AUTORIDADE — Quem guia sua jornada */}
      <FounderSection />

      {/* EMPATIA — "Você se identifica?" */}
      <EmpathySection />

      {/* SOLUÇÃO — Trilhas de formação */}
      <FormacoesSection />

      {/* ECOSSISTEMA — Suporte + Plataforma (consolidado) */}
      <EcosystemSection />

      {/* STACK — Tecnologias do mercado */}
      <TechStackSection />

      {/* RESULTADO — Salário e benefícios */}
      <SalaryBenefitsSection />

      {/* PROVA SOCIAL — Depoimentos reais */}
      <TestimonialsSection />

      {/* Jornada de Carreira (Timeline) */}
      <CareerJourneySection />

      {/* Plataforma e Ecossistema (Feature Showcase) */}
      <PlatformFeatures />

      {/* URGÊNCIA + AÇÃO — CTA final */}
      <UrgencyCTASection />

      {/* Dobra 6 — Marca gigante em destaque (overlay com canvas 3D) */}
      <BrandShowcase />

      <Footer />

      <AnimatePresence>
        {loading && (
          <LoadingScreen
            onComplete={() => {
              setLoading(false)
              document.body.classList.remove('loading-active')
              window.dispatchEvent(new Event('devclub:loaded'))
              setTimeout(() => setRevealHero(true), 850)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
