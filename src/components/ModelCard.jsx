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
      <div className="relative flex h-14 items-center justify-center bg-surface sm:h-16">
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={model.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <Box className="h-6 w-6 text-white/20" />
        )}

        {/* Selecionado indicator */}
        {selected && (
          <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent">
            <svg
              className="h-2.5 w-2.5 text-bg-base"
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
      <div className="p-2">
        <div className="text-xs font-medium text-white truncate">{model.name}</div>
        <div className="mt-0.5 text-[10px] text-white/40 truncate">{model.id}</div>
      </div>
    </div>
  )
}