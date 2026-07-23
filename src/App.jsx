import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import HeroScene from './components/HeroScene.jsx'
import LogosCarousel from './components/LogosCarousel.jsx'
import FormacoesSection from './components/FormacoesSection.jsx'
import EcosystemSection from './components/EcosystemSection.jsx'
import PlatformFeatures from './components/PlatformFeatures.jsx'
import TechStackSection from './components/TechStackSection.jsx'
import SalaryBenefitsSection from './components/SalaryBenefitsSection.jsx'
import FounderSection from './components/FounderSection.jsx'
import BrandShowcase from './components/BrandShowcase.jsx'
import Footer from './components/Footer.jsx'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  const [loading, setLoading] = useState(true)
  // Só libera o reveal da Hero APÓS o loader terminar de sair (exit ~0.8s),
  // senão a animação acontece por trás da tela de loading e não é vista.
  const [revealHero, setRevealHero] = useState(false)

  // Smooth scroll só após o loading (o App trava o scroll do body no loader,
  // e o Lenis assume o controle do scroll — iniciar antes conflitaria).
  useSmoothScroll(loading)

  // Trava o scroll durante o loading
  if (typeof document !== 'undefined') {
    document.body.classList.toggle('loading-active', loading)
  }

  return (
    <div className="relative min-h-screen w-full bg-[#09090B] text-white">
      {/* Header fixo (acima de tudo, menos que o loader) */}
      <Header />
      <HeroScene />

      {/* Hero — sempre montada e renderizada por baixo do loader (sem FOUC) */}
      <Hero loading={!revealHero} />

      {/* Mini seção — carrossel infinito de logos de empresas */}
      <LogosCarousel />

      {/* Dobra 2 — Conheça o Fundador (Rodolfo Mori) */}
      <FounderSection />

      {/* Dobra 3 — Trilhas de Formação (scroll horizontal no desktop / carrossel no mobile) */}
      <FormacoesSection />

      {/* Dobra 3 — Ecossistema DevClub (Bento Grid) */}
      <EcosystemSection />

      {/* Dobra 5 — Tecnologias e Stack do Mercado */}
      <TechStackSection />

      {/* Dobra 6 — Média Salarial e Benefícios */}
      <SalaryBenefitsSection />

      {/* Dobra 7 — Plataforma e Ecossistema (Feature Showcase) */}
      <PlatformFeatures />

      {/* Dobra 6 — Marca gigante em destaque (overlay com canvas 3D) */}
      <BrandShowcase />

      {/* Footer minimalista */}
      <Footer />

      {/* Loading por cima (z-50) até 100%; AnimatePresence aplica o exit */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen
            onComplete={() => {
              setLoading(false)
              document.body.classList.remove('loading-active')
              window.dispatchEvent(new Event('devclub:loaded'))
              // aguarda o exit do loader (0.8s) antes de revelar a Hero
              setTimeout(() => setRevealHero(true), 850)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
