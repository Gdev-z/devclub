// ============================================================
// Registry central de modelos 3D
// Para adicionar um novo modelo, basta inserir um objeto aqui.
// ============================================================

const models3D = [
  {
    id: 'hero-model',
    name: 'Modelo Detalhado',
    path: '/logoForSpline2.glb',
    thumbnail: '/assets/icons/logo3D_icon.png',
    defaultEnabled: false,
    type: 'glb',
  },
  {
    id: 'light-model',
    name: 'Modelo Padrão',
    path: '/devclub_base.glb',
    thumbnail: '/assets/icons/logo3D_icon.png',
    defaultEnabled: false,
    type: 'glb',
  },
  {
    id: 'scene-metal',
    name: 'Metal Escovado',
    type: 'procedural',
    scene: 'metal',
    thumbnail: '/assets/icons/logo3D_icon.png',
  },
  {
    id: 'scene-particles',
    name: 'Partículas',
    type: 'procedural',
    scene: 'particles',
    thumbnail: '/assets/icons/logo3D_icon.png',
  },
]

export default models3D

export function getModelById(id) {
  return models3D.find((m) => m.id === id)
}