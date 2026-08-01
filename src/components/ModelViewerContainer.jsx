import React, { Suspense } from 'react'
import ModelViewer from './ModelViewer.jsx'
import { ErrorBoundary } from 'react-error-boundary'

function ModelFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-sm text-white/40">Carregando modelo 3D…</p>
    </div>
  )
}

function ModelError({ error, resetErrorBoundary }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-sm text-red-400">Erro ao carregar o modelo 3D.</p>
    </div>
  )
}

export default function ModelViewerContainer({
  modelPath,
  enabled,
  modelId,
  isDesktop = false,
}) {
  if (!enabled) return null

  return (
    <div className="h-full w-full">
      <Suspense fallback={<ModelFallback />}>
        <ErrorBoundary FallbackComponent={ModelError}>
          {/* key={modelId} força remount do Canvas ao trocar de modelo */}
          <ModelViewer key={modelId} modelPath={modelPath} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}