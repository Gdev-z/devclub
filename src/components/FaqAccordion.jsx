import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

export function FaqItem({ item, isOpen, onToggle }) {
  const handleToggle = () => {
    onToggle(item.id)
  }

  return (
    <div
      className={`rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? 'border-[#39D353]/20 bg-[#121215]'
          : 'border-white/10 bg-[#0d0d0d]'
      }`}
    >
      <button
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            isOpen ? 'text-[#39D353]' : 'text-white'
          }`}
        >
          {item.question}
        </span>
        <motion.button
          className={`ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
            isOpen ? 'border-[#39D353]/30 bg-[#39D353]/15 text-[#39D353]' : 'border-white/20 bg-white/10 text-white'
          }`}
          whileTap={{ scale: 0.85 }}
          animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        >
          {isOpen ? (
            <Minus className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
        </motion.button>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5">
              <p className="text-sm leading-relaxed text-neutral-400">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqAccordion({ faqData }) {
  const [openId, setOpenId] = useState(null)

  const handleToggle = (itemId) => {
    setOpenId((prev) => (prev === itemId ? null : itemId))
  }

  return (
    <section className="relative w-full py-20 sm:py-24 md:py-28 lg:py-32">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAFAFA] leading-tight">
            Perguntas frequentes
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Dúvidas comuns sobre o DevClub e como ele pode ajudar sua jornada em tecnologia.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="flex flex-col gap-4">
          {faqData.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              isOpen={item.id === openId}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}