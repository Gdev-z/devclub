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
 *
 * Para o wheel alcançar o footer, Lenis precisa recalcar a altura total da
 * página sempre que o conteúdo assíncrono (imagens lazy, fontes web, canvas
 * 3D, React.lazy) muda a altura real do documento — senão fica com um teto
 * de scroll menor que a altura real, que é o bug reproduzido em produção
 * sob rede lenta.
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

    // Recalcular limites quando a altura do documento mudar:
    // load — quando tudo terminar de carregar; devclub:loaded — evento do
    // próprio site; ResizeObserver — imagens lazy ou React.lazy que mudam
    // a altura depois do load inicial (enquanto o usuário rola).
    const onResize = () => lenis.resize()
    window.addEventListener('load', onResize)
    window.addEventListener('devclub:loaded', onResize)

    const observer = new ResizeObserver(onResize)
    observer.observe(document.documentElement)

    return () => {
      observer.disconnect()
      window.removeEventListener('load', onResize)
      window.removeEventListener('devclub:loaded', onResize)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [disabled])
}
