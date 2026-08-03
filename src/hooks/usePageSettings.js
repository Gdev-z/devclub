import { useState, useEffect } from 'react'

const STORAGE_KEY = 'page-settings'

const DEFAULT_SETTINGS = {
  models3D: { enabled: false, activeModelId: 'hero-model' },
  background: { activeId: 'video-bg' },
}

export default function usePageSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return { ...DEFAULT_SETTINGS }
      }
    }
    return { ...DEFAULT_SETTINGS }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const toggleModels3D = () => {
    setSettings((prev) => ({
      ...prev,
      models3D: { ...prev.models3D, enabled: !prev.models3D.enabled },
    }))
  }

  const selectModel = (modelId) => {
    setSettings((prev) => ({
      ...prev,
      models3D: { ...prev.models3D, activeModelId: modelId },
    }))
  }

  const selectBackground = (bgId) => {
    setSettings((prev) => ({
      ...prev,
      background: { activeId: bgId },
    }))
  }

  return {
    enabled: settings.models3D.enabled,
    activeModelId: settings.models3D.activeModelId,
    toggleModels3D,
    selectModel,
    activeBackgroundId: settings.background.activeId,
    selectBackground,
  }
}