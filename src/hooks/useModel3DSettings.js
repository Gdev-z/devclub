import { useState, useCallback } from 'react'
import models3D from '../config/models3D'

const STORAGE_KEY = 'devclub-3d-settings'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || Array.isArray(parsed)) return null
    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : false,
      activeModelId:
        typeof parsed.activeModelId === 'string'
          ? parsed.activeModelId
          : models3D[0]?.id ?? '',
    }
  } catch (e) {
    console.warn('[3D] localStorage unavailable:', e.message)
    return null
  }
}

// Estado inicial: localStorage ou valores default
const stored = loadFromStorage()
const initialEnabled = stored?.enabled ?? false
const initialActiveModelId = stored?.activeModelId ?? models3D[0]?.id ?? ''

export default function useModel3DSettings() {
  const [enabled, setEnabled] = useState(initialEnabled)
  const [activeModelId, setActiveModelId] = useState(initialActiveModelId)

  const toggleEnabled = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ enabled: next, activeModelId })
        )
      } catch (e) {
        console.warn('[3D] localStorage write failed:', e.message)
      }
      return next
    })
  }, [activeModelId])

  const selectModel = useCallback((id) => {
    setActiveModelId((prev) => {
      if (prev === id) return prev
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ enabled, activeModelId: id })
        )
      } catch (e) {
        console.warn('[3D] localStorage write failed:', e.message)
      }
      return id
    })
    // Se o modelo estava desativado, ativa ao selecionar um novo
    if (!enabled) {
      setEnabled(true)
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ enabled: true, activeModelId: id })
        )
      } catch (e) {
        // ignore
      }
    }
  }, [enabled])

  // Lista de modelos com estado derivado
  const models = models3D.map((model) => ({
    ...model,
    enabled: model.id === activeModelId,
  }))

  return { enabled, activeModelId, models, toggleEnabled, selectModel }
}