import { Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 py-8 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400 flex items-center justify-center gap-2">
          &copy; {currentYear} <span className="text-white font-semibold">Yago Nigro</span> — Diseñado y desarrollado con dedicación, café y unas cuantas líneas de código
          <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
        </p>
      </div>
    </footer>
  )
}

export default Footer
