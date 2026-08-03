import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Settings } from 'lucide-react'
import SelectableCard from './SelectableCard'
import { backgrounds } from '../config/backgrounds'

export default function SettingsModal({
  onClose,
  models,
  enabled,
  activeModelId,
  toggleEnabled,
  selectModel,
  activeBackgroundId,
  selectBackground,
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
        aria-label="Configurações da Página"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl"
        >
          {/* Header: título, toggle e X */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-white/60" />
              <h2 className="text-lg font-semibold text-ink">Configurações da Página</h2>
            </div>
            <div className="flex items-center gap-2">
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
              <button
                onClick={onClose}
                className="ml-1 rounded p-1 text-white/40 transition-colors hover:text-white/80"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Seção: seleção de modelo */}
          <div className="mb-4">
            <p className="text-xs text-white/40">
              {enabled
                ? 'Escolha um modelo para exibir:'
                : 'Ative o 3D acima para escolher um modelo.'}
            </p>
          </div>

          {/* Modelos em linha horizontal */}
          <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
            {models.map((model) => (
              <SelectableCard
                key={model.id}
                label={model.name}
                thumbnailSrc={model.thumbnail}
                isSelected={model.id === activeModelId}
                onClick={() => selectModel(model.id)}
              />
            ))}
          </div>

          {/* Seção: Background */}
          <div className="mb-4">
            <h3 className="mb-2 text-xs font-medium text-white/60">Background</h3>
            <div className="flex gap-3">
              {backgrounds.map((bg) => (
                <SelectableCard
                  key={bg.id}
                  label={bg.name}
                  colorPlaceholder={bg.colorPlaceholder}
                  isSelected={bg.id === activeBackgroundId}
                  onClick={() => selectBackground(bg.id)}
                />
              ))}
            </div>
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