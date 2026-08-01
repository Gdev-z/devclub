// ============================================================
// Registry central de modelos 3D
// Para adicionar um novo modelo, basta inserir um objeto aqui.
// ============================================================

const models3D = [
  {
    id: 'hero-model',
    name: 'Modelo Principal',
    path: '/logoForSpline2.glb',
    defaultEnabled: false,
  },
]

export default models3D

export function getModelById(id) {
  return models3D.find((m) => m.id === id)
}