import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'

const variants = {
  hidden: { scale: 0, opacity: 0, rotate: -90 },
  visible: { scale: 1, opacity: 1, rotate: 0 },
  exit: { scale: 0, opacity: 0, rotate: 90 },
}

export default function CircleToggleButton({ onOpen }) {
  return (
    <motion.button
      onClick={onOpen}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#39D353] shadow-lg shadow-[#39D353]/30 transition-colors duration-200 hover:bg-[#30B34D]"
      aria-label="Configurações de modelos 3D"
    >
      <Settings className="m-auto h-6 w-6 text-[#09090B]" />
    </motion.button>
  )
}