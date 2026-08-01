import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Settings } from 'lucide-react'
import ModelCard from './ModelCard'

export default function SettingsModal({
  onClose,
  models,
  enabled,
  activeModelId,
  toggleEnabled,
  selectModel,
}) {
  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Fechar ao clicar no overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleOverlayClick}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Configurações de modelos 3D"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl"
        >
          {/* Header com switch global */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-white/60" />
              <h2 className="text-lg font-semibold text-ink">Modelos 3D</h2>
            </div>
            {/* Toggle global */}
            <button
              onClick={toggleEnabled}
              className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${
                enabled ? 'bg-accent' : 'bg-white/20'
              }`}
              role="switch"
              aria-checked={enabled}
              aria-label="Ativar/desativar modelos 3D"
            >
              <motion.div
                layout
                transition={{ type: 'spring', duration: 0.3 }}
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md ${
                  enabled ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Seção: seleção de modelo */}
          <div className="mb-4">
            <p className="text-xs text-white/40">
              {enabled
                ? 'Escolha um modelo para exibir:'
                : 'Ative o 3D acima para escolher um modelo.'}
            </p>
          </div>

          {/* Grid de cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {models.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                selected={model.id === activeModelId}
                onSelect={selectModel}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 text-xs text-white/40">
            Ao desativar, os modelos 3D não serão carregados na página.
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}