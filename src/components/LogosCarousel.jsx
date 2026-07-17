import { motion } from 'framer-motion'
import apple from '../assets/carrossel_logos/apple-11.svg'
import aws from '../assets/carrossel_logos/aws-2.svg'
import google from '../assets/carrossel_logos/google-1-1.svg'
import ifood from '../assets/carrossel_logos/ifood-logo.svg'
import microsoft from '../assets/carrossel_logos/microsoft-6.svg'

const LOGOS = [
  { name: 'Apple', src: apple },
  { name: 'AWS', src: aws },
  { name: 'Google', src: google },
  { name: 'iFood', src: ifood },
  { name: 'Microsoft', src: microsoft },
]

export default function LogosCarousel() {
  // Garante que um "conjunto" seja sempre maior que a viewport (evita
  // buraco/ corte abrupto). Base = 3x as logos; track = 2x a base,
  // animada em translateX(-50%) para um loop perfeito e contínuo.
  const base = [...LOGOS, ...LOGOS, ...LOGOS]
  const loop = [...base, ...base]

  return (
    <section className="ticker-section relative w-full overflow-hidden border-y border-white/5 bg-[#09090B]">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="ticker-title mx-auto mb-12 px-6 text-center text-xs uppercase tracking-[0.2em] text-white/40"
      >
        Nossos alunos são contratados por
      </motion.p>

      {/* máscara de fade nas laterais */}
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="logos-track flex w-max items-center">
          {loop.map((logo, i) => (
            <span key={`${logo.name}-${i}`} className="logos-item">
              <img
                src={logo.src}
                alt={logo.name}
                className="logos-logo opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

