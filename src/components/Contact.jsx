import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactLinks = [
    {
      id: 1,
      name: 'Email',
      icon: Mail,
      href: 'https://mail.google.com/mail/u/0/#inbox?compose=new',
      label: 'yago.gn007@gmail.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/yagonigro?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      label: 'LinkedIn',
      color: 'from-blue-600 to-blue-400',
    },
    {
      id: 3,
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/YagoNigro123',
      label: 'GitHub',
      color: 'from-gray-700 to-gray-500',
    },
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log("Validación:", validateForm(), errors, formData)

    if (!validateForm()) {
      setStatus({
        type: 'error',
        message: 'Por favor corrige los errores del formulario',
      })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      // Configuración de EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'yago.gn007@gmail.com',
        reply_to: formData.email,
      }

      // Envía el email usando EmailJS
      const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      setStatus({
        type: 'success',
        message: '¡Mensaje enviado con éxito! Te responderé pronto.',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      let errorMessage = 'Hubo un error al enviar el mensaje. Intenta de nuevo.'
      if (error.text) errorMessage = `Error: ${error.text}`
      else if (error.message) errorMessage = `Error: ${error.message}`

      setStatus({
        type: 'error',
        message: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Hablemos</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">
          ¿Querés crear algo juntos? Me gusta colaborar con personas y proyectos que valoran la tecnología bien hecha.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="text-primary-500" />
              Envíame un mensaje
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all`}
                    placeholder="Tu nombre"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all`}
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.subject ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all`}
                  placeholder="¿En qué puedo ayudarte?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all resize-none`}
                  placeholder="Contame sobre tu proyecto..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Status Message */}
              {status.message && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-2 ${
                    status.type === 'success'
                      ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  {status.message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Links */}
          <div className="space-y-8">
            <div className="glass rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Estoy siempre abierto a nuevas oportunidades y colaboraciones. Si tenés una idea, un proyecto o simplemente querés charlar sobre desarrollo,
                escribime por el formulario o contactame en mis redes. Suelo responder en menos de 24 horas (con café de por medio ☕).
              </p>

              <div className="space-y-4">
                {contactLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all group"
                    >
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${link.color} group-hover:scale-110 transition-transform`}
                      >
                        <Icon size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{link.name}</p>
                        <p className="text-sm text-gray-400">{link.label}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Quick Response */}
            <div className="glass rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">⚡ Respuesta Rápida</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Generalmente respondo dentro de las 24 horas. Para consultas urgentes, contactame
                directamente por email o LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
