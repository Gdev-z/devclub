// ============================================================
// Registry central de modelos 3D
// Para adicionar um novo modelo, basta inserir um objeto aqui.
// ============================================================

const models3D = [
  {
    id: 'hero-model',
    name: 'Modelo Principal',
    path: '/logoForSpline2.glb',
    thumbnail: '/assets/icons/logo3D_icon.png',
    defaultEnabled: false,
  },
  {
    id: 'light-model',
    name: 'Light Logo',
    path: '/light_devclub_logo.glb',
    thumbnail: '/assets/icons/logo3D_icon.png',
    defaultEnabled: false,
  },
]

export default models3D

export function getModelById(id) {
  return models3D.find((m) => m.id === id)
}