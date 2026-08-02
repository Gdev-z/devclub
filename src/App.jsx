import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen.jsx'
import BgVideo from './components/BgVideo.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
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
import CircleToggleButton from './components/CircleToggleButton.jsx'
import SettingsModal from './components/SettingsModal.jsx'
import useModel3DSettings from './hooks/useModel3DSettings'
import models3D from './config/models3D.js'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [revealHero, setRevealHero] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const { enabled, activeModelId, models, toggleEnabled, selectModel } =
    useModel3DSettings()

  // Encontrar o modelo principal pelo registry
  const heroModel = models3D.find((m) => m.id === 'hero-model')
  const activeModel = models3D.find((m) => m.id === activeModelId)

  useSmoothScroll(loading)

  if (typeof document !== 'undefined') {
    document.body.classList.toggle('loading-active', loading)
  }

  return (
    <div className="relative min-h-screen w-full text-white">
      <BgVideo />
      <Header />
      {/* <HeroScene /> */}

      <Hero
        loading={!revealHero}
        heroModelPath={activeModel?.path ?? '/logoForSpline2.glb'}
        heroModelEnabled={enabled}
        heroModelId={activeModelId}
      />

      <LogosCarousel />

      {/* AUTORIDADE — Quem guia sua jornada */}
      <FounderSection />

      {/* EMPATIA — "Você se identifica?" */}
      <EmpathySection />

      {/* ECOSSISTEMA — Suporte + Plataforma (consolidado) */}
      <EcosystemSection />

      {/* STACK — Tecnologias do mercado */}
      <TechStackSection />

      {/* SOLUÇÃO — Trilhas de formação */}
      <FormacoesSection />

      {/* Jornada de Carreira (Timeline) */}
      <CareerJourneySection />

      {/* RESULTADO — Salário e benefícios */}
      <SalaryBenefitsSection />

      {/* PROVA SOCIAL — Depoimentos reais */}
      <TestimonialsSection />

      {/* Plataforma e Ecossistema (Feature Showcase) */}
      <PlatformFeatures />

      {/* URGÊNCIA + AÇÃO — CTA final */}
      <UrgencyCTASection />

      {/* Dobra 6 — Marca gigante em destaque (overlay com canvas 3D) */}
      <BrandShowcase />

      <Footer />

      {/* Controles 3D */}
      <CircleToggleButton onOpen={() => setShowSettings(true)} />
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          models={models}
          enabled={enabled}
          activeModelId={activeModelId}
          toggleEnabled={toggleEnabled}
          selectModel={selectModel}
        />
      )}

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