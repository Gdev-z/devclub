import { useRef, useEffect } from 'react'

const STROKE_DASH_ARRAY = '4 8'

function TechBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId = null
    let particles = []
    let mouse = { x: -9999, y: -9999 }
    let animationFrame = null

    function resize() {
      const pixelRatio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio
      ctx.scale(pixelRatio, pixelRatio)
      initParticles()
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    function initParticles() {
      const area = window.innerWidth * window.innerHeight
      const count = Math.min(Math.floor(area / 3000), 120)
      particles = []
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 1,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const speedMult = prefersReducedMotion ? 0.1 : 1

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx * speedMult
        p.y += p.vy * speedMult

        if (p.x < 0) p.x = window.innerWidth
        if (p.x > window.innerWidth) p.x = 0
        if (p.y < 0) p.y = window.innerHeight
        if (p.y > window.innerHeight) p.y = 0
      }

      // Particles as points
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(34, 197, 94, 0.7)'
        ctx.fill()
      }

      // Connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            const opacity = 0.4 * (1 - dist / 140)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity.toFixed(2)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Connections to mouse
      if (mouse.x > -9999 && mouse.y > -9999) {
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            const opacity = 0.7 * (1 - dist / 140)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(57, 211, 83, ${opacity.toFixed(2)})`
            ctx.lineWidth = 2
            ctx.stroke()
          }
        }

        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(57, 211, 83, 0.4)'
        ctx.fill()
      }
    }

    function loop() {
      draw()
      animationFrame = requestAnimationFrame(loop)
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function onMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    loop()

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: '#09090B' }}
    />
  )
}

export default TechBackground