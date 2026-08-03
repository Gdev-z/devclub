import React, { Suspense } from 'react'
import ModelViewer from './ModelViewer.jsx'
import MetalCanvas from './MetalCanvas.jsx'
import ParticlesCanvas from './ParticlesCanvas.jsx'
import { ErrorBoundary } from 'react-error-boundary'

function ModelFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-sm text-white/40">Carregando...</p>
    </div>
  )
}

function ModelError({ error }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <p className="text-sm text-red-400">Erro ao carregar a visualização 3D.</p>
      <p className="mt-1 max-w-xs text-center text-xs text-white/40">
        {error?.message || 'Verifique o console de desenvolvedor (F12).'}
      </p>
    </div>
  )
}

export default function ModelViewerContainer({ model, enabled }) {
  if (!enabled || !model) return null

  return (
    <div className="h-full w-full">
      <Suspense fallback={<ModelFallback />}>
        <ErrorBoundary FallbackComponent={ModelError}>
          {model.type === 'procedural' ? (
            model.scene === 'metal' ? (
              <MetalCanvas key={model.id} />
            ) : (
              <ParticlesCanvas key={model.id} />
            )
          ) : (
            <ModelViewer key={model.id} modelPath={model.path} />
          )}
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}