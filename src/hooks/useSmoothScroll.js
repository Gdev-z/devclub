import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Smooth scroll global estilo landings premium (Linear/Vercel/Apple).
 * Lenis cuida da inércia do scroll e sincroniza com o rAF; o ScrollTrigger
 * do GSAP é alimentado via lenis.on('scroll') para que o reveal circular
 * da TechStackSection continue perfeito.
 */
export default function useSmoothScroll(disabled) {
  useEffect(() => {
    if (disabled) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [disabled])
}
