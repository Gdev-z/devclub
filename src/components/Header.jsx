import { useState } from 'react'
import logo from '../assets/logo.png'

const NAV_LINKS = [
  { label: 'Formações', href: '#formacoes' },
  { label: 'Ecossistema', href: '#ecossistema' },
  { label: 'Tecnologias', href: '#stack' },
  { label: 'Salário', href: '#salario' },
]

function NavLink({ label, href }) {
  const handleClick = (e) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group relative px-1 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
    >
      {label}
      <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-[#39D353] transition-all duration-300 group-hover:w-full" />
    </a>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="DevClub" className="h-7 w-auto" />
          <span className="text-lg font-extrabold tracking-tight text-white">
            Dev<span className="text-[#39D353]">Club</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.label} label={l.label} href={l.href} />
          ))}
        </nav>

        <a
          href="https://wa.me/5516990482444"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#39D353] px-5 py-2 text-sm font-semibold text-[#39D353] transition-all duration-300 hover:bg-[#39D353] hover:text-black"
        >
          Quero ser aluno
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white/80 md:hidden"
          aria-label="Abrir menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/5 px-6 py-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                e.preventDefault()
                setOpen(false)
                const target = document.querySelector(l.href)
                if (target) target.scrollIntoView({ behavior: 'smooth' })
              }}
              className="py-2 text-sm text-white/70 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
