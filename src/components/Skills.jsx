import { skills } from '../data/skills'

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Habilidades</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">
          No se trata solo de conocer herramientas, sino de entender cómo usarlas para crear buenas soluciones.
        </p>

        {/* Intro block with context about tools */}
        <div className="max-w-3xl mx-auto mb-10 text-center text-gray-400">
          <p>Estas son las tecnologías con las que más trabajo y lo que valoro de cada una:</p>
          <ul className="mt-4 space-y-2 text-left sm:text-center">
            <li><strong>React.js</strong> — Me permite construir interfaces limpias y reactivas.</li>
            <li><strong>Node.js + Express</strong> — Ideal para desarrollar APIs rápidas y organizadas.</li>
            <li><strong>Go (Golang)</strong> — Lo uso cuando busco rendimiento y escalabilidad real.</li>
            <li><strong>Tailwind CSS</strong> — Diseño coherente y ágil sin fricción.</li>
            <li><strong>MongoDB / PostgreSQL</strong> — Flexibilidad o estructura, según el caso.</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {skills.map(({ id, name, icon: Icon, level }) => (
            <div
              key={id}
              className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center
                         transform hover:scale-110 hover:bg-primary-500/10 hover:border-primary-500/30
                         transition-all duration-300 group"
            >
              {/* Contenedor centrado para el ícono */}
              <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-white/5 group-hover:bg-primary-500/10 transition-all">
                <Icon className="text-5xl text-primary-400 group-hover:scale-110 transition-transform duration-300" />
              </div>

              <h3 className="text-lg font-semibold text-white mb-1">
                {name}
              </h3>
              <p className="text-gray-400 text-sm">{level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
