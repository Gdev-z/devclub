import { useState, useCallback } from 'react'
import models3D from '../config/models3D'

const STORAGE_KEY = 'devclub-3d-settings'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    const validated = {}
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === 'boolean') validated[k] = v
    }
    return validated
  } catch (e) {
    console.warn('[3D] localStorage unavailable:', e.message)
    return {}
  }
}

function saveToStorage(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (e) {
    console.warn('[3D] localStorage write failed:', e.message)
  }
}

// Estado inicial: ler do localStorage ou usar defaultEnabled de cada modelo
const initialStorage = loadFromStorage()
const initialState = {}
for (const model of models3D) {
  initialState[model.id] = model.id in initialStorage ? initialStorage[model.id] : model.defaultEnabled
}

export default function useModel3DSettings() {
  const [settings, setSettings] = useState(initialState)

  const toggleModel = useCallback((modelId) => {
    setSettings((prev) => {
      const next = { ...prev, [modelId]: !prev[modelId] }
      saveToStorage(next)
      return next
    })
  }, [])

  // Estado derivado: lista de modelos com o enabled resolvido
  const models = models3D.map((model) => ({
    ...model,
    enabled: settings[model.id] ?? model.defaultEnabled,
  }))

  function isEnabled(id) {
    return settings[id] ?? false
  }

  return { models, toggleModel, isEnabled }
}