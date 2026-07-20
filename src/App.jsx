import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import HeroScene from './components/HeroScene.jsx'
import LogosCarousel from './components/LogosCarousel.jsx'
import FormacoesSection from './components/FormacoesSection.jsx'
import EcosystemSection from './components/EcosystemSection.jsx'
import PlatformEcosystemSection from './components/PlatformEcosystemSection.jsx'
import TechStackSection from './components/TechStackSection.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  // Só libera o reveal da Hero APÓS o loader terminar de sair (exit ~0.8s),
  // senão a animação acontece por trás da tela de loading e não é vista.
  const [revealHero, setRevealHero] = useState(false)

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

      {/* Dobra 2 — Trilhas de Formação (scroll horizontal no desktop / carrossel no mobile) */}
      <FormacoesSection />

      {/* Dobra 3 — Ecossistema DevClub (Bento Grid) */}
      <EcosystemSection />

      {/* Dobra 5 — Tecnologias e Stack do Mercado */}
      <TechStackSection />

      {/* Dobra 4 — Plataforma e Ecossistema (Feature Showcase) */}
      <PlatformEcosystemSection />

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
