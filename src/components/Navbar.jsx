import { useEffect, useMemo, useRef, useState } from 'react'
import { Menu, X, Home, User, FolderKanban, Code2, Mail } from 'lucide-react'

/**
 * Navbar flotante centrado (desktop) y dock inferior (mobile).
 * - Top pill center: fixed + glass + blur.
 * - Activo con glow sutil y marcador.
 * - Mobile dock para encajar con el banner del Hero.
 */
const Navbar = ({ activeSection = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  const navItems = useMemo(
  () => [
    { id: 'home',     label: 'Inicio',     icon: Home },
    { id: 'about',    label: 'Sobre mí',   icon: User },
    { id: 'projects', label: 'Proyectos',  icon: FolderKanban },
    { id: 'skills',   label: 'Habilidades',icon: Code2 },
    { id: 'contact',  label: 'Contacto',   icon: Mail },
  ],
  []
)


  // Progreso de scroll (línea muy fina en el tope)
  useEffect(() => {
    const onScroll = () => {
      const sTop = window.scrollY || document.documentElement.scrollTop
      const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const p = docH > 0 ? (sTop / docH) * 100 : 0
      setProgress(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  // Sutileza: “magnetic” leve
  const itemRefs = useRef({})
  const onMouseMove = (e, id) => {
    const el = itemRefs.current[id]
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.05}px, ${y * 0.04}px)`
  }
  const onMouseLeave = (id) => {
    const el = itemRefs.current[id]
    if (!el) return
    el.style.transform = 'translate(0,0)'
  }

  return (
    <>
      {/* barra de progreso ultra fina */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 z-[60] transition-[width] duration-150 ease-linear"
        style={{ width: `${progress}%` }}
      />

      {/* ===== Desktop: pill céntrica ===== */}
      <div className="hidden md:block fixed z-[55] top-6 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-2xl bg-white/6 backdrop-blur-xl border border-white/10 shadow-[0_8px_36px_rgba(59,130,246,0.18)] px-2 py-1">
          {navItems.map((item, i) => {
            const active = activeSection === item.id
            const showDot = active
            return (
              <button
                key={item.id}
                ref={(el) => (itemRefs.current[item.id] = el)}
                onMouseMove={(e) => onMouseMove(e, item.id)}
                onMouseLeave={() => onMouseLeave(item.id)}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-xl transition-colors
                 ${active ? 'text-white' : 'text-gray-300 hover:text-white'}`}
              >
                {/* glow del activo */}
                <span
                  className={`pointer-events-none absolute inset-0 rounded-xl transition
                  ${active ? 'bg-white/10 ring-1 ring-white/15 shadow-[0_0_24px_rgba(99,102,241,0.4)]' : 'bg-transparent'}`}
                />
                <span className="relative z-10 flex items-center gap-2">
                  {item.label}
                  {showDot && <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />}
                </span>
                {/* separador sutil entre items */}
                {i < navItems.length - 1 && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-px bg-white/10" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ===== Mobile: dock inferior centrado ===== */}
      <nav
  className="
    md:hidden fixed z-[55]
    left-1/2 -translate-x-1/2
    top-[calc(env(safe-area-inset-top,0px)+16px)]
    w-[92%]
  "
>
  <div className="flex items-center justify-between rounded-3xl bg-white/8 backdrop-blur-xl border border-white/10 px-2 py-2 shadow-[0_8px_36px_rgba(168,85,247,0.18)]">
    <button
      onClick={() => setIsOpen((v) => !v)}
      className="inline-flex items-center justify-center p-2 rounded-xl text-gray-200 hover:bg-white/10 transition"
      aria-label="Abrir menú"
    >
      {isOpen ? <X size={22} /> : <Menu size={22} />}
    </button>

    {/* fila compacta con ICONOS (logos) */}
    <div className={`grid transition-all ${isOpen ? 'grid-cols-4 gap-1 opacity-100' : 'grid-cols-1 opacity-90'}`}>
      {navItems
        .filter((n) => (isOpen ? n.id !== 'home' : n.id === 'home'))
        .map((item) => {
          const active = activeSection === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-label={item.label}
              title={item.label}
              className={`px-2 py-1.5 rounded-xl text-sm font-medium flex items-center justify-center
                ${active ? 'bg-white/10 text-white' : 'text-gray-200 hover:bg-white/10'}`}
            >
              <Icon size={19} strokeWidth={2} className="shrink-0" />
              <span className="sr-only">{item.label}</span>
            </button>
          )
        })}
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar
