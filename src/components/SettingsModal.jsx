import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function SettingsModal({ onClose, models, enabledModels, toggleModel }) {
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
          className="relative w-full max-w-md rounded-2xl bg-[#18181B] p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Modelos 3D</h2>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Lista de modelos */}
          <div className="space-y-3">
            {models.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                enabled={enabledModels[model.id]}
                onToggle={() => toggleModel(model.id)}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 text-xs text-white/40">
            Ao desativar, o modelo 3D não será carregado na página.
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ModelCard({ model, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#09090B] p-4">
      <div>
        <div className="font-medium text-white">{model.name}</div>
        <div className="mt-0.5 text-xs text-white/40">{model.id}</div>
      </div>

      {/* Toggle switch */}
      <button
        onClick={onToggle}
        className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${
          enabled ? 'bg-[#39D353]' : 'bg-white/20'
        }`}
        role="switch"
        aria-checked={enabled}
        aria-label={`Ativar ${model.name}`}
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
  )
}