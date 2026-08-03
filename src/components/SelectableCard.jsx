import { Box } from 'lucide-react'

export default function SelectableCard({
  label,
  thumbnail,
  colorPlaceholder,
  isSelected,
  onClick,
}) {
  return (
    <button
      className="group flex h-16 w-24 items-center justify-center overflow-hidden rounded-xl border transition-colors duration-200 sm:h-20 sm:w-28"
      onClick={onClick}
      aria-pressed={isSelected}
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={label}
          className={`h-full w-full object-cover transition-opacity duration-200 ${
            isSelected ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
          }`}
        />
      ) : colorPlaceholder ? (
        <div
          className={`h-full w-full transition-border-color duration-200 ${
            isSelected ? 'border-[3px] border-[#39D353]' : ''
          }`}
          style={{ backgroundColor: colorPlaceholder }}
        />
      ) : (
        <Box className="h-6 w-6 text-white/20" />
      )}

      {isSelected && (
        <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#39D353]">
          <svg
            className="h-2.5 w-2.5 text-bg-base"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </button>
  )
}