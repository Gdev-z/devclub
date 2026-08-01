import { Box } from 'lucide-react'

export default function ModelCard({ model, selected, onSelect }) {
  const thumbnailSrc = model.thumbnail || null

  return (
    <div
      onClick={() => onSelect(model.id)}
      className={`relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-200 ${
        selected
          ? 'border-accent shadow-lg shadow-accent/20'
          : 'border-white/10 hover:border-accent/30'
      } bg-bg-surface`}
      role="button"
      tabIndex={0}
      aria-label={`Selecionar ${model.name}`}
      aria-selected={selected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(model.id)
        }
      }}
    >
      {/* Thumbnail */}
      <div className="relative flex h-32 items-center justify-center bg-surface sm:h-40">
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={model.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <Box className="h-12 w-12 text-white/20" />
        )}

        {/* Selecionado indicator */}
        {selected && (
          <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#39D353]">
            <svg
              className="h-3.5 w-3.5 text-[#09090B]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="text-sm font-medium text-white">{model.name}</div>
        <div className="mt-0.5 text-xs text-white/40">{model.id}</div>
      </div>
    </div>
  )
}