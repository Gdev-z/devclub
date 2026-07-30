import React, { useState, useEffect } from 'react'
import bgVideo from '../assets/video.webm'

export default function BgVideo() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const onDevclubLoaded = () => setShow(false)
    window.addEventListener('devclub:loaded', onDevclubLoaded)
    return () => window.removeEventListener('devclub:loaded', onDevclubLoaded)
  }, [])

  // if (!show) return null

  return (
    <video
      className="fixed inset-0 h-full w-full object-cover pointer-events-none "
      src={bgVideo}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  )
}
