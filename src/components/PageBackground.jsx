import { useState, useEffect } from 'react'

export default function PageBackground({ activeId }) {
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    let cancelled = false
    if (activeId === 'hex-bg') {
      import('./HexBackground.jsx').then((mod) => {
        if (!cancelled) setComponent(() => mod.default)
      })
    } else if (activeId === 'tech-bg') {
      import('./TechBackground.jsx').then((mod) => {
        if (!cancelled) setComponent(() => mod.default)
      })
    } else {
      import('./BgVideo.jsx').then((mod) => {
        if (!cancelled) setComponent(() => mod.default)
      })
    }
    return () => {
      cancelled = true
    }
  }, [activeId])

  return Component ? <Component /> : null
}