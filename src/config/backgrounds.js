export const backgrounds = [
  { id: 'video-bg', name: 'Vídeo', colorPlaceholder: '#3a3a3a' },
  { id: 'tech-bg', name: 'Tech', colorPlaceholder: '#22c55e' },
  { id: 'hex-bg', name: 'Hex', colorPlaceholder: '#0ea5e9' },
]

export const backgroundVariants = [
  { id: 'dark', name: 'Escuro', colorPlaceholder: '#09090b' },
  { id: 'low-opacity', name: 'Sutil', colorPlaceholder: '#09090b' },
  { id: 'light', name: 'Claro', colorPlaceholder: '#f5f5f5' },
]

export function selectBackgroundVariant(variants, currentId, variantId) {
  return variants.filter((v) => v.id === variantId)[0]
}