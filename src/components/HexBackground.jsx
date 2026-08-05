import { useRef, useEffect } from 'react'

const BLUE_TONES = ['#1e40af', '#0ea5e9', '#38bdf8']
const GLOW_RADIUS = 160
const GLOW_ADD = 0.15

function HexBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const animationFrameRef = { current: null }
    let hexagons = []
    let mouse = { x: -9999, y: -9999 }
    let prefersReducedMotion = false

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function initHexagons() {
      const area = window.innerWidth * window.innerHeight
      const count = Math.min(Math.floor(area / 2500), 80)

      hexagons = []

      for (let i = 0; i < count; i++) {
        const size = Math.random() < 0.7
          ? Math.random() * 30 + 20
          : Math.random() * 30 + 60
        const opacity = Math.random() * 0.22 + 0.13
        const speed = size > 50
          ? Math.random() * 0.02 + 0.04
          : Math.random() * 0.01 + 0.02
        const color = BLUE_TONES[Math.floor(Math.random() * BLUE_TONES.length)]
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight

        hexagons.push({ x, y, size, opacity, speed, color })
      }
    }

    function drawHexagon(ctx, x, y, size) {
      const a = (Math.sqrt(3) / 2) * size
      const b = 1.5 * size
      ctx.beginPath()
      ctx.moveTo(x, y - a)
      ctx.lineTo(x + b / 2, y - a / 2)
      ctx.lineTo(x + b / 2, y + a / 2)
      ctx.lineTo(x, y + a)
      ctx.lineTo(x - b / 2, y + a / 2)
      ctx.lineTo(x - b / 2, y - a / 2)
      ctx.closePath()
    }

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < hexagons.length; i++) {
        const hex = hexagons[i]

        if (!prefersReducedMotion) {
          hex.y += hex.speed
          if (hex.y - hex.size > h) {
            hex.y = -hex.size
            hex.x = Math.random() * w
            hex.opacity = Math.random() * 0.22 + 0.13
            hex.speed = hex.size > 50
              ? Math.random() * 0.02 + 0.04
              : Math.random() * 0.01 + 0.02
          }
        }

        const currentOpacity = prefersReducedMotion
          ? hex.opacity
          : hex.opacity + mouseAt(hex) * GLOW_ADD

        drawHexagon(ctx, hex.x, hex.y, hex.size)
        ctx.fillStyle = hex.color
        ctx.globalAlpha = currentOpacity
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    function mouseAt(hex) {
      if (mouse.x < -9999) return 0
      const dx = hex.x - mouse.x
      const dy = hex.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > GLOW_RADIUS) return 0
      return 1 - dist / GLOW_RADIUS
    }

    function loop() {
      animationFrameRef.current = requestAnimationFrame(loop)
      draw()
    }

    const prefersReducedMotionMedia = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    prefersReducedMotion = prefersReducedMotionMedia.matches
    prefersReducedMotionMedia.addEventListener('change', () => {
      prefersReducedMotion = prefersReducedMotionMedia.matches
    })

    resizeCanvas()
    initHexagons()
    loop()

    function onMouseMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    function onMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    function onBlur() {
      mouse.x = -9999
      mouse.y = -9999
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('blur', onBlur)

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameRef.current)
      } else {
        animationFrameRef.current = requestAnimationFrame(loop)
      }
    })

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[1]"
    />
  )
}

export default HexBackground