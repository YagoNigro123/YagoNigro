import devImg from '../assets/undraw_male.svg'

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Sobre Mí</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">
          Un poco sobre mi trayectoria y lo que me mueve como desarrollador
        </p>

        <div className="grid md:grid-cols-2 gap-40 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img 
              src={devImg} 
              alt="Ilustración de desarrollador" 
              className="w-full max-w-md rounded-2xl drop-shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed">
              Soy estudiante de <span className="text-primary-400 font-semibold">Ingeniería en Sistemas en la UTN Buenos Aires</span> y
              desarrollador web <span className="font-semibold">Full Stack</span>. Desde que empecé a programar, me atrapó la idea
              de convertir ideas en herramientas reales que mejoren la vida de las personas.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Me gusta pensar los proyectos de principio a fin: desde la arquitectura del backend hasta los pequeños detalles del frontend.
              Valoro la <span className="font-semibold">curiosidad</span>, la <span className="font-semibold">mejora constante</span> y la
              <span className="font-semibold">claridad en el desarrollo</span>. No busco complicar las cosas: busco que funcionen bien,
              sean mantenibles y dejen una buena impresión.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Actualmente trabajo bajo mi marca <span className="italic text-primary-400">Starflux</span>, donde desarrollo sitios web modernos y optimizados
              para empresas y emprendedores que buscan destacarse en el entorno digital.
            </p>
          </div>

          
        </div>
      </div>
    </section>
  )
}

export default About
