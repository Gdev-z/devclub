import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  // Trava o scroll durante o loading
  if (typeof document !== 'undefined') {
    document.body.classList.toggle('loading-active', loading)
  }

  return (
    <div className="relative min-h-screen w-full bg-[#09090B] text-white">
      {/* Header fixo (acima de tudo, menos que o loader) */}
      <Header />

      {/* Hero — sempre montada e renderizada por baixo do loader (sem FOUC) */}
      <Hero />

      {/* Loading por cima (z-50) até 100%; AnimatePresence aplica o exit */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen
            onComplete={() => {
              setLoading(false)
              document.body.classList.remove('loading-active')
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
