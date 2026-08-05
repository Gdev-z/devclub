import { useRef, useEffect } from 'react'

const BLUE_TONES = ['#1e40af', '#0ea5e9', '#38bdf8']
const GLOW_RADIUS = 80
const GLOW_ADD = 0.04

function HexBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const animationFrameRef = { current: null }
    let cells = []
    let hexSize = 28
    let hexW, hexH, cols, rows
    let mouse = { x: -9999, y: -9999 }
    let prefersReducedMotion = false

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      hexW = 1.5 * hexSize
      hexH = Math.sqrt(3) * hexSize
      cols = Math.ceil(window.innerWidth / hexW) + 2
      rows = Math.ceil(window.innerHeight / hexH) + 2

      buildCells()
    }

    function buildCells() {
      const margin = hexSize * 2
      cells = []

      for (let row = -1; row < rows; row++) {
        const oddCol = row % 2 === 1
        const offsetX = oddCol ? hexW / 2 : 0
        for (let col = -1; col < cols; col++) {
          const x = margin + col * hexW + offsetX
          const y = margin + row * hexH + (oddCol ? hexH / 2 : 0)
          if (x > window.innerWidth + margin || y > window.innerHeight + margin) continue
          cells.push({
            x,
            y,
            size: hexSize,
            peakOpacity: Math.random() * 0.17 + 0.08,
            period: Math.random() * 7000 + 5000,
            phaseOffset: Math.random() * Math.PI * 2,
            color: BLUE_TONES[Math.floor(Math.random() * BLUE_TONES.length)]
          })
        }
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

      const t = performance.now()

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i]

        let opacity
        if (prefersReducedMotion) {
          opacity = cell.peakOpacity * 0.5
        } else {
          const visibility = Math.max(0, Math.sin((2 * Math.PI * t) / cell.period + cell.phaseOffset))
          opacity = cell.peakOpacity * visibility
        }

        if (!prefersReducedMotion && mouse.x > -9999) {
          const dx = cell.x - mouse.x
          const dy = cell.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < GLOW_RADIUS) {
            opacity += GLOW_ADD * (1 - dist / GLOW_RADIUS)
          }
        }

        drawHexagon(ctx, cell.x, cell.y, cell.size)
        ctx.fillStyle = cell.color
        ctx.globalAlpha = opacity
        ctx.fill()
      }

      ctx.globalAlpha = 1
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