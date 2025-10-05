import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, Code2, Gauge, Layout } from 'lucide-react'

const words = ['rápidos', 'claros', 'escalables', 'bonitos', 'accesibles']

export default function Hero() {
  const [i, setI] = useState(0)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)

  // typewriter
  useEffect(() => {
    const w = words[i]
    const t = setTimeout(() => {
      if (!deleting && typed.length < w.length) setTyped(w.slice(0, typed.length + 1))
      else if (deleting && typed.length > 0) setTyped(w.slice(0, typed.length - 1))
      else if (!deleting && typed.length === w.length) setTimeout(() => setDeleting(true), 1200)
      else if (deleting && typed.length === 0) { setDeleting(false); setI((p) => (p + 1) % words.length) }
    }, deleting ? 35 : 90)
    return () => clearTimeout(t)
  }, [typed, deleting, i])

  // tilt 3D tarjeta
  const cardRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rX = useTransform(my, [-40, 40], [8, -8])
  const rY = useTransform(mx, [-40, 40], [-8, 8])
  const onMove = (e) => {
    const el = cardRef.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mx.set(Math.max(-40, Math.min(40, x / 6)))
    my.set(Math.max(-40, Math.min(40, y / 6)))
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  const badges = useMemo(() => ([
    { icon: <Gauge className="w-3.5 h-3.5" />, text: 'Performance' },
    { icon: <Layout className="w-3.5 h-3.5" />, text: 'UI/UX' },
    { icon: <Code2 className="w-3.5 h-3.5" />, text: 'Full Stack' },
  ]), [])

  return (
    <section
      id="home"
      // svh = safe viewport height
      className="
        relative min-h-[100svh]
        pt-[22svh] md:pt-[20svh] lg:pt-[18svh]
        pb-[26svh] lg:pb-[22svh]
        overflow-hidden
        scroll-mt-24 md:scroll-mt-28
      "
      style={{
      background:
        'radial-gradient(1200px 600px at 10% 10%, rgba(59,130,246,0.14), transparent), radial-gradient(1000px 500px at 90% 90%, rgba(168,85,247,0.14), transparent), linear-gradient(135deg, #0b1026 0%, #17162b 50%, #190f2d 100%)',
      }}
    >
      {/* mesh + grid sutil */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[620px] h-[620px] bg-blue-500/25 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-[620px] h-[620px] bg-purple-500/25 blur-[140px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />
      </div>

      {/* contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          {/* IZQ: copy */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 mb-5 backdrop-blur"
            >
              <span className="inline-flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-gray-300">Disponible para nuevos proyectos</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}
              className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-white"
            >
              Yago Nigro
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                Diseño y desarrollo productos {typed}
                <span className="ml-0.5 animate-pulse">|</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-5 text-lg text-gray-300 max-w-2xl"
            >
              Código limpio, micro-interacciones con intención y foco en negocio.
              Entrego experiencias web que cargan rápido y se usan fácil.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/35 transition-all"
              >
                Empezar un proyecto
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 -rotate-12 group-hover:rotate-0" />
                <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-purple-600 to-blue-600 mix-blend-overlay" />
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <BadgeCheck className="w-4 h-4 text-emerald-400" />
                <span>Entrega enfocada en performance y UX</span>
              </div>
            </motion.div>
          </div>

          {/* DER: tarjeta visual con tilt y orbes */}
          <div className="relative">
            {badges.map((b, idx) => (
              <motion.div
                key={idx}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ zIndex: 1 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 22 + idx * 3, ease: 'linear' }}
              >
                <div
                  className="relative"
                  style={{ transform: `rotate(${idx * 40}deg) translateX(${110 + idx * 28}px) rotate(-${idx * 40}deg)` }}
                >
                  <div className="px-3 py-1.5 rounded-full text-[11px] bg-white/8 border border-white/15 text-gray-200 backdrop-blur flex items-center gap-1.5 shadow-[0_0_30px_rgba(99,102,241,0.25)]">
                    {b.icon}{b.text}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}
              style={{ rotateX: rX, rotateY: rY }}
              className="relative z-10 mx-auto w-full max-w-[520px] rounded-3xl border border-white/12 bg-white/[0.04] backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-3 bg-white/[0.04] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="text-xs text-gray-400">preview</span>
              </div>
              <div className="relative">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-br from-blue-500/25 via-indigo-500/20 to-purple-500/25 relative">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${60 + (i % 3) * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                        className="h-[10px] rounded-full bg-white/20 mx-6 my-4"
                      />
                    ))}
                    <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_70%_40%,black_50%,transparent_75%)]" />
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3 border-t border-white/10">
                  <div className="text-sm text-gray-300">Prototipo de interfaz</div>
                  <button
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-primary-300 hover:text-primary-200 transition-colors inline-flex items-center gap-1"
                  >
                    Ver proyectos <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* === BANNER INFERIOR (ocupa el fin de pantalla) === */}
      <div className="
        absolute inset-x-0 bottom-0
        h-[26svh] lg:h-[22svh]
        bg-gradient-to-r from-blue-600/25 via-purple-600/25 to-pink-600/25
        border-t border-white/10
        backdrop-blur-xl
      ">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Mensaje */}
            <div className="text-center md:text-left">
              <p className="text-sm uppercase tracking-wider text-gray-400">Tu próximo proyecto</p>
              <h3 className="mt-1 text-2xl font-semibold text-white">Hagámoslo rápido, claro y medible</h3>
            </div>

            {/* Píldoras */}
            {/* <div className="flex items-center justify-center gap-3">
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-gray-200 text-sm">Core Web Vitals</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-gray-200 text-sm">Accesibilidad</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-gray-200 text-sm">UI con intención</span>
            </div> */}

            {/* CTA secundario */}
            <div className="text-center md:text-right">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 bg-white/10 border border-white/15 text-white hover:bg-white/15 transition"
              >
                Hablemos ahora <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* keyframes locales */}
      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  )
}
