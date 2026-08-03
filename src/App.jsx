import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen.jsx'
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
import FaqAccordion from './components/FaqAccordion.jsx'
import { faqData } from './config/faqData.js'
import CircleToggleButton from './components/CircleToggleButton.jsx'
import SettingsModal from './components/SettingsModal.jsx'
import PageBackground from './components/PageBackground.jsx'
import useModel3DSettings from './hooks/useModel3DSettings'
import usePageSettings from './hooks/usePageSettings'
import models3D from './config/models3D.js'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  const { enabled, activeModelId, models, toggleEnabled, selectModel } =
    useModel3DSettings()

  const { activeBackgroundId, selectBackground } = usePageSettings()

  const defaultHeroModel = models3D.find((m) => m.id === 'hero-model')
  const activeModel = models.find((m) => m.id === activeModelId) || defaultHeroModel

  const handleToggleModels = () => {
    setShowSettings((prev) => !prev)
  }

  useSmoothScroll()

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={(p) => setLoading(p >= 100)} />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen bg-base">
          <PageBackground activeId={activeBackgroundId} />
          <div className="relative z-[1]">
            <Header revealHero />
            <Hero heroModel={activeModel} heroModelEnabled={enabled} />
            <LogosCarousel />
            <FounderSection />
            <EmpathySection />
            <EcosystemSection />
            <TechStackSection models={models} />
            <FormacoesSection />
            <SalaryBenefitsSection />
            <TestimonialsSection />
            <CareerJourneySection />
            <FaqAccordion faqData={faqData} />
            <PlatformFeatures />
            <UrgencyCTASection />
            <BrandShowcase />
            <Footer />
          </div>

          <CircleToggleButton
            isOpen={enabled}
            onToggle={handleToggleModels}
          />

          {showSettings && (
            <SettingsModal
              onClose={() => setShowSettings(false)}
              models={models}
              enabled={enabled}
              activeModelId={activeModelId}
              toggleEnabled={toggleEnabled}
              selectModel={selectModel}
              activeBackgroundId={activeBackgroundId}
              selectBackground={selectBackground}
            />
          )}
        </div>
      )}
    </>
  )
}