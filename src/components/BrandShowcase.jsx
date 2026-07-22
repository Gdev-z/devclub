import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

export default function BrandShowcase() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px] w-full relative overflow-hidden">
      {/* Metade Esquerda — fundo escuro + tipografia gigante */}
      <div className="flex items-center justify-center lg:items-center lg:justify-center bg-[#09090B] p-8 lg:p-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-row items-center lg:items-center gap-6"
        >
          <img src={logo} alt="DevClub" className="h-12 w-auto lg:h-16" />
          <h2 className="font-jakarta text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-white select-none text-center lg:text-left">
            DevClub
          </h2>
        </motion.div>
      </div>

      {/* Metade Direita — transparente, mostra canvas 3D / vídeo de fundo */}
      <div className="bg-transparent z-10" />
    </section>
  )
}
